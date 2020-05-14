export function toLocaleDateString(stringDate) {
  const date = new Date(stringDate);
  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric"
  };

  return date.toLocaleDateString("id", options);
}

export function toYearMonthDayString(stringDate) {
  const date = new Date(stringDate);
  const options = {
    year: "numeric",
    month: "numeric",
    day: "numeric"
  };

  return date.toLocaleDateString("id", options);
}
