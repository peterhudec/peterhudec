'use strict'

function topName () {

  var hp = []
    .concat(shiftCubesBy(0, 0, 0, standingH))
    .concat(shiftCubesBy(0, 0, -2, standingH))
    .concat(shiftCubesBy(2, -1, -1, bar1x3x1))
    .concat(shiftCubesBy(-2, 0, 1, bar1x5x1))
    .concat(shiftCubesBy(-2, 0, 2, bar1x5x1))

  var ue = []
    .concat(shiftCubesBy(0, 0, -2, standingU))
    .concat(shiftCubesBy(0, 0, 0, standingU))
    .concat(shiftCubesBy(0, 0, 2, standingU))

  var dt = []
    .concat(shiftCubesBy(0, -2, -2, bar5x1x1))
    .concat(shiftCubesBy(0, 0, -2, bar5x1x1))
    .concat(shiftCubesBy(-2, -1, -2, bar1x1x1))
    .concat(shiftCubesBy(2, 1, -2, bar1x2x1))
    .concat(shiftCubesBy(0, 0, 1, bar1x1x4))
    .concat(shiftCubesBy(0, -2, 1, bar1x1x4))

  var flatE = []
  .concat(shiftCubesBy(0, 0, 2, bar5x1x1))
  .concat(shiftCubesBy(0, 0, 0, bar5x1x1))
  .concat(shiftCubesBy(0, 0, -2, bar5x1x1))

  var ee = []
    .concat(shiftCubesBy(0, -2, 0, flatE))
    .concat(shiftCubesBy(0, 0, 0, flatE))
    .concat(shiftCubesBy(0, 2, 0, flatE))

  var cr = []
    .concat(shiftCubesBy(-2, -2, 0, bar1x1x5))
    .concat(shiftCubesBy(-2, -1, 0, bar1x1x5))
    .concat(shiftCubesBy(-2, 0, 0, bar1x1x5))
    .concat(shiftCubesBy(-2, 1, 0, bar1x1x5))
    .concat(shiftCubesBy(-2, 2, 0, bar1x1x5))

    .concat(shiftCubesBy(1, 2, -2, bar4x1x1))
    .concat(shiftCubesBy(1, -2, -2, bar4x1x1))

  var LETTER_SPACING = 6

  return []
    .concat(shiftCubesBy(LETTER_SPACING * -2, 0, 0, hp))
    .concat(shiftCubesBy(LETTER_SPACING * -1, 0, 0, ue))
    .concat(shiftCubesBy(LETTER_SPACING * 0, 0, 0, dt))
    .concat(shiftCubesBy(LETTER_SPACING * 1, 0, 0, ee))
    .concat(shiftCubesBy(LETTER_SPACING * 2, 0, 0, cr))
}
