const eventStore = new Map();

export const getCalendarEvents = function (calendarDates) {
  return calendarDates.map((date) => ({
    dateObject: date,
    events: eventStore.get(date.toISOString().split("T")[0]) || [],
  }));
};

export const saveCalendarEvents = (dateObjects) => {
  dateObjects.forEach(({ dateObject, events }) => {
    eventStore.set(dateObject.toISOString().split("T")[0], events);
  });
};
