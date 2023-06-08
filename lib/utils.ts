import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export function convertKeysToLowerCase(obj: { [key: string]: any }): { [key: string]: any } {
  const convertedObj: { [key: string]: any } = {};

  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      const lowercaseKey = key.toLowerCase();
      convertedObj[lowercaseKey] = obj[key];
    }
  }

  return convertedObj;
}