// noinspection DuplicatedCode

import {createSlice} from "@reduxjs/toolkit";
import {formatDateForCalendar} from "../utils/DateFormat"

const initialState = {
  listValues: [],
  markedDates: {},
  timelineValues: {},
  isInitialized: false,
};

export const eventsSlice = createSlice({
  name: "events",
  initialState: initialState,
  reducers: {
    initializeEventsRedux: (state, action) => {

      state.listValues = action.payload

      action.payload.forEach((event) => {
        const {id, title, description, startDate, endDate, category} = event;
        const newTimelineEvent = {id, title, description, category, start: startDate, end: endDate};

        const dateKey = formatDateForCalendar(startDate);
        if (!state.markedDates[dateKey]) {
          state.markedDates[dateKey] = {marked: true, counter: 1};
          state.timelineValues[dateKey] = [];
        } else {
          state.markedDates[dateKey] = {...state.markedDates[dateKey], counter: state.markedDates[dateKey].counter + 1}
        }
        state.timelineValues[dateKey].push(newTimelineEvent);
      });

      state.isInitialized = true;
    },

    addEventRedux: (state, action) => {
      const {id, title, description, category, startDate, endDate} = action.payload;
      const newListEvent = {id, title, description, category, startDate, endDate};
      const newTimelineEvent = {id, title, description, category, start: startDate, end: endDate};
      const dateKey = formatDateForCalendar(startDate);

      state.listValues.push(newListEvent);

      if (!state.markedDates[dateKey]) {
        state.markedDates[dateKey] = {marked: true, counter: 1};
        state.timelineValues[dateKey] = [];
      } else {
        state.markedDates[dateKey] = {...state.markedDates[dateKey], counter: state.markedDates[dateKey].counter + 1}
      }

      state.timelineValues[dateKey].push(newTimelineEvent);
    },

    updateEventRedux: (state, action) => {
      const {id, title, description, startDate, endDate, category} = action.payload;

      const newListEvent = {id, title, description, category, startDate, endDate};
      const newTimelineEvent = {id, title, description, category, start: startDate, end: endDate};
      const newDateKey = formatDateForCalendar(startDate);

      //update listValues (Events screen)
      state.listValues[state.listValues.findIndex(x => x.id === newListEvent.id)] = newListEvent;

      //update timelineValues
      const oldEvent = Object.values(state.timelineValues)
        .flat()
        .find(event => event.id === id)
      const oldDateKey = formatDateForCalendar(oldEvent.start);
      const oldEventIndex = state.timelineValues[oldDateKey].findIndex(event => event.id === id);

      if (oldDateKey === newDateKey) {
        state.timelineValues[newDateKey][oldEventIndex] = newTimelineEvent;
      }
      //startDate is modified (dataKey)
      //update markedDates and timelineValues (Calendar screen)
      else {
        state.timelineValues[oldDateKey].splice(oldEventIndex, 1);
        state.markedDates[oldDateKey] = {
          ...state.markedDates[oldDateKey],
          counter: state.markedDates[oldDateKey].counter - 1
        }
        if (state.markedDates[oldDateKey].counter === 0) {
          delete state.markedDates[oldDateKey];
        }

        if (!state.markedDates[newDateKey]) {
          state.markedDates[newDateKey] = {marked: true, counter: 1};
          state.timelineValues[newDateKey] = [];
        } else {
          state.markedDates[newDateKey] = {
            ...state.markedDates[newDateKey],
            counter: state.markedDates[newDateKey].counter + 1
          }

        }
        state.timelineValues[newDateKey].push(newTimelineEvent);
      }
        console.log(state.markedDates)
    },

    deleteEventRedux: (state, action) => {
      const {id, startDate} = action.payload;
      const dateKey = formatDateForCalendar(startDate);

      state.listValues = state.listValues.filter(event => event.id !== id);

      const eventIndex = state.timelineValues[dateKey].findIndex(event => event.id === id);
      state.timelineValues[dateKey].splice(eventIndex, 1);

      state.markedDates[dateKey] = {...state.markedDates[dateKey], counter: state.markedDates[dateKey].counter - 1}
      if (state.markedDates[dateKey].counter === 0) {
        delete state.markedDates[dateKey];
      }
    },
    resetRedux: (state) => {
      return initialState;
    },
  },
});

export const {initializeEventsRedux, addEventRedux, updateEventRedux, deleteEventRedux, resetRedux} = eventsSlice.actions;

export default eventsSlice.reducer;