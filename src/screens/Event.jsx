import { useEffect, useReducer, useState } from "react";
import { Alert, Keyboard, TouchableWithoutFeedback, View } from "react-native";
import {
  Avatar,
  Button,
  Card,
  Chip,
  Divider,
  Text,
  TextInput,
} from "react-native-paper";
import eventStyles from "../styles/Event";
import DateTimePickerModal from "react-native-modal-datetime-picker";

import addEvent from "../services/firestore/AddEvent";
import updateEvent from "../services/firestore/UpdateEvent";
import {
  addHoursToDate,
  formatLocalDate,
  formatToDate,
} from "../utils/DateFormat";
import { eventCategories } from "../constants/EventCategories";
import { screenRoutes } from "../constants/Routes";
import { eventReducer, eventValues } from "../hooks/EventReducer";
import deleteEvent from "../services/firestore/DeleteEvent";
import { mainThemeColors } from "../components/Themes";

export default function Event({ navigation, route }) {
  const colors = mainThemeColors;
  const [isLoaded, setIsLoaded] = useState(false);
  const [startDateVisibility, setStartDateVisibility] = useState(false);
  const [endDateVisibility, setEndDateVisibility] = useState(false);

  const [state, dispatch] = useReducer(eventReducer, eventValues);

  const showDatePicker = (isStartDate) => {
    if (Keyboard.isVisible) Keyboard.dismiss();
    if (isStartDate) {
      setStartDateVisibility(true);
    } else {
      setEndDateVisibility(true);
    }
  };

  const hideDatePicker = (isStartDate) => {
    if (isStartDate) setStartDateVisibility(false);
    else setEndDateVisibility(false);
  };

  const handleConfirm = (isStartDate, date) => {
    if (isStartDate) {
      dispatch({ type: "UPDATE_FIELD", field: "startDate", payload: date });
      hideDatePicker(isStartDate);
    } else {
      dispatch({ type: "UPDATE_FIELD", field: "endDate", payload: date });
      hideDatePicker(isStartDate);
    }
  };

  const handleAddEvent = async () => {
    try {
      await addEvent(state);
      navigation.goBack();
    } catch (e) {
      alert(e);
    }
  };

  const handleUpdateEvent = async () => {
    try {
      await updateEvent(state);
      navigation.goBack();
    } catch (e) {
      alert(e);
    }
  };

  const showAlert = () =>
    Alert.alert(
      "Delete event",
      "Are you sure you want to delete this event?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Confirm",
          onPress: () => handleDeleteEvent(),
          style: "default",
        },
      ],
      {
        cancelable: true,
      },
    );

  const handleDeleteEvent = async () => {
    try {
      await deleteEvent(state.id);
      navigation.goBack();
    } catch (e) {
      alert(e);
    }
  };

  useEffect(() => {
    try {
      //Update default values (start and endDates)
      dispatch({ type: "INITIAL_VALUES" });

      //If user is in the update event view
      if (route.params) {
        const startDate = formatToDate(
          route.params.startDate ? route.params.startDate : route.params.start,
        );
        const endDate = formatToDate(
          route.params.endDate ? route.params.endDate : route.params.end,
        );

        const event = {
          ...route.params,
          startDate: startDate,
          endDate: endDate,
        };

        dispatch({ type: "EVENT_VALUES", payload: event });
      }
    } catch (e) {
      alert(e);
    } finally {
      setIsLoaded(true);
    }
  }, []);

  useEffect(() => {
    if (!route.params) {
      dispatch({
        type: "UPDATE_FIELD",
        field: "endDate",
        payload: addHoursToDate(state.startDate, 2),
      });
    }
  }, [state.startDate]);

  if (isLoaded) {
    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <View style={eventStyles.container}>
          <Card style={eventStyles.card}>
            <Card.Title
              title="Event Details"
              left={(props) => <Avatar.Icon {...props} icon="form-select" />}
            />
            <TextInput
              label="Title"
              style={eventStyles.textInput}
              mode="outlined"
              value={state.title}
              onChangeText={(text) =>
                dispatch({
                  type: "UPDATE_FIELD",
                  field: "title",
                  payload: text,
                })
              }
            />
            <TextInput
              label="Description"
              style={eventStyles.textInput}
              mode="outlined"
              multiline
              line
              value={state.description}
              onChangeText={(text) =>
                dispatch({
                  type: "UPDATE_FIELD",
                  field: "description",
                  payload: text,
                })
              }
            />
            <TextInput
              value={formatLocalDate(state.startDate)}
              showSoftInputOnFocus={false}
              style={eventStyles.textInput}
              label="Start Time"
              onFocus={() => showDatePicker(true)}
              mode="outlined"
              right={
                <TextInput.Icon
                  icon="calendar"
                  onPress={() => showDatePicker(true)}
                />
              }
            />
            <DateTimePickerModal
              date={state.startDate}
              isVisible={startDateVisibility}
              mode="datetime"
              onConfirm={(date) => handleConfirm(true, date)}
              onCancel={() => hideDatePicker(true)}
            />
            <TextInput
              showSoftInputOnFocus={false}
              style={eventStyles.textInput}
              label="End Time"
              value={formatLocalDate(state.endDate)}
              onFocus={() => showDatePicker(false)}
              mode="outlined"
              right={
                <TextInput.Icon
                  icon="calendar"
                  onPress={() => showDatePicker(false)}
                />
              }
            />
            <DateTimePickerModal
              date={state.endDate}
              isVisible={endDateVisibility}
              mode="datetime"
              onConfirm={(date) => handleConfirm(false, date)}
              onCancel={() => hideDatePicker(false)}
              minimumDate={state.startDate}
            />
            <Divider style={eventStyles.divider}></Divider>
            <Text style={eventStyles.textField}> Category </Text>
            <View style={eventStyles.categoryBox}>
              {Object.keys(eventCategories).map((key) => (
                <Chip
                  key={eventCategories[key]}
                  selected={state.category === eventCategories[key]}
                  showSelectedOverlay={true}
                  style={eventStyles.chip}
                  onPress={() =>
                    dispatch({
                      type: "UPDATE_FIELD",
                      field: "category",
                      payload: eventCategories[key],
                    })
                  }
                >
                  {eventCategories[key]}
                </Chip>
              ))}
            </View>
          </Card>
          {route.name === screenRoutes.ADD_EVENT ? (
            <Button
              mode="contained"
              style={eventStyles.primaryButton}
              onPress={() => handleAddEvent()}
            >
              {" "}
              Add a new event{" "}
            </Button>
          ) : (
            <>
              <Button
                mode="contained"
                buttonColor={colors.error}
                style={eventStyles.primaryButton}
                onPress={() => showAlert()}
              >
                Delete event
              </Button>
              <Button
                mode="contained"
                style={eventStyles.primaryButton}
                onPress={() => handleUpdateEvent()}
              >
                {" "}
                Update event{" "}
              </Button>
            </>
          )}
        </View>
      </TouchableWithoutFeedback>
    );
  }
}
