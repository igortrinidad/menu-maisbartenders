<template>

</template>
<script>
    import {mapActions} from 'vuex'
    export default {
        name: 'auth-logout',
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

                this.$router.push('/')
            }
        }
    }
</script>
