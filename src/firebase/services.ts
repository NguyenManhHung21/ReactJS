import {
  DocumentData,
  addDoc,
  collection,
  doc,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";
import { db } from "./config";

export const addDocument = async (
  collectionName: string,
  data: DocumentData,
  documentId?: any
) => {
  if (documentId) {
    await setDoc(doc(db, collectionName, documentId), {
      ...data,
      createdAt: serverTimestamp(),
    });
  } else {
    await addDoc(collection(db, collectionName), {
      ...data,
      createdAt: serverTimestamp(),
    });
  }
};

// tao keywords cho displayName, su dung cho search
export const generateKeywords = (displayName: any) => {
  // liet ke tat cac hoan vi. vd: name = ["David", "Van", "Teo"]
  // => ["David", "Van", "Teo"], ["David", "Teo", "Van"], ["Teo", "David", "Van"],...
  const name = displayName.split(" ").filter((word: any) => word);

  const length = name.length;
  let flagArray: any = [];
  let result: any = [];
  let stringArray: any = [];

  /**
   * khoi tao mang flag false
   * dung de danh dau xem gia tri
   * tai vi tri nay da duoc su dung
   * hay chua
   **/
  for (let i = 0; i < length; i++) {
    flagArray[i] = false;
  }

  const createKeywords = (name: any) => {
    const arrName: any = [];
    let curName = "";
    name.split("").forEach((letter: any) => {
      curName += letter;
      arrName.push(curName);
    });
    return arrName;
  };

  function findPermutation(k: any) {
    for (let i = 0; i < length; i++) {
      if (!flagArray[i]) {
        flagArray[i] = true;
        result[k] = name[i];

        if (k === length - 1) {
          stringArray.push(result.join(" "));
        }

        findPermutation(k + 1);
        flagArray[i] = false;
      }
    }
  }

  findPermutation(0);

  const keywords = stringArray.reduce((acc: any, cur: any) => {
    const words = createKeywords(cur);
    return [...acc, ...words];
  }, []);

  return keywords;
};
