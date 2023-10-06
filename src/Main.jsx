import { Provider, useDispatch } from "react-redux";
import store from "./hooks/ReduxStore";
import { screenRoutes } from "./constants/Routes";
import { BottomTabs } from "./components/BottomTabs";
import Event from "./screens/Event";
import ProfileDialog from "./components/ProfileDialog";
import SignIn from "./screens/SignIn";
import SignUp from "./screens/SignUp";
import { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { getFocusedRouteNameFromRoute } from "@react-navigation/native";
import { IconButton } from "react-native-paper";
import { showProfileRedux } from "./hooks/ProfileSlice";
import ForgotPassword from "./screens/ForgotPassword";

function MainScreens() {
  const dispatch = useDispatch();
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen
        name={screenRoutes.MAIN_TABS}
        component={BottomTabs}
        options={({ route }) => ({
          headerTitle: getHeaderTitle(route),
          headerRight: () => (
            <IconButton
              icon="account-circle"
              onPress={() => dispatch(showProfileRedux())}
            />
          ),
          headerStyle: {
            backgroundColor: "white",
          },
        })}
      ></HomeStack.Screen>
      <HomeStack.Screen
        name={screenRoutes.ADD_EVENT}
        component={Event}
        options={{
          headerTitle: "Add event",
          headerStyle: {
            backgroundColor: "white",
          },
        }}
      ></HomeStack.Screen>
      <HomeStack.Screen
        name={screenRoutes.UPDATE_EVENT}
        component={Event}
        options={{
          headerTitle: "Update event",
          headerStyle: {
            backgroundColor: "white",
          },
        }}
      ></HomeStack.Screen>
      <HomeStack.Screen name="MyModal" component={ProfileDialog} />
    </HomeStack.Navigator>
  );
}

const HomeStack = createNativeStackNavigator();
const AuthStack = createNativeStackNavigator();

export function Main() {
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      setTimeout(() => {
        if (user) {
          setIsSignedIn(true);
        } else {
          setIsSignedIn(false);
        }
        setLoading(false);
      }, 1000);
    });
  }, []);

  if (!loading) {
    return (
      <>
        {isSignedIn ? (
          <Provider store={store}>
            <MainScreens />
          </Provider>
        ) : (
          <AuthStack.Navigator
            screenOptions={{
              headerStyle: {
                backgroundColor: "white",
              },
            }}
          >
            <AuthStack.Screen name={screenRoutes.SIGN_IN} component={SignIn} />
            <AuthStack.Screen name={screenRoutes.SIGN_UP} component={SignUp} />
            <AuthStack.Screen
              name={screenRoutes.FORGOT_PASSWORD}
              component={ForgotPassword}
            />
          </AuthStack.Navigator>
        )}
      </>
    );
  }
}

const getHeaderTitle = (route) => {
  const routeName =
    getFocusedRouteNameFromRoute(route) ?? screenRoutes.EVENT_LIST;
  switch (routeName) {
    case screenRoutes.EVENT_LIST:
      return screenRoutes.EVENT_LIST;
    case screenRoutes.CALENDAR:
      return screenRoutes.CALENDAR;
  }
};
