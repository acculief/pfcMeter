export const datesAreOnSameDay = (first, second) => {
  if (
    first.year() === second.year() &&
    first.month() === second.month() &&
    first.date() === second.date()
  ) {
    return true;
  } else {
    return false;
  }
};
