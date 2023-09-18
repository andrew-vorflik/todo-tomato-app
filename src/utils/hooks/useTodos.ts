import { useEffect, useState } from "react";
import { v4 as uuid } from "uuid";
import { useFirebase } from "./useFirebase";
import { useFirebaseFetch } from "./useFirebaseFetch";
import { onSnapshot, collection } from "@firebase/firestore";
import { db } from "../../firebase-config";
import { TODOS_DOC } from "../../constants";
import { EPriority } from "../../enums/priority";
import { ECollections } from "../../enums/collections";
import { TTodo } from "../../types";

type createTTodo = (title: TTodo["title"]) => void;
type deleteTTodo = (id: TTodo["id"]) => void;
type editTTodo = (id: TTodo["id"], title: TTodo["title"]) => void;
type doneTTodo = (id: TTodo["id"]) => void;
type changePriorityTTodo = (id: TTodo["id"], priority: EPriority) => void;

export const useTodos = () => {
  const [todos, setTodos] = useState<TTodo[]>([]);
  const [isFirstLoading, setIsFirstLoading] = useState(true);
  const { update } = useFirebase(ECollections.todos);

  const { error: updateTodosError, fetch: fetchUpdateTodo } =
    useFirebaseFetch(update);

  const updateTodosHandler = (todos: TTodo[]) => {
    fetchUpdateTodo(TODOS_DOC, { todos });
  };

  const createTodo: createTTodo = (title) => {
    if (!title) {
      return;
    }

    const newTodo: TTodo = {
      id: uuid(),
      title,
      isDone: false,
      priority: EPriority.NORMAL,
    };

    updateTodosHandler([...todos, newTodo]);
  };

  const editTodo: editTTodo = (id, title) => {
    const updatedTodos = todos.map((todo: TTodo) => {
      if (todo.id === id) {
        return { ...todo, title };
      }

      return todo;
    });

    updateTodosHandler(updatedTodos);
  };

  const doneTodo: doneTTodo = (id) => {
    const updatedTodos = todos.map((todo: TTodo) => {
      if (todo.id === id) {
        return { ...todo, isDone: !todo.isDone };
      }

      return todo;
    });

    updateTodosHandler(updatedTodos);
  };

  const changePriorityTodo: changePriorityTTodo = (id, priority) => {
    const updatedTodos = todos.map((todo: TTodo) => {
      if (todo.id === id) {
        return { ...todo, priority };
      }

      return todo;
    });

    updateTodosHandler(updatedTodos);
  };

  const changePositionTodo = async (result: any) => {
    const { source, destination, draggableId } = result;

    if (!destination) {
      return;
    }

    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    ) {
      return;
    }

    const newTodos = [...todos];
    const draggableTodo: TTodo | undefined = newTodos.find(
      (todo) => todo.id === draggableId
    );

    if (!draggableTodo) {
      return;
    }

    newTodos.splice(source.index, 1);
    newTodos.splice(destination.index, 0, draggableTodo!);

    setTodos(newTodos); // Optimistic update
    updateTodosHandler(newTodos);
  };

  const deleteTodo: deleteTTodo = (id) => {
    const updatedTodos = todos.filter((todo: TTodo) => todo.id !== id);

    updateTodosHandler(updatedTodos);
  };

  const subscribeOnTodoCollection = () => {
    const unsubscribe = onSnapshot(
      collection(db, ECollections.todos),
      (snapshot) => {
        snapshot.docs.forEach((doc) => {
          if (doc.id === TODOS_DOC) {
            setTodos(doc.data().todos);
          }
        });
      }
    );

    return unsubscribe;
  };

  useEffect(() => {
    setIsFirstLoading(false);
  }, []);

  // Set realtime connection to todos collection in firestore
  useEffect(() => {
    const unsubscribe = subscribeOnTodoCollection();

    return () => {
      unsubscribe();
    };
  }, []);

  return {
    isLoading: isFirstLoading,
    todos,
    error: updateTodosError,
    createTodo,
    editTodo,
    doneTodo,
    changePriorityTodo,
    deleteTodo,
    changePositionTodo,
  };
};
