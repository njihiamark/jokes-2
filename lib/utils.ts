import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export function convertKeysToPascalCase(obj: { [key: string]: any }): { [key: string]: any } {
  const convertedObj: { [key: string]: any } = {};

  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      const pascalCaseKey = key.replace(/(\w)(\w*)/g, (_, firstChar, restOfString) => {
        return firstChar.toUpperCase() + restOfString.toLowerCase();
      });
      convertedObj[pascalCaseKey] = obj[key];
    }
  }

  return convertedObj;
}