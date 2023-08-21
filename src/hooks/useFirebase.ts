import {
  collection,
  getDocs,
  updateDoc,
  addDoc,
  deleteDoc,
  doc,
  QuerySnapshot,
  DocumentData,
  WithFieldValue,
} from "@firebase/firestore";
import { db } from "../firebase-config";

export type TPromiseFirebase = Promise<
  QuerySnapshot<DocumentData, DocumentData>
>;
export type TGetFirebase = () => TPromiseFirebase;
export type TSetFirebase = (
  data: WithFieldValue<DocumentData>
) => Promise<void>;
export type TUpdateFirebase = (
  id: string,
  data: WithFieldValue<DocumentData>
) => Promise<void>;
export type TRemoveFirebase = (id: string) => Promise<void>;

export const useFirebase = (collectionName: string) => {
  const todosCollectionRef = collection(db, collectionName);

  const get: TGetFirebase = async () => {
    const data = await getDocs(todosCollectionRef);
    return data;
  };

  const set: TSetFirebase = async (data) => {
    await addDoc(collection(db, collectionName), data);
  };

  const update: TUpdateFirebase = async (id, data) => {
    const userDoc = doc(db, collectionName, id);
    await updateDoc(userDoc, data);
  };

  const remove: TRemoveFirebase = async (id: string) => {
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
