import Vue from 'vue';  

var formatter = new Intl.NumberFormat('by-BY', { style: 'decimal', minimumFractionDigits: 2 });

Vue.filter('price', function (value) {
    return formatter.format(value) + "р";
});
