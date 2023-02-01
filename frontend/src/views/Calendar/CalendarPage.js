// Crear un componente que contenga el codigo para generar un calendario con la misma estrutura
// html-css que el de el siguiente codepen: https://codepen.io/alvarotrigo/pen/gOvrRJR
// Mostrará el mes en curso y los eventos que se encuentren en el mes en curso

// Path: Calendar/frontend/src/views/Calendar/CalendarPage.js
import classes from "./CalendarPage.module.css";
import CalendarHeader from "./CalendarHeader";
import { useState } from "react";
// import all the functions from the datesManager file
import * as datesManager from "../../utils/datesManager";
import CalendarGrid from "./CalendarGrid";

const CalendarPage = () => {
  const [month, setMonth] = useState(new Date().getMonth());
  const [year, setYear] = useState(new Date().getFullYear());
  const firstDay = datesManager.getFirstDayOfMonth(year, month);
  const numberOfDays = datesManager.getNumberOfDaysInMonth(year, month);
  const monthBefore = datesManager.getNumberOfDaysInPreviousMonth(year, month);
  const currentDate = {
    month: datesManager.getMonthName(month),
    year,
  };
  const daysToGrid = { firstDay, numberOfDays, monthBefore };
  let weeks = datesManager.getNumberOfWeeksInMonth(month, year);
  console.log('weeks: ', weeks);
  
  return (
    <div className={classes.container}>
      <CalendarHeader current={currentDate} />
      <CalendarGrid current={daysToGrid} />
    </div>
  );
};

export default CalendarPage;
