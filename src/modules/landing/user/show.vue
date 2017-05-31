<template>
    <div>

        <section id="login">
            <div class="container">
                <div class="row m-b-30">
                    <div class="col-lg-12">
                        <h3 class="section-heading">Cadastro</h3>
                        <h4 class="text-muted m-t-30">Veja seu cadastro no Menu Interativo</h4>
                    </div>
                </div>

                <div class="row m-t-20">
                    <div class="col-md-5 col-xs-12">

                        <h4>Dados do cadastro</h4>

                        <div class="alert alert-dismissible alert-info" v-if="currentUser.blank_password">
                            <button type="button" class="close" data-dismiss="alert">&times;</button>
                            <h4>Configurar senha</h4>
                            <p>
                                Sua conta foi criada utilizando uma rede social, é necessário que você configure uma senha para conectar-se utilizando e-mail e senha.</p>
                            <p>Clique na opção <strong>definir senha</strong> e configure uma senha.</p>
                        </div>

                        <div class="form-group">
                            <label>Primeiro nome</label>
                            <input class="form-control" v-model="user.name">
                        </div>
                        <div class="form-group">
                            <label>Segundo nome</label>
                            <input class="form-control" v-model="user.last_name">
                        </div>
                        <div class="form-group">
                            <label>Email</label>
                            <input class="form-control" v-model="user.email">
                        </div>
                        <div class="form-group">
                            <label>Telefone</label>
                            <input class="form-control" v-model="user.phone">
                        </div>

                        <div class="form-group">
                            <label>Foto</label>
                            <input class="form-control" type="file" v-on:change="loadPhoto">
                        </div>


                        <div class="form-group">
                            <button class="btn btn-info" @click.prevent="interactions.manage_password = true"
                                    v-if="!interactions.manage_password">
                                {{currentUser.blank_password ? 'Definir senha' : 'Alterar senha'}}
                            </button>
                            <button class="btn btn-danger" @click.prevent="cancelManagePassword()"
                                    v-if="interactions.manage_password"> Cancelar alteração de senha
                            </button>
                        </div>

                        <div v-if="interactions.manage_password">

                            <!--Usuário possui uma senha cadastrada-->
                            <div class="m-t-20" v-if="!currentUser.blank_password">

                                <div class="form-group">
                                    <label class="control-label">Senha atual</label>
                                    <input class="form-control" type="password" v-model="user.current_password">
                                    <p class="help-block text-danger" v-if="interactions.current_password_error">
                                        Senha atual incorreta.</p>
                                </div>

                                <div class="form-group">
                                    <label class="control-label">Nova senha</label>
                                    <input class="form-control" type="password" v-model="user.password">
                                </div>

                                <div class="form-group">
                                    <label
                                        class="control-label">{{ !currentUser.blank_password ? 'Confirmar nova senha' : 'Confirmar senha'}}</label>
                                    <input class="form-control" type="password" v-model="user.password_confirmation">
                                </div>

                            </div>
                            <!--Usuário possui uma senha cadastrada-->

                            <!--Usuário não possui uma senha cadastada-->
                            <div class="m-t-20" v-if="currentUser.blank_password">
                                <div class="form-group">
                                    <label class="control-label">Nova senha</label>
                                    <input class="form-control" type="password" v-model="user.password">
                                </div>

                                <div class="form-group">
                                    <label
                                        class="control-label">{{ !currentUser.blank_password ? 'Confirmar nova senha' : 'Confirmar senha'}}</label>
                                    <input class="form-control" type="password" v-model="user.password_confirmation">
                                </div>
                            </div>
                            <!--Usuário não possui uma senha cadastada-->
                        </div>


                        <div class="form-group">
                            <label>Redes sociais</label>
                            <p>
                                Nosso sistema permite que você se conecte utilizando uma ou mais redes sociais ao mesmo, escolha uma disponível e conecte-se.</p>
                            <div class="row">
                                <div class="col-md-12 col-xs-12">
                                    <button class="btn btn-info btn-block facebook" @click="socialLogin('facebook')"
                                            :disabled="interactions.socialProviders.facebook">
                                        <i class="fa fa-facebook fa-lg button-icon"></i>
                                        {{interactions.socialProviders.facebook ? 'Conectado ao' : 'Conectar com'}} Facebook
                                    </button>
                                    
                                </div>
                                <div class="col-md-12 col-xs-12 m-t-10">
                                    <button class="btn btn-info btn-block google" @click="socialLogin('google')"
                                            :disabled="interactions.socialProviders.google">
                                        <i class="fa fa-google fa-lg button-icon"></i>
                                        {{interactions.socialProviders.google ? 'Conectado ao' : 'Conectar com'}} Google
                                    </button>
                                </div>
                            </div>

                        </div>
                        
                        <hr>
                        <div class="form-group">
                            <button class="btn btn-xl btn-block btn-primary" @click.prevent="save()">Atualizar cadastro</button>
                        </div>
                    </div>

                    <div class="col-md-6 col-md-offset-1 col-xs-12">
                        <h4>Ultimas interações</h4>

                        <h5>Eventos
                            <hr>
                        </h5>
                        <span v-for="(event, index) in user.events">
                        <small>Data: {{event.date}}</small>
                        <p class="interactions">{{event.name}}</p>
                    </span>
                        <hr>

                        <h5>Comentários</h5>

                        <span v-for="(comment, index) in user.comments">
                        <small>Criado em: {{comment.created_at}}</small>
                        <p class="interactions">{{comment.phrase}}</p>
                    </span>
                    </div>
                </div>
            </div>
        </section>

    </div>
</template>

<script>
    import {mapGetters, mapActions} from 'vuex'
    import userObj from '../../../models/User.js'
    import {cloneDeep} from 'lodash'

    var Swiper = require('swiper')

    export default {
        name: 'show-user',
        data () {
            return {
                interactions: {
                    socialProviders: {
                        facebook: false,
                        google: false
                    },
                    manage_password: false,
                    current_password_error: false
                },
                user: userObj
            }
        },
        computed: {
            // Map the getters from Vuex to this component.

            ...mapGetters(['currentUser', 'isLogged', 'userPhoto']),

        },
        mounted(){

            this.user = cloneDeep(this.currentUser)
            this.handleProvidersButtons()

        },
        methods: {

            /**
             * Map the actions from Vuex to this component.
             */
            ...mapActions(['authSetUser']),

            save(){
                let that = this
                let formData = new FormData();

                Object.keys(that.user).map(function (key, index) {
                    formData.append(key, that.user[key])
                });

                that.$http.post('/guest/update', formData, {headers: {'Content-Type': 'multipart/form-data'}})
                    .then(function (response) {
                        console.log(response)
                        if (response.data.error) {
                            that.interactions.current_password_error = true
                            that.interactions.manage_password = true
                            errorNotify('Ops!', response.data.message)
                        }

                        if (!response.data.error) {
                            that.authSetUser(response.data.user) // this is a Vuex action

                            successNotify('', 'Perfil atualizado com sucesso.', 'bottomRight')

                            if(that.interactions.manage_password){
                                that.cancelManagePassword()
                            }
                        }
                    })
                    .catch(function (error) {
                        errorNotify('Ops!', 'Não foi possivel atualizar seu perfil.', 'bottomRight')
                    });
            },

            handleProvidersButtons(){
                let that = this

                that.currentUser.social_providers.map((socialLogin) => {

                    that.interactions.socialProviders[socialLogin.provider] = true
                })
            },

            cancelManagePassword(){
                this.user.password = null
                this.user.password_confirmation = null
                this.user.current_password = null
                this.interactions.manage_password = false
                this.interactions.current_password_error = false

            },

            loadPhoto(event){
                this.user.photo = event.target.files[0]
            },

            socialLogin(type) {
                localStorage.setItem('role', 'guest')
                localStorage.setItem('provider', type)
                this.$auth.oauth2({
                    provider: type
                });
            }
        }
    }
</script>

<style scoped>

    .text-selected {
        background-color: #FED136;
        font-size: 22px;
    }

    #contact {
        background-color: #F7F7F7;
    }

    .interactions {
        display: block;
        border-radius: 4px;
        background-color: #E5E5E5;
        padding: 5px 10px 5px 10px;
        font-size: 17px;
        font-weight: 500;
    }
</style>
