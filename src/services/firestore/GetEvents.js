import {db} from "../firebase";
import {collection, getDocs, query, where} from "firebase/firestore";
import getCurrentUser from "./CurrentUser";

const getEvents = async () => {
  const uid = getCurrentUser().uid;
  const eventsCollection = collection(db, "events");
  const que = query(eventsCollection, where("creator", "==", uid));

  const result = await getDocs(que);

  return result.docs.map((event) => {
    const startDate = event.data().startDate.toDate().toISOString(true);
    const endDate = event.data().endDate.toDate().toISOString(true);
    return {
      ...event.data(),
      startDate,
      endDate,
      id: event.id,
    };
  });
};

export default getEvents;
