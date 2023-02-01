// function to get the current date
export const getCurrentDate = () => {
  const date = new Date();
  const year = date.getFullYear();
  const month = date.getMonth();
  const day = date.getDate();
  return { year, month, day };
};

// function to get the first day of the month
export const getFirstDayOfMonth = (year, month) => {
  return new Date(year, month, 1).getDay();
};

// function to get the number of days in a month
export const getNumberOfDaysInMonth = (year, month) => {
  return new Date(year, month + 1, 0).getDate();
};

// function to get the number of days in the previous month
export const getNumberOfDaysInPreviousMonth = (year, month) => {
  return new Date(year, month, 0).getDate();
};

// function to get the number of days in the next month
export const getNumberOfDaysInNextMonth = (year, month) => {
  return new Date(year, month + 2, 0).getDate();
};

// function to get the number of weeks in a month
export const getNumberOfWeeksInMonth = (year, month) => {
  const firstDayOfMonth = getFirstDayOfMonth(year, month);
  const numberOfDaysInMonth = getNumberOfDaysInMonth(year, month);
  const numberOfDaysInPreviousMonth = getNumberOfDaysInPreviousMonth(
    year,
    month
  );
  const numberOfDaysInNextMonth = getNumberOfDaysInNextMonth(year, month);
  const numberOfDaysInFirstWeek = 7 - firstDayOfMonth;
  const numberOfDaysInLastWeek = (numberOfDaysInMonth + firstDayOfMonth) % 7;
  const numberOfWeeksInMonth =
    numberOfDaysInFirstWeek + numberOfDaysInMonth + numberOfDaysInLastWeek;
  return numberOfWeeksInMonth / 7;
};

// function to get the name of the month, given the month number, with the first letter capitalized
// using the Intl API
export const getMonthName = (month) => {
  return new Intl.DateTimeFormat("en-US", { month: "long" }).format(
    new Date(0, month)
  );
};
// function that generates an array of objects with the days of the month, 
// including the days of the previous and next month
export const getDaysInMonth = (firstDay, numberOfDays, monthBefore) => {
  const days = [];
  for (let i = 0; i < firstDay -1; i++) {
    days.unshift({ number: monthBefore - i, currentMonth: false });
  }
  for (let i = 1; i <= numberOfDays; i++) {
    days.push({ number: i, currentMonth: true });
  }
  return days;
}
