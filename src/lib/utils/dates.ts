import { format, parse, parseISO } from "date-fns";

// TODO: Consider timezones
export const stringifyDate = (date: Date, withTime: boolean = true): string => {
  try {
    if (withTime) {
      return format(date, "yyyy-MM-dd'T'HH:mm");
    }
    return format(date, "yyyy-MM-dd");
  } catch (e) {
    console.error(date, e);
    throw e;
  }
};

export const parseDateString = (dateString: string): Date => {
  console.log(dateString);
  try {
    return parseISO(dateString);
  } catch (e) {
    console.error(dateString, e);
    throw e;
  }
};
