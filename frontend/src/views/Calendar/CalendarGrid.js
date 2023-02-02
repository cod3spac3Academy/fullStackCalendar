import classes from "./CalendarGrid.module.css";
import {
  getDaysInMonth,
  getNumberOfWeeksInMonth,
} from "../../utils/datesManager";
import Day from "../../Components/Day";

const CalendarGrid = ({ current }) => {
  const { firstDay, numberOfDays, monthBefore } = current;
  let days = getDaysInMonth(firstDay, numberOfDays, monthBefore);
  let styles = {
    borderLeft: false,
    borderTop: false,
    borderBottom: true,
    borderRight: true,
    weekend: false,
    today: false,
  };

  return (
    <div className={classes.grid}>
      {days.map((day, index) => {
        // reset styles for next day
        Object.keys(styles).forEach((key) => {
          styles[key] = false;
        });
        if (index < 7) {
          styles.borderTop = true;
        }
        if (index == 0 || index % 7 === 0) {
          styles.borderLeft = true;
        }
        if (index % 5 === 0 || index % 6 === 0) {
          styles.weekend = true;
        }
        if (day.number === current.today) {
          styles.today = true;
        }
        return <Day key={index} day={day.number} styles={styles} />;
      })}
    </div>
  );
};

export default CalendarGrid;
