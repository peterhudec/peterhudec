import $ from 'jquery'
import Detector from 'three/examples/js/Detector'

import {app} from './app'


$(document).ready(() => {
  if (Detector.webgl) {
    app()
  } else {
    $('body').html($('noscript').text())
  }
})
