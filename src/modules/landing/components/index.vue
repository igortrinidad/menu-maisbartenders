<template>
   <div class="container">

       <div class="main text-center">

           <img src="static/assets/logo.png" width="120">
           <h1 class="">We Planner Vue Starter</h1>

           <p v-if="isLogged">Olá <strong>{{currentUser.name}}</strong>, bem vindo.</p>

           <router-link class="btn btn-success" to="/dashboard" v-if="isLogged">Go to Dashboard</router-link>
       </div>
   </div>
</template>

<script>
    import { mapGetters } from 'vuex'

    export default {
        name: 'landing',
        data () {
            return {

            }
        },
        computed:{
            /**
             * Map the getters from Vuex to this component.
             */
            ...mapGetters(['currentUser', 'isLogged']),
        }
    }
</script>

<style scoped>
    .main {
        position: absolute;
        width: 500px;
        height: 300px;
        top: 50%;
        left: 50%;
        margin-top: -150px;
        margin-left: -250px;
    }

    .m-t-30{
        margin-top: 30px;
    }
</style>


