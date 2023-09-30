import dayjs from "dayjs";
import {eventCategories} from "../constants/EventCategories";

export const eventValues = () => {
  return (
    {
      id: "",
      title: "",
      description: "",
      startDate: dayjs().toDate(),
      endDate: dayjs().add(2, "hour").toDate(),
      category: eventCategories.MEETING,
    }
  )
};

export function eventReducer(state, action) {
  switch (action.type) {
    case "UPDATE_FIELD":
      return {...state, [action.field]: action.payload};
    case "INITIAL_VALUES":
      return {
        id: action.payload.id,
        title: action.payload.title,
        description: action.payload.description,
        startDate: action.payload.startDate,
        endDate: action.payload.endDate,
        category: action.payload.category,
      };
    default:
      return state;
  }
}