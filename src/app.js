import $ from 'jquery'

import * as lights from './lights'

import {topNameCubes} from './cubes/top-name'
import {bottomNameCubes} from './cubes/bottom-name'

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
    .css('width', '110%')
    .css('max-width', 1100)
    .append($element)


// Hyperbole passing through (n, m) with slope (c) and asymptote (a)
function hyperbole (n, m, c, a) {
  return function (x) {
    return - 1 / (x * 1 / c + 1 / (a - m) - n) + a
  }
}

// Converts the normalized mouse Y coordinate
// to rotation of the main group in radians.
const rotationFunction = hyperbole(0, 0, 15, Math.PI / (2 - 0.3))


export const app = () => {
  // Configuration
  const cubeSize = 0.1

  const scrollCubeSize = cubeSize * 0.25
  const scrollLabelY = cubeSize * -35
  const scrollLabelZ = cubeSize * -80

  const cameraFOV = 30
  const cameraDistance = 11

  const lightDistance = 3
  const lightCount = 7
  const lightRadius = 5
  const lightColor = 0xffffff

  const contentFontFactor = 2
  const contentScale = 0.01


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
    cameraFOV,
    $webGLViewport.width() / $webGLViewport.height()
  )
  camera.position.z = cameraDistance

  const cameraGroup = new THREE.Group()
  cameraGroup.add(camera)
  scene.add(cameraGroup)


  // Main group
  const group = new THREE.Group()
  scene.add(group)


  const logoGroup = new THREE.Group()
  logoGroup.rotation.x = Math.PI / 2
  group.add(logoGroup)
  // addCubes(logoGroup, logo, cubeSize)

  const logoTopGroup = new THREE.Group()
  logoTopGroup.position.set(0, cubeSize * 6, cubeSize * -6)
  addCubes(logoTopGroup, topNameCubes, cubeSize)
  logoGroup.add(logoTopGroup)

  const logoBottomGroup = new THREE.Group()
  logoTopGroup.position.set(0, cubeSize * -6, cubeSize * 6)
  addCubes(logoBottomGroup, bottomNameCubes, cubeSize)
  logoGroup.add(logoBottomGroup)

  const lightRing = lights.ring(lightCount, lightRadius, lightColor)
  lightRing.position.z = -lightDistance
  cameraGroup.add(lightRing)

  const scrollLabel = new THREE.Group()
  addCubes(scrollLabel, scrollMessage, scrollCubeSize)
  scrollLabel.position.set(0, scrollLabelY, scrollLabelZ)
  group.add(scrollLabel)

  // Content
  const objectScale = contentScale / contentFontFactor

  const contentGroup = new THREE.Group()
  contentGroup.position.y = cubeSize * -20
  contentGroup.position.z = cubeSize * -10
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
  contentBackface.position.set(0, 0, -1)
  contentGroup.add(contentBackface)

  contentGroup.add(
    new THREE.CSS3DObject(
      wrapContentElement(
        $('<div>')
          .css('position', 'absolute')
          .css('width', '100%')
          .css('font-size', contentFontFactor + 'em')
          // .css('font-size', '1.5em')
          .html($('#content').text()))
        .get(0)))


  logoTopGroup.position.x = 6
  logoBottomGroup.position.x = -6
  scrollLabel.position.y = scrollLabelY - 10
  
  function render() {
    // Quaternion animations taken from this example.
    // http://jsfiddle.net/DLta8/143/
    var newGroupPosition = group.position.clone()
    newGroupPosition.y = scrollPosition
    group.position.lerp(newGroupPosition, 0.07)

    const groupQuarternion = new THREE.Quaternion()
      .setFromEuler(new THREE.Euler(scrollRotation, 0, 0, 'XYZ'))
    group.quaternion.slerp(groupQuarternion, 0.07)

    const cameraRotationFactor = 0.3
    const cameraDirection = -1
    const cameraRotationX = mouseY * cameraRotationFactor * cameraDirection
    const cameraRotationY = mouseX * cameraRotationFactor * -cameraDirection
    const cameraQuaternion = new THREE.Quaternion()
      .setFromEuler(new THREE.Euler(cameraRotationX, cameraRotationY, 0, 'XYZ'))
    cameraGroup.quaternion.slerp(cameraQuaternion, 0.07)


    const logoTopGroupPosition = logoTopGroup.position.clone()
    logoTopGroupPosition.x = 0
    logoTopGroup.position.lerp(logoTopGroupPosition, 0.07)

    const logoBottomGroupPosition = logoBottomGroup.position.clone()
    logoBottomGroupPosition.x = 0
    logoBottomGroup.position.lerp(logoBottomGroupPosition, 0.07)

    const scrollLabelPosition = scrollLabel.position.clone()
    scrollLabelPosition.y = scrollLabelY
    scrollLabel.position.lerp(scrollLabelPosition, 0.07)

    webGLRenderer.render(scene, camera)
    cssRenderer.render(scene, camera)
  }

  function animate() {
    requestAnimationFrame(animate)
    render()
  }

  const onResize = e => {
    const width = $webGLViewport.width()
    const height = $webGLViewport.height()

    camera.aspect = width / height

    webGLRenderer.setSize(width, height)
    cssRenderer.setSize(width, height)

    webGLRenderer.render(scene, camera)
    cssRenderer.render(scene, camera)


    camera.updateProjectionMatrix()
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

  onResize()
  onScroll()
  registerEvents()
  animate()
}