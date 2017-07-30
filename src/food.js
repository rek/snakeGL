import Drawable from './drawable'

export const Food = {
	start(context) {
		this.vertices = [
			0.2, 0.2, 0.0,
			0.4, 0.4, 0.0,
		]
		this.context = context

		this.createShader(this.context)
		this.createVertices(this.context, this.vertices, 4)
	},

	add() {
		console.log('Adding apple!');
		console.log('this', this);
	},

	remove() {
		console.log('this', this);
	},

	draw() {
		this.createVertices(this.context, this.vertices, 20)
		this.updateBuffer(this.context)

		this.context.drawArrays(
			this.context.POINTS,
			0,
			1 // amount of objects in buffer to draw
			// (this.vertices.length / 3)
		)
	}
};

export const foodFactory = (name) => Object.assign(
	Object.create(Food),
	Drawable,
	{
		name
	}
);
