import { addDoc, collection, setDoc, doc } from "firebase/firestore";
import { database } from "../main";

export const firebaseCreateComment = async (comment) => {
  await addDoc(collection(database, "comments"), comment);
  await setDoc(
    doc(database, "posts", comment.postId),
    { commentCount: this.commentCount + 1 },
    { merge: true }
  );
};
