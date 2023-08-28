import {
  FieldPath,
  WhereFilterOp,
  collection,
  onSnapshot,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../firebase/config";

export interface IConditionRef {
  fieldName: string | FieldPath;
  operator: WhereFilterOp;
  compareValue: any;
}

// type DataType<T> = Array<T>;

export const useFirestore = <T>(
  collectionName: string,
  condition?: IConditionRef
) => {
  const [documents, setDocuments] = useState<Array<T>>();
  useEffect(() => {
    if (condition) {
      if (!condition.compareValue || !condition.compareValue.length) {
        return;
      }
      const q = query(
        collection(db, collectionName),
        where(condition.fieldName, condition.operator, condition.compareValue),
        orderBy("createdAt")
      );
      // get real-time multiple documents in collection
      onSnapshot(q, (querySnapShot: any) => {
        const data: Array<T> = [];
        querySnapShot.forEach((doc: any) => {
          data.push({ ...doc.data(), id: doc.id });

          setDocuments(data);
        });
      });
    } else {
      const q = query(
        collection(db, collectionName)
      );
      // get real time documents
      onSnapshot(q, (querySnapShot: any) => {
        const data: Array<T> = [];
        querySnapShot.forEach((doc: any) => {
          data.push({ ...doc.data(), id: doc.id });

          setDocuments(data);
        });
      });
    }
  }, [collection, condition]);
  return documents;
};
