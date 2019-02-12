<template>
<div class="dayOfWeek-block">
	<div class="row" >
		<div class="col-lg-10 col-lg-offset-1 text-center">
			<h2 class="text-primary">{{ weekDay }}</h2>
			<h4>{{day}}</h4>
		</div>
	</div>
	
	<div class="row">
		<div class="row">
			<div class="course-block" v-for="course in courses">
				<div class="col-md-3">
					<h3 class="catalog-item-name">{{ course.title}}</h3>
					<hr class="hidden-sm hidden-xs gray">
				</div>
				
				<div class="col-md-9">
					<div v-for="item in course.items" class="row lunch-item" :class="{ selected : item.isSelected }" @click="selectItem(item, course.items)">
						<div class="col-xs-12 col-sm-7 col-md-7 col-lg-8">
							<p class="text-muted text-nomargin">{{item.title}}</p>
							<p class="text-muted-italic text-small-left">{{item.ingredients}}</p>
						</div>
						<div class="col-xs-12 col-sm-5 col-md-5 col-lg-4" >
							<h3 class="text-muted menu-item-weight">{{item.weight}}г</h3>
							<div class="menu-item-price-section">
								<h3 class="menu-item-price">{{ item.price | price }}</h3>
							</div>
						</div>
					</div>
				</div>
			</div>
			
			<div class="row">
				<h3 class="text-center text-primary shared-courses-toggle-link" data-toggle="collapse" data-target="#sharedCourses">Хлеб, Соусы, Выпечка</h3>
			</div>	
			
			<div id="sharedCourses" class="collapse">
				<div class="course-block" v-for="course in sharedCourses">
					<div class="col-md-3">
						<h3 class="catalog-item-name">{{ course.title}}</h3>
						<hr class="hidden-sm hidden-xs gray">
					</div>
					
					<div class="col-md-9">
						<div v-for="item in course.items" class="row lunch-item" :class="{ selected : item.isSelected }" @click="selectItem(item, [])">
							<div class="col-xs-12 col-sm-7 col-md-7 col-lg-8">
								<p class="text-muted text-nomargin">{{item.title}}</p>
								<p class="text-muted-italic text-small-left">{{item.ingredients}}</p>
							</div>
							<div class="col-xs-12 col-sm-5 col-md-5 col-lg-4">
								<h3 class="text-muted menu-item-weight">{{item.weight}}г</h3>
								<div class="menu-item-price-section">
									<h3 class="menu-item-price">{{ item.price | price }}</h3>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
		
		<div class="row total-price-block text-left">
			<hr class="gray-long">
			<h4 class="total-price-text">Стоимость обеда: </h4>
			<h4 class="total-price">{{ getTotalPrice() | price }}</h4>
		</div>
		<div class="row text-center">
			<button class="btn btn-primary btn-xl" title="Добавить в корзину" @click="addLunchToCart">Добавить обед в корзину</button>
		</div>
	</div>
	
	<transition name="fade">
		<div class="alert alert-warning" v-show="isNothingSelectedWarningShowing" @click="isNothingSelectedWarningShowing = false">
			<strong>Ничего не выбрано!</strong> Нажмите на понравившиеся блюда.
		</div>
	</transition>
</div>
</template>

<script>
export default {
	props: ['dayMenu'],
	data() {
		return Object.assign({ isNothingSelectedWarningShowing: false}, this.dayMenu);
	},
	methods: {
		selectItem(item, itemsToDeselect) {
			var isCurrentItemSelected = item.isSelected;
			// Deselect all items in the course by using dynamically added isSelected reactive property
			itemsToDeselect.forEach((item) => this.$set(item, 'isSelected', false));
			// Toggle selection of this item
			this.$set(item, 'isSelected', !isCurrentItemSelected);
		},
		getSelectedItems() {
			return this.courses.concat(this.sharedCourses)
				.map(c => c.items.filter(i => i.isSelected))
				.reduce((a,b) => a.concat(b));
		},
		getTotalPrice() {
			return this.getSelectedItems()
				.map(i => i.price)
				.reduce((a, b) => Math.round((a + b) * 100) / 100, 0);
		},
		showNothingSelectedWarning() {
			this.isNothingSelectedWarningShowing = true;
			setTimeout(() => { this.isNothingSelectedWarningShowing = false }, 5000);
		},
		addLunchToCart() {
			var selectedItems = this.getSelectedItems();
			
			if (!selectedItems.length) {
				this.showNothingSelectedWarning();
				return;
			}
			var customLunchItem = {
				id: selectedItems.map(i => i.id).join(),
				title: 'Свой обед',
				imageUrl: this.imageUrl,
				price: this.getTotalPrice(),
				type: 'customLunch',
				items: selectedItems
			};
			
			selectedItems.forEach(i => i.isSelected = false);
			
			window.cart.addItem(customLunchItem);
		}
	}
}
</script>