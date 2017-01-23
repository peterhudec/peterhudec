import {default as $} from 'jquery'

import * as lights from './lights'

var scene = new THREE.Scene()
var camera = new THREE.PerspectiveCamera(
  30,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
)
var cameraGroup = new THREE.Group()
scene.add(cameraGroup)

cameraGroup.add(camera)
cameraGroup.position.set(0, 0, 0)
camera.position.z = 10


var renderer = new THREE.WebGLRenderer({
  antialias: true,
  alpha: true,
})
renderer.setSize(window.innerWidth, window.innerHeight)
renderer.setClearColor(0xffffff, 0)

var cssRenderer = new THREE.CSS3DRenderer({
  antialias: true
})
cssRenderer.setSize(window.innerWidth, window.innerHeight)

document.getElementById('viewport').appendChild(renderer.domElement)
document.getElementById('css-viewport').appendChild(cssRenderer.domElement)

var geometry = new THREE.CubeGeometry(1, 1, 1)
var material = new THREE.MeshBasicMaterial({color: 0x222222})

var group = new THREE.Group()
scene.add(group)

var cubeSize = 0.1

var planeHeight = 100
var plane = new THREE.Mesh(
  new THREE.BoxGeometry(
    50 * cubeSize,
    cubeSize,
    planeHeight * cubeSize
  ),
  new THREE.MeshBasicMaterial({color: 0xff0000})
)
plane.position.set(
  0 * cubeSize,
  -12 * cubeSize,
  (-12 - (planeHeight / 2)) * cubeSize
)
// group.add(plane)

var plane2 = new THREE.Mesh(
  // new THREE.PlaneGeometry(50 * cubeSize, planeHeight * cubeSize),
  new THREE.PlaneGeometry(50 * cubeSize, planeHeight * cubeSize),
  new THREE.MeshBasicMaterial({
      color: 0xff0000
  })
)
plane2.position.y = -12 * cubeSize
plane2.position.z = (-12 - (planeHeight / 2)) * cubeSize
plane2.rotation.x = Math.PI / 2
// group.add(plane2)


var logo = []
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
var $backface = $('#content-backface')
var backface = new THREE.CSS3DObject($backface.get(0));
var object = new THREE.CSS3DObject($('#content').get(0));
// object = new THREE.CSS3DObject(number);

// var objectScale = 0.002
var fontFactor = 2
var objectScale = cubeSize * 0.1 / fontFactor
object.scale.set(objectScale, objectScale, objectScale)

object.position.y = -26 * cubeSize
object.position.z = -10 * cubeSize
object.rotation.x = Math.PI / 2


backface.scale.set(objectScale, objectScale, objectScale)

backface.position.y = -26 * cubeSize + 0.01
backface.position.z = -10 * cubeSize
backface.rotation.x = Math.PI / 2
window.backface = backface

window.object = object

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

var scrollRotation = 0
var scrollPosition = 0
var mouseX = 0
var mouseY = 0

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

animate()

registerEvents()

const rotationFunction = hyperbole(0, 0, 10, Math.PI / (2 - 0.3))

function registerEvents () {

  $(window).on('resize', e => {
      const width = $(window).width()
      const height = $(window).height()

      camera.aspect = width / height
      camera.updateProjectionMatrix()

      renderer.setSize(width, height)
      cssRenderer.setSize(width, height)

      renderer.render(scene, camera)
      cssRenderer.render(scene, camera)

    })
  .on('scroll', () => {
      const scrollTop = document.body.scrollTop
        | document.documentElement.scrollTop

      scrollRotation = - rotationFunction(scrollTop / 10)
      scrollPosition = scrollTop * 0.01
    })
  .on('mousemove', e => {
    mouseX = e.screenX / window.innerWidth * 2 - 1;
    mouseY = - e.screenY / window.innerHeight * 2 + 1;
  }).on('deviceorientation', e => {
    const initialPitch = 30
    mouseY = (e.originalEvent.beta - initialPitch) / -180 * 16
    mouseX = e.originalEvent.gamma / 90 * 8
  })
}
