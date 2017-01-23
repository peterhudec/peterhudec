
export const ring = (n, r, color, showBulbs) => {
  const group = new THREE.Group()

  for (var i = 0; i < n; i++) {
    const x = Math.sin((Math.PI * 2) / n * i) * r
    const y = Math.cos((Math.PI * 2) / n * i) * r

    const light = new THREE.DirectionalLight(color)
    light.position.set(x, y, 0)
    group.add(light)

    if (showBulbs) {
      const bulb = new THREE.Mesh(
        new THREE.SphereGeometry(0.1, 32, 32),
        new THREE.MeshBasicMaterial({color: 0x000000})
      )
      bulb.position.set(x, y, 0)
      group.add(bulb)
    }
  }

  return group
}
