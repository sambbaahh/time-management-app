import { collection, addDoc } from "firebase/firestore";
import { db } from "../firebase";
import getCurrentUser from "./CurrentUser";
import { formatDayjsDate } from "../../utils/DateFormat";

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
    throw Error(error)
  }
};

export default addEvent;
