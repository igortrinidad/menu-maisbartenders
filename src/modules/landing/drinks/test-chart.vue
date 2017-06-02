<template>
   <div>
    <section class="container m-t-30">

            <div class="col-md-2 col-xs-3">
                <div class="form-group">
                    <input class="form-control" v-model="drink.flavor.dry" @blur="createChart($refs.radar)">
                    <input class="form-control" v-model="drink.flavor.citric" @blur="createChart($refs.radar)">
                    <input class="form-control" v-model="drink.flavor.bitter" @blur="createChart($refs.radar)">
                    <input class="form-control" v-model="drink.flavor.fruit" @blur="createChart($refs.radar)">
                    <input class="form-control" v-model="drink.flavor.alcohol" @blur="createChart($refs.radar)">
                </div>
            </div>


        <div style="margin-top:200px;">
            <div class="col-md-6 col-xs-12 text-center">
                    <div class="p-30">
                        <canvas ref="radar" id="radar"></canvas>
                    </div>
            </div>
        </div>
    </section>

   </div>
</template>

<script>
    import { mapGetters } from 'vuex'
    import eventObj from '../../../models/Event.js'
    import Chart from 'chart.js'

    var Swiper = require('swiper')

    export default {
        name: 'show-home',
        data () {
            return {
                drink: {
                    name: 'Trinidad',
                    flavor: {
                        citric: 5,
                        fruit: 5,
                        bitter: 5,
                        dry: 5,
                        salt: 5
                    },
                    items: [
                        {
                            pivot: {
                                quantity: ''
                            },
                            name: 'Morango',
                            category: 'Frutas',
                            attrs: [
                                {
                                    name: 'Carboidrato',
                                    value: 9.22,
                                    measure: 'gr'
                                },
                                {
                                    name: 'Kcal',
                                    value: 38,
                                    measure: 'kj'
                                }
                            ]
                        },
                        {
                            pivot: {
                                quantity: ''
                            },
                            name: 'Gin',
                            category: 'Bebidas',
                            attrs: [
                                {
                                    name: 'Kcal',
                                    value: 273,
                                    measure: 'kj'
                                }
                            ]
                        }
                    ]
                }
            }
        },
        computed:{
            // Map the getters from Vuex to this component.

            ...mapGetters(['currentUser', 'isLogged']),

        },
        mounted(){
            var that = this
            this.$nextTick(()=>{
                $('html, body').stop().animate({
                    scrollTop: $('#header-home').offset().top
                }, 500, 'easeInOutExpo');
                that.initPageScroll()
            })
        },
        methods: {
            initPageScroll: function(){
                let that = this

                $('a.page-scroll').bind('click', function(event) {
                    var $anchor = $(this);

                    $('html, body').stop().animate({
                        scrollTop: $($anchor.attr('href')).offset().top
                    }, 1500, 'easeInOutExpo');
                    event.preventDefault();
                });
            },

            createChart: function(el){
                var that = this

                var labels = ['Refrescante', 'Frutado/Doce', 'Amargo', 'Seco', 'Salgado'];
                var values = [
                    that.drink.flavor.citric,
                    that.drink.flavor.fruit,
                    that.drink.flavor.bitter,
                    that.drink.flavor.dry,
                    that.drink.flavor.salt
                ]
                console.log(values)

                this.chart = new Chart(el, {
                  type: 'radar',
                  pointLabelFontSize: 20,
                  data: {
                    labels: labels,
                    datasets: [
                        {
                            label: 'Drink 1',
                            backgroundColor: "RGBA(254, 209, 54, 0.3)",
                            borderColor: "RGBA(254, 209, 54, 1.00)",
                            data: values,
		                    pointRadius: 2,
                            pointDot: false,
                            fontSize: 30,
                            defaultFontSize: 30
                        },
                    ]
                },
                options: {
                    pointDot:false,
                    showTooltips: false,
                    scaleOverride: true,
                    scaleSteps: 2,
                    scaleStepWidth: 2,
                    scaleBeginAtZero: true,
                    scale: {
                        ticks: {
                            max:20,
                            min: 0,
                            beginAtZero: 1,
                            display: !1
                        },
                        pointLabels: {
                            fontSize: 15,
                            fontColor: '#2C3E50',
                            textTransform: 'uppercase'
                        }
                    }
                },
            })

                console.log(this.chart);
            }
        },
        mounted() {
            this.createChart(this.$refs.radar)
        }
    }
</script>

<style scoped>

    .text-selected{

        font-size: 22px;
    }

    .img-gif{
        max-width: 90%;
    }

    #contact{
        background-color: #F7F7F7;
    }
</style>
