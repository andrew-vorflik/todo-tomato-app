import { useEffect, useState } from "react";
import uniqid from "uniqid";
import { useFirebase } from "./useFirebase";
import { useFirebaseFetch } from "./useFirebaseFetch";
import { collectionsE, priorityE } from "../types";
import { onSnapshot, collection } from "@firebase/firestore";
import { db } from "../firebase-config";
// import { sortTodos } from "../helpers/sortTodos";
import { TODOS_DOC } from "../constants";

// make this type global
export type TodoT = {
  id: string;
  // index: number;
  title: string;
  isDone: boolean;
  priority: priorityE;
};

type createTodoT = (title: TodoT["title"]) => void;
type deleteTodoT = (id: TodoT["id"]) => void;
type editTodoT = (id: TodoT["id"], title: TodoT["title"]) => void;
type doneTodoT = (id: TodoT["id"]) => void;
type changePriorityTodoT = (id: TodoT["id"], priority: priorityE) => void;
// type changePositionTodoT = (
//   id: TodoT["id"],
//   from: TodoT["index"],
//   to: TodoT["index"]
// ) => void;

export const useTodos = () => {
  const [todos, setTodos] = useState<TodoT[]>([]);
  const [isFirstLoading, setIsFirstLoading] = useState(true);
  const { update } = useFirebase<TodoT>(collectionsE.todos);
  console.log("todos:", todos);

  // const { error: setTodosError, fetch: setTodoFn } = useFirebaseFetch(set);
  const { error: updateTodosError, fetch: fetchUpdateTodo } =
    useFirebaseFetch(update);

  const updateTodosHandler = (todos: TodoT[]) => {
    fetchUpdateTodo(TODOS_DOC, { todos });
  };

  const createTodo: createTodoT = (title) => {
    if (!title) {
      return;
    }

    const newTodo: TodoT = {
      id: uniqid(),
      title,
      isDone: false,
      priority: priorityE.NORMAL,
    };

    updateTodosHandler([...todos, newTodo]);
  };

  const editTodo: editTodoT = (id, title) => {
    const updatedTodos = todos.map((todo: TodoT) => {
      if (todo.id === id) {
        return { ...todo, title };
      }

      return todo;
    });

    updateTodosHandler(updatedTodos);
  };

  const doneTodo: doneTodoT = (id) => {
    const updatedTodos = todos.map((todo: TodoT) => {
      if (todo.id === id) {
        return { ...todo, isDone: !todo.isDone };
      }

      return todo;
    });

    updateTodosHandler(updatedTodos);
  };

  const changePriorityTodo: changePriorityTodoT = (id, priority) => {
    const updatedTodos = todos.map((todo: TodoT) => {
      if (todo.id === id) {
        return { ...todo, priority };
      }

      return todo;
    });

    updateTodosHandler(updatedTodos);
  };

  const changePositionTodo = async (result: any) => {
    const { source, destination, draggableId } = result;
    console.log("draggableId:", draggableId);

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
    const draggableTodo: TodoT | undefined = newTodos.find(
      (todo) => todo.id === draggableId
    );
    console.log("in drag", newTodos);

    if (!draggableTodo) {
      return;
    }

    newTodos.splice(source.index, 1);
    newTodos.splice(destination.index, 0, draggableTodo!);
    console.log("newTodos:", newTodos);

    setTodos(newTodos); // Optimistic update
    updateTodosHandler(newTodos);
  };

  const deleteTodo: deleteTodoT = (id) => {
    const updatedTodos = todos.filter((todo: TodoT) => todo.id !== id);

    updateTodosHandler(updatedTodos);
  };

  const subscribeOnTodoCollection = () => {
    const unsubscribe = onSnapshot(
      collection(db, collectionsE.todos),
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
