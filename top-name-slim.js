'use strict'

function topNameSlim () {

  var hp = []
    // .concat(shiftCubesBy(0, 0, 0, bar5x1x1))
    // .concat(shiftCubesBy(0, 0, -2, bar5x1x1))
    // .concat(shiftCubesBy(2, 0, -1, bar1x1x1))
    // .concat(shiftCubesBy(-2, 0, 1, bar1x1x2))
    // .concat(shiftCubesBy(-2, -2, 2, bar1x2x1))
    // .concat(shiftCubesBy(2, -2, 0, bar1x2x1))
    // .concat(shiftCubesBy(-2, 1, -2, bar1x2x1))

    .concat(shiftCubesBy(0, 0, -2, bar5x1x1))
    .concat(shiftCubesBy(2, -2, -2, bar1x2x1))
    .concat(shiftCubesBy(2, -2, -1, bar1x1x1))
    .concat(shiftCubesBy(2, -2, 0, bar1x2x1))
    .concat(shiftCubesBy(0, 0, 0, bar5x1x1))
    .concat(shiftCubesBy(-2, 1, 0, bar1x2x1))
    .concat(shiftCubesBy(-2, 2, 1, bar1x1x1))
    .concat(shiftCubesBy(-2, 0, 2, bar1x5x1))

  var ue = []
    .concat(shiftCubesBy(0, -2, 2, bar5x1x1))
    .concat(shiftCubesBy(0, -2, 0, bar5x1x1))
    .concat(shiftCubesBy(0, -2, -2, bar5x1x1))
    .concat(shiftCubesBy(-2, 1, 2, bar1x4x1))
    .concat(shiftCubesBy(2, 1, -2, bar1x4x1))

  var dt = []
    .concat(shiftCubesBy(0, -2, -2, bar5x1x1))
    .concat(shiftCubesBy(0, 0, -2, bar5x1x1))
    .concat(shiftCubesBy(-2, -1, -2, bar1x1x1))
    .concat(shiftCubesBy(2, 1, -2, bar1x2x1))
    .concat(shiftCubesBy(0, 0, 1, bar1x1x4))

  var ee = []
    .concat(shiftCubesBy(0, 2, -2, bar5x1x1))
    .concat(shiftCubesBy(0, 0, 0, bar5x1x1))
    .concat(shiftCubesBy(0, -2, 2, bar5x1x1))

  var cr = []
    .concat(shiftCubesBy(-2, 0, -2, bar1x5x1))
    .concat(shiftCubesBy(1, 2, -2, bar4x1x1))
    .concat(shiftCubesBy(1, -2, -2, bar4x1x1))
    .concat(shiftCubesBy(-2, -2, 1, bar1x1x4))

  var LETTER_SPACING = 6

  return []
    .concat(shiftCubesBy(LETTER_SPACING * -2, 0, 0, hp))
    .concat(shiftCubesBy(LETTER_SPACING * -1, 0, 0, ue))
    .concat(shiftCubesBy(LETTER_SPACING * 0, 0, 0, dt))
    .concat(shiftCubesBy(LETTER_SPACING * 1, 0, 0, ee))
    .concat(shiftCubesBy(LETTER_SPACING * 2, 0, 0, cr))
}
