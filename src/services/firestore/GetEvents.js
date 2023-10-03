import { db } from "../firebase";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import getCurrentUser from "./CurrentUser";
import { setEventsRedux } from "../../hooks/EventsSlice";

const getEventsWithListener = async (reduxDispatch) => {
  const uid = getCurrentUser().uid;
  const eventsCollection = collection(db, "events");
  const que = query(eventsCollection, where("creator", "==", uid));

  //Listens if data changes in the firestore database:
  onSnapshot(que, (querySnapshot) => {
    const events = querySnapshot.docs.map((event) => {
      const startDate = event.data().startDate.toDate().toISOString(true);
      const endDate = event.data().endDate.toDate().toISOString(true);
      return {
        ...event.data(),
        startDate,
        endDate,
        id: event.id,
      };
    });
    //update redux state every time data changes:
    reduxDispatch(setEventsRedux(events));
  });
};

export default getEventsWithListener;
