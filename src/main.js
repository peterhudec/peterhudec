console.log('a')

import $ from 'jquery'
import Detector from 'three/examples/js/Detector'

import {app} from './app'


$(document).ready(() => {
  if (Detector.webgl) {
    app()
  } else {
    $('body')
      .html($('noscript').text())
      .prepend($('<p class="browser-admonition"></p>')
        .text('You would enjoy this website much more on a modern browser ' +
          'with WebGL support.'))
  }
})
