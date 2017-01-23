import {default as $} from 'jquery'

var scene = new THREE.Scene()
var camera = new THREE.PerspectiveCamera(
  30,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
)
camera.position.z = 10
// var orthoFactor = 512
// var camera = new THREE.OrthographicCamera(
//   window.innerWidth / - orthoFactor,
//   window.innerWidth / orthoFactor,
//   window.innerHeight / orthoFactor,
//   window.innerHeight / - orthoFactor,
//   0.1,
//   1000
// )

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
// cssRenderer.setClearColor(0xffffff, 1)

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
  // .concat(shiftCubesBy(0, -3, -3, topName()))
  // .concat(shiftCubesBy(0, 3, 3, bottomName()))

addCubes(group, logo, cubeSize)


var lightsZ = -1
var lightsW = 3
// addLight(0xff0000, 0, 2 * lightsW, lightsZ)
// addLight(0xffff00, -1.8, 0.8, lightsZ)
// addLight(0x00ff00, -2, -1.3 * lightsW, lightsZ)
// addLight(0xff00ff, 1.8, 0.8, lightsZ)
// addLight(0x0000ff, 2, -1.3 * lightsW, lightsZ)
// addLight(0x00ffff, 0, -2, lightsZ)

function addLightRing(n, r, z) {
  for (var i = 0; i < n; i++) {
    var x = Math.sin((Math.PI * 2) / n * i) * r
    var y = Math.cos((Math.PI * 2) / n * i) * r
    addLight(0xffffff, x, y, z)
  }
}

addLightRing(7, 5, -3)

function addLight(color, x, y, z) {
  var light = new THREE.DirectionalLight(color)
  light.position.set(x, y, z)
  scene.add(light)

  // var sphere = new THREE.Mesh(
  //   new THREE.SphereGeometry(0.1, 32, 32),
  //   new THREE.MeshBasicMaterial({color: 0})
  // )
  // sphere.position.set(x, y, z)
  // scene.add(sphere)
}


////////////////////////////////////
var $backface = $('#content-backface')
var backface = new THREE.CSS3DObject($backface.get(0));
var object = new THREE.CSS3DObject($('#content').get(0));
// object = new THREE.CSS3DObject(number);

// var objectScale = 0.002
var fontFactor = 2
var objectScale = cubeSize * 0.1 / fontFactor
object.scale.set(objectScale, objectScale, objectScale)

object.position.y = -12 * cubeSize
object.position.z = -12 * cubeSize
object.rotation.x = Math.PI / 2


backface.scale.set(objectScale, objectScale, objectScale)

backface.position.y = -12 * cubeSize + 0.01
backface.position.z = -12 * cubeSize
backface.rotation.x = Math.PI / 2
window.backface = backface

window.object = object

group.add(object);
group.add(backface)
////////////////////////////////////




function render() {
	requestAnimationFrame(render)
  group.rotation.x += 0.01
  group.rotation.y += 0.01

	renderer.render(scene, camera)
}

// render()

/**
* Hyperbole passing through (n, m) with slope (s) and asymptote (a)
*/
function hyperbole (n, m, c, a) {
  return function (x) {
    return - 1 / (x * 1 / c + 1 / (a - m) - n) + a
  }
}


document.onmousemove = function (event) {
  // group.rotation.x = (window.innerHeight / 2 - event.pageY) * .007

  camera.position.x = (window.innerWidth / 2 - event.pageX) * -.013
  camera.rotation.y = (window.innerWidth / 2 - event.pageX) * -.0013

  // console.log(group.rotation.x)
  renderer.render(scene, camera)
  cssRenderer.render(scene, camera)
}

// var startingRotation = Math.PI / 2
// var startingRotation = Math.PI / 2
var rotationFunction = hyperbole(0, 0, 10, Math.PI / (2 - 0.3) )

document.onscroll = function (event) {
  var scrollTop = document.body.scrollTop | document.documentElement.scrollTop

  // var rotation = scrollTop * -.007 + startingRotation
  var rotation = - rotationFunction(scrollTop / 10)
  console.log(scrollTop, rotation)
  group.rotation.x = rotation
  group.position.y = scrollTop * 0.01


  // group.rotation.x = 0

  // camera.position.x = (window.innerWidth / 2 - event.pageX) * -.013
  // camera.rotation.y = (window.innerWidth / 2 - event.pageX) * -.0013

  renderer.render(scene, camera)
  cssRenderer.render(scene, camera)
}

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
