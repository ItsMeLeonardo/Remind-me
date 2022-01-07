/**
 *
 * @param array of objects
 * @param key
 * @returns {*}
 */
export const groupBy = (array, key) => {
  return array.reduce((acc, curr) => {
    const value = curr[key]
    if (!acc[value]) {
      acc[value] = []
    }
    acc[value].push(curr)
    return acc
  }, {})
}
