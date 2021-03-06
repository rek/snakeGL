import Drawable from './drawable'
import _ from 'lodash-fp'

const loopEdges = (positions, edge) => {
	const newPositions = _.clone(positions)

	if (positions[0].toFixed(2) > edge) {
		newPositions[0] = edge * -1
	}

	if (positions[0].toFixed(2) < -edge) {
		newPositions[0] = edge
	}

	if (positions[1].toFixed(2) > edge) {
		newPositions[1] = edge * -1
	}

	if (positions[1].toFixed(2) < -edge) {
		newPositions[1] = edge
	}

	return newPositions
}

const Snake = {
	vertices: [],

	speed: 0.02,
	direction: [0, 0],
	edge: 0.96,

	positionX: 0,
	positionY: 0,

	alive: true,

	start(context) {
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
		this.context = context

		// this.move = this.move.bind(this)

		this.createShader(this.context)
		// this.createVertices(this.context, this.vertices, 20)
	},

	resetSpeed() {
		this.direction = [0, 0]
	},

	// addDot() {
	// 	this.vertices.push(0.0)
	// 	this.vertices.push(0.0)
	// 	this.vertices.push(0.0)
	// 	// console.log('this.vertices', this.vertices);
	// 	this.gl.bindBuffer(this.gl.ARRAY_BUFFER, null)
	// 	let buffer = this.gl.createBuffer()
	// 	this.gl.bindBuffer(this.gl.ARRAY_BUFFER, buffer)
	// 	this.fillBuffer()
	// 	this.updateBuffer()

	// 	// this.vertices.push(0.0)
	// 	// this.vertices.push(0.0)
	// },

	keepMoving() {
		this.vertices[0] += this.direction[0]
		this.vertices[1] += this.direction[1]

		this.vertices = loopEdges(this.vertices, this.edge)
		// console.log('SNAKES this.vertices', this.vertices);
	},

	move(x = 0, y = 0) {
		x = x * this.speed
		y = y * this.speed
		// this.log('Moving x', x, 2);
		// this.log('Moving y', y, 2);

		this.direction = [x, y]

		// this.log('Moving:', this.direction, 2);

		// not used:
		// this.addDot()
		// this.vertices[0] += this.direction[0]
		// this.vertices[1] += this.direction[1]
	},

	draw() {
		if (!this.alive) {
			console.error('GAME OVER!')
			return false
		}

		this.keepMoving()
		// this.updateBuffer()


		this.createVertices(this.context, this.vertices, 20)
		// update buffer
		this.updateBuffer(this.context)

		// draw
		this.context.drawArrays(
			this.context.POINTS,
			0,
			1 // amount of objects in buffer to draw
			// (this.vertices.length / 3)
		)

		// this.gl.drawArrays(this.gl.TRIANGLES, 0, 3)

		// requestAnimationFrame(this.draw.bind(this))
		// this.log('Drawing.')

		return true
	},
}

export const snakeFactory = (name) => Object.assign(
	Object.create(Snake),
	Drawable,
	{
		name
	}
);
