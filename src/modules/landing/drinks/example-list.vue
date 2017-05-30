<template>
   <div class="page">

       <header id="header-drinks" class="header-greeting" v-bind:style="{ backgroundImage: 'url(https://maisbartenders.com.br/img/header-bg.jpg)'}">
           <div class="container" >
               <div class="col-md-6 col-md-offset-3 col-xs-12">
                   <div class="intro-text">
                       <span class="text-box">
                           <span class="event-name">
                               Cardápio Interativo Mais Bartenders
                           </span>
                       </span>
                       <br>
                       <a href="#drinks" class="page-scroll btn btn-xl m-t-30">Ver cardápio</a>
                   </div>
               </div>
           </div>
       </header>

       <section id="drinks">

       </section>

   </div>
</template>

<script>
    import { mapGetters } from 'vuex'
    import Drinks from '../../../models/DrinksExample.js'

    export default {
        name: 'show-drink',
        data () {
            return {
                displayDrinks: false,
                drinks: Drinks
            }
        },
        computed:{

            ...mapGetters(['currentUser', 'isLogged']),
        },
        mounted(){

        },

        methods: {

        }
    }
</script>

<style scoped>
.page{
    margin-top: 80px;
    min-height: 100vh;
}

</style>
