export const Food = {
	Create (bundle) {
		return Object.create(this.food[bundle]);
	},

	food: {
		apples: {
			init(context) {
				this.context = context
				return this
			},

			add() {
				console.log('Adding apple!');
				console.log('this', this);
			},

			remove: function () {
				console.log('this', this);
			}
		}
	}
};
