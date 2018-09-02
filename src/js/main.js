import '../scss/main.scss';
import $ from './jquery';
import boostrap from './bootstrap.min';
import './jquery.easing.min';
import './jquery.fittext';
import './creative';
import './backtotop';
import Vue from 'vue';  
import Cart from './cart.vue';
import CustomLunch from './customLunch.vue';

var cartVM = new Vue({
	el: 'cart',
	components: {
		Cart
    }
});

// Make Cart available globally for Add To Cart functionality
window.cart = cartVM.$children[0];

// Extend Date type
Date.prototype.isBetween = function(from, to) {
	var current = this.getTime();
	return current > from.getTime() && current < to.getTime();
};

var customLunches = document.querySelectorAll('custom-lunch');
customLunches.forEach(x => {
	new Vue({
		el: x,
		components: {
			CustomLunch
		}
	});	
})
