<template>
   <div>

        <div class="row" style="margin-top:200px;">
            <div class="col-md-6 col-md-offset-3 col-xs-12 text-center">
                    <div class="p-30" width="250px" height="250px">
                        <canvas ref="radar" id="radar"></canvas>
                    </div>            
            </div>
        </div>

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
                    items: [
                        {
                            pivot: {
                                quantity: ''
                            },
                            name: 'Morango',
                            category: 'Frutas',
                            flavor: {
                                citric: 3,
                                fruit: 9,
                                bitter: 0,
                                dry: 0,
                                alcoohol: 0
                            },
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
                            flavor: {
                                citric: 2,
                                fruit: 0,
                                bitter: 2,
                                dry: 9,
                                alcoohol: 45
                            },
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
                console.log(el);
                this.chart = new Chart(el, {
                  type: 'radar',
                  data: {
                    labels: ["Seco", "Amargo", "Alcool", "Refrescante", "Frutado"],
                    datasets: [
                        {
                          label: 'Drink 1',
                          backgroundColor: "rgba(153,255,51,0.4)",
                          borderColor: "rgba(153,255,51,1)",
                          data: [0,0,20,30,50]
                        },
                    ]
                },
                options: {
                    scale: {
                        // Hides the scale
                        display: true
                    }
                }

            })
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
