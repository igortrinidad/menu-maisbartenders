<template>
    <div>
        <client-header></client-header>

        <router-view></router-view>

    </div>
</template>

<script>
    import clientHeader from './partials/header.vue'

    export default{
        name: 'client-layout',
        components:{
            clientHeader
        },
        data(){
            return{

            }
        }
    }
</script>
