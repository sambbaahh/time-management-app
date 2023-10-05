import dayjs from "dayjs";
import localizedFormat from "dayjs/plugin/localizedFormat";
import isSameOrBefore from "dayjs/plugin/isSameOrBefore";
import { getLocales } from "expo-localization";
import locale_FI from "dayjs/locale/fi";
import locale_EN_GB from "dayjs/locale/en-gb";

dayjs.extend(localizedFormat);
dayjs.extend(isSameOrBefore);

const LOCALE = getLocales()[0].languageCode;

function locale() {
  if (LOCALE === "fi") {
    dayjs.locale(locale_FI);
  } else [dayjs.locale(locale_EN_GB)];
}

locale();

export const getStartOfThisDate = () => {
  return dayjs().startOf("day").toDate();
};

export const getStartOfDate = (date) => {
  return dayjs(date).startOf("day").toDate();
};

export const getEndOfDate = (date) => {
  return dayjs(date).endOf("day").toDate();
};

export const addHoursToDate = (date, hours) => {
  return dayjs(date).add(hours, "hours").toDate();
};

export const checkIfSameDay = (startDate, endDate) => {
  return dayjs(startDate).isSame(dayjs(endDate), "day");
};

export const getAllDatesBetweenStartAndEnd = (startDate, endDate) => {
  const dates = [];
  let current = dayjs(startDate).format("YYYY-MM-DD");
  while (dayjs(startDate).isSameOrBefore(dayjs(endDate), "day")) {
    dates.push(current);
    current = dayjs(current).add(1, "day").format("YYYY-MM-DD");
    startDate = dayjs(startDate).add(1, "day");
  }
  return dates;
};

export const formatLocalDate = (date) => {
  return dayjs(date).format("L LT");
};

export const formatToDate = (date) => {
  return dayjs(date).toDate();
};

export const formatDateForCalendar = (date) => {
  return dayjs(date).format("YYYY-MM-DD");
};

export const formatDateForEventList = (date) => {
  if (dayjs(date).isSame(dayjs(), "day")) {
    return "Today";
  } else if (dayjs(date).isSame(dayjs().add(1, "day"), "day")) {
    return "Tomorrow";
  } else {
    return dayjs(date).format("DD/MM/YYYY");
  }
};
