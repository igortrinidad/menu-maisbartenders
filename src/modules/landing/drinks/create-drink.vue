<template lang="html">
    <div class="page">
        <div class="container">
            <div class="text-center">
                <h2>Crie seu drink personalizado!</h2>
            </div>

            <div class="float-label">
                <label>
                    <input type="text" name="" value="" required>
                    <span>Qual vai ser o nome para o seu drink?</span>

                </label>
            </div>

            <div class="row">
                <v-select :label="'name'" :options="ingredients" :multiple="true"></v-select>
            </div>


            <canvas ref="createdDrinkChart" id="createdDrinkChart"></canvas>

        </div>
    </div>
</template>

<script>
    import { mapGetters } from 'vuex'
    import Chart from 'chart.js'
    import vSelect from "vue-select"

    export default {

        name: 'create-drink',
        components: {vSelect},
        data () {
            return {
                ingredientsFetcheds: [],
                createdDrink: [],
                drink: {
                    name: 'Trinidad',
                    flavor: {
                        Citrico: 5,
                        Frutado: 5,
                        Amargo: 5,
                        Seco: 5,
                        Alcool: 5
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
            ...mapGetters(['currentUser', 'isLogged']),

            ingredients: function() {
                let arr = []

                this.ingredientsFetcheds.map((drink) => {
                    drink.items.map((item) => {
                        if(arr.checkFromAttr('name', item.name)){
                            return false
                        } else {
                            arr.push({name: item.name, category: item.category})
                        }
                    })
                })

                return _.orderBy(arr, 'category', 'asc');
            }
        },

        mounted(){
            this.getIngredientsByDrinks()
            this.drawChart(this.$refs.createdDrinkChart)
        },

        methods: {

            drawChart: function(el){

                const keys = Object.keys(this.drink.flavor)
                const values = Object.values(this.drink.flavor)

                this.chart = new Chart(el, {
                    type: 'radar',
                    pointLabelFontSize: 20,
                    data: {
                        labels: keys,
                        datasets: [
                            {
                                label: 'Drink 1',
                                backgroundColor: "RGBA(254, 209, 54, 0.3)",
                                borderColor: "RGBA(254, 209, 54, 1.00)",
                                data: values,
                                pointRadius: 4,
                                pointDot: false,
                                fontSize: 20,
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
                                beginAtZero: 0,
                                display: !1
                            },
                            pointLabels: {
                                fontSize: 20,
                                fontColor: '#2c3e50'
                            }
                        }
                    },
                })
            },

            getIngredientsByDrinks: function() {
                let that = this
                that.$http.get('/drinks/fetchAll')
                    .then(function (response) {
                        that.ingredientsFetcheds = response.data
                    })
                    .catch(function (error) {
                        console.log(error)
                    });
            },

        }
    }
</script>

<style lang="css">

.page{ margin-top: 80px; min-height: 100vh; }

/* inputs floating label */
.float-label{
    width: 100%;
    position: relative;
    padding-top: 30px;
    margin: 40px 0;
}

.float-label label {
    width: 100%;
    display: block;
}

.float-label label span{
    position: absolute;
    top: 35px;
    left:0;
    transition: ease .1s;
    font-size: 16px;
}

.float-label input{
    width: 100%;
    border: none;
    border-bottom: #2c3e50 2px solid;
    background: #fff;
    padding: 5px 0px 5px 0px;
    font-size: 16px;
}
.float-label input:focus{ outline: none; }

.float-label label input:valid + span,
.float-label label input:focus + span{ top: 0; transition: ease .1s; font-size: 12px; }

</style>
