<template>
    <div class="container">
        <div class="main">
            <div class="row">
                <div class="col-md-12">
                    <div class="panel panel-login">
                        <div class="panel-heading">
                            <h1>Cadastro</h1>
                            <hr>
                        </div>
                        <div class="panel-body ">
                            <div class="col-lg-12">
                                <div :class="{'form-group': true, 'has-error': errors.has('name')}">
                                    <label class="control-label">Nome</label>
                                    <input v-validate="'required'" type="text"
                                           class="form-control" data-vv-name="name" data-vv-as="nome"
                                           placeholder="Seu nome" v-model="user.name">
                                    <p class="help-block" v-if="errors.has('name')">{{errors.first('name')}}</p>
                                </div>

                                <div :class="{'form-group': true, 'has-error': errors.has('last_name')}">
                                    <label class="control-label">Sobrenome</label>
                                    <input v-validate="'required'" type="text"
                                           class="form-control" data-vv-name="last_name" data-vv-as="sobrenome"
                                           placeholder="Seu sobrenome" v-model="user.last_name">
                                    <p class="help-block" v-if="errors.has('last_name')">{{errors.first('last_name')}}</p>
                                </div>

                                <div :class="{'form-group': true, 'has-error': errors.has('email')}">
                                    <label class="control-label">E-mail</label>
                                    <input v-validate="'required|email'" type="email"
                                           class="form-control" data-vv-name="email" data-vv-as="e-mail"
                                           placeholder="Seu e-mail" v-model="user.email">
                                    <p class="help-block" v-if="errors.has('email')">{{errors.first('email')}}</p>
                                </div>

                                <div :class="{'form-group': true, 'has-error': errors.has('password_confirmation')}">
                                    <label class="control-label">Senha</label>
                                    <input v-validate="'required'" type="password" class="form-control"
                                           data-vv-as="senha" name="password_confirmation" placeholder="Sua senha"
                                           v-model="user.password_confirmation">
                                    <p class="help-block" v-if="errors.has('password_confirmation')">
                                        {{errors.first('password_confirmation')}}</p>
                                </div>

                                <div :class="{'form-group': true, 'has-error': errors.has('password')}">
                                    <label class="control-label">Confirmar senha</label>
                                    <input v-validate="'required|confirmed:password_confirmation'" type="password"
                                           class="form-control" data-vv-name="password" data-vv-as="confirmar senha"
                                           name="password" placeholder="Confirme sua senha" v-model="user.password">
                                    <p class="help-block" v-if="errors.has('password')">{{errors.first('password')}}</p>
                                </div>

                                <div class="form-group">
                                    <router-link class="btn btn-default pull-left" to="/">Início</router-link>
                                    <button class="btn btn-success pull-right" @click.prevent="signup">Cadastar</button>
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
        name: 'auth-signup',
        data(){
            return {
                user: {
                    name: '',
                    last_name: '',
                    email: '',
                    password: '',
                    password_confirmation: '',
                },
                settings: {
                    password: '',
                    password_confirmation: ''
                }
            }
        },
        methods: {

            signup() {
                let that = this
                this.$validator.validateAll().then(() => {
                    // eslint-disable-next-line
                    that.$http.post('auth/signup', that.user)
                        .then(function (response) {

                            successNotify('', 'Cadastro realizado com sucesso.')
                            that.$router.push({path: '/login'})

                        })
                        .catch(function (error) {
                            errorNotify('', 'Houve um erro ao realizar o cadastro.')
                        });
                }).catch(() => {
                    // eslint-disable-next-line
                });
            }
        }
    }
</script>

