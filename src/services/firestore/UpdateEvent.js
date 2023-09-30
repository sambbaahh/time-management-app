import { doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase";

const updateEvent = async (data) => {
  try {
    const docRef = doc(db, "events", data.id);
    await updateDoc(docRef, {
      title: data.title,
      description: data.description,
      startDate: data.startDate,
      endDate: data.endDate,
      category: data.category,
      participants: [],
    });
    return docRef;
  } catch (error) {
    throw new Error(error);
  }
};

export default updateEvent;