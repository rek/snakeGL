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

	showTimer(context) {
        let elapsed = parseInt((new Date() - this.startTime) / 1000);
		context.write(elapsed)

		// if (elapsed % 3 === 0) {
		// 	Apples.add()
		// }
	},
}, Game)

const contexts = Engine.init()
let snake = snakeFactory('player1');

// @
// function healing(creature) {
//   creature.healPower = true;
// }

snake.enabled();

SnakeGame.showTimer(contexts.text)

Engine.createShader()
Engine.createVertices()

const Apples = Food.Create('apples').init(Snake.gl)

Snake.draw(() => SnakeGame)
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
