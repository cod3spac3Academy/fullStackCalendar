import classes from "./CalendarHeader.module.css";

const CalendarHeader = ({ current, onHandleMonth }) => {
  const handleClick = (e) => {
    const prev = e.target.dataset.direction === "prev";
    if (prev) {
      onHandleMonth(true);
    } else {
      onHandleMonth(false);
    }
  };

  return (
    <div className={classes.header}>
      <div className={classes["header-date"]}>
        <strong> {current.month} </strong> {current.year}
      </div>
      <div className={classes["header-nav"]}>
        <button className={classes["header-nav-prev"]}>
          <svg
            onClick={handleClick}
            className="arrow"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            data-direction="prev"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M15 19l-7-7 7-7"
            ></path>
          </svg>
        </button>
        <div className={classes["line-right"]}></div>
        <button className={classes["header-nav-next"]}>
          <svg
            className="h-6 w-6 text-gray-500 inline-flex leading-none"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            onClick={handleClick}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9 5l7 7-7 7"
            ></path>
          </svg>
        </button>
      </div>
    </div>
  );
};

export default CalendarHeader;
