export function isBusinessHours(date: Date) {
    const day = date.getDay();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const time = hours * 100 + minutes;
  
    if (day === 0 || day === 6) {
      return false;
    } else if (day === 6) {
      return time >= 1020 && time <= 1420;
    } else {
      return (time >= 1020 && time <= 1140) || (time >= 1420 && time <= 1830);
    }
  }