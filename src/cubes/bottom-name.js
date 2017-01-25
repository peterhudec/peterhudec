import * as utils from './utils'


const LETTER_SPACING = 6

const hp = []
  .concat(utils.shiftCubesBy(0, 0, -2, utils.bar5x1x1))
  .concat(utils.shiftCubesBy(2, -2, -2, utils.bar1x2x1))
  .concat(utils.shiftCubesBy(2, -2, -1, utils.bar1x1x1))
  .concat(utils.shiftCubesBy(2, -2, 0, utils.bar1x2x1))
  .concat(utils.shiftCubesBy(0, 0, 0, utils.bar5x1x1))
  .concat(utils.shiftCubesBy(-2, 1, 0, utils.bar1x2x1))
  .concat(utils.shiftCubesBy(-2, 2, 1, utils.bar1x1x1))
  .concat(utils.shiftCubesBy(-2, 0, 2, utils.bar1x5x1))

const ue = []
  .concat(utils.shiftCubesBy(0, -2, 2, utils.bar5x1x1))
  .concat(utils.shiftCubesBy(0, -2, 0, utils.bar5x1x1))
  .concat(utils.shiftCubesBy(0, -2, -2, utils.bar5x1x1))
  .concat(utils.shiftCubesBy(-2, 1, 2, utils.bar1x4x1))
  .concat(utils.shiftCubesBy(2, 1, -2, utils.bar1x4x1))

const dt = []
  .concat(utils.shiftCubesBy(0, -2, -2, utils.bar5x1x1))
  .concat(utils.shiftCubesBy(0, 0, -2, utils.bar5x1x1))
  .concat(utils.shiftCubesBy(-2, -1, -2, utils.bar1x1x1))
  .concat(utils.shiftCubesBy(2, 1, -2, utils.bar1x2x1))

  // .concat(utils.shiftCubesBy(0, 0, 1, utils.bar1x1x4))
  .concat(utils.shiftCubesBy(0, -2, 1, utils.bar1x1x4))

const ee = []
  .concat(utils.shiftCubesBy(0, 2, -2, utils.bar5x1x1))
  .concat(utils.shiftCubesBy(0, 0, 0, utils.bar5x1x1))
  .concat(utils.shiftCubesBy(0, -2, 2, utils.bar5x1x1))

const cr = []
  .concat(utils.shiftCubesBy(-2, 0, -2, utils.bar1x5x1))
  .concat(utils.shiftCubesBy(1, 2, -2, utils.bar4x1x1))
  .concat(utils.shiftCubesBy(1, -2, -2, utils.bar4x1x1))

  .concat(utils.shiftCubesBy(-2, -2, 1, utils.bar1x1x4))
  // .concat(utils.shiftCubesBy(-2, 2, 1, utils.bar1x1x4))

export const bottomNameCubes = []
  .concat(utils.shiftCubesBy(LETTER_SPACING * -2, 0, 0, hp))
  .concat(utils.shiftCubesBy(LETTER_SPACING * -1, 0, 0, ue))
  .concat(utils.shiftCubesBy(LETTER_SPACING * 0, 0, 0, dt))
  .concat(utils.shiftCubesBy(LETTER_SPACING * 1, 0, 0, ee))
  .concat(utils.shiftCubesBy(LETTER_SPACING * 2, 0, 0, cr))
