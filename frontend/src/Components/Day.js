import classes from "./Day.module.css";

const Day = (props) => {
  console.log(props.styles);
  return (
    <div
      className={`${classes["day-box"]} ${
        props.styles.borderTop && classes["day-top"]
      } ${props.styles.borderLeft && classes["day-left"]}
       ${props.styles.borderRight && classes["day-right"]}
       ${props.styles.borderBottom && classes["day-bottom"]}
       ${props.styles.weekend && classes["weekend"]}
       ${props.styles.today && classes["today"]}     
       `}
    >
      {props.dayName && <span>{props.dayName}</span>}
      <span>{props.day}</span>
    </div>
  );
};

export default Day;
