import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ScrollView, Text, View } from "react-native";
import { AnimatedFAB, Portal } from "react-native-paper";

import getEvents from "../services/firestore/GetEvents";

import eventListStyles from "../styles/EventList";
import EventCard from "../components/EventCard";
import { screenRoutes } from "../constants/Routes";
import {
  formatDayjsDate,
  formatToDate,
  getStartOfTheDay,
} from "../utils/DateFormat";
import ProfileDialog from "../components/ProfileDialog";
import { LoadingEffect } from "../components/LoadingEffect";

export default function EventList({ navigation }) {
  const [isLoading, setIsLoading] = useState(false);
  const events = useSelector((state) => state.events.listValues);
  const isInitialized = useSelector((state) => state.events.isInitialized);
  const isVisibleProfile = useSelector(
    (state) => state.profile.isVisibleProfile,
  );

  const reduxDispatch = useDispatch();

  const handleCardClick = (data) => {
    navigation.navigate(screenRoutes.UPDATE_EVENT, data);
  };

  useEffect(() => {
    const handleGetEvents = async () => {
      try {
        await getEvents(reduxDispatch);
      } catch (e) {
        alert(e);
      } finally {
        setTimeout(() => {
          setIsLoading(false);
        }, 750);
      }
    };
    if (!isInitialized) {
      setIsLoading(true);
      handleGetEvents();
    }
  }, []);

  if (isLoading) {
    return <LoadingEffect />;
  } else {
    return (
      <Portal.Host>
        <View style={{ height: "100%" }}>
          {isVisibleProfile && <ProfileDialog />}
          <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
            <View style={eventListStyles.container}>
              {events
                .filter(
                  (event) =>
                    formatDayjsDate(event.startDate) >= getStartOfTheDay(),
                )
                .sort(
                  (a, b) =>
                    formatDayjsDate(a.startDate) - formatDayjsDate(b.startDate),
                )
                .map((event, index, array) => (
                  <View key={`view-${index}`}>
                    {(index === 0 ||
                      formatToDate(event.startDate) !==
                        formatToDate(array[index - 1].startDate)) && (
                      <Text
                        key={`date-${event.startDate.toString()}`}
                        style={
                          index !== 0
                            ? eventListStyles.textField
                            : eventListStyles.firstTextField
                        }
                      >
                        {formatToDate(event.startDate)}
                      </Text>
                    )}
                    <EventCard
                      key={`event-${event.id}`}
                      data={event}
                      onCardClick={handleCardClick}
                    ></EventCard>
                  </View>
                ))}
            </View>
          </ScrollView>
          <AnimatedFAB
            icon={"plus"}
            style={eventListStyles.fabStyle}
            onPress={() => navigation.navigate(screenRoutes.ADD_EVENT)}
            label="New event"
            extended={false}
          ></AnimatedFAB>
        </View>
      </Portal.Host>
    );
  }
}
