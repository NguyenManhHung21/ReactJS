import { DocumentData, doc, serverTimestamp, setDoc } from "firebase/firestore";
import { db } from "./config";

export const addDocument = async (
  collectionName: string,
  documentName: string,
  data: DocumentData
) => {
  await setDoc(doc(db, collectionName, documentName), {
    ...data,
    createdAt: serverTimestamp(),
  });
};
