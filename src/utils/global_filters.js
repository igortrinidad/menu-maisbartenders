import accounting from 'accounting';
import Vue from 'vue'

export default function(){

	//Filters
Vue.filter('handleTrueFalse', function(value, vtrue = 'Sim', vfalse = 'Não'){
    if(value){
        return vtrue
    } else {
        return vfalse
    }
})

Vue.filter('limitChar', function(value, count, finish){
    if (value.length >= count && finish){
        return value.substring(0,count) + finish;
    } else {

         return value.substring(0,count)
    }
})


accounting.settings = {
    currency: {
        symbol : "R$ ",   // default currency symbol is '$'
        format: "%s%v", // controls output: %s = symbol, %v = value/number (can be object: see below)
        decimal : ",",  // decimal point separator
        thousand: ".",  // thousands separator
        precision : 2   // decimal places
    },
    number: {
        precision: 2,  // default precision on numbers is 0
        thousand: ".",
        decimal : ","
    }
}

Vue.filter('formatCurrency', function(value){
    return accounting.formatMoney(parseFloat(value))
})

Vue.filter('formatNumber', function(value){
    return accounting.formatNumber(parseFloat(value))
})

}