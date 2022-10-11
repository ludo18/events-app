import { Event } from '../features/events/types';

export function sortDescEvents(a: Event, b: Event): number {
  return a.startAt > b.startAt ? -1 : b.startAt > a.startAt ? 1 : 0;
}

//sort alphabetically a JSON object by its keys
export function sortObjectByKeys(object) {
  return Object.fromEntries(
    Object.entries(object).sort(([k1], [k2]) => (k1 < k2 ? -1 : 1))
  );
}

export function isOlderThan(date1: string, date2: string): boolean {
  var d1 = Date.parse(date1);
  var d2 = Date.parse(date2);
  return d1 > d2;
}

export function addDaysToCurrentDate(numberOfDays: number): Date {
  //source:https://stackoverflow.com/a/3818198/16642138
  var someDate = new Date();
  var numberOfDaysToAdd = numberOfDays;
  var result = someDate.setDate(someDate.getDate() + numberOfDaysToAdd);
  return new Date(result);
}

export function addHoursToDate(date: Date, numberOfHours: number): Date {
  return new Date(date.getTime() + numberOfHours * 3600 * 1000);
}

export function addHoursToCurrentDate(numberOfHours: number): Date {
  return new Date(Date.now() + numberOfHours * 3600 * 1000);
}

export function addMinutesToCurrentDate(numberOfMinutes: number): Date {
  return new Date(Date.now() + numberOfMinutes * 60 * 1000);
}

export function getDateYYYYMMDD(date: Date): string {
  let day = date.getDate();
  let month = ('0' + (date.getMonth() + 1)).slice(-2);
  let year = date.getFullYear();
  let result = `${year}-${month}-${day}`;
  return result;
}
//round number 2 digits
export function round2(num) {
  return Math.round(num * 100 + Number.EPSILON) / 100; //123.4567==>123.46
}

export async function sleep(milliseconds) {
  return new Promise((resolve) => {
    setTimeout(resolve, milliseconds);
  });
}
