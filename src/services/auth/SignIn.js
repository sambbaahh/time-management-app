import {signInWithEmailAndPassword} from "firebase/auth";
import {auth} from "../firebase";

const signInWithPassword = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password,
    );
    const user = userCredential.user;
    return user;
  } catch (error) {
    throw error;
  }
};

export default signInWithPassword;
