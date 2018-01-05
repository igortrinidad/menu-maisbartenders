<template>
   <div class="first-container">

       <main-header :title="'Meus dados'" />

       <!-- Icon SVG + Title -->
       <div class="container">

           <div class="svg-container">
               <svg viewBox="0 0 90 90">
                   <defs>
                       <linearGradient id="linear" x1="0%" y1="0%" x2="100%" y2="0%">
                           <stop offset="0%"   stop-color="#FB923B"/>
                           <stop offset="100%" stop-color="#F66439"/>
                       </linearGradient>
                   </defs>

                   <path class="non-fill fix-user animated" stroke="url(#linear)"
                        d="m 50,45.5 c -9.6,0 -17.5,-7.8 -17.5,-17.5 0,-9.6 7.8,-17.5 17.5,-17.5 9.6,0 17.5,7.8 17.5,17.5 0,9.7 -7.9,17.5 -17.5,17.5 z m 0,-33.9 c -9.1,0 -16.5,7.4 -16.5,16.5 0,9.1 7.4,16.4 16.5,16.4 9.1,0 16.5,-7.4 16.5,-16.5 0,-9.1 -7.4,-16.4 -16.5,-16.4 z"
                   />
                   <path class="non-fill fix-user animated" stroke="url(#linear)"
                        d="m 81.9,89.4 h -1 v -5 C 80.9,68.1 67.7,54.9 51.4,54.9 h -2.8 c -16.3,0 -29.5,13.2 -29.5,29.5 v 5 h -1 v -5 c 0,-16.8 13.7,-30.5 30.5,-30.5 h 2.8 c 16.8,0 30.5,13.7 30.5,30.5 z"
                   />
               </svg>
           </div>

           <h4 class="title-section">Altere suas informações.</h4>
       </div>

        <div class="container-colored">
            <div class="container">

                <!-- User Config -->
                <div class="card">
                    <div class="card-body card-padding">
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
                    </div>
                </div>

                <!-- User Password -->
                <div class="form-group m-t-0">
                    <button class="btn btn-block btn-mb-primary-reverse outline" @click.prevent="interactions.manage_password = true"
                            v-if="!interactions.manage_password">
                        {{currentUser.blank_password ? 'Definir senha' : 'Alterar senha'}}
                    </button>
                    <button class="btn btn-block btn-mb-primary-reverse" @click.prevent="cancelManagePassword()"
                            v-if="interactions.manage_password"> Cancelar alteração de senha
                    </button>
                </div>

                <div class="card" v-if="interactions.manage_password">
                    <div class="card-body card-padding">
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

                    </div>
                </div>

            </div>
        </div>

        <!-- Facebook -->
        <div class="container m-t-30 last-container">
            <div class="form-group text-center">
                <h4 class="section-title">Redes sociais</h4>
                <p>Nosso sistema permite que você se conecte utilizando o facebook ou email e senha, escolha uma opção disponível e conecte-se.</p>

                <button class="btn btn-block btn-mb-facebook" @click="socialLogin('facebook')"
                    :disabled="interactions.socialProviders.facebook"
                >
                    <i class="fa fa-facebook fa-lg button-icon"></i>
                    {{interactions.socialProviders.facebook ? 'Conectado ao' : 'Conectar com'}} Facebook
                </button>

            </div>
        </div>

        <!-- Btn Save -->
        <button class="btn btn-fixed-bottom btn-mb-info" @click.prevent="save()">Atualizar cadastro</button>

    </div>
</template>

<script>
    import {mapGetters, mapActions} from 'vuex'
    import mainHeader from '@/components/main-header.vue'
    import userObj from '../../../models/User.js'
    import {cloneDeep} from 'lodash'

    var Swiper = require('swiper')

    export default {
        name: 'show-user',
        components: {
            mainHeader
        },
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
            ...mapActions(['authSetUser', 'setLoading']),

            save(){
                let that = this
                let formData = new FormData();

                Object.keys(that.user).map(function (key, index) {
                    formData.append(key, that.user[key])
                });

                that.setLoading({is_loading: true, message: ''})

                that.$http.post('/guest/update', formData, {headers: {'Content-Type': 'multipart/form-data'}})
                    .then(function (response) {
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

                        that.setLoading({is_loading: false, message: ''})
                    })
                    .catch(function (error) {
                        errorNotify('Ops!', 'Não foi possivel atualizar seu perfil.', 'bottomRight')
                        that.setLoading({is_loading: false, message: ''})
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

    /* Fix Fixed Button */
    .last-container { margin-bottom: 60px; }
    .btn-fixed-bottom { position: fixed; }
</style>
