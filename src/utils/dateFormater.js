export const formatDate = dateSec => {
  const dateMilli = dateSec * 1000;
  const date = new Date(dateMilli);
  return date.toLocaleDateString() === "Invalid Date"
    ? "Date Not Set Yet"
    : date.toLocaleDateString();
};
