import dayjs from "dayjs";

export const convertDate = (date: string) => {
  return dayjs(date).format("MMM D, YYYY");
};
