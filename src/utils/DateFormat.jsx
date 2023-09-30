import dayjs from "dayjs";
import {getLocales} from "expo-localization";
import localizedFormat from "dayjs/plugin/localizedFormat";
import locale_FI from "dayjs/locale/fi";
import locale_EN from "dayjs/locale/en";

dayjs.extend(localizedFormat);

const LOCALE = getLocales()[0].languageCode;

function locale() {
  if (LOCALE === "fi") {
    dayjs.locale(locale_FI);
  } else [dayjs.locale(locale_EN)];
}

locale();

export const getStartOfTheDay = () => {
  return dayjs().startOf("day");
};

export const addHoursToDate = (date, hours) => {
  return dayjs(date).add(hours, "hours").toDate();
};

export const formatLocalDate = (date) => {
  return dayjs(date).format("L LT");
};

export const formatDayjsDate = (date) => {
  return dayjs(date).toDate();
};

export const formatDateForCalendar = (date) => {
  return dayjs(date).format("YYYY-MM-DD");
};

export const formatToDate = (date) => {
  if (dayjs(date).isSame(dayjs(), "day")) {
    return "Today";
  } else if (dayjs(date).isSame(dayjs().add(1, "day"), "day")) {
    return "Tomorrow";
  } else {
    return dayjs(date).format("DD/MM/YYYY");
  }
};
