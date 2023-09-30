import {getAuth} from "firebase/auth";

const getCurrentUser = () => {
  const auth = getAuth();
  return auth.currentUser;
};

export default getCurrentUser;
