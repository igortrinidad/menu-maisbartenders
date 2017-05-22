<template>
    <div class="container">
        <div class="main">
            <div class="row">
                <div class="col-md-12">
                    <div class="panel panel-login">
                        <div class="panel-heading">
                            <div class="center-block">
                                <img src="static/assets/logo.png" alt="" width="48" class="pull-left">
                                <span class="brand">We Planner Vue Starter</span>
                            </div>
                            <hr>
                        </div>
                        <div class="panel-body ">
                            <div class="row">
                                <div class="col-lg-12">
                                    <div class="form-group">
                                        <button class="btn btn-info facebook" @click="socialLogin('facebook')">
                                            <i class="fa fa-facebook fa-lg button-icon"></i> Login com Facebook
                                        </button>

                                        <button class="btn btn-info google m-l-10" @click="socialLogin('google')">
                                            <i class="fa fa-google fa-lg button-icon"></i> Login com Google
                                        </button>
                                    </div>
                                    <fieldset>
                                        <legend class="text-center">Ou</legend>
                                        <form @submit="login">
                                            <div :class="{'form-group': true, 'has-error': errors.has('email')}">
                                                <label class="control-label">E-mail</label>
                                                <input v-validate="'required'" type="text"
                                                       class="form-control" data-vv-name="email" data-vv-as="e-mail"
                                                       placeholder="Seu e-mail" v-model="email">
                                                <p class="help-block" v-if="errors.has('email')">{{errors.first('email')}}</p>
                                            </div>

                                            <div :class="{'form-group': true, 'has-error': errors.has('password')}">
                                                <label class="control-label">Senha</label>
                                                <input v-validate="'required'" type="password"
                                                       class="form-control" data-vv-name="password" data-vv-as="senha"
                                                       placeholder="Sua senha" v-model="password">
                                                <p class="help-block" v-if="errors.has('password')">
                                                    {{errors.first('password')}}</p>
                                            </div>
                                            <div class="form-group">
                                                <router-link class="btn btn-default pull-left" to="/">Início
                                                </router-link>
                                                <button class="btn btn-success pull-right" @click.prevent="login">
                                                    Acessar
                                                </button>
                                            </div>
                                        </form>
                                    </fieldset>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import {mapActions} from 'vuex'
    export default{
        name: 'auth-login',
        data(){
            return {
                email: 'me@matheuslima.com.br',
                password: 'password'
            }
        },
        mounted() {

        },
        methods: {
            /**
             * Map the actions from Vuex to this component.
             */
            ...mapActions(['authSetToken', 'authSetUser']),

            login(){
                let that = this

                that.$validator.validateAll().then(() => {

                    that.$http.post('auth/login',
                        {email: that.email, password: that.password})
                        .then(function (response) {

                            that.authSetToken(response.data.access_token) // this is a Vuex action
                            that.authSetUser(response.data.user) // this is a Vuex action

                            that.$router.push({path: '/dashboard'})

                        })
                        .catch(function (error) {
                            errorNotify('Ops!', 'Credenciais inválidas.')
                        });

                }).catch(() => {

                });

            },

            socialLogin(type) {
                this.$auth.oauth2({
                    provider: type || this.type
                });
            }
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

    .brand {
        font-family: "Lato", "Helvetica Neue", Helvetica, Arial, sans-serif;
        font-size: 32px;
        font-weight: 400;
        line-height: 1.1;
        color: inherit;
        margin-top: 10px;
        display: block;
        padding-top: 8px;
        padding-left: 55px;
    }

    .panel-body {
        padding: 0;
    }

    .panel-heading {
        padding: 0;
    }
</style>
