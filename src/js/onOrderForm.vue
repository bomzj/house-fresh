<template>
<div class="col-lg-8 col-lg-offset-2 text-center">
	<h2 class="text-primary">Не нашли то, что искали?</h2>
	<hr>
	<h3 class="text-center">Отправьте нам запрос на изготовление продукции на заказ: <br> <br>Сэндвичи, Бутерброды, Хлеб, Торты, Выпечка, Круассаны с начинаками, Кексы, Салаты и другое!</h3>
	<hr>
	<form class="form-block-onorder" @submit.prevent="submitForm">
		<div class="user-info-input">
			<input class="form-control form-control-onorder text-center" placeholder="Ваше имя*" v-model="name">
			<input class="form-control form-control-onorder text-center" placeholder="Контактный телефон*" v-model="phone">
			<input class="form-control form-control-onorder text-center" placeholder="Описание (в том числе, объёмы, сроки и т.д.)*" v-model="description">
		</div>
		<button class="btn btn-primary btn-xl" title="Отправить запрос на индивидуальный заказ" :disabled="!isFormValid()">Отправить запрос</button>
	</form>
	<transition name="fade">
		<div class="alert alert-success" v-show="isSuccessAlertShowing" @click="isSuccessAlertShowing = false">
			<strong>Ваш запрос отправлен!</strong> Мы свяжемся с Вами.
		</div>	
	</transition>
</div>

</template>
<script>
import Mailer from "./mailer";

export default {
	props: ['email'],
	data() {
		return {
			name: '',
			phone: '',
			description: '',
			isSuccessAlertShowing: false
		};
	},
	methods: {
		isFormValid() {
			return this.name && 
				this.phone && 
				this.description;
		},
		submitForm() {
			var body = `Запрос c cайта на индивидуальный заказ: ${this.phone}, ${this.name}, ${this.description}`;
			
			Mailer.sendMail('Запрос с сайта на индивидуальный заказ', '', this.email, body, function(a,b, c) {
				this.isSuccessAlertShowing = true;
				setTimeout(() => { this.isSuccessAlertShowing = false }, 5000);
			}.bind(this));
			
			// clear form
			this.name = '';
			this.phone = '';
			this.description = '';
		}
	}
}
</script>