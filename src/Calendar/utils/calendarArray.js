// @flow
const calendarArray = (
  currentYear: number,
  currentMonth: number,
): Array<Array<
  | any
  | {|
    date: number,
    month: number,
    year: number,
  |}>
> => {
  const getTotalDays = (year, month) => new Date(year, month, 0).getDate();

  const getFirstDayIndexOfCurrentMonth = () => (
    new Date(currentYear, currentMonth - 1, 1).getDay()
  );

  const getDaysOfCurrentMonth = () => getTotalDays(currentYear, currentMonth);

  const getDaysOfLastMonth = () => {
    if (currentMonth === 1) {
      return getTotalDays(currentYear - 1, 12);
    }
    return getTotalDays(currentYear, currentMonth - 1);
  };

  const getFirstArrayCurrentDays = () => 7 - getFirstDayIndexOfCurrentMonth();

  // implement first row
  const firstArray = () => {
    const arr = [];

    for (
      let i = getDaysOfLastMonth() - getFirstDayIndexOfCurrentMonth(); i < getDaysOfLastMonth(); i++
    ) {
      // push last few days of previous month
      arr.push({
        year: currentMonth === 1 ? currentYear - 1 : currentYear,
        month: currentMonth === 1 ? 12 : currentMonth - 1,
        date: i + 1,
      });
    }
    for (let i = 0; i < getFirstArrayCurrentDays(); i++) {
      // push first few days of this month
      arr.push({
        year: currentYear,
        month: currentMonth,
        date: i + 1,
      });
    }

    return arr;
  };

  // implement middle rows
  const middleArrays = () => {
    const array = [];
    const getWeeks = () => (
      Math.floor((getDaysOfCurrentMonth() - getFirstArrayCurrentDays()) / 7)
    );
    for (let i = 0; i < getWeeks(); i++) {
      const arr = [];

      for (let j = 0; j < 7; j++) {
        arr.push({
          year: currentYear,
          month: currentMonth,
          date: (j + 1) + (i * 7) + (7 - getFirstDayIndexOfCurrentMonth()),
        });
      }
      array.push(arr);
    }
    return array;
  };

  // implement last rows
  const lastArray = () => {
    const arr = [];
    const getLastArrayNumber = () => (getDaysOfCurrentMonth() - getFirstArrayCurrentDays()) % 7;

    if (getLastArrayNumber() > 0) {
      // execute only has days left
      for (
        let i = getDaysOfCurrentMonth() - getLastArrayNumber(); i < getDaysOfCurrentMonth(); i++
      ) {
        // push last few days of this month
        arr.push({
          year: currentYear,
          month: currentMonth,
          date: i + 1,
        });
      }
      for (let i = 0; i < 7 - getLastArrayNumber(); i++) {
        // push fist few days of next month
        arr.push({
          year: currentMonth === 12 ? currentYear + 1 : currentYear,
          month: currentMonth === 12 ? 1 : currentMonth + 1,
          date: i + 1,
        });
      }
    }
    return arr;
  };

  if (lastArray().length) {
    return [firstArray(), ...middleArrays(), lastArray()];
  }

  return [firstArray(), ...middleArrays()];
};

export default calendarArray;
