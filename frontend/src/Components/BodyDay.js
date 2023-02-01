import classes from "./AllDays.module.css";

const BodyDay = (props) => {
  return (
    <div className="header-day">
      <span className={props.today && classes.today}>{props.day}</span>
    </div>
  );
};

export default BodyDay;
