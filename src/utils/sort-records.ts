/**
 * Module contains utility functions to sort by a given field where '-' is descending
 */
import orderBy from "lodash.orderby";

type Many<T> = T | Array<T>;

/**
 * Sorts the data by the field provided, in ascending order by default, or descending order
 * if the field has a '-' prefix attached to it
 * @param field - the field to sort by. Attach the prefix '-' in case it is a descending order sort
 * @param data - the data object of objects to be sorted
 * @returns {[{key:string}: any], string}
 */
export default function sortByField(
  sortString: string,
  data: { [key: string]: { [key: string]: any } }
): [{ [key: string]: any }[], string] {
  const sortStringPatches = sortString.split(",");
  const fields: string[] = [];
  const orders: Many<boolean | "asc" | "desc"> = [];

  for (let patch of sortStringPatches) {
    const sortMatches = patch.match(/(-)?(.+)/);
    if (sortMatches) {
      const order = sortMatches[1] ? "desc" : "asc";
      fields.push(sortMatches[2]);
      orders.push(order);
    } else {
      return [
        [],
        `'${patch}' is not of right pattern [-]<field name> e.g. '-quantity of produce' or 'vol'`,
      ];
    }
  }

  return [orderBy(data, fields, orders), ""];
}
