import { eventCategories } from "../constants/EventCategories";
import { addHoursToDate, formatToDate } from "../utils/DateFormat";

export const eventValues = {
  id: "",
  title: "",
  description: "",
  startDate: null,
  endDate: null,
  category: eventCategories.MEETING,
};

export function eventReducer(state, action) {
  switch (action.type) {
    case "UPDATE_FIELD":
      return { ...state, [action.field]: action.payload };
    case "INITIAL_VALUES":
      return {
        id: "",
        title: "",
        description: "",
        startDate: formatToDate(new Date()),
        endDate: addHoursToDate(new Date(), 2),
        category: eventCategories.MEETING,
      };
    case "EVENT_VALUES":
      return {
        ...state,
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
