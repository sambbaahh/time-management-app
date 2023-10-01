import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  updateProfile,
} from "firebase/auth";
import { addDoc, collection } from "firebase/firestore";
import { auth, db } from "../firebase";

const createUserWithEmailPassword = async (email, password, name) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password,
    );

    await sendEmailVerification(auth.currentUser);

    await updateProfile(auth.currentUser, { displayName: name });

    await addDoc(collection(db, "users"), {
      uid: auth.currentUser.uid,
      name: name,
    });

    return auth.currentUser;
  } catch (error) {
    throw error;
  }
};

export default createUserWithEmailPassword;
