import _ from 'lodash-fp'
import React from 'react'; // eslint-disable-line
import ReactDOM from 'react-dom'
import {AppContainer} from 'react-hot-loader' // eslint-disable-line
import Wrapper from './wrapper'

import Engine from './engine'
import {snakeFactory} from './snake'
import {foodFactory} from './food'

const Game = {
	startTime: 0,
	totalTime: 0,

	init() {
	},
}

const SnakeGame = _.assign({
	alive: true,
	apples: 0,
	foodAddInterval: 2,

	start(contexts) {
		this.managerGL = contexts.snake
		this.managerText = contexts.snakeInfo

		this.snake = snakeFactory('player1');

		this.snake.move = this.snake.move.bind(this.snake)

		this.watchKeys(this.snake.move)

		// console.log('vertices', vertices);
		this.snake.start(this.managerGL.getContext())

		this.apple = foodFactory('apple')
		this.apple.start(this.managerGL.getContext())

		this.draw()
	},

	stop() {
		// unbind stuff

		console.warn('Stopping...')
	},

	watchKeys(action) {
		this.managerGL.getCanvas().addEventListener('keydown', (e) => {
			// console.log('nice', e);
			switch (e.code) {
				case 'ArrowLeft': action(-1, 0); break;
				case 'ArrowRight': action(1, 0); break;
				case 'ArrowUp': action(0, 1); break;
				case 'ArrowDown': action(0, -1); break;
				default: break;
			}
		})
	},

	showTimer(context) {
		const elapsed = parseInt((new Date() - Engine.startTime) / 1000)
		context.write(elapsed, 75, 25)

		if (elapsed === 3) {
			this.alive = false
			console.error('Time ran out!');
		}

		return elapsed
	},

	showScore(context) {
		let score = 0
		context.write('Score: ' + score, 200, 25, {clear: true})
	},

	draw() {
		this.showScore(this.managerText)
		const elapsed = this.showTimer(this.managerText)

		const context = this.managerGL.getContext()
		context.clear(context.COLOR_BUFFER_BIT)

		// start the drawing loop:
		if (this.alive) {
			this.alive = this.snake.draw()

			if (elapsed === 1) {
				this.apple.draw()
			}

			requestAnimationFrame(this.draw.bind(this))
		} else {
			this.stop()
		}
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

// Engine.createShader(contexts.snake.getContext())
// Engine.createVertices(contexts.snake.getContext())

SnakeGame.start(contexts)

// @
// function healing(creature) {
//   creature.healPower = true;
// }

// const Apples = Food.Create('apples').init(Snake.gl)
// Snake.debug()

const render = (Component) => { // eslint-disable-line
	ReactDOM.render(
		<AppContainer>
			<Component />
		</AppContainer>,
		document.getElementById('app')
	)
}

render(Wrapper)

if (module.hot) { // eslint-disable-line
	module.hot.accept('./wrapper', () => { render(Wrapper) }) // eslint-disable-line
}
