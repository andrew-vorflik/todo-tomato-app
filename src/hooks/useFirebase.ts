import {
  collection,
  getDocs,
  updateDoc,
  addDoc,
  deleteDoc,
  doc,
} from "@firebase/firestore";
import { db } from "../firebase-config";

export const useFirebase = <T extends { id: string }>(
  collectionName: string
) => {
  const todosCollectionRef = collection(db, collectionName);

  // TODO add crud functions types
  const get = async () => {
    const data = await getDocs(todosCollectionRef);
    // const mappedData = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
    return data;
  };

  const set = async (data: T) => {
    await addDoc(collection(db, collectionName), data);
  };

  const update = async (id: string, data: object) => {
    const userDoc = doc(db, collectionName, id);
    await updateDoc(userDoc, data);
  };

  const remove = async (id: string) => {
    const userDoc = doc(db, collectionName, id);
    deleteDoc(userDoc);
  };

  return {
    get,
    set,
    update,
    remove,
  };
};
