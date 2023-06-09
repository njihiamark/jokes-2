import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function convertKeysToPascalCase(obj: { [key: string]: any }): { [key: string]: any } {
  if (typeof obj !== "object" || obj === null) {
    return obj;
  }

  if (Array.isArray(obj)) {
    const items = obj.map((item) => convertKeysToPascalCase(item));
    const sortedItems = items.sort((a, b) => a.CreatedAt - b.CreatedAt);
    return sortedItems;
  }

  const convertedObj: { [key: string]: any } = {};

  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      let pascalCaseKey = key;
      if (key.toLowerCase() !== "createdat") {
        pascalCaseKey = key.charAt(0).toUpperCase() + key.slice(1);
      }
      if (key === "createdAt") {
        pascalCaseKey = key.charAt(0).toUpperCase() + key.slice(1);
      }
      convertedObj[pascalCaseKey] = convertKeysToPascalCase(obj[key]);
    }
  }

  return convertedObj;
}

export function convertUnixTimestamp(timestamp: number): string {
  const length = Math.floor(Math.log10(timestamp)) + 1;

  let date: Date;

  if (length === 10) {
    // Unix timestamp in seconds
    date = new Date(timestamp * 1000);
  } else if (length === 13) {
    // Unix timestamp in milliseconds
    date = new Date(timestamp);
  } else if (length === 16) {
    // Unix timestamp in microseconds
    date = new Date(Math.floor(timestamp / 1000));
  } else if (length === 19) {
    // Unix timestamp in nanoseconds
    date = new Date(Math.floor(timestamp / 1000000));
  } else {
    return "No date";
  }

  const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'short', day: '2-digit', hour: "2-digit" };
  return date.toLocaleTimeString('en-US', options);
}

export function getColorByViews(views: number): string {
  if (views >= 0 && views <= 25) {
    return "tomato";
  } else if (views >= 26 && views <= 50) {
    return "orange";
  } else if (views >= 51 && views <= 75) {
    return "yellow";
  } else if (views >= 76 && views <= 100) {
    return "green";
  } else {
    return "blue";
  }
}
