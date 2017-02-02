import babel from 'rollup-plugin-babel'
import nodeResolve from 'rollup-plugin-node-resolve'
import commonJs from 'rollup-plugin-commonjs'
// import visualizer from 'rollup-plugin-visualizer'
import uglify from 'rollup-plugin-uglify'
import filesize from 'rollup-plugin-filesize'


export default {
  entry: 'src/main.js',
  format: 'iife',
  globals: {
    three: 'THREE',
  },
  plugins: [
    babel({
      exclude: 'node_modules/**'
    }),
    commonJs({
      // namedExports: {
        // 'node_modules/css3drenderer/CSS3DRenderer.js': ['css3drenderer'],
        // 'node_modules/three/build/three.module.js': ['three']
        // 'node_modules/three/build/three.js': ['three']
      // }
    }),
    nodeResolve({
      browser: true,
      jsnext: true,
    }),
    // visualizer(),
    // uglify(),
    filesize(),
  ],
  dest: 'build/bundle.js',
  sourceMap: true,

  external: [
    'three',
    'css3drenderer',
    // 'jquery',
  ]
}
