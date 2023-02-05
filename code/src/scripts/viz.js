/**
 * Sets the domain of the color scale
 *
 * @param {*} colorScale The color scale used in the heatmap
 * @param {object[]} data The data to be displayed
 */
export function setColorScaleDomain (colorScale, data) {
  // TODO : Set domain of color scale
  colorScale.domain([d3.min(data.map(element => element.Comptes)), d3.max(data.map(element => element.Comptes))])
}

/**
 * For each data element, appends a group 'g' to which an SVG rect is appended
 *
 * @param {object[]} data The data to use for binding
 */
export function appendRects (data) {
  // TODO : Append SVG rect elements
  d3.select('#graph-g')
    .selectAll('.group')
    .data(data)
    .enter()
    .append('g')
    .append('svg')
    .append('rect')
}

/**
 * Updates the domain and range of the scale for the x axis
 *
 * @param {*} xScale The scale for the x axis
 * @param {object[]} data The data to be used
 * @param {number} width The width of the diagram
 * @param {Function} range A utilitary funtion that could be useful to generate a list of numbers in a range
 */
export function updateXScale (xScale, data, width, range) {
  // TODO : Update X scale
  xScale.domain(range(d3.min(data.map(element => element.Plantation_Year)), d3.max(data.map(element => element.Plantation_Year))))
    .range([0, width])
}

/**
 * Updates the domain and range of the scale for the y axis
 *
 * @param {*} yScale The scale for the y axis
 * @param {string[]} neighborhoodNames The names of the neighborhoods
 * @param {number} height The height of the diagram
 */
export function updateYScale (yScale, neighborhoodNames, height) {
  // TODO : Update Y scale
  // Make sure to sort the neighborhood names alphabetically
  neighborhoodNames.sort()
  yScale.domain(neighborhoodNames)
    .range([0, height])
}

/**
 *  Draws the X axis at the top of the diagram.
 *
 *  @param {*} xScale The scale to use to draw the axis
 */
export function drawXAxis (xScale) {
  // TODO : Draw X axis
  d3.select('.x.axis')
    .call(d3.axisTop(xScale))
}

/**
 * Draws the Y axis to the right of the diagram.
 *
 * @param {*} yScale The scale to use to draw the axis
 * @param {number} width The width of the graphic
 */
export function drawYAxis (yScale, width) {
  // TODO : Draw Y axis
  d3.select('.y.axis')
    .attr('transform', `translate(${width}, 0)`)
    .call(d3.axisRight(yScale))
}

/**
 * Rotates the ticks on the Y axis 30 degrees towards the left.
 */
export function rotateYTicks () {
  // TODO : Rotate Y ticks.
  d3.select('.y.axis')
    .selectAll('text')
    .attr('transform', 'rotate(-30)')
}

/**
 * After the rectangles have been appended, this function dictates
 * their position, size and fill color.
 *
 * @param {*} xScale The x scale used to position the rectangles
 * @param {*} yScale The y scale used to position the rectangles
 * @param {*} colorScale The color scale used to set the rectangles' colors
 */
export function updateRects (xScale, yScale, colorScale) {
  // TODO : Set position, size and fill of rectangles according to bound data
  d3.select('#graph-g')
    // .selectAll('g')
    // .select('svg')
    .selectAll('rect')
    .attr('fill', element => colorScale(element.Comptes))
    .attr('height', yScale.bandwidth())
    .attr('y', element => yScale(element.Arrond_Nom))
    .attr('width', xScale.bandwidth())
    .attr('x', element => xScale(element.Plantation_Year))
}
