<template>
   <div class="first-container">

       <main-header :title="translations.title" />

       <!-- User Image + Title -->
       <div class="container">
           <div class="pic large center" :style="`background-image: url(${ user.photo_url })`" v-show="user.photo_url"></div>
           <div class="pic large center non-pic" v-show="!user.photo_url">{{ getInitialChar(user) }}</div>

           <h4 class="title-section">{{translations.section_title}}</h4>
       </div>

       <!-- Container Colored -->
        <div class="container-colored">
            <div class="container">

                <!-- User Config -->
                <div class="card">
                    <div class="card-body card-padding">
                        <div class="form-group">
                            <label>{{translations.labels.name}}</label>
                            <input class="form-control" v-model="user.name" :placeholder="translations.placeholders.name">
                        </div>

                        <div class="form-group">
                            <label>{{translations.labels.last_name}}</label>
                            <input class="form-control" v-model="user.last_name" :placeholder="translations.placeholders.last_name">
                        </div>

                        <div class="form-group">
                            <label>{{translations.labels.email}}</label>
                            <input class="form-control" v-model="user.email" :placeholder="translations.placeholders.email">
                        </div>

                        <div class="form-group">
                            <label>{{translations.labels.phone}}</label>
                            <input class="form-control" v-model="user.phone" :placeholder="translations.placeholders.phone">
                        </div>

                        <div class="form-group">
                            <label>{{translations.labels.photo}}</label>
                            <input class="form-control" type="file" v-on:change="loadPhoto">
                        </div>
                    </div>
                </div>

                <!-- User Password -->
                <div class="form-group m-t-0">
                    <button class="btn btn-block btn-mb-primary-reverse outline" @click.prevent="interactions.manage_password = true"
                            v-if="!interactions.manage_password">
                        {{currentUser.blank_password ? translations.buttons.create_password : translations.buttons.change_password}}
                    </button>
                    <button class="btn btn-block btn-mb-primary-reverse" @click.prevent="cancelManagePassword()"
                            v-if="interactions.manage_password"> {{translations.buttons.cancel_password_change}}
                    </button>
                </div>

                <div class="card" v-if="interactions.manage_password">
                    <div class="card-body card-padding">
                        <!--Usuário possui uma senha cadastrada-->
                        <div class="m-t-20" v-if="!currentUser.blank_password">

                            <div class="form-group">
                                <label class="control-label">{{translations.labels.current_password}}</label>
                                <input class="form-control" type="password" v-model="user.current_password" :placeholder="translations.placeholders.current_password">
                                <p class="help-block text-danger" v-if="interactions.current_password_error">
                                    Senha atual incorreta.</p>
                            </div>

                            <div class="form-group">
                                <label class="control-label">{{translations.labels.new_password}}</label>
                                <input class="form-control" type="password" v-model="user.password"  :placeholder="translations.placeholders.new_password">
                            </div>

                            <div class="form-group">
                                <label
                                    class="control-label">{{translations.labels.confirm_password}}</label>
                                <input class="form-control" type="password" v-model="user.password_confirmation"  :placeholder="translations.placeholders.confirm_password">
                            </div>

                        </div>

                        <!--Usuário não possui uma senha cadastada-->
                        <div class="m-t-20" v-if="currentUser.blank_password">
                            <div class="form-group">
                                <label class="control-label">{{translations.labels.new_password}}</label>
                                <input class="form-control" type="password" v-model="user.password" :placeholder="translations.placeholders.new_password">
                            </div>

                            <div class="form-group">
                                <label
                                    class="control-label">{{translations.labels.confirm_password}}</label>
                                <input class="form-control" type="password" v-model="user.password_confirmation" :placeholder="translations.placeholders.confirm_password">
                            </div>
                        </div>

                    </div>
                </div>

            </div>
        </div>

        <!-- Facebook -->
        <div class="container m-t-30 last-container">
            <div class="form-group text-center">
                <h4 class="section-title">{{translations.social_networks}}</h4>
                <p>{{translations.social_networks_message}}</p>

                <button class="btn btn-block btn-mb-facebook" @click="socialLogin('facebook')"
                    :disabled="interactions.socialProviders.facebook"
                >
                    <i class="fa fa-facebook fa-lg button-icon"></i>
                    {{interactions.socialProviders.facebook ? translations.buttons.facebook_connected : translations.buttons.facebook_connect}}
                </button>

            </div>
        </div>

        <!-- Btn Save -->
        <button class="btn btn-fixed-bottom btn-mb-info" @click.prevent="save()">{{translations.buttons.update}}</button>

    </div>
</template>

<script>
    import {mapGetters, mapActions} from 'vuex'
    import mainHeader from '@/components/main-header.vue'
    import userObj from '../../../models/User.js'
    import {cloneDeep} from 'lodash'
    import * as translations from '@/translations/user/show'

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
                user: userObj,
                initalName: ''
            }
        },
        computed: {
            // Map the getters from Vuex to this component.

            ...mapGetters(['currentUser', 'isLogged', 'userPhoto', 'language']),
            translations() {

                if (this.language === 'en') {
                    return translations.en
                }
                if (this.language === 'pt') {
                    return translations.pt
                }
            }

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

            getInitialChar(user) {
                return `${ user.full_name.charAt(0) } ${ user.last_name.charAt(0) }`
            },

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
