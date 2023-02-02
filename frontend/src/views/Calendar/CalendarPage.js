// Crear un componente que contenga el codigo para generar un calendario con la misma estrutura
// html-css que el de el siguiente codepen: https://codepen.io/alvarotrigo/pen/gOvrRJR
// Mostrará el mes en curso y los eventos que se encuentren en el mes en curso

// Path: Calendar/frontend/src/views/Calendar/CalendarPage.js
import classes from "./CalendarPage.module.css";
import CalendarHeader from "./CalendarHeader";
import { useState, useEffect } from "react";
// import all the functions from the datesManager file
import * as datesManager from "../../utils/datesManager";
import CalendarGrid from "./CalendarGrid";
import Fetch from "../../utils/Fetch";
import { getEventsByMonth } from "../../utils/events.helper";

const CalendarPage = () => {
  const [firstLoad, setFirstLoad] = useState(true);
  const [events, setEvents] = useState([]);
  const [year, setYear] = useState(null);
  const [month, setMonth] = useState(null);
  const [today, setToday] = useState({});

  useEffect(() => {
    if (firstLoad) {
      const { year, month, day } = datesManager.getCurrentDate();
      setYear(year);
      setMonth(month);
      setToday({ year, month, day });
      setFirstLoad(false);
      // fetch all events
      Fetch.get().then((data) => {
        setEvents(getEventsByMonth(data.data));
      });
    }
  });

  const handleNextMonth = (prev) => {
    let result;
    if (prev) {
      result = datesManager.getPreviousDate(year, month);
    } else {
      result = datesManager.getNextDate(year, month);
    }
    setYear(result.year);
    setMonth(result.month);
  };

  const firstDay = datesManager.getFirstDayOfMonth(year, month);
  const numberOfDays = datesManager.getNumberOfDaysInMonth(year, month);
  const monthBefore = datesManager.getNumberOfDaysInPreviousMonth(year, month);
  const currentDate = {
    month: datesManager.getMonthName(month),
    year,
  };
  const daysToGrid = { today, firstDay, numberOfDays, monthBefore };

  return (
    <div className={classes.container}>
      <CalendarHeader current={currentDate} onHandleMonth={handleNextMonth} />
      <CalendarGrid current={daysToGrid} events={events?.[year]?.[month] || null} />
    </div>
  );
};

export default CalendarPage;
