export const Food = {
	Create (bundle) {
		return Object.create(this.foods[bundle]);
	},

	foods: {
		apple: {
			add() {
				console.log('Vrooom!');
				console.log('this', this);
			},

			remove: function () {
				console.log('this', this);
			}
		}
	}
};
