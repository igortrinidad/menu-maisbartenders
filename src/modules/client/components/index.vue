<template>
   <h1>Client Index</h1>
</template>

<script>
    import { mapGetters } from 'vuex'

    export default {
        name: 'client-index',
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
        width: 400px;
        height: 300px;
        top: 50%;
        left: 50%;
        margin-top: -150px;
        margin-left: -200px;
    }

    .m-t-30{
        margin-top: 30px;
    }
</style>


