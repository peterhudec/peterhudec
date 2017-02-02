java -jar ./node_modules/google-closure-compiler/compiler.jar \
  --js node_modules/three/build/three.js \
  --js node_modules/css3drenderer/CSS3Drenderer-browser.js \
  --js build/bundle.js \
  --js_output_file gcc.js
