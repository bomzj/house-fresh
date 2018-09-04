<template>
<div class="text-center contact-info-block-section">
	<h5 class="contact-header">Заказать обратный звонок</h5>
	<form class="form-block-footer" @submit.prevent="submitForm">
		<div class="user-info-input">
			<input class="form-control form-control-footer text-center" placeholder="Ваше имя" v-model="name">
			<input class="form-control form-control-footer text-center" placeholder="Контактный телефон*" v-model="phone">
		</div>
		<button class="btn btn-gray btn-xl" title="Отправить запрос на обратный звонок" :disabled="!isFormValid()">Отправить запрос</button>
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
			isSuccessAlertShowing: false
		};
	},
	methods: {
		isFormValid() {
			console.log(this.phone);
			return this.phone;
		},
		submitForm() {
			var body = `Запрос c cайта на обратный звонок: ${this.phone}, ${this.name}`;
			
			Mailer.sendMail('Запрос с сайта на обратный звонок', '', this.email, body, function(a,b, c) {
				this.isSuccessAlertShowing = true;
				setTimeout(() => { this.isSuccessAlertShowing = false }, 5000);
			}.bind(this));
			
			// clear form
			this.name = '';
			this.phone = '';
		}
	}
}
</script>