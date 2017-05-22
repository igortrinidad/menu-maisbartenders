<template>
    <div class="container">
        <h1>Meu Perfil</h1>
        <hr>
        <div class="row">
            <div class="col-sm-4">
                <gravatar class="center-block" :email="currentUser.email" :size="200" default-img="mm"/>
                <div class="p-t-15 text-center">
                    <a href="#" class="btn btn-link">Facebook</a>
                    <a href="#" class="btn btn-link">Instagram</a>
                    <a href="#" class="btn btn-link">Twitter</a>
                </div>
            </div>
            <div class="col-md-8">

                <div class="alert alert-dismissible alert-info" v-if="currentUser.blank_password">
                    <button type="button" class="close" data-dismiss="alert">&times;</button>
                    <h4>Configurar senha</h4>
                    <p>
                        Sua conta foi criada utilizando uma rede social, é necessário que você configure uma senha para conectar-se utilizando e-mail e senha.</p>
                    <p>Clique na opção <strong>definir senha</strong> e configure uma senha.</p>
                </div>

                <ul class="nav nav-tabs">
                    <li class="active"><a href="#profile" data-toggle="tab">Suas informações</a></li>
                    <li><a href="#password" data-toggle="tab">{{ currentUser.blank_password ? 'Definir' : 'Alterar'}} senha</a>
                    </li>
                </ul>
                <div id="myTabContent" class="tab-content">
                    <!-- Informações -->
                    <div class="tab-pane card-padding fade active in" id="profile">
                        <div class="m-t-20">
                            <div class="form-group">
                                <label class="control-label">Nome</label>
                                <input type="text" class="form-control" placeholder="Nome" v-model="profile.name">
                            </div>

                            <div class="form-group">
                                <label class="control-label">Sobrenome</label>
                                <input type="text" class="form-control" placeholder="Sobrenome"
                                       v-model="profile.last_name">
                            </div>

                            <div class="form-group">
                                <label class=" control-label">E-mail</label>
                                <input type="text" class="form-control" placeholder="Sobrenome" v-model="profile.email"
                                       disabled>
                            </div>

                            <div class="form-group">
                                <label>Redes sociais</label>
                                <p>
                                    Nosso sistema permite que você se conecte utilizando uma ou mais redes sociais ao mesmo, escolha uma disponível e conecte-se.</p>
                                <br>
                                <button class="btn btn-info facebook" @click="socialLogin('facebook')"
                                        :disabled="interactions.socialProviders.facebook">
                                    <i class="fa fa-facebook fa-lg button-icon"></i>
                                    {{interactions.socialProviders.facebook ? 'Conectado ao' : 'Conectar com'}} Facebook
                                </button>

                                <button class="btn btn-info google m-l-10" @click="socialLogin('google')"
                                        :disabled="interactions.socialProviders.google">
                                    <i class="fa fa-google fa-lg button-icon"></i>
                                    {{interactions.socialProviders.google ? 'Conectado ao' : 'Conectar com'}} Google
                                </button>

                            </div>

                            <div class="form-group pull-right">
                                <button class="btn btn-success" @click.prevent="save()">Salvar</button>
                            </div>
                        </div>

                    </div>
                    <!-- Informações -->

                    <!-- Alterar senha -->
                    <div class="tab-pane fade" id="password">
                        <!--Usuário não possui uma senha cadastada-->
                        <div class="m-t-20" v-if="currentUser.blank_password">
                            <div :class="{'form-group': true, 'has-error': errors.has('password_confirmation')}">
                                <label class="control-label">Senha</label>
                                <input v-validate="'required'" type="password" class="form-control"
                                       data-vv-as="senha" name="password_confirmation" placeholder="Sua senha"
                                       v-model="passwordInfo.password_confirmation">
                                <p class="help-block" v-if="errors.has('password_confirmation')">
                                    {{errors.first('password_confirmation')}}</p>
                            </div>

                            <div :class="{'form-group': true, 'has-error': errors.has('password')}">
                                <label class="control-label">Confirmar senha</label>
                                <input v-validate="'required|confirmed:password_confirmation'" type="password"
                                       class="form-control" data-vv-name="password" data-vv-as="confirmar senha"
                                       name="password" placeholder="Confirmar senha" v-model="passwordInfo.password">
                                <p class="help-block" v-if="errors.has('password')">{{errors.first('password')}}</p>
                            </div>
                        </div>
                        <!--Usuário não possui uma senha cadastada-->

                        <!--Usuário possui uma senha cadastrada-->
                        <div class="m-t-20" v-if="!currentUser.blank_password">

                            <div :class="{'form-group': true, 'has-error': errors.has('current_password')}">
                                <label class="control-label">Senha atual</label>
                                <input v-validate="'required'" type="password"
                                       class="form-control" data-vv-name="current_password"
                                       data-vv-as="senha atual senha"
                                       placeholder="Sua senha atual" v-model="passwordInfo.current_password">
                                <p class="help-block" v-if="errors.has('current_password')">
                                    {{errors.first('current_password')}}</p>
                            </div>

                            <div :class="{'form-group': true, 'has-error': errors.has('password_confirmation')}">
                                <label class="control-label">Nova senha</label>
                                <input v-validate="'required'" type="password" class="form-control"
                                       data-vv-as="nova senha" name="password_confirmation" placeholder="Sua senha"
                                       v-model="passwordInfo.password_confirmation">
                                <p class="help-block" v-if="errors.has('password_confirmation')">
                                    {{errors.first('password_confirmation')}}</p>
                            </div>

                            <div :class="{'form-group': true, 'has-error': errors.has('password')}">
                                <label
                                    class="control-label">{{ !currentUser.blank_password ? 'Confirmar nova senha' : 'Confirmar senha'}}</label>
                                <input v-validate="'required|confirmed:password_confirmation'" type="password"
                                       class="form-control" data-vv-name="password" data-vv-as="confirmar nova senha"
                                       name="password" placeholder="Confirmar nova senha"
                                       v-model="passwordInfo.password">
                                <p class="help-block" v-if="errors.has('password')">{{errors.first('password')}}</p>
                            </div>

                        </div>
                        <!--Usuário possui uma senha cadastrada-->

                        <div class="form-group pull-right">
                            <button class="btn btn-success" @click.prevent="savePassword()">Salvar</button>
                        </div>
                    </div>
                    <!-- Alterar senha -->
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import Gravatar from 'vue-gravatar';
    import {mapActions, mapGetters} from 'vuex'
    export default{
        name: 'dashboard-profile',
        components: {
            Gravatar
        },
        data(){
            return {
                interactions: {
                    socialProviders: {
                        facebook: false,
                        google: false
                    },
                    current_password_error: false
                },

                profile: {
                    name: '',
                    last_name: '',
                    email: ''
                },

                passwordInfo: {
                    id: null,
                    current_password: null,
                    password: null,
                    password_confirmation: null
                }
            }
        },
        computed: {
            /**
             * Map the getters from Vuex to this component.
             */
            ...mapGetters(['currentUser', 'isLogged']),
        },
        mounted(){
            this.profile = Object.assign({}, this.currentUser);
            this.handleProvidersButtons()
        },
        methods: {

            /**
             * Map the actions from Vuex to this component.
             */
            ...mapActions(['authSetUser']),

            save(){
                let that = this

                that.$http.post('user/update', that.profile)
                    .then(function (response) {

                        that.authSetUser(response.data.user) // this is a Vuex action

                        successNotify('', 'Perfil atualizado com sucesso.', 'bottomRight')

                    })
                    .catch(function (error) {
                        errorNotify('Ops!', 'Não foi possivel atualizar seu perfil.', 'bottomRight')
                    });
            },

            socialLogin(type) {
                this.$auth.oauth2({
                    provider: type || this.type
                });
            },

            handleProvidersButtons(){
                let that = this

                that.currentUser.social_providers.forEach((socialLogin) => {

                    that.interactions.socialProviders[socialLogin.provider] = true
                })
            },

            savePassword(){
                let that = this


                that.$validator.validateAll().then(() => {

                    that.passwordInfo.id = that.currentUser.id

                    that.$http.post('user/update', that.passwordInfo)
                        .then(function (response) {

                            if (!response.data.error) {
                                that.authSetUser(response.data.user) // this is a Vuex action

                                successNotify('', 'Sua senha foi definida com sucesso.', 'bottomRight')

                                that.resetPasswords()

                            }

                            if (response.data.error) {
                                that.$validator.errorBag.add('current_password', 'Senha atual incorreta.');
                            }

                        })
                        .catch(function (error) {
                            errorNotify('Ops!', 'Não foi possivel definir sua senha.', 'bottomRight')
                        });
                }).catch(() => {

                });
            },

            resetPasswords(){
                let that = this

                that.passwordInfo.id = null
                that.passwordInfo.current_password = null
                that.passwordInfo.password = null
                that.passwordInfo.password_confirmation = null

                that.$nextTick(() => {
                    that.errors.clear()
                })
            }
        }

    }
</script>

<style>
    .p-t-15 {
        padding-top: 15px;
    }
</style>


