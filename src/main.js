import {default as $} from 'jquery'

import * as lights from './lights'

// Global variables
let scrollRotation = 0
let scrollPosition = 0
let mouseX = 0
let mouseY = 0

const $window = $(window)

const scene = new THREE.Scene()
const camera = new THREE.PerspectiveCamera(
  30,
  $window.width() / $window.height(),
  0.1,
  1000
)
const cameraGroup = new THREE.Group()
scene.add(cameraGroup)

cameraGroup.add(camera)
cameraGroup.position.set(0, 0, 0)
camera.position.z = 10


const renderer = new THREE.WebGLRenderer({
  antialias: true,
  alpha: true,
})
renderer.setClearColor(0xffffff, 0)

const cssRenderer = new THREE.CSS3DRenderer({
  antialias: true
})

const group = new THREE.Group()
scene.add(group)

const cubeSize = 0.1

const logo = []
  .concat(shiftCubesBy(0, 3, -3, topNameSlim()))
  .concat(shiftCubesBy(0, -3, 3, bottomNameSlim()))

const logoGroup = new THREE.Group()
logoGroup.rotation.x = Math.PI / 2
group.add(logoGroup)
addCubes(logoGroup, logo, cubeSize)


const lightRing = lights.ring(7, 5, 0xffffff)
lightRing.position.z = -3
cameraGroup.add(lightRing)


////////////////////////////////////
const $backface = $('#content-backface')
const backface = new THREE.CSS3DObject($backface.get(0));
const object = new THREE.CSS3DObject($('#content').get(0));

const fontFactor = 2
const objectScale = cubeSize * 0.1 / fontFactor
object.scale.set(objectScale, objectScale, objectScale)

object.position.y = -26 * cubeSize
object.position.z = -10 * cubeSize
object.rotation.x = Math.PI / 2


backface.scale.set(objectScale, objectScale, objectScale)

backface.position.y = -26 * cubeSize + 0.01
backface.position.z = -10 * cubeSize
backface.rotation.x = Math.PI / 2

group.add(object);
group.add(backface)
////////////////////////////////////


/**
* Hyperbole passing through (n, m) with slope (c) and asymptote (a)
*/
function hyperbole (n, m, c, a) {
  return function (x) {
    return - 1 / (x * 1 / c + 1 / (a - m) - n) + a
  }
}

function render() {
  // http://jsfiddle.net/DLta8/143/
  var newGroupPosition = group.position.clone()
  newGroupPosition.y = scrollPosition
  group.position.lerp(newGroupPosition, 0.07)


  var groupQuarternion = new THREE.Quaternion()
    .setFromEuler(new THREE.Euler(
      scrollRotation,
      0,
      0,
      'XYZ'
    ))
  group.quaternion.slerp(groupQuarternion, 0.07)

  const cameraRotationFactor = 0.3
  const cameraDirection = -1

  const cameraRotationX = mouseY * cameraRotationFactor * cameraDirection
  const cameraRotationY = mouseX * cameraRotationFactor * -cameraDirection

  const cameraQuaternion = new THREE.Quaternion()
    .setFromEuler(new THREE.Euler(cameraRotationX, cameraRotationY, 0, 'XYZ'))
  cameraGroup.quaternion.slerp(cameraQuaternion, 0.07)

  renderer.render(scene, camera)
  cssRenderer.render(scene, camera)
}

function animate() {
  requestAnimationFrame(animate)
  render()
}

const rotationFunction = hyperbole(0, 0, 15, Math.PI / (2 - 0.3))

const onResize = e => {

  $('#debug').html($window.height())

  // TODO: On initial result, check whether it's a touchscreen device and
  // increase the viewport height by the approximate height of the address bar.
  if (!e.initialResize && 'ontouchstart' in window) {
    $('#viewport').css('height', $window.height())
    return
  }

  const width = $('#viewport').width()
  const height = $('#viewport').height()

  camera.aspect = width / height
  camera.updateProjectionMatrix()

  renderer.setSize(width, height)
  cssRenderer.setSize(width, height)

  renderer.render(scene, camera)
  cssRenderer.render(scene, camera)
}

const onScroll = () => {
  const scrollTop = $window.scrollTop()

  scrollRotation = - rotationFunction(scrollTop / 10)
  scrollPosition = scrollTop * 0.01

  if (scrollRotation < Math.PI / -4) {
    $('#content-backface-wrapper').hide()
    $('#css-viewport').css('z-index', 1000)
  } else {
    $('#content-backface-wrapper').show()
    $('#css-viewport').css('z-index', -1000)
  }
}

const registerEvents = () => {
  $window
    .on('resize', onResize)
    .on('scroll', onScroll)
    .on('mousemove', e => {
      mouseX = e.clientX / $('#viewport').width() * 2 - 1
      mouseY = - e.clientY / $('#viewport').height() * 2 + 1
    })

  if (window.DeviceOrientationEvent && 'ontouchstart' in window) {
    $window.on('deviceorientation', e => {
      const initialPitch = 30
      const newMouseX = e.originalEvent.gamma / 90 * 8
      const newMouseY = (e.originalEvent.beta - initialPitch) / -180 * 16

      if (Math.abs(newMouseX) < 1) {
        mouseX = newMouseX
      }

      if (Math.abs(newMouseY) < 1) {
        mouseY = newMouseY
      }
    })
  }
}

$(document).ready(() => {
  $('#viewport').append(renderer.domElement)
  $('#css-viewport').append(cssRenderer.domElement)

  registerEvents()
  onResize({initialResize: true})
  onScroll()
  animate()
})
