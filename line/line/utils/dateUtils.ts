import { format, isWithinInterval } from 'date-fns';
import { toZonedTime } from 'date-fns-tz';

const japanTimezone = 'Asia/Tokyo';

export function isBusinessHours(date: Date) {
  const japanDate = toZonedTime(date, japanTimezone);
  const dayOfWeek = japanDate.getDay();
  const hours = japanDate.getHours();
  const minutes = japanDate.getMinutes();
  const time = hours * 100 + minutes;

  if (dayOfWeek === 0 || dayOfWeek === 6) {
    return false;
  } else if (dayOfWeek === 6) {
    return time >= 1020 && time <= 1420;
  } else {
    return (time >= 1020 && time <= 1140) || (time >= 1420 && time <= 2130);
  }
}

export function formatDate(date: Date, formatString: string) {
  const japanDate = toZonedTime(date, japanTimezone);
  return format(japanDate, formatString);
}

