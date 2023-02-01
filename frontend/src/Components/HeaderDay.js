import classes from "./AllDays.module.css";

const HeaderDay = (props) => {
  return (
    <div className="header-day">
      <span>{props.dayName}</span>
      <span>{props.day}</span>
    </div>
  );
};

export default HeaderDay;
