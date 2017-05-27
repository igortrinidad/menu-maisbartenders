<template>
    <div>
        <app-header></app-header>

        <router-view></router-view>

    </div>
</template>

<script>
    import appHeader from './partials/header.vue'
    import { mapGetters } from 'vuex'

    export default{
        name: 'landing-layout',
        components:{
            appHeader
        },
        data(){
            return{

            }
        }
    }
</script>

<style>
    
    @media(max-width:768px){
        .btn{
            font-size: 13px;
            font-weight: 400;
        }
    }

</style>
