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
    return obj.map((item) => convertKeysToPascalCase(item));
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
