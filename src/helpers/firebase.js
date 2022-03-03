import { addDoc, collection, setDoc, doc, increment } from "firebase/firestore";
import { database } from "../main";

export const firebaseCreateComment = async (comment) => {
  await addDoc(collection(database, "comments"), comment);
  await setDoc(
    doc(database, "posts", comment.postId),
    { commentCount: increment(1) },
    { merge: true }
  );

  return "Comment added!";
};
