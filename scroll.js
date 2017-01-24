'use strict'

function scrollCubes () {

  var LETTER_SPACING = 6

  var s = []
    .concat(shiftCubesBy(0, 2, 0, bar5x1x1))
    .concat(shiftCubesBy(-2, 1, 0, bar1x1x1))
    .concat(shiftCubesBy(0, 0, 0, bar5x1x1))
    .concat(shiftCubesBy(2, -1, 0, bar1x1x1))
    .concat(shiftCubesBy(0, -2, 0, bar5x1x1))

  var c = []
    .concat(shiftCubesBy(0, 2, 0, bar5x1x1))
    .concat(shiftCubesBy(-2, 0, 0, bar1x3x1))
    .concat(shiftCubesBy(0, -2, 0, bar5x1x1))

  var r = []
    .concat(shiftCubesBy(0, 2, 0, bar5x1x1))
    .concat(shiftCubesBy(-2, 0, 0, bar1x4x1))

  var o = []
    .concat(shiftCubesBy(0, 2, 0, bar5x1x1))
    .concat(shiftCubesBy(-2, 0, 0, bar1x3x1))
    .concat(shiftCubesBy(2, 0, 0, bar1x3x1))
    .concat(shiftCubesBy(0, -2, 0, bar5x1x1))

  var l = []
    .concat(shiftCubesBy(-2, 1, 0, bar1x4x1))
    .concat(shiftCubesBy(0, -2, 0, bar5x1x1))

  var arrow = []
    .concat(shiftCubesBy(0, 0, 0, bar1x5x1))
    .concat(shiftCubesBy(-1, -1, 0, bar1x1x1))
    .concat(shiftCubesBy(1, -1, 0, bar1x1x1))
    .concat(shiftCubesBy(-2, 0, 0, bar1x1x1))
    .concat(shiftCubesBy(2, 0, 0, bar1x1x1))


  return []
    .concat(shiftCubesBy(LETTER_SPACING * -2 - LETTER_SPACING * 0.5, 0, 0, s))
    .concat(shiftCubesBy(LETTER_SPACING * -1 - LETTER_SPACING * 0.5, 0, 0, c))
    .concat(shiftCubesBy(LETTER_SPACING * 0 - LETTER_SPACING * 0.5, 0, 0, r))
    .concat(shiftCubesBy(LETTER_SPACING * 1 - LETTER_SPACING * 0.5, 0, 0, o))
    .concat(shiftCubesBy(LETTER_SPACING * 2 - LETTER_SPACING * 0.5, 0, 0, l))
    .concat(shiftCubesBy(LETTER_SPACING * 3 - LETTER_SPACING * 0.5, 0, 0, l))

    .concat(shiftCubesBy(0, LETTER_SPACING * -2, 0, arrow))
}
