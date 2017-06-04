<template>
    <div class="container text-center">
        <div class="main">
            <div class="row">
                <div class="col-md-12 col-xs-12">
                    <div v-show="code && type">
                        <i class="fa fa-spinner fa-pulse fa-3x fa-fw"></i>
                        <p class="authin-social">Autenticando com <strong>{{ type }}</strong>.</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import {mapActions, mapGetters} from 'vuex'
    import {capitalize} from 'lodash'

    export default {
        name: 'login-social',
        data() {
            return {
                context: 'oauth2 context',
                code: this.$route.query.code,
                type: this.$route.params.type,
                role: null
            };
        },
        mounted() {

            if ((this.$auth.ready())) {

                this.role = localStorage.getItem('role')

                this.$auth.oauth2({
                    code: true,
                    provider: this.type,
                    params: {
                        code: this.code,
                        user_email: this.currentUser ? this.currentUser.email : null,
                        user_id: this.currentUser ? this.currentUser.id : null,
                        role: this.role
                    },
                    redirect: '/',
                    success: function (response) {

                        this.authSetToken(response.data.access_token) // this is a Vuex action
                        this.authSetUser(response.data.user) // this is a Vuex action

                        localStorage.removeItem('role')

                    },
                    error: function (error) {
                        console.log('error ' + this.context);

                        if (this.isLogged) {
                            this.$swal('Ops!', 'Não é possivel utilizar esta conta do ' + capitalize(this.type) + ', isto pode significar que a conta já esteja em uso no sistema. Desconecte-se e faça login utilizando o ' + capitalize(this.type) + '.', 'error')
                            this.$router.push({path: '/dashboard/profile'})
                        }
                    }
                });
            }
        },
        computed: {
            /**
             * Map the getters from Vuex to this component.
             */
            ...mapGetters(['currentUser', 'isLogged']),
        },
        methods: {
            /**
             * Map the actions from Vuex to this component.
             */
            ...mapActions(['authSetToken', 'authSetUser']),
        }
    }
</script>

<style scoped>
    .main {
        position: absolute;
        width: 300px;
        height: 100px;
        top: 50%;
        left: 50%;
        margin-top: -50px;
        margin-left: -150px;
    }

    .authin-social{
        font-size: 30px;
    }

    @media(max-width: 768px){
        .authin-social{
            font-size: 20px;
        }
    }
</style>
