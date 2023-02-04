import classes from "./CalendarGrid.module.css";
import { getDaysInMonth, getDaysNames } from "../../utils/datesManager";
import Day from "../../Components/Day";

const CalendarGrid = ({ current, events, today }) => {
  const { firstDay, numDays, monthBeforeNumDays } = current;
  let days = getDaysInMonth(firstDay, numDays, monthBeforeNumDays);
  let daysNames = getDaysNames();
  // events && console.log("events", events);

  return (
    <div className={classes.grid}>
      {days.map((day, index) => {
        return (
          <Day
            key={index}
            day={day.number}
            index={index}
            current={day.currentMonth}
            dayName={(index < 7 && daysNames[index]) || null}
            events={events?.[day.number] || null}
            today={today === day.number && day.currentMonth ? true : false}
          />
        );
      })}
    </div>
  );
};

export default CalendarGrid;
