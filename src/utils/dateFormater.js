export const formatDate = dateSec => {
  const dateMilli = dateSec * 1000;
  const date = new Date(dateMilli).toLocaleString();
  return date === "Invalid Date" ? "Loading ..." : date;
};
