import classes from "./CalendarGrid.module.css";
import { getDaysInMonth, getNumberOfWeeksInMonth } from "../../utils/datesManager";
import HeaderDays from "../../Components/HeaderDay";
import BodyDays from "../../Components/BodyDay";

const CalendarGrid = ({ current }) => {
  const { firstDay, numberOfDays, monthBefore } = current;
  let days = getDaysInMonth(firstDay, numberOfDays, monthBefore);

  return (
    <div className={classes.grid}>
      {days.map((day, index) => {
        if (index < 7) {
          return <HeaderDays key={index} day={day.number} />;
        } else {
          return <BodyDays key={index} day={day.number} />;
        }
      })}
    </div>
  );
};

export default CalendarGrid;
