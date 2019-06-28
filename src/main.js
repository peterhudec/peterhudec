import 'file-loader?name=favicon.ico!./favicon.ico'
import 'file-loader?name=preview.jpg!./preview.jpg'
import 'file-loader?name=404.html!./404.html'
import 'file-loader?name=CNAME!./CNAME'

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
