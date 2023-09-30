import {Button, Dialog, Portal, Text} from "react-native-paper";
import {useDispatch, useSelector} from "react-redux";

import {hideProfileRedux} from "../hooks/ProfileSlice";
import getCurrentUser from "../services/firestore/CurrentUser";
import signOut from "../services/auth/SignOut";
import {resetRedux} from "../hooks/EventsSlice";
import {formatLocalDate} from "../utils/DateFormat";

export default function ProfileDialog() {
  const isVisibleProfile = useSelector(
    (state) => state.profile.isVisibleProfile,
  );
  const reduxDispatch = useDispatch();

  const handleSignOut = async () => {
    try {
      reduxDispatch(hideProfileRedux());
      await signOut();
      reduxDispatch(resetRedux());
    } catch (e) {
      alert(e);
    }
  };

  return (
    <Portal>
      <Dialog
        visible={isVisibleProfile}
        onDismiss={() => reduxDispatch(hideProfileRedux())}
      >
        <Dialog.Title> My Account </Dialog.Title>
        <Dialog.Content>
          <Text style={{marginBottom: 15, fontSize: 15}}>
            {" "}
            Name: {getCurrentUser().displayName}{" "}
          </Text>
          <Text style={{marginBottom: 15, fontSize: 15}}>
            {" "}
            Email: {getCurrentUser().email}
          </Text>
          <Text style={{marginBottom: 15, fontSize: 15}}>
            {" "}
            User since:{" "}
            {formatLocalDate(getCurrentUser().metadata.creationTime)}
          </Text>
        </Dialog.Content>
        <Dialog.Actions>
          <Button
            onPress={() => reduxDispatch(hideProfileRedux())}
            mode="contained"
          >
            Back
          </Button>
          <Button
            onPress={() => handleSignOut()}
            buttonColor="pink"
            mode="contained"
          >
            Sign out
          </Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
}
