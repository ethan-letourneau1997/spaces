export function formatLongDate(inputDate: string) {
  const months = [
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

  const date = new Date(inputDate);
  const today = new Date();
  const month = months[date.getMonth()];
  const day = date.getDate();
  const year = date.getFullYear();
  let formattedDate = `${month} ${day}, ${year}`;

  // Check if the date is today's date
  if (
    date.getDate() === today.getDate() &&
    date.getMonth() === today.getMonth() &&
    date.getFullYear() === today.getFullYear()
  ) {
    let hour = date.getHours();
    const minute = date.getMinutes();
    const period = hour >= 12 ? 'pm' : 'am';

    if (hour > 12) {
      hour -= 12;
    } else if (hour === 0) {
      hour = 12;
    }

    formattedDate += ` at ${hour}:${minute.toString().padStart(2, '0')}${period}`;
  }

  return formattedDate;
}
