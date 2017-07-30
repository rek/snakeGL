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
