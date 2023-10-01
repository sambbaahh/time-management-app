import { getAuth, signOut } from "firebase/auth";

const signOutFromApp = async () => {
  const auth = getAuth();
  try {
    await signOut(auth);
  } catch (error) {
    throw error;
  }
};

export default signOutFromApp;
