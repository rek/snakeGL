export const Canvas = {
	Create (bundle) {
		return Object.create(this.types[bundle]);
	},

	types: {
		'2d': {
			init(el) {
				this.canvas = document.getElementById(el)

				if (!this.canvas) {
					console.error('Error making canvas with id:', el)
					return
				}

				// this.canvas.focus() // so key watching is ready
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
		}
	}
};
