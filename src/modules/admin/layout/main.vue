<template>
    <div class="main-co">
        <app-header></app-header>

        <router-view></router-view>

    </div>
</template>

<script>
    import appHeader from './partials/header.vue'
    import { mapGetters } from 'vuex'

    export default{
        name: 'layout',
        components:{
            appHeader
        },
        data(){
            return{

            }
        }
    }
</script>
