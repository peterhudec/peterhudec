'use strict'

function bottomNameSlim () {

  var ph = []
    .concat(shiftCubesBy(0, 0, 0, bar3x1x1))
    .concat(shiftCubesBy(0, 2, 0, bar3x1x1))

    .concat(shiftCubesBy(-2, -2, 2, bar1x2x1))
    .concat(shiftCubesBy(-2, 0, 1, bar1x1x3))
    .concat(shiftCubesBy(-2, 2, -1, bar1x1x3))

    .concat(shiftCubesBy(2, 2, 1, bar1x1x3))
    .concat(shiftCubesBy(2, 1, 2, bar1x1x1))
    .concat(shiftCubesBy(2, 0, 1, bar1x1x3))

  var eu = []
    .concat(shiftCubesBy(0, -2, 2, bar5x1x1))
    .concat(shiftCubesBy(0, 0, 2, bar5x1x1))
    .concat(shiftCubesBy(0, 2, 2, bar5x1x1))
    .concat(shiftCubesBy(-2, 2, 0, bar1x1x4))
    .concat(shiftCubesBy(2, -2, 0, bar1x1x4))

  var td = []
    .concat(shiftCubesBy(0, 2, 2, bar5x1x1))
    .concat(shiftCubesBy(0, 2, 0, bar5x1x1))
    .concat(shiftCubesBy(-2, 2, 1, bar1x1x1))
    .concat(shiftCubesBy(2, 2, -2, bar1x1x2))
    .concat(shiftCubesBy(0, 0, 0, bar1x4x1))

  var ee = []
    .concat(shiftCubesBy(0, 2, -2, bar5x1x1))
    .concat(shiftCubesBy(0, 0, 0, bar5x1x1))
    .concat(shiftCubesBy(0, -2, 2, bar5x1x1))

  var rc = []
    .concat(shiftCubesBy(-2, 2, 0, bar1x1x5))
    .concat(shiftCubesBy(-2, 0, 0, bar1x4x1))

    .concat(shiftCubesBy(1, 2, -2, bar4x1x1))
    .concat(shiftCubesBy(1, 2, 2, bar4x1x1))

  var LETTER_SPACING = 6

  return []
    .concat(shiftCubesBy(LETTER_SPACING * -2, 0, 0, ph))
    .concat(shiftCubesBy(LETTER_SPACING * -1, 0, 0, eu))
    .concat(shiftCubesBy(LETTER_SPACING * 0, 0, 0, td))
    .concat(shiftCubesBy(LETTER_SPACING * 1, 0, 0, ee))
    .concat(shiftCubesBy(LETTER_SPACING * 2, 0, 0, rc))
}
