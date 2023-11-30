export const dateToYMD = (timestamp) => {
  const strArray = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];
  const date = new Date(timestamp);
  const d = date.getDate();
  const m = strArray[date.getMonth()];
  const y = date.getFullYear();
  return `${m} ${d <= 9 ? '0' + d : d}, ${y}`;
};
