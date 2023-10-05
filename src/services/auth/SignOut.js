import { getAuth, signOut } from "firebase/auth";
import { unsubscribe } from "../firestore/GetEvents";

const signOutFromApp = async () => {

  const auth = getAuth();
  try {
    unsubscribe();
    await signOut(auth);
  } catch (error) {
    throw error;
  }
};

export default signOutFromApp;
