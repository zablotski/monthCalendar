export const getDates = (start, end) => {
  let result = [];

  for (
    let date = new Date(start);
    date <= new Date(end);
    date.setDate(date.getDate() + 1)
  ) {
    result.push(new Date(date));
  }
  return result;
};

const getFirstDayOfWeek = (date, firstDayOfWeek = 1) => {
  const day = date.getDay();
  const diff = (day < firstDayOfWeek ? 7 : 0) + day - firstDayOfWeek;

  date.setDate(date.getDate() - diff);
  date.setHours(0, 0, 0, 0);
  return date;
};

const getLastDayOfWeek = (date, firstDayOfWeek = 1) => {
  const day = date.getDay();
  const diff = (day < firstDayOfWeek ? -7 : 0) + 6 - (day - firstDayOfWeek);

  date.setDate(date.getDate() + diff);
  date.setHours(23, 59, 59, 999);

  return date;
};

export const getCalendarDates = (year, month) => {
  const firstDayOfMonth = new Date(year, month, 1);
  const lastDayOfMonth = new Date(
    firstDayOfMonth.getFullYear(),
    firstDayOfMonth.getMonth() + 1,
    0
  );

  return getDates(
    getFirstDayOfWeek(firstDayOfMonth),
    getLastDayOfWeek(lastDayOfMonth)
  );
};
