<template>
    <div>
        <router-view></router-view>
        <div id="root"></div>
    </div>
</template>

<script>
    import { mapGetters } from 'vuex'
    export default {
        name: 'App',
        data(){
            return {}
        },
        computed: {
            ...mapGetters(['currentUser', 'isLogged']),
        },
        mounted(){
            if(this.isLogged){
                this.$auth.user(this.currentUser)
                this.$auth.watch.authenticated = true
            }
        },
        methods: {


        }
    }
</script>
