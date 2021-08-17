/**
 * Module contains utility functions to sort by a given field where '-' is descending
 */

/**
 * Sorts the data by the field provided, in ascending order by default, or descending order
 * if the field has a '-' prefix attached to it
 * @param field - the field to sort by. Attach the prefix '-' in case it is a descending order sort
 * @param data - the data object of objects to be sorted
 * @returns {[{key:string}: any], string}
 */
export default function sortByField(
  field: string,
  data: { [key: string]: { [key: string]: any } }
): [{ [key: string]: any }[], string] {
  const sortMatches = field.match(/(-)?(.+)/);
  if (sortMatches) {
    const sortMultiplier = sortMatches[1] ? -1 : 1;
    const sortField = sortMatches[2];
    return [
      Object.values(data).sort(
        (a, b) => sortMultiplier * (a[sortField] - b[sortField])
      ),
      "",
    ];
  }

  return [
    Object.values(data),
    `the sort by field '${field}' is not of the expected pattern (optional negative + words e.g. '-quantity of food')`,
  ];
}
