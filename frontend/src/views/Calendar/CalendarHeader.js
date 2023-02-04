import classes from "./CalendarHeader.module.css";

const CalendarHeader = ({ current, onHandleMonth,today }) => {
  const handleClick = (e) => {
    console.log(e.target.closest("button").classList);
    const today = e.target
      .closest("button")
      .classList.contains(classes["header-nav-today"]);
    if (today) {
      onHandleMonth("today");
    } else {
      const prev = e.target.dataset.direction === "prev";
      if (prev) {
        onHandleMonth(true);
      } else {
        onHandleMonth(false);
      }
    }
  };

  return (
    <div className={classes.header}>
      <div className={classes["header-date"]}>
        <strong> {current.month} </strong> {current.year}
      </div>
      <div className={classes["header-nav"]}>
        <button className={classes["header-nav-today"]} onClick={handleClick} disabled={today}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
            {/* Font Awesome Pro 6.2.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. */}
            <path d="M128 0c17.7 0 32 14.3 32 32V64H288V32c0-17.7 14.3-32 32-32s32 14.3 32 32V64h48c26.5 0 48 21.5 48 48v48H0V112C0 85.5 21.5 64 48 64H96V32c0-17.7 14.3-32 32-32zM0 192H448V464c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V192zm80 64c-8.8 0-16 7.2-16 16v96c0 8.8 7.2 16 16 16h96c8.8 0 16-7.2 16-16V272c0-8.8-7.2-16-16-16H80z" />
          </svg>
        </button>

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
