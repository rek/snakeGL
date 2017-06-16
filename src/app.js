// /import shaderV1 from './shaders/vertex1.glsl'
import {AppContainer} from 'react-hot-loader';
import shaderV1 from './engine'
console.log('shaderV1', shaderV1);

let Engine = {
	gl: false,

	init() {
		let canvas = document.getElementById('app')
		this.gl = canvas.getContext('webgl')
		this.gl.viewport(0, 0, canvas.width, canvas.height)
		this.gl.clearColor(0.9, 0.9, 0.9 ,1)
	},

	draw() {
		this.gl.clear(this.gl.COLOR_BUFFER_BIT)
	},

	debug() {
		console.log('this', this);
		console.log('this.gl', this.gl);
	},

	createShader() {
		// let vertexShader = getShader(shaderV1)
	},

	createVertices() {

	},
}

Engine.init()
Engine.debug()
Engine.draw()
Engine.debug()
