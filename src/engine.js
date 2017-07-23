// vertex shader
import vertex1 from './shaders/vertex1.vs'
// fragment shader
import fragment1 from './shaders/fragment1.fs'
// console.log('vertex1:', vertex1);
// console.log('fragment1:', fragment1);

import {Canvas} from './canvasCreator'

export default {
	gl: false,
	shaderProgram: false,

	init() {
		this.canvas2d = Canvas.Create('2d')
		this.context2d = this.canvas2d.init('snakeInfo')

		this.canvasGl = Canvas.Create('3d')
		this.contextGl = this.canvasGl.init('snake', true)
		this.startTime = new Date();

		return {
			text: this.context2d,
			game: this.contextGl,
		}
	},

	fillBuffer() {
		this.contextGl.bufferData(
			this.contextGl.ARRAY_BUFFER, // where it will be
			new Float32Array(this.vertices), // the data
			// this.contextGl.STATIC_DRAW // how we will use the data
			this.contextGl.DYNAMIC_DRAW // use a lot and change alot
		)
	},

	updateBuffer() {
		// update some subset of data in buffer
		this.contextGl.bufferSubData(
			this.contextGl.ARRAY_BUFFER, // where it will be
			0, // offset
			new Float32Array(this.vertices), // the data
		)
	},

	createShader() {
		// let vertexShader = vertex1
		let vertexShader = this.contextGl.createShader(this.contextGl.VERTEX_SHADER)
		this.contextGl.shaderSource(vertexShader, vertex1)
		this.contextGl.compileShader(vertexShader)

		let fragmentShader = this.contextGl.createShader(this.contextGl.FRAGMENT_SHADER)
		this.contextGl.shaderSource(fragmentShader, fragment1)
		this.contextGl.compileShader(fragmentShader)

		this.shaderProgram = this.contextGl.createProgram()
		this.contextGl.attachShader(this.shaderProgram, vertexShader)
		this.contextGl.attachShader(this.shaderProgram, fragmentShader)
		this.contextGl.linkProgram(this.shaderProgram)
		this.contextGl.useProgram(this.shaderProgram)
	},

	createVertices() {
		this.vertices = [
			0.0, 0.0, 0.0,
			0.0, 0.0, 0.0,
			0.0, 0.0, 0.0,
			0.0, 0.0, 0.0,
			0.0, 0.0, 0.0,
			0.0, 0.0, 0.0,
			0.0, 0.0, 0.0,
			0.0, 0.0, 0.0,
			0.0, 0.0, 0.0,
			0.0, 0.0, 0.0,
		]

		let buffer = this.contextGl.createBuffer()
		// put the data in the buffer
		this.contextGl.bindBuffer(this.contextGl.ARRAY_BUFFER, buffer)
		this.fillBuffer()

		let coords = this.contextGl.getAttribLocation(this.shaderProgram, 'coords')

		// say whats in the buffer
		this.contextGl.vertexAttribPointer(
			coords,
			2,
			this.contextGl.FLOAT,
			false,
			0,
			0
		)

		this.contextGl.enableVertexAttribArray(coords)
		// now we are finished with the buffer, we can unbind it
		// this.contextGl.bindBuffer(this.contextGl.ARRAY_BUFFER, null)

		let pointSize = this.contextGl.getAttribLocation(this.shaderProgram, 'pointSize')
		this.contextGl.vertexAttrib1f(pointSize, 20)

		let colour = this.contextGl.getUniformLocation(this.shaderProgram, 'colour')
		this.contextGl.uniform4f(colour, 0, 0, 0, 1)
	},

	log(msg, data, level = 1) {
		if (level === 1) {
			console.log(msg, data ? data : '');
		}
	},

	debug() {
		this.log('this', this);
		this.log('this.gl', this.gl);
	},
}
