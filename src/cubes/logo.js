import * as utils from './utils'

import {topName} from './top-name'
import {bottomName} from './bottom-name'


export const logo = []
  .concat(utils.shiftCubesBy(0, 3, -3, topName))
  .concat(utils.shiftCubesBy(0, -3, 3, bottomName))
