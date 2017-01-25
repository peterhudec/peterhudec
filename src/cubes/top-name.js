import * as utils from './utils'


const LETTER_SPACING = 6


const ph = []
  .concat(utils.shiftCubesBy(0, 0, 0, utils.bar3x1x1))
  .concat(utils.shiftCubesBy(0, 2, 0, utils.bar3x1x1))

  .concat(utils.shiftCubesBy(-2, -2, 2, utils.bar1x2x1))
  .concat(utils.shiftCubesBy(-2, 0, 1, utils.bar1x1x3))
  .concat(utils.shiftCubesBy(-2, 2, -1, utils.bar1x1x3))

  .concat(utils.shiftCubesBy(2, 2, 1, utils.bar1x1x3))
  .concat(utils.shiftCubesBy(2, 1, 2, utils.bar1x1x1))
  .concat(utils.shiftCubesBy(2, 0, 1, utils.bar1x1x3))

const eu = []
  .concat(utils.shiftCubesBy(0, -2, 2, utils.bar5x1x1))
  .concat(utils.shiftCubesBy(0, 0, 2, utils.bar5x1x1))
  .concat(utils.shiftCubesBy(0, 2, 2, utils.bar5x1x1))
  .concat(utils.shiftCubesBy(-2, 2, 0, utils.bar1x1x4))
  .concat(utils.shiftCubesBy(2, -2, 0, utils.bar1x1x4))

const td = []
  .concat(utils.shiftCubesBy(0, 2, 2, utils.bar5x1x1))
  .concat(utils.shiftCubesBy(0, 2, 0, utils.bar5x1x1))
  .concat(utils.shiftCubesBy(-2, 2, 1, utils.bar1x1x1))
  .concat(utils.shiftCubesBy(2, 2, -2, utils.bar1x1x2))
  .concat(utils.shiftCubesBy(0, 0, 2, utils.bar1x4x1))

const ee = []
  .concat(utils.shiftCubesBy(0, 2, -2, utils.bar5x1x1))
  .concat(utils.shiftCubesBy(0, 0, 0, utils.bar5x1x1))
  .concat(utils.shiftCubesBy(0, -2, 2, utils.bar5x1x1))

const rc = []
  .concat(utils.shiftCubesBy(-2, 2, 0, utils.bar1x1x5))
  .concat(utils.shiftCubesBy(-2, 0, 2, utils.bar1x4x1))
  .concat(utils.shiftCubesBy(1, 2, -2, utils.bar4x1x1))
  .concat(utils.shiftCubesBy(1, 2, 2, utils.bar4x1x1))

export const topNameCubes = []
  .concat(utils.shiftCubesBy(LETTER_SPACING * -2, 0, 0, ph))
  .concat(utils.shiftCubesBy(LETTER_SPACING * -1, 0, 0, eu))
  .concat(utils.shiftCubesBy(LETTER_SPACING * 0, 0, 0, td))
  .concat(utils.shiftCubesBy(LETTER_SPACING * 1, 0, 0, ee))
  .concat(utils.shiftCubesBy(LETTER_SPACING * 2, 0, 0, rc))
