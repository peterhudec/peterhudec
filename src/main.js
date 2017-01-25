import {default as $} from 'jquery'

import * as lights from './lights'
import {logo} from './cubes/logo'
import {scrollMessage} from './cubes/scroll'
import {addCubes} from './cubes/utils'


const createRendererElement = renderer =>
  $('<div>')
    .css('position', 'fixed')
    .css('left', 0)
    .css('right', 0)
    .css('height', '100%')
    .append(renderer.domElement)


const wrapContentElement = $element =>
  $('<div>')
    .css('width', '90%')
    .css('max-width', 800)
    .append($element)


// Hyperbole passing through (n, m) with slope (c) and asymptote (a)
function hyperbole (n, m, c, a) {
  return function (x) {
    return - 1 / (x * 1 / c + 1 / (a - m) - n) + a
  }
}


$(document).ready(() => {
  // Configuration
  const cubeSize = 0.1

  // Global variables
  let scrollRotation = 0
  let scrollPosition = 0
  let mouseX = 0
  let mouseY = 0

  const $window = $(window)
  const $body = $('body')

  // Renderers

  const webGLRenderer = new THREE.WebGLRenderer({
    antialias: true,
    alpha: true,
  })
  webGLRenderer.setClearColor(0xffffff, 0)
  const $webGLViewport = createRendererElement(webGLRenderer)
  $body.prepend($webGLViewport)


  const cssRenderer = new THREE.CSS3DRenderer({
    antialias: true
  })
  const $CSSViewport = createRendererElement(cssRenderer)
  $body.prepend($CSSViewport)

  // Scene
  const scene = new THREE.Scene()


  // Camera
  const camera = new THREE.PerspectiveCamera(
    30,
    $window.width() / $window.height(),
    0.1,
    1000
  )
  const cameraGroup = new THREE.Group()
  cameraGroup.add(camera)
  cameraGroup.position.set(0, 0, 0)
  camera.position.z = 10
  scene.add(cameraGroup)


  // Main group
  const group = new THREE.Group()
  scene.add(group)

  const logoGroup = new THREE.Group()
  logoGroup.rotation.x = Math.PI / 2
  group.add(logoGroup)
  addCubes(logoGroup, logo, cubeSize)

  const lightRing = lights.ring(7, 5, 0xffffff)
  lightRing.position.z = -3
  cameraGroup.add(lightRing)

  const scrollLabel = new THREE.Group()
  addCubes(scrollLabel, scrollMessage, cubeSize * 0.25)
  scrollLabel.position.set(0, -40 * cubeSize, -60 * cubeSize)
  group.add(scrollLabel)


  // Content
  const fontFactor = 2
  const objectScale = cubeSize * 0.1 / fontFactor

  const contentGroup = new THREE.Group()
  contentGroup.position.y = -20 * cubeSize
  contentGroup.position.z = -10 * cubeSize
  contentGroup.rotation.x = Math.PI / 2
  contentGroup.scale.set(objectScale, objectScale, objectScale)
  group.add(contentGroup)

  const $contentBackface = wrapContentElement(
    $('<div>')
      .css('position', 'absolute')
      .css('width', '100%')
      .css('height', 10000)
      .css('background-color', 'white'))

  const contentBackface = new THREE.CSS3DObject($contentBackface.get(0))
  contentBackface.position.set(0, 0, -0.01)
  contentGroup.add(contentBackface)

  contentGroup.add(
    new THREE.CSS3DObject(
      wrapContentElement(
        $('<div>')
          .css('position', 'absolute')
          .css('width', '100%')
          .css('font-size', '1.5em')
          .html($('#content').text()))
        .get(0)))

  function render() {
    // http://jsfiddle.net/DLta8/143/
    var newGroupPosition = group.position.clone()
    newGroupPosition.y = scrollPosition
    group.position.lerp(newGroupPosition, 0.07)

    const groupQuarternion = new THREE.Quaternion()
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

    webGLRenderer.render(scene, camera)
    cssRenderer.render(scene, camera)
  }

  function animate() {
    requestAnimationFrame(animate)
    render()
  }

  const FOVVector = new THREE.Vector3(0, 0, 3500)
  camera.position.z = 1000

  function renderFOV() {
    const duration = 0.07

    const cameraVector = group.position.clone()
    cameraVector.z = 9
    camera.position.lerp(cameraVector, duration)

    const newFOFOVVector = FOVVector.clone()
    newFOFOVVector.z = 30
    FOVVector.lerp(newFOFOVVector, duration)

    camera.setFocalLength(FOVVector.z)
    camera.updateProjectionMatrix()

    webGLRenderer.render(scene, camera)

    if (camera.position.z <= 10) {
      return false
    }

    return true
  }

  function FOVAnimation(onEnd) {
    if (renderFOV()) {
      requestAnimationFrame(() => FOVAnimation(onEnd))
    } else {
      console.log('stop')
      onEnd()
    }
  }

  const rotationFunction = hyperbole(0, 0, 15, Math.PI / (2 - 0.3))

  const onResize = e => {
    const width = $window.width()
    const height = $window.height()

    camera.aspect = width / height
    camera.updateProjectionMatrix()

    webGLRenderer.setSize(width, height)
    cssRenderer.setSize(width, height)

    webGLRenderer.render(scene, camera)
    cssRenderer.render(scene, camera)
  }

  const onScroll = () => {
    const scrollTop = $window.scrollTop()

    scrollRotation = - rotationFunction(scrollTop / 10)
    scrollPosition = scrollTop * 0.01

    if (scrollRotation < Math.PI / -4) {
      $contentBackface.hide()
      $CSSViewport.css('z-index', 1000)
    } else {
      $contentBackface.show()
      $CSSViewport.css('z-index', -1000)
    }
  }

  const registerEvents = () => {
    $window
      .on('resize', onResize)
      .on('scroll', onScroll)
      .on('mousemove', e => {
        mouseX = e.clientX / $webGLViewport.width() * 2 - 1
        mouseY = - e.clientY / $webGLViewport.height() * 2 + 1
      })

    if (window.DeviceOrientationEvent && 'ontouchstart' in window) {
      $window.on('deviceorientation', e => {
        const orientation = screen.orientation
          || screen.mozOrientation
          || screen.msOrientation

        const initialPitch = 30
        const pitchFactor = 16
        const yawFactor = 8

        let newMouseX, newMouseY
        if (orientation.type.endsWith('secondary')) {
          newMouseY = (e.originalEvent.gamma - initialPitch) / -90 * pitchFactor
          newMouseX = (e.originalEvent.beta) / -180 * yawFactor
        } else {
          newMouseX = e.originalEvent.gamma / 90 * yawFactor
          newMouseY = (e.originalEvent.beta - initialPitch) / -180 * pitchFactor
        }

        if (Math.abs(newMouseX) < 1) {
          mouseX = newMouseX
        }

        if (Math.abs(newMouseY) < 1) {
          mouseY = newMouseY
        }
      })
    }
  }

  registerEvents()
  onResize()
  onScroll()
  FOVAnimation(animate)
})
