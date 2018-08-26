import '../scss/main.scss';
import $ from './jquery';
import boostrap from './bootstrap.min';
import './jquery.easing.min';
import './jquery.fittext';
import './creative';
import './backtotop';
import Vue from 'vue';  
import Cart from './cart.vue';

new Vue({el: 'cart', render: h => h(Cart) });

class A 
{
	keke(){ console.log(123); }
}
