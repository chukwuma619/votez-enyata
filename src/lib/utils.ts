
export const formatCurrency = (amount: number) => {
  return amount.toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });
};

export const formatDateToLocal = (
  dateStr: string,
  locale: string = 'en-US',
) => {
  const date = new Date(dateStr);
  const options: Intl.DateTimeFormatOptions = {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  };
  const formatter = new Intl.DateTimeFormat(locale, options);
  return formatter.format(date);
};

export const generatePagination = (currentPage: number, totalPages: number) => {
  // If the total number of pages is 7 or less,
  // display all pages without any ellipsis.
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  // If the current page is among the first 3 pages,
  // show the first 3, an ellipsis, and the last 2 pages.
  if (currentPage <= 3) {
    return [1, 2, 3, '...', totalPages - 1, totalPages];
  }

  // If the current page is among the last 3 pages,
  // show the first 2, an ellipsis, and the last 3 pages.
  if (currentPage >= totalPages - 2) {
    return [1, 2, '...', totalPages - 2, totalPages - 1, totalPages];
  }

  // If the current page is somewhere in the middle,
  // show the first page, an ellipsis, the current page and its neighbors,
  // another ellipsis, and the last page.
  return [
    1,
    '...',
    currentPage - 1,
    currentPage,
    currentPage + 1,
    '...',
    totalPages,
  ];
};

export function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

export function generateRandomString(length: number): string {
  const characters = 'abcdefghijklmnopqrstuvwxyz';
  let result = '';
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    result += characters.charAt(randomIndex);
  }
  return result;
}


export function getCurrentDateTime() {
  const now = new Date();
  const year = now.getUTCFullYear();
  const month = String(now.getUTCMonth() + 1).padStart(2, '0'); // Months are zero-based
  const day = String(now.getUTCDate()).padStart(2, '0');
  const hours = String(now.getUTCHours()).padStart(2, '0');
  const minutes = String(now.getUTCMinutes()).padStart(2, '0');

  return `${year}-${month}-${day}T${hours}:${minutes}`;
}

export function convertTimestampFmtToInputFmt(datetime: string): string {
  const fmtdatetime = new Date(datetime);
  const year = fmtdatetime.getUTCFullYear();
  const month = String(fmtdatetime.getUTCMonth() + 1).padStart(2, '0'); // Months are zero-based
  const day = String(fmtdatetime.getUTCDate()).padStart(2, '0');
  const hours = String(fmtdatetime.getUTCHours()).padStart(2, '0');
  const minutes = String(fmtdatetime.getUTCMinutes()).padStart(2, '0');

  return `${year}-${month}-${day}T${hours}:${minutes}`;
}

export function convertDateTime(datetime: string): string {
  const months = [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
  ];

  // Replace space with 'T' to ensure ISO format, then parse the datetime as UTC
  const correctedDatetime = datetime.replace(' ', 'T');
  const date = new Date(correctedDatetime); // Parsing in UTC

  const month = months[date.getUTCMonth()]; // Get month in UTC
  const day = date.getUTCDate(); // Get day in UTC
  const year = date.getUTCFullYear(); // Get year in UTC
  let hour = date.getUTCHours(); // Get hour in UTC
  const minute = date.getUTCMinutes(); // Get minutes in UTC
  const meridiem = hour >= 12 ? 'PM' : 'AM';

  // Convert hour to 12-hour format
  if (hour === 0) {
    hour = 12;
  } else if (hour > 12) {
    hour -= 12;
  }

  // Add leading zero if minute is less than 10
  const minuteString = minute < 10 ? '0' + minute : minute.toString();

  return `${months[date.getUTCMonth()]} ${day.toString().padStart(2, '0')}, ${year} ${hour}:${minuteString}${meridiem}`;
}




export function getDate(datetime: string): string {
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
  const date = new Date(datetime);
  const month = months[date.getUTCMonth()];
  const day = date.getUTCDate();
  const year = date.getUTCFullYear();

  return `${month} ${day.toString().padStart(2, '0')}, ${year}`;
}

export function getTime(datetime: string): string {
  const date = new Date(datetime);
  let hour = date.getUTCHours();
  const minute = date.getUTCMinutes();
  const meridiem = hour >= 12 ? 'PM' : 'AM';

  // Convert hour to 12-hour format
  if (hour === 0) {
    hour = 12;
  } else if (hour > 12) {
    hour -= 12;
  }

  // Add leading zero if minute is less than 10
  const minuteString = minute < 10 ? '0' + minute : minute.toString();

  return `${hour}:${minuteString}${meridiem}`;
}


