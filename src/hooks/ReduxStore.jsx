import { configureStore } from "@reduxjs/toolkit"
import eventsReducer from "./EventsSlice"
import profileReducer from "./ProfileSlice"

export default configureStore({
  reducer: {
    events: eventsReducer,
    profile: profileReducer
  },
});