<template>
<div>
<div class="navbar-cart">
	<a href="/#cart-modal" class="btn-open-cart" data-toggle="modal" title="Открыть корзину | ХаусФреш"><i class="fa fa-shopping-cart fa-2x"> </i>
		<span class="cart-items-count" v-if="items.length">{{ items.length }}</span>
	 </a>
</div>

<div class="cart-modal modal fade" id="cart-modal" tabindex="-1" role="dialog" aria-hidden="true">
    <div class="modal-content">
        <div class="close-modal" data-dismiss="modal">
            <div class="lr">
                <div class="rl"></div>
            </div>
        </div>
		<h3 class="text-primary text-center">{{ items.length ? 'Выбранные позиции': 'Ваша корзина пуста' }}</h3>
        <div class="container" v-show="items.length">
            
			<div class="row items-in-cart-block">
				<div v-for="item in items">
					<div class="row item-in-cart" >
						<div class="item-main-info col-xs-12 col-sm-12 col-md-7 col-lg-8">
							<div class="col-xs-6 col-sm-4 col-md-4 col-lg-4">
								<img :src="item.imageUrl" class="img-responsive cart-item-img" alt="">
							</div>
							<div class="col-xs-6 col-sm-8 col-md-8 col-lg-8">
								<h4 class="cart-item-text text-left">{{ item.title }}</h4>
								<h5 class="text-muted-italic text-left">{{ getItemDescription(item) }}</h5>
							</div>
						</div>
						<div class="item-count-info col-xs-12 col-sm-12 col-md-5 col-lg-4">
							<div class="col-xs-6 col-sm-4 col-md-6 col-lg-6">
								<div class="input-group">
									<span class="input-group-btn">
										<button class="btn btn-default" :disabled="item.count <= 1" @click="removeItem(item, 1)">
										  <i class="fa fa-minus"></i>
										</button>
									</span>
									<input class="form-control input-lg input-number" v-model.number="item.count" @input="preventInvalidCountInput" @click="selectAllText">
									<span class="input-group-btn">
										<button class="btn btn-default" @click="addItem(item, 1)">
										  <i class="fa fa-plus"></i>
										</button>
									</span>
								</div>
							</div>
							<div class="col-xs-4 col-sm-6 col-md-5 col-lg-5">
								<h4 class="cart-item-text cart-item-price">{{ getItemFullPrice(item) | price }}</h4>
							</div>	
							<div class="col-xs-1 col-sm-2 col-md-1 col-lg-1">
								<button type="button" class="btn btn-default" @click="removeItem(item)">
									<i class="fa fa-remove fa-2x text-muted"></i>
								</button>
							</div>
						</div>
					</div>
					<div class="row separator">
						<hr class="hidden-md hidden-lg cart-items-separator">
					</div>
				</div>
								
				<hr class="hidden-xs hidden-sm gray">
			
				<div class="row total-price-block text-left">
					<h4 class="total-price-text">Итоговая сумма: </h4>
					<h4 class="total-price">  {{ getTotalPrice() | price}}</h4>
					<template v-if="isDeliveryFree()">
						<span class="text-primary">Бесплатная доставка!</span>
					</template>
					<template v-else>
						<a href="/delivery" class="text-danger">Платная доставка!</a>
					</template>
				</div>
				
			</div>
			
			<div class="row personal-info-block">
				<h3 class="text-primary text-center">Введите Ваши данные</h3>
				<form class="form-block-cart" @submit.prevent="submitOrder">
					<div class="form-group user-info-input">
						<input type="text" class="form-control input-lg" placeholder="Имя*" v-model="orderForm.name">
					</div>
					<div class="form-group user-info-input">
						<input type="phone" class="form-control input-lg" placeholder="Контактный телефон*" v-model="orderForm.phone">
					</div>
					<div class="form-group user-info-input">
						<input type="text" class="form-control input-lg" placeholder="Адрес доставки и комментарии к заказу*" v-model="orderForm.address">
					</div>
					<div class="row">
						<button class="btn btn-primary btn-xl" title="Заказать" :disabled="!isOrderFormValid()">Заказать</button>
					</div>
				</form>
			</div>
			
        </div>
    </div>
</div>
<transition name="fade">
	<div class="alert alert-success" v-show="isSuccessAlertShowing" @click="isSuccessAlertShowing = false">
		<strong>Заказ отправлен!</strong> Мы свяжемся с Вами для подтверждения заказа.
	</div>	
</transition>
<transition name="fade">
	<div class="alert alert-danger" v-show="isErrorAlertShowing" @click="isErrorAlertShowing = false">
		<strong>Произошла ошибка!</strong> Попробуйте отправить заказ еще раз или перезвоните нам.
	</div>
</transition>
</div>
</template>

<script>
import OrderEmailTemplate from './orderEmailTemplate';
import $ from './jquery';

export default {
	props: ['email', 'freeDeliveryCost'],
	data() {
		return {
			items:[],
			orderForm: {
				name: '',
				phone: '',
				email: '',
				address: ''
			},
			isSuccessAlertShowing: false,
			isErrorAlertShowing: false
		};
	},
	// Track any kind of cart items changes and save to local storage
	watch: {
		items: {
			handler (val, oldVal) {
				this.saveState();
			},
			deep: true
		}
	},
	created() {
		// load cart state from local storage
		this.loadState();
	},
	methods: {
		addItem(item, count) {
			var foundItem = this.items.filter(i => i.id == item.id)[0];
			if (foundItem) {
				foundItem.count += count || 1;
			}
			else {
				item.count = count || 1;
				this.items.push(item);
			}
		},
		removeItem(item, count) {
			var index = this.items.indexOf(item);
			
			if (!count || count >= item.count) {
				this.items.splice(index, 1);
			}
			else {
				this.items[index].count -= count;
			}
		},
		getItemFullPrice(item) {
			var fullPrice = item.price * item.count;
			if (item.type == "cake"){
				fullPrice*=item.weight/1000;
			}
			return Math.round(fullPrice * 100) / 100;
		},
		getTotalPrice() {
			var totalPrice = 0;
			for (var i = 0; i < this.items.length; i++) {
				totalPrice = Math.round((totalPrice + this.getItemFullPrice(this.items[i])) * 100) / 100;
			}
			return totalPrice;
		},
		preventInvalidCountInput(event) {
			var value = parseInt(event.target.value);
			var isValid = value >= 1 && value <= 999 && Math.floor(event.target.value) == value;
			
			if (!isValid) {
				// reset to previous value
				var resetEvent = document.createEvent('Event');
				resetEvent.initEvent('input', true, true);
				event.target.value = event.target._value;
				event.target.dispatchEvent(resetEvent);
			}
		},
		selectAllText(event) {
			// event.target.select() is not working on Mobile Safari
			event.target.setSelectionRange(0, event.target.value.length);
		},
		saveState() {
			var json = JSON.stringify(this.items);
			localStorage.setItem("Cart", json);
		},
		loadState() {
			var json = localStorage.getItem("Cart");
			if (json) {
				this.items = JSON.parse(json);
			}
		},
		getItemDescription(item) {
			var description = '';
			
			if (item.type == "lunch") {
				// No description for lunches
			}
			else if (item.type == "customLunch") {
				description = item.items.map(i => i.title).join(', ');
			}
			else {
				description = `${item.weight} гр, ${item.temperatureState}`;
			}
			
			return description;
		},
		isDeliveryFree() {
			return this.getTotalPrice() >= this.freeDeliveryCost;
		},
		submitOrder() {
			if (!this.isOrderFormValid()) return;
			
			var xhr = new XMLHttpRequest();
			
			
			var formData = new FormData();
			formData.append('apikey', '7c848836-860e-4b4e-8909-a0c0fea20173'),
			formData.append('subject', 'Заказ с housefresh.by'),
			formData.append('from', 'mailer@housefresh.by');
			formData.append('to', this.email);
			var emailHtml = this.buildOrderEmailHtml();
			formData.append('bodyHtml', emailHtml);
			formData.append('isTransactional', 'true');
						
			xhr.open("POST", 'https://api.elasticemail.com/v2/email/send', true);
			
			xhr.onreadystatechange = function() {
				if (xhr.readyState != XMLHttpRequest.DONE) return;
				
				var result = xhr.response ? JSON.parse(xhr.response) : {};
				if (result.success) {
					// Clear the cart
					this.items = [];
					
					// Close modal
					$('.cart-modal').modal('hide');
					
					// Display Success message for 3 seconds
					this.isSuccessAlertShowing = true;
					setTimeout(() => { this.isSuccessAlertShowing = false }, 5000);
				}
				else {
					this.showErrorAlert();
				}
			}.bind(this);
			
			xhr.send(formData); 
		},
		isOrderFormValid() {
			return this.orderForm.name && 
				this.orderForm.phone && 
				this.orderForm.address;
		},
		buildOrderEmailHtml() {
			var data = {
				items: this.items,
				orderForm: this.orderForm,
				getItemFullPrice: this.getItemFullPrice,
				getTotalPrice: this.getTotalPrice,
				getItemDescription: this.getItemDescription
			};
			return OrderEmailTemplate(data);
		},
		showErrorAlert() {
			this.isErrorAlertShowing = true;
			setTimeout(() => { this.isErrorAlertShowing = false }, 5000);
		}
	}
}
</script>