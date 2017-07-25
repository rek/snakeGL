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

	init(datas) {
		const canvases = {}

		for (const config of datas) {
			const canvas = Canvas.Create(config.mode)

			canvas.init(config.id, config.focus)

			canvases[config.id] = canvas
		}

		this.startTime = new Date();

		return canvases
	},

	fillBuffer(context) {
		context.bufferData(
			context.ARRAY_BUFFER, // where it will be
			new Float32Array(this.vertices), // the data
			// context.STATIC_DRAW // how we will use the data
			context.DYNAMIC_DRAW // use a lot and change alot
		)
	},

	updateBuffer(context) {
		// update some subset of data in buffer
		context.bufferSubData(
			context.ARRAY_BUFFER, // where it will be
			0, // offset
			new Float32Array(this.vertices), // the data
		)
	},

	createShader(context) {
		// let vertexShader = vertex1
		let vertexShader = context.createShader(context.VERTEX_SHADER)
		context.shaderSource(vertexShader, vertex1)
		context.compileShader(vertexShader)

		let fragmentShader = context.createShader(context.FRAGMENT_SHADER)
		context.shaderSource(fragmentShader, fragment1)
		context.compileShader(fragmentShader)

		this.shaderProgram = context.createProgram()
		context.attachShader(this.shaderProgram, vertexShader)
		context.attachShader(this.shaderProgram, fragmentShader)
		context.linkProgram(this.shaderProgram)
		context.useProgram(this.shaderProgram)
	},

	createVertices(context) {
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

		let buffer = context.createBuffer()
		// put the data in the buffer
		context.bindBuffer(context.ARRAY_BUFFER, buffer)
		this.fillBuffer(context)

		let coords = context.getAttribLocation(this.shaderProgram, 'coords')

		// say whats in the buffer
		context.vertexAttribPointer(
			coords,
			2,
			context.FLOAT,
			false,
			0,
			0
		)

		context.enableVertexAttribArray(coords)
		// now we are finished with the buffer, we can unbind it
		// context.bindBuffer(context.ARRAY_BUFFER, null)

		let pointSize = context.getAttribLocation(this.shaderProgram, 'pointSize')
		context.vertexAttrib1f(pointSize, 20)

		let colour = context.getUniformLocation(this.shaderProgram, 'colour')
		context.uniform4f(colour, 0, 0, 0, 1)
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
