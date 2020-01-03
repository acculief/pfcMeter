export const datesAreOnSameDay = (first, second) => {
  if (
    Number.parseInt(first.format("Y")) ===
      Number.parseInt(second.format("Y")) &&
    Number.parseInt(first.format("M")) ===
      Number.parseInt(second.format("M")) &&
    Number.parseInt(first.format("D")) === Number.parseInt(second.format("D"))
  ) {
    return true;
  } else {
    return false;
  }
};

export const datesAreOnSameMonth = (first, second) => {
  if (
    Number.parseInt(first.format("Y")) ===
      Number.parseInt(second.format("Y")) &&
    Number.parseInt(first.format("M")) === Number.parseInt(second.format("M"))
  ) {
    return true;
  } else {
    return false;
  }
};

export const datesAreOnDiffrentDay = (first, second) => {
  if (
    Number.parseInt(first.format("Y")) !==
      Number.parseInt(second.format("Y")) ||
    Number.parseInt(first.format("M")) !==
      Number.parseInt(second.format("M")) ||
    Number.parseInt(first.format("D")) !== Number.parseInt(second.format("D"))
  ) {
    return true;
  } else {
    return false;
  }
};
