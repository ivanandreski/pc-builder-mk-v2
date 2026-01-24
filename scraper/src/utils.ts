import fs from 'fs'
import { Store } from './types';

export const convertFormattedPrice = (priceString: string): number => {
  // 1. Remove thousands separator ('.')
  let cleanedString = priceString.replace(/\./g, ''); // The 'g' flag replaces all occurrences
  // 2. Replace decimal comma (',') with a period ('.')
  cleanedString = cleanedString.replace(',', '.');
  // 3. Convert to a number (float)
  return Number(cleanedString); // Or use Number(cleanedString)
}

export const writeDataToFile = (store: Store, filename: string, data: object | []) => {
  // Source - https://stackoverflow.com/a
  // Posted by kailniris, modified by community. See post 'Timeline' for change history
  // Retrieved 2026-01-24, License - CC BY-SA 4.0
  fs.writeFile(
    `data/${store.toLocaleLowerCase()}/${filename}.json`,
    JSON.stringify(data),
    'utf8',
    () => { }
  );
}