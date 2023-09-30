import {useSelector} from "react-redux";
import {
  ExpandableCalendar,
  CalendarProvider,
  TimelineList,
} from "react-native-calendars";
import {Portal} from "react-native-paper";

import {screenRoutes} from "../constants/Routes";
import {formatDateForCalendar} from "../utils/DateFormat";
import ProfileDialog from "../components/ProfileDialog";
import {mainThemeColors} from "../components/Themes";

export default function Calendar({navigation}) {
  const date = formatDateForCalendar(new Date())
  const markedDates = useSelector((state) => state.events.markedDates);
  const timelineValues = useSelector((state) => state.events.timelineValues);

  const isVisibleProfile = useSelector((state) => state.profile.isVisibleProfile)

  const handleEventClick = (data) => {
    navigation.navigate(screenRoutes.UPDATE_EVENT, data);
  }

  return (
    <Portal.Host>
      <CalendarProvider date={date}>
        <ExpandableCalendar
          firstDay={1}
          markedDates={markedDates}
          theme={{
            arrowColor: "#0061A3",
            selectedDayBackgroundColor: "#0061A3",
            todayTextColor: "#0061A3",
            dotColor: "#0061A3"
          }}
        />
        <TimelineList
          events={timelineValues}
          timelineProps={{
            onEventPress: (event) => {
              handleEventClick(event)
            },
          }}
        />
      </CalendarProvider>

      {isVisibleProfile && <ProfileDialog/>}
    </Portal.Host>
  );
}