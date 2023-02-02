import classes from "./Day.module.css";
import { getAbbString } from "../utils/stringsManager";

const Day = (props) => {
  // initial styles
  props.events && console.log("events", props.events);
  let styles = {
    borderLeft: false,
    borderTop: false,
    borderBottom: true,
    borderRight: true,
    weekend: false,
    today: false,
  };
  if (props.index < 7) {
    styles.borderTop = true;
  }
  if (props.index == 0 || props.index % 7 === 0) {
    styles.borderLeft = true;
  }
  if (
    props.index > 0 &&
    ((props.index + 2) % 7 === 0 || (props.index + 1) % 7 === 0)
  ) {
    styles.weekend = true;
  }
  // if (props.day.number === current.today) {
  //   styles.today = true;
  // }
  return (
    <div
      className={`${classes["day-box"]} 
        ${classes["day-right"]}
        ${classes["day-bottom"]}
        ${styles.borderTop && classes["day-top"]} 
        ${styles.borderLeft && classes["day-left"]}
       ${styles.weekend && classes["weekend"]}
       ${styles.today && classes["today"]}     
       ${props.current && classes["current-month"]}     
       `}
    >
      {props.dayName && <span>{props.dayName}</span>}
      <span>{props.day}</span>
      {props.events &&
        props.events.map((event, index) => {
          return (
            <span key={index} className={classes["event"]}>
              {getAbbString(event.title)}
            </span>
          );
        })}
    </div>
  );
};

export default Day;
