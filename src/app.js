import * as THREE from 'three-with-css3-renderer'
import $ from 'jquery'

import 'file-loader?name=favicon.ico!./favicon.ico'
import * as lights from './lights'
import {topNameCubes} from './cubes/top-name'
import {bottomNameCubes} from './cubes/bottom-name'
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

  const logoTopGroupInitialX = 6
  const logoBottomGroupInitialX = -6

  const scrollPromptY = cubeSize * -15
  const scrollPromptZ = cubeSize * -11
  const scrollPromptInitialY = scrollPromptY - 10

  const cameraFOV = 30
  const cameraDistance = 11

  const lightDistance = 3
  const lightCount = 7
  const lightRadius = 5
  const lightColor = 0xffffff

  const contentFontFactor = 2
  const contentScale = 0.009


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

  const logoTopGroup = new THREE.Group()
  logoTopGroup.position.set(
    logoTopGroupInitialX,
    cubeSize * -3,
    cubeSize * 3
  )

  addCubes(logoTopGroup, topNameCubes, cubeSize)
  logoGroup.add(logoTopGroup)

  const logoBottomGroup = new THREE.Group()
  logoBottomGroup.position.set(
    logoBottomGroupInitialX,
    cubeSize * 3,
    cubeSize * -3
  )
  addCubes(logoBottomGroup, bottomNameCubes, cubeSize)
  logoGroup.add(logoBottomGroup)

  const lightRing = lights.ring(lightCount, lightRadius, lightColor)
  lightRing.position.z = -lightDistance
  cameraGroup.add(lightRing)


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
          .html($('#content').text()))
        .get(0)))


  // Scroll prompt
  const scrollPromptGroup = new THREE.Group()
  scrollPromptGroup.position.y = scrollPromptInitialY
  scrollPromptGroup.position.z = scrollPromptZ

  const $scrollPrompt = $('<div><h4>Scroll!<br/><span>&#x27B8;</span></h4></div>')
    .css('font-size', contentFontFactor + 'em')
    .css('text-align', 'center')
  $scrollPrompt.find('span')
      .css('display', 'inline-block')
      .css('transform', 'rotateZ(90deg)')
  const scrollPrompt = new THREE.CSS3DObject($scrollPrompt.get(0))
  scrollPrompt.scale.set(objectScale, objectScale, objectScale)
  scrollPromptGroup.add(scrollPrompt)

  const $scrollPromptBackface = $('<div></div>')
    .css('font-size', contentFontFactor + 'em')
    .css('background-color', 'white')
    .css('width', 200)
    .css('height', '2.2em')
  const scrollPromptBackface = new THREE.CSS3DObject($scrollPromptBackface.get(0))
  scrollPromptBackface.position.z = -0.01
  scrollPromptBackface.rotation.x = Math.PI / -64
  scrollPromptBackface.scale.set(objectScale, objectScale, objectScale)
  scrollPromptGroup.add(scrollPromptBackface)

  group.add(scrollPromptGroup)


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

    const scrollPromptGroupPosition = scrollPromptGroup.position.clone()
    scrollPromptGroupPosition.y = scrollPromptY
    scrollPromptGroup.position.lerp(scrollPromptGroupPosition, 0.07)

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

    if (scrollRotation < Math.PI / -2 + 0.16) {
      $scrollPrompt.hide()
      $scrollPromptBackface.hide()
    } else {
      $scrollPrompt.show()
      $scrollPromptBackface.show()
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
