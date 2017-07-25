const _getCanvas = (el, focus = false) => {
	const canvas = document.getElementById(el)

	if (!canvas) {
		console.error('Error making canvas with id:', el)
		return
	}

	if (focus) {
		canvas.focus() // so key watching is ready
	}

	return canvas
}

export const Canvas = {
	Create (bundle) {
		return Object.create(this.types[bundle]);
	},


	types: {
		'3d': {
			init(el, focus) {
				this.canvas = _getCanvas(el, focus)

				if (!this.canvas) {
					return
				}

				this.context = this.canvas.getContext('webgl')
				this.context.viewport(0, 0, this.canvas.width, this.canvas.height)
				this.setColour()

				return this.context
			},

			setColour(r = 0.9, g = 0.9, b = 0.9, a = 1) {
				this.context.clearColor(r, g, b, a)
			},

			getCanvas() {
				return this.canvas
			},

			getContext() {
				return this.context
			},
		},
		'2d': {
			init(el, focus) {
				this.canvas = _getCanvas(el, focus)

				if (!this.canvas) {
					return
				}

				this.context = this.canvas.getContext('2d')

				if (!this.context) {
					console.error('Error creating canvas, mode: 2d')
					return
				}

				// console.log('this.context', this.context);
				return this.context
			},

			write(text) {
		        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
		        this.context.save();
		        this.context.beginPath();
		        this.context.fillStyle = 'black';
		        this.context.font = '24px Verdana'
		        // draw the running time at half opacity
		        this.context.globalAlpha = 0.50;
		        this.context.fillText(text, this.canvas.width - 75,25);
		        this.context.restore();
			},

			getCanvas() {
				return this.canvas
			},

			getContext() {
				return this.context
			},
		}
	}
};
