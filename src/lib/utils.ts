import * as crypto from 'crypto';

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
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0'); // Months are zero-based
  const day = String(now.getDate()).padStart(2, '0');
  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');

  return `${year}-${month}-${day}T${hours}:${minutes}`;
}

export function convertTimestampFmtToInputFmt(datetime: string): string {
  const fmtdatetime = new Date(datetime);
  const year = fmtdatetime.getFullYear();
  const month = String(fmtdatetime.getMonth() + 1).padStart(2, '0'); // Months are zero-based
  const day = String(fmtdatetime.getDate()).padStart(2, '0');
  const hours = String(fmtdatetime.getHours()).padStart(2, '0');
  const minutes = String(fmtdatetime.getMinutes()).padStart(2, '0');

  return `${year}-${month}-${day}T${hours}:${minutes}`;
}

export function convertDateTime(datetime: string): string {
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
  const month = months[date.getMonth()];
  const day = date.getDate();
  const year = date.getFullYear();
  let hour = date.getHours();
  const minute = date.getMinutes();
  const meridiem = hour >= 12 ? 'PM' : 'AM';

  // Convert hour to 12-hour format
  if (hour === 0) {
    hour = 12;
  } else if (hour > 12) {
    hour -= 12;
  }

  // Add leading zero if minute is less than 10
  const minuteString = minute < 10 ? '0' + minute : minute.toString();

  return `${month} ${day.toString().padStart(2, '0')}, ${year} ${hour}:${minuteString}${meridiem}`;
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
  const month = months[date.getMonth()];
  const day = date.getDate();
  const year = date.getFullYear();

  return `${month} ${day.toString().padStart(2, '0')}, ${year}`;
}

export function getTime(datetime: string): string {
  const date = new Date(datetime);
  let hour = date.getHours();
  const minute = date.getMinutes();
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


