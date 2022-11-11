/**
 * naively randomize color for the pokemon type on pokedex card
 *
 * @returns string of hex color with leading #
 */
export const colorPicker = () => {
  const colorList = [
    '#9500ae',
    '#f50057',
    '#707070',
    '#00a152',
    '#3d5afe',
    '#651fff',
    '#009688',
    '#ff3d00',
  ] as const

  let randNum = Number((Math.random() * 10).toFixed(0))

  const maxIndex = colorList.length - 1

  // max random number === 10 and max number for indexing is <= 10
  randNum = randNum > maxIndex ? randNum - maxIndex : randNum

  return colorList[randNum]
}
