import * as THREE from 'three'


const glossyMaterial = new THREE.MeshPhongMaterial({
    color: 0xffffff,
    specular: 0xffffff,
    shininess: 100
})

export const addCubes = (group, cubes, size) => {
  cubes.forEach(function (c) {
    const cube = new THREE.Mesh(new THREE.BoxGeometry(size, size, size), glossyMaterial)
    cube.position.set(
      c[0] * size,
      c[1] * size,
      c[2] * size)
    group.add(cube)
  })
}

export const shiftCubesBy = (x, y, z, cubes) => {
  return cubes.map(function (c) {
    return [
      c[0] + x,
      c[1] + y,
      c[2] + z,
    ]
  })
}

export const bar1x1x1 = [
  [0, 0, 0],
]

export const bar1x1x2 = [
  [0, 0, 0],
  [0, 0, 1],
]

export const bar1x2x1 = [
  [0, 0, 0],
  [0, 1, 0],
]

export const bar5x1x1 = [
  [-2, 0, 0],
  [-1, 0, 0],
  [0, 0, 0],
  [1, 0, 0],
  [2, 0, 0],
]

export const bar1x5x1 = [
  [0, -2, 0],
  [0, -1, 0],
  [0, 0, 0],
  [0, 1, 0],
  [0, 2, 0],
]

export const bar1x1x5 = [
  [0, 0, -2],
  [0, 0, -1],
  [0, 0, 0],
  [0, 0, 1],
  [0, 0, 2],
]

export const bar3x1x1 = [
  [-1, 0, 0],
  [0, 0, 0],
  [1, 0, 0],
]

export const bar1x3x1 = [
  [0, -1, 0],
  [0, 0, 0],
  [0, 1, 0],
]

export const bar1x1x3 = [
  [0, 0, -1],
  [0, 0, 0],
  [0, 0, 1],
]

export const bar4x1x1 = [
  [-2, 0, 0],
  [-1, 0, 0],
  [0, 0, 0],
  [1, 0, 0],
]

export const bar1x4x1 = [
  [0, -2, 0],
  [0, -1, 0],
  [0, 0, 0],
  [0, 1, 0],
]

export const bar1x1x4 = [
  [0, 0, -2],
  [0, 0, -1],
  [0, 0, 0],
  [0, 0, 1],
]

export const flatU = []
  .concat(shiftCubesBy(-2, 0, 0, bar1x1x5))
  .concat(shiftCubesBy(0, 0, 2, bar3x1x1))
  .concat(shiftCubesBy(2, 0, 0, bar1x1x5))

export const standingH = []
  .concat(shiftCubesBy(0, 0, 0, bar5x1x1))
  .concat(shiftCubesBy(-2, -2, 0, bar1x2x1))
  .concat(shiftCubesBy(2, -2, 0, bar1x2x1))
  .concat(shiftCubesBy(-2, 1, 0, bar1x2x1))

export const standingU = []
  .concat(shiftCubesBy(0, -2, 0, bar5x1x1))
  .concat(shiftCubesBy(2, 1, 0, bar1x4x1))
  .concat(shiftCubesBy(-2, 1, 0, bar1x4x1))
