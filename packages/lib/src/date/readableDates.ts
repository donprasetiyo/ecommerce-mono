import { isWithinInterval, subDays, startOfToday } from 'date-fns'

export function isLast7Days(date:Date, endDate?:Date) {
  const today = startOfToday();
  const startDate = endDate || today;

  const sevenDaysAgo = subDays(startDate, 7);
  return isWithinInterval(date, { start: sevenDaysAgo, end: startDate });
}

export function isLast30Days(date:Date, fromDate?:Date) {
  const today = startOfToday();
  const startDate = fromDate || today;

  const aMonthAgo = subDays(startDate, 30);
  return isWithinInterval(date, { start: aMonthAgo, end: startDate });
}