import React from 'react';
import ReactDOM from 'react-dom';
import Wrapper from './wrapper'
import {AppContainer} from 'react-hot-loader';

import Engine from './engine'
import Food from './food'

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

let Snake = {
	vertices: [],

	speed: 0.02,
	direction: [0, 0],
	edge: 0.96,

	positionX: 0,
	positionY: 0,

	apples: 0,

	startTime: 0,
	totalTime: 0,
	foodAddInterval: 2,

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

	addDot() {
		this.vertices.push(0.0)
		this.vertices.push(0.0)
		this.vertices.push(0.0)
		// console.log('this.vertices', this.vertices);
		this.gl.bindBuffer(this.gl.ARRAY_BUFFER, null)
		let buffer = this.gl.createBuffer()
		this.gl.bindBuffer(this.gl.ARRAY_BUFFER, buffer)
		this.fillBuffer()
		this.updateBuffer()

		// this.vertices.push(0.0)
		// this.vertices.push(0.0)
	},

	keepMoving() {
		this.vertices[0] += this.direction[0]
		this.vertices[1] += this.direction[1]

		this.vertices = loopEdges(this.vertices, this.edge)
	},

	move(x = 0, y = 0) {
		x = x * this.speed
		y = y * this.speed
		this.log('Moving x', x, 2);
		this.log('Moving y', y, 2);

		this.direction = [x, y]

		this.log('Moving:', this.direction, 2);

		// this.addDot()

		// this.vertices[0] += this.direction[0]
		// this.vertices[1] += this.direction[1]
	},

	draw() {
		this.keepMoving()
		this.updateBuffer()

		this.gl.clear(this.gl.COLOR_BUFFER_BIT)

		this.gl.drawArrays(
			this.gl.POINTS,
			0,
			1 // amount of objects in buffer to draw
			// (this.vertices.length / 3)
		)

		// this.gl.drawArrays(this.gl.TRIANGLES, 0, 3)

		requestAnimationFrame(this.draw.bind(this))
		// this.log('Drawing.')

        let elapsed = parseInt((new Date() - this.startTime) / 1000);
		this.context2d.write(elapsed)
		// this.drawElapsedTime()
	},
}

Snake = _.assign(Engine, Snake)

Snake.init()
Snake.createShader()
Snake.createVertices()
Snake.draw()
Snake.watchKeys()
Snake.debug()

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
