import '../scss/main.scss';
import $ from './jquery';
import boostrap from './bootstrap.min';
import './jquery.easing.min';
import './jquery.fittext';
import './creative';
import './backtotop';
import Vue from 'vue';  
import Cart from './cart.vue';

var cartVM = new Vue({
	el: 'cart',
	components: {
		Cart
    }
});

// Make Cart available globally for Add To Cart functionality
window.cart = cartVM.$children[0];