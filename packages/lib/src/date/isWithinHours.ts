// Import the necessary functions from date-fns
import { parseISO, differenceInHours, isValid } from 'date-fns';

export function isWithinLastHours(dateString:Date, hourNumber: number) {
  
  if (!isValid(dateString)) {
    return false;
  }

  const now = new Date();

  const hoursDifference = differenceInHours(now, dateString);

  return hoursDifference <= hourNumber;
}