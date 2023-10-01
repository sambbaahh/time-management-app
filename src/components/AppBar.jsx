import { Appbar, Divider } from "react-native-paper";
import { getHeaderTitle } from "@react-navigation/elements";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { showProfileRedux } from "../hooks/ProfileSlice";
import { screenRoutes } from "../constants/Routes";

export default function CustomNavigationBar({
  navigation,
  route,
  options,
  back,
}) {
  const [openProfile, setOpenProfile] = useState(false);
  const title = getHeaderTitle(options, route.name);

  const dispatch = useDispatch();

  return (
    <>
      <Appbar.Header mode="center-aligned">
        {back ? <Appbar.BackAction onPress={navigation.goBack} /> : null}
        <Appbar.Content title={title} />
        {route.name === screenRoutes.MAIN_TABS && (
          <Appbar.Action
            icon="account-circle"
            onPress={() => dispatch(showProfileRedux())}
          />
        )}
      </Appbar.Header>
      <Divider />
    </>
  );
}
