/**
 * Gets the names of the neighborhoods.
 *
 * @param {object[]} data The data to analyze
 * @returns {string[]} The names of the neighorhoods in the data set
 */
export function getNeighborhoodNames (data) {
  // TODO: Return the neihborhood names
  const result = []
  data.forEach(element => {
    const arrondNom = element.Arrond_Nom
    if (!result.includes(arrondNom)) {
      result.push(arrondNom)
    }
  })
  return result
}

/**
 * Filters the data by the given years.
 *
 * @param {object[]} data The data to filter
 * @param {number} start The start year (inclusive)
 * @param {number} end The end year (inclusive)
 * @returns {object[]} The filtered data
 */
export function filterYears (data, start, end) {
  // TODO : Filter the data by years
  return data.filter(element => element.Date_Plantation.getFullYear() >= start && element.Date_Plantation.getFullYear() <= end)
}

/**
 * Summarizes how any trees were planted each year in each neighborhood.
 *
 * @param {object[]} data The data set to use
 * @returns {object[]} A table of objects with keys 'Arrond_Nom', 'Plantation_Year' and 'Counts', containing
 * the name of the neighborhood, the year and the number of trees that were planted
 */
export function summarizeYearlyCounts (data) {
  // TODO : Construct the required data table
  const result = []
  data.forEach(element => {
    let found = false
    result.forEach(arrond => {
      if (element.Arrond_Nom === arrond.Arrond_Nom && element.Date_Plantation.getFullYear() === arrond.Plantation_Year) {
        arrond.Comptes += 1
        found = true
      }
    })
    if (!found) {
      const newEntry = {}
      newEntry.Arrond_Nom = element.Arrond_Nom
      newEntry.Plantation_Year = element.Date_Plantation.getFullYear()
      newEntry.Comptes = 1
      result.push(newEntry)
    }
  })
  return result
}

/**
 * For the heat map, fills empty values with zeros where a year is missing for a neighborhood because
 * no trees were planted or the data was not entered that year.
 *
 * @param {object[]} data The datas set to process
 * @param {string[]} neighborhoods The names of the neighborhoods
 * @param {number} start The start year (inclusive)
 * @param {number} end The end year (inclusive)
 * @param {Function} range A utilitary function that could be useful to get the range of years
 * @returns {object[]} The data set with a new object for missing year and neighborhood combinations,
 * where the values for 'Counts' is 0
 */
export function fillMissingData (data, neighborhoods, start, end, range) {
  // TODO : Find missing data and fill with 0
  neighborhoods.forEach(neighborhood => {
    for (var i = start; i <= end; i++) {
      let found = false
      data.forEach(element => {
        if (element.Arrond_Nom === neighborhood && element.Plantation_Year === i) {
          found = true
        }
      })
      if (!found) {
        const newEntry = {}
        newEntry.Arrond_Nom = neighborhood
        newEntry.Plantation_Year = i
        newEntry.Comptes = 0
        data.push(newEntry)
      }
    }
  })
  return data
}
