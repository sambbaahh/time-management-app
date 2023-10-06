import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../firebase";

const deleteEvent = async (id) => {
  try {
    const docRef = doc(db, "events", id);
    return await deleteDoc(docRef);
  } catch (error) {
    throw error;
  }
};

export default deleteEvent;
