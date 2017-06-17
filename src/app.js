import React from 'react';
import ReactDOM from 'react-dom';
import Wrapper from './wrapper'
import {AppContainer} from 'react-hot-loader';

// vertex shader
import vertex1 from './shaders/vertex1.vs'
// fragment shader
import fragment1 from './shaders/fragment1.fs'
// console.log('vertex1:', vertex1);
// console.log('fragment1:', fragment1);

let Engine = {
	gl: false,
	shaderProgram: false,
	vertices: [],
	verticeCount: 1,


	speed: 0.02,
	direction: [0, 0],

	positionX: 0,
	positionY: 0,

	init() {
		this.canvas = document.getElementById('snake')
		this.canvas.focus() // so key watching is ready
		this.gl = this.canvas.getContext('webgl')
		this.gl.viewport(0, 0, this.canvas.width, this.canvas.height)
		this.gl.clearColor(0.9, 0.9, 0.9 ,1)
	},

	watchKeys() {
		this.canvas.addEventListener('keydown', (e) => {
			// console.log('nice', e);
			switch (e.code) {
				case "ArrowLeft": this.move(-1, 0); break;
				case "ArrowRight": this.move(1, 0); break;
				case "ArrowUp": this.move(0, 1); break;
				case "ArrowDown": this.move(0, -1); break;
				default: break;
			}
		})
	},

	resetSpeed() {
		this.direction = [0, 0]
	},

	keepMoving() {
		this.vertices[0] += this.direction[0]
		this.vertices[1] += this.direction[1]

		let edge = 0.95

		if (this.vertices[0].toFixed(2) >= edge ||
		    this.vertices[0].toFixed(2) <= -edge ||
		    this.vertices[1].toFixed(2) >= edge ||
		    this.vertices[1].toFixed(2) <= -edge
	    ) {
			this.resetSpeed()
		}
	},

	move(x = 0, y = 0) {
		x = x * this.speed
		y = y * this.speed
		this.log('Moving x', x, 2);
		this.log('Moving y', y, 2);

		this.direction = [x, y]

		this.log('Moving:', this.direction, 2);

		// this.vertices[0] += this.direction[0]
		// this.vertices[1] += this.direction[1]
	},

	draw() {
		this.keepMoving()
		this.updateBuffer()

		this.gl.clear(this.gl.COLOR_BUFFER_BIT)

		this.gl.drawArrays(this.gl.POINTS, 0, this.verticeCount)
		// this.gl.drawArrays(this.gl.TRIANGLES, 0, 3)

		requestAnimationFrame(this.draw.bind(this))
		// this.log('Drawing.')
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

	createShader() {
		// let vertexShader = vertex1
		let vertexShader = this.gl.createShader(this.gl.VERTEX_SHADER)
		this.gl.shaderSource(vertexShader, vertex1)
		this.gl.compileShader(vertexShader)

		let fragmentShader = this.gl.createShader(this.gl.FRAGMENT_SHADER)
		this.gl.shaderSource(fragmentShader, fragment1)
		this.gl.compileShader(fragmentShader)

		this.shaderProgram = this.gl.createProgram()
		this.gl.attachShader(this.shaderProgram, vertexShader)
		this.gl.attachShader(this.shaderProgram, fragmentShader)
		this.gl.linkProgram(this.shaderProgram)
		this.gl.useProgram(this.shaderProgram)
	},

	createVertices() {
		this.vertices = [
			0.0, 0.0, 0.0,
		]

		let buffer = this.gl.createBuffer()
		// put the data in the buffer
		this.gl.bindBuffer(this.gl.ARRAY_BUFFER, buffer)
		this.fillBuffer()

		let coords = this.gl.getAttribLocation(this.shaderProgram, 'coords')

		// say whats in the buffer
		this.gl.vertexAttribPointer(coords, 2, this.gl.FLOAT, false, 0, 0)
		this.gl.enableVertexAttribArray(coords)
		// now we are finished with the buffer, we can unbind it
		// this.gl.bindBuffer(this.gl.ARRAY_BUFFER, null)

		let pointSize = this.gl.getAttribLocation(this.shaderProgram, 'pointSize')
		this.gl.vertexAttrib1f(pointSize, 20)

		let colour = this.gl.getUniformLocation(this.shaderProgram, 'colour')
		this.gl.uniform4f(colour, 0, 0, 0, 1)
	},

	fillBuffer() {
		this.gl.bufferData(
			this.gl.ARRAY_BUFFER, // where it will be
			new Float32Array(this.vertices), // the data
			// this.gl.STATIC_DRAW // how we will use the data
			this.gl.DYNAMIC_DRAW // use a lot and change alot
		)
	},

	updateBuffer() {
		// update some subset of data in buffer
		this.gl.bufferSubData(
			this.gl.ARRAY_BUFFER, // where it will be
			0, // offset
			new Float32Array(this.vertices), // the data
		)
	},
}

Engine.init()
Engine.createShader()
Engine.createVertices()
Engine.draw()
Engine.watchKeys()
Engine.debug()

const render = (Component) => {
	ReactDOM.render(
		<AppContainer>
			<Component />
		</AppContainer>,
		document.getElementById('app')
	)
}

render(Wrapper)

if (module.hot) {
	module.hot.accept('./wrapper', () => { render(Wrapper) })
}
