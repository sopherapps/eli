/**
 * Mdule containing utilites functions for arrays
 */

/**
 * Shifts forward the element at the given element by given steps
 * @param list - the array whose elements are to be shifted around
 * @param index - the index of the element to shift around
 * @param steps - the number of steps to shift the given element forward by
 * @returns {any[]}
 */
export function shiftValueForward(
  list: any[],
  index: number,
  steps: number
): any[] {
  const newList = list.filter((_, position) => position !== index);
  newList.splice(index - steps, 0, list[index]);
  return newList;
}

/**
 * Shifts backward the element at the given element by given steps
 * @param list - the array whose elements are to be shifted around
 * @param index - the index of the element to shift around
 * @param steps - the number of steps to shift the given element forward by
 * @returns {any[]}
 */
export function shiftValueBackward(
  list: any[],
  index: number,
  steps: number
): any[] {
  const newList = list.filter((_, position) => position !== index);
  newList.splice(index + steps, 0, list[index]);
  return newList;
}
