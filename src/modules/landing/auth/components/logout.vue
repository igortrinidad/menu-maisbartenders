<template>

</template>
<script>
    import {mapActions} from 'vuex'
    export default {
        name: 'logout',
        data(){
            return {}
        },
        created(){
            this.logout()
        },
        methods: {
            /**
             * Map the actions from Vuex to this component.
             */
            ...mapActions(['authSetToken', 'authSetUser']),

            logout: function () {
                this.authSetToken(null) // this is a Vuex action
                this.authSetUser(null) // this is a Vuex action

                var events = localStorage.getItem('events');
                localStorage.clear();
                localStorage.setItem('events', events);

                if(window.cordova){
                    window.cookies.clear(function() {});   
                }

                this.$router.push({path: this.$route.query.redirect ? this.$route.query.redirect : '/', query: { redirect_back: this.$route.query.redirect_back}})
            }
        }
    }
</script>
