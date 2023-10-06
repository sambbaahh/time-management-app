// noinspection DuplicatedCode

import { createSlice } from "@reduxjs/toolkit";
import {
  checkIfSameDay,
  formatDateForCalendar,
  getAllDatesBetweenStartAndEnd,
  getEndOfDate,
  getStartOfDate,
} from "../utils/DateFormat";

const initialState = {
  listValues: [],
  markedDates: {},
  timelineValues: {},
  isInitialized: false,
};

//https://redux-toolkit.js.org/api/createSlice
//Mutation is allowed inside the createSlice function
export const eventsSlice = createSlice({
  name: "events",
  initialState: initialState,
  reducers: {
    setEventsRedux: (state, action) => {
      //This reducer could be improved in the future
      //There is no need to reset all states each time the firestore data is updated
      state.listValues = action.payload;
      state.markedDates = {};
      state.timelineValues = {};

      action.payload.forEach((event) => {
        const { id, title, description, startDate, endDate, category } = event;
        const newTimelineEvent = {
          id,
          title,
          description,
          category,
          start: startDate,
          end: endDate,
          wholeEventEnd: endDate, //If the event is longer one day, we need to store the real end date
        };

        if (!checkIfSameDay(startDate, endDate)) {
          const allDates = getAllDatesBetweenStartAndEnd(startDate, endDate);
          for (const [i, date] of allDates.entries()) {
            let start = null;
            let end = null;
            if (i === 0) {
              start = startDate;
              end = getEndOfDate(date).toISOString();
            } else if (i === allDates.length - 1) {
              start = getStartOfDate(date).toISOString();
              end = endDate;
            } else {
              start = getStartOfDate(date).toISOString();
              end = getEndOfDate(date).toISOString();
            }
            const dateKey = formatDateForCalendar(date);
            if (!state.markedDates[dateKey]) {
              state.markedDates[dateKey] = { marked: true, counter: 1 };
              state.timelineValues[dateKey] = [];
            } else {
              state.markedDates[dateKey] = {
                ...state.markedDates[dateKey],
                counter: state.markedDates[dateKey].counter + 1,
              };
            }
            state.timelineValues[dateKey].push({
              ...newTimelineEvent,
              start: start,
              end: end,
            });
          }
        } else {
          const dateKey = formatDateForCalendar(startDate);
          if (!state.markedDates[dateKey]) {
            state.markedDates[dateKey] = { marked: true, counter: 1 };
            state.timelineValues[dateKey] = [];
          } else {
            state.markedDates[dateKey] = {
              ...state.markedDates[dateKey],
              counter: state.markedDates[dateKey].counter + 1,
            };
          }
          state.timelineValues[dateKey].push(newTimelineEvent);
        }
      });

      state.isInitialized = true;
    },
    resetRedux: () => {
      return initialState;
    },
  },
});

export const { setEventsRedux, resetRedux } = eventsSlice.actions;

export default eventsSlice.reducer;
