function isLeap(year) {

  /**************Don't change the code above****************/

  const isLeapYear = year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0);

  if (isLeapYear) {
      return 'Leap year.';
  } else {
      return 'Not leap year.';
  }

  /**************Don't change the code below****************/

}
