import * as utils from './utils'


const LETTER_SPACING = 6

const s = []
  .concat(utils.shiftCubesBy(0, 2, 0, utils.bar5x1x1))
  .concat(utils.shiftCubesBy(-2, 1, 0, utils.bar1x1x1))
  .concat(utils.shiftCubesBy(0, 0, 0, utils.bar5x1x1))
  .concat(utils.shiftCubesBy(2, -1, 0, utils.bar1x1x1))
  .concat(utils.shiftCubesBy(0, -2, 0, utils.bar5x1x1))

const c = []
  .concat(utils.shiftCubesBy(0, 2, 0, utils.bar5x1x1))
  .concat(utils.shiftCubesBy(-2, 0, 0, utils.bar1x3x1))
  .concat(utils.shiftCubesBy(0, -2, 0, utils.bar5x1x1))

const r = []
  .concat(utils.shiftCubesBy(0, 2, 0, utils.bar5x1x1))
  .concat(utils.shiftCubesBy(-2, 0, 0, utils.bar1x4x1))

const o = []
  .concat(utils.shiftCubesBy(0, 2, 0, utils.bar5x1x1))
  .concat(utils.shiftCubesBy(-2, 0, 0, utils.bar1x3x1))
  .concat(utils.shiftCubesBy(2, 0, 0, utils.bar1x3x1))
  .concat(utils.shiftCubesBy(0, -2, 0, utils.bar5x1x1))

const l = []
  .concat(utils.shiftCubesBy(-2, 1, 0, utils.bar1x4x1))
  .concat(utils.shiftCubesBy(0, -2, 0, utils.bar5x1x1))

const arrow = []
  .concat(utils.shiftCubesBy(0, 0, 0, utils.bar1x5x1))
  .concat(utils.shiftCubesBy(-1, -1, 0, utils.bar1x1x1))
  .concat(utils.shiftCubesBy(1, -1, 0, utils.bar1x1x1))
  .concat(utils.shiftCubesBy(-2, 0, 0, utils.bar1x1x1))
  .concat(utils.shiftCubesBy(2, 0, 0, utils.bar1x1x1))

export const scrollMessage = []
  .concat(utils.shiftCubesBy(LETTER_SPACING * -2 - LETTER_SPACING * 0.5, 0, 0, s))
  .concat(utils.shiftCubesBy(LETTER_SPACING * -1 - LETTER_SPACING * 0.5, 0, 0, c))
  .concat(utils.shiftCubesBy(LETTER_SPACING * 0 - LETTER_SPACING * 0.5, 0, 0, r))
  .concat(utils.shiftCubesBy(LETTER_SPACING * 1 - LETTER_SPACING * 0.5, 0, 0, o))
  .concat(utils.shiftCubesBy(LETTER_SPACING * 2 - LETTER_SPACING * 0.5, 0, 0, l))
  .concat(utils.shiftCubesBy(LETTER_SPACING * 3 - LETTER_SPACING * 0.5, 0, 0, l))
  .concat(utils.shiftCubesBy(0, LETTER_SPACING * -2, 0, arrow))
