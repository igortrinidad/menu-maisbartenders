import accounting from 'accounting';
import Vue from 'vue'
var moment =  require('moment');

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

/**
 * Format Uuid
 * Display the last 12 characters (more significants)
 * Ex: input: 29fe7b82-9e24-4e59-989a-242581a8e26a | output: 242581a8e26a
 */

Vue.filter('formatTimeHumanized', function(value){
        
        let ms = moment().diff(moment(value, "YYYY-MM-DD HH:mm:ss"));

        let howMuchTime = moment.duration(ms).locale('pt-br').humanize();

        return howMuchTime;
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