export const formatDateWithMonthName = (dateString) => {
  const date = new Date(dateString);
  const options = { year: "numeric", month: "long", day: "numeric" };
  return date.toLocaleDateString("en-US", options);
};

export const formatDateTime = (dateTimeString) => {
  if (!dateTimeString) return "Unknown date and time";
  const date = new Date(dateTimeString);
  if (isNaN(date)) return "Invalid date and time";

  return new Intl.DateTimeFormat("en", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  }).format(date);
};
