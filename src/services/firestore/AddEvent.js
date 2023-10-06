import { addDoc, collection } from "firebase/firestore";
import { db } from "../firebase";
import getCurrentUser from "./CurrentUser";

const addEvent = async (data) => {
  const uid = getCurrentUser().uid;
  try {
    const docRef = await addDoc(collection(db, "events"), {
      creator: uid,
      title: data.title,
      description: data.description,
      startDate: data.startDate,
      endDate: data.endDate,
      category: data.category,
      participants: [],
    });
    return docRef.id;
  } catch (error) {
    throw error;
  }
};

export default addEvent;
