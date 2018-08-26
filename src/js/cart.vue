<template>
<div>
<span class="navbar-cart">
	<a href="/#cart-modal" class="btn-open-cart" data-toggle="modal"><i class="fa fa-shopping-cart fa-2x"> </i>
		<span class="cart-items-count">{{ items.length }}</span>
	 </a>
</span>

<div class="cart-modal modal fade" id="cart-modal" tabindex="-1" role="dialog" aria-hidden="true">
    <div class="modal-content">
        <div class="close-modal" data-dismiss="modal">
            <div class="lr">
                <div class="rl"></div>
            </div>
        </div>
        <div class="container">
            
			<div class="row items-in-cart-block">
				<h3 class="text-primary text-center">Выбранные товары</h3>
				
				<div class="item-in-cart" v-for="item in items">
					<div class="hidden-xs hidden-ms col-md-2 col-lg-2">
						<img :src="item.imageUrl" class="img-responsive cart-item-img" alt="">
					</div>
					<div class="col-xs-5 col-sm-5 col-md-4 col-lg-5">
						<h4 class="cart-item-text text-left">{{ item.title }} ({{item.weight}} гр) </h4>
					</div>
					<div class="col-xs-5 col-sm-5 col-md-3 col-lg-2">
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
					<div class="col-xs-2">
						<h4 class="cart-item-text cart-item-price">{{ getItemFullPrice(item) }} р</h4>
					</div>	
					<div class="col-xs-1">
						<button type="button" class="btn btn-default" @click="removeItem(item.id)">
							<i class="fa fa-remove fa-2x text-muted"></i>
						</button>
					</div>
				</div>
								
				<hr class="gray">
			
				<div class="row text-left">
					<h4 class="total-price-text">Итоговая сумма к оплате с НДС: </h4>
					<h4 class="total-price cart-item-price">  {{ getTotalPrice() }} р</h4>
				</div>
				
			</div>
			
			<div class="row personal-info-block">
				<h3 class="text-primary text-center">Введите Ваши данные</h3>
				<form>
					<div class="form-group user-info-input">
						<input type="text" class="form-control input-lg" placeholder="Ваше имя*">
					</div>
					<div class="form-group user-info-input">
						<input type="phone" class="form-control input-lg" placeholder="Контактный телефон*">
					</div>
					<div class="form-group user-info-input">
						<input type="text" class="form-control input-lg" placeholder="Адрес доставки*">
					</div>
					
					<p class="text-muted">Наши менеджеры свяжутся с Вами в течение 20 минут для подтверждения заказа. Если Вы не получили от нас звонок, пожалуйста, перезвоните нам по указанным в контактах телефонам.</p>
					
					<div class="row" type="submit">
						<a href="/" class="btn btn-primary btn-xl" title="Оформить заказ">Заказать</a>
					</div>
				</form>
			</div>
			
        </div>
    </div>
</div>
</div>
</template>

<script>
    export default {
        data: function () {
            return {
				items:[
				{
					id: 1,
					imageUrl: "/img/catalog/sandwich/1.jpg",
					title: "Сэндвич с ветчиной",
					count: 1,
					price: 2.32,
					weight: 250
				},
				{
					id: 2,
					imageUrl: "/img/catalog/sandwich/1.jpg",
					title: "Фаршированный мини-багет с курицей и грибами",
					count: 1,
					price: 2.32,
					weight: 250
				}]
			};
        },
		methods: {
			addItem: function(item, count) {
				var foundItem = this.items.filter(i => i.id == item.id);
				if (foundItem) {
					foundItem.count += count || 1;
				}
				else {
					item.count = count || 1;
					this.items.push(item);
				}
			},
			removeItem: function(item, count) {
				var index = this.items.indexOf(item);
				
				if (!count || count >= item.count) {
					this.items.splice(index, 1);
				}
				else {
					this.items[index].count -= count;
				}
			},
			getItemFullPrice: function(item) {
				var fullPrice = item.price * item.count;
				return Math.round(fullPrice * 100) / 100;
			},
			getTotalPrice: function() {
				var totalPrice = 0;
				for (var i = 0; i < this.items.length; i++) {
					totalPrice = Math.round((totalPrice + this.getItemFullPrice(this.items[i])) * 100) / 100;
				}
				return totalPrice;
			},
			preventInvalidCountInput: function (event) {
                var value = parseInt(event.target.value);
                var isValid = value >= 1 && value <= 999;
                
                if (!isValid) {
                    // reset to previous value
                    var resetEvent = document.createEvent('Event');
                    resetEvent.initEvent('input', true, true);
                    event.target.value = event.target._value;
                    event.target.dispatchEvent(resetEvent);
                }
            },
			selectAllText: function (event) {
                // event.target.select() is not working on Mobile Safari
                event.target.setSelectionRange(0, event.target.value.length);
            }
		}
    }
</script>