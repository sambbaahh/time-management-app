import { useSelector } from "react-redux";
import {
  CalendarProvider,
  ExpandableCalendar,
  TimelineList,
} from "react-native-calendars";
import { Text } from "react-native-paper";

import { screenRoutes } from "../constants/Routes";
import { formatDateForCalendar, formatLocalDate } from "../utils/DateFormat";
import ProfileDialog from "../components/ProfileDialog";

export default function Calendar({ navigation }) {
  const date = formatDateForCalendar(new Date());
  const markedDates = useSelector((state) => state.events.markedDates);
  const timelineValues = useSelector((state) => state.events.timelineValues);

  const isVisibleProfile = useSelector(
    (state) => state.profile.isVisibleProfile,
  );

  const handleEventClick = (data) => {
    navigation.navigate(screenRoutes.UPDATE_EVENT, data);
  };

  //Calendars performance is not the best:
  //https://github.com/wix/react-native-calendars/issues/1453
  return (
    <CalendarProvider date={date}>
      {isVisibleProfile && <ProfileDialog />}
      <ExpandableCalendar
        firstDay={1}
        markedDates={markedDates}
        theme={{
          arrowColor: "#0061A3",
          selectedDayBackgroundColor: "#0061A3",
          todayTextColor: "#00a390",
          dotColor: "#0061A3",
        }}
      />
      <TimelineList
        events={timelineValues}
        timelineProps={{
          onEventPress: (event) => {
            handleEventClick(event);
          },
          format24h: true,
          renderEvent: (event) => {
            return (
              <>
                <Text variant="titleMedium" style={{ marginBottom: 6 }}>
                  {" "}
                  {event.title}{" "}
                </Text>
                <Text variant="bodySmall">
                  {" "}
                  {"Ends: " + formatLocalDate(event.wholeEventEnd)}{" "}
                </Text>
              </>
            );
          },
        }}
      />
    </CalendarProvider>
  );
}
