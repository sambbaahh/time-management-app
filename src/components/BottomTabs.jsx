import {screenRoutes} from "../constants/Routes";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import EventList from "../screens/EventList";
import Calendar from "../screens/Calendar";
import {createMaterialBottomTabNavigator} from "@react-navigation/material-bottom-tabs";

const Tab = createMaterialBottomTabNavigator();

export function BottomTabs() {
  return (
    <Tab.Navigator barStyle={{height: 85}}>
      <Tab.Screen
        name={screenRoutes.EVENT_LIST}
        component={EventList}
        options={{
          tabBarLabel: "Events",
          title: "Events",
          tabBarIcon: ({color}) => (
            <MaterialCommunityIcons name="view-list" color={color} size={25}/>
          ),
        }}
      />
      <Tab.Screen
        name={screenRoutes.CALENDAR}
        component={Calendar}
        options={{
          tabBarLabel: "Calendar",
          title: "Calendar",
          tabBarIcon: ({color}) => (
            <MaterialCommunityIcons name="calendar" color={color} size={25}/>
          ),
        }}
      />
    </Tab.Navigator>
  );
}
