// function that given an events array
// returns an object with the events grouped year,
// and then grouped by month
// ant then grouped by day
export const getEventsByMonth = (events) => {
  const eventsByMonth = {};
  events.forEach((event) => {
    //year to integer
    const year = parseInt(event.start.split("-")[0]);
    //month to integer
    const month = parseInt(event.start.split("-")[1]) - 1;
    //day to integer
    const day = parseInt(event.start.split("-")[2]);
    if (!eventsByMonth[year]) {
      eventsByMonth[year] = {};
    }
    if (!eventsByMonth[year][month]) {
      eventsByMonth[year][month] = [];
    }
    if (!eventsByMonth[year][month][day]) {
      eventsByMonth[year][month][day] = [];
    }
    eventsByMonth[year][month][day].push(event);
  });
  return eventsByMonth;
};
