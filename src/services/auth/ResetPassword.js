import { getAuth, sendPasswordResetEmail } from "firebase/auth";

const resetPassword = async (email) => {
  try {
    const auth = getAuth();
    await sendPasswordResetEmail(auth, email);
    return "Password reset information have been sent successfully!";
  } catch (error) {
    throw error;
  }
};

export default resetPassword;
