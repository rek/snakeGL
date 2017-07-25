import _ from 'lodash-fp'
import React from 'react'
import ReactDOM from 'react-dom'
import {AppContainer} from 'react-hot-loader'
import Wrapper from './wrapper'

import Engine from './engine'
import {snakeFactory} from './snake'
import {Food} from './food'

const Game = {
	startTime: 0,
	totalTime: 0,

	init() {
	},
}

const SnakeGame = _.assign({
	apples: 0,
	foodAddInterval: 2,

	watchKeys(action) {
		this.managerGL.getCanvas().addEventListener('keydown', (e) => {
			// console.log('nice', e);
			switch (e.code) {
				case "ArrowLeft": action(-1, 0); break;
				case "ArrowRight": action(1, 0); break;
				case "ArrowUp": action(0, 1); break;
				case "ArrowDown": action(0, -1); break;
				default: break;
			}
		})
	},

	showTimer(context) {
		context.write(parseInt((new Date() - Engine.startTime) / 1000))

		// if (elapsed % 3 === 0) {
		// 	Apples.add()
		// }
	},

	start(contexts, vertices) {
		this.managerGL = contexts.snake
		this.managerText = contexts.snakeInfo

		let snake = snakeFactory('player1');
		this.watchKeys(snake.move)
		snake.start(vertices, this.managerGL.getContext())

		this.draw()
	},

	draw() {
		this.showTimer(this.managerText)

// Snake.draw(() => SnakeGame)

		requestAnimationFrame(this.draw.bind(this))
	},
}, Game)

const contexts = Engine.init([{
	mode: '2d',
	id: 'snakeInfo',
}, {
	mode: '3d',
	id: 'snake',
	focus: true,
}])

Engine.createShader(contexts.snake.getContext())
Engine.createVertices(contexts.snake.getContext())

SnakeGame.start(contexts, Engine.vertices)

// @
// function healing(creature) {
//   creature.healPower = true;
// }

// const Apples = Food.Create('apples').init(Snake.gl)
// Snake.debug()

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
