<template lang="html">
    <div>
        <div ref="sidemenu" id="side-menu-global-id" class="side-menu active">

            <div class="items">

                <!-- MENU -->
                <div>
                    <ul class="main-menu">

                        <!-- User Logged And Online -->
                        <div class="border-inside-card" v-if="isLogged">
                            <li  v-if="isLogged">
                                <a href="#">{{translations.greeting}} {{ currentUser.full_name }}</a>
                            </li>
                            <li>
                                <router-link :to="{name: 'landing.user.preferences'}">{{translations.my_drinks}}</router-link>
                            </li>

                            <li>
                                <router-link :to="{name: 'landing.user.show'}">{{translations.my_profile}}</router-link>
                            </li>
                        </div>

                        <!-- Fixed #1 -->
                        <div class="border-inside-card">
                            <li>
                                <router-link :to="{name: 'landing.home.show'}" exact>{{translations.home}}</router-link>
                            </li>

                            <li>
                                <router-link :to="{name: 'landing.events.list'}" exact>{{translations.events}}</router-link>
                            </li>
                            <li v-if="isMobile">
                                <router-link :to="{name: 'landing.events-offline.list'}" exact>{{translations.saved_events}}</router-link>
                            </li>

                            <li>
                                <router-link :to="{name: 'landing.drinks.list'}">{{translations.complete_menu}}</router-link>
                            </li>
                        </div>

                        <!-- User Not Logged -->
                        <div class="border-inside-card" v-if="!isLogged">
                            <li>
                                <router-link :to="{name: 'landing.auth.login'}" v-if="isOnline">{{translations.login}}</router-link>
                            </li>
                            <li>
                                <router-link :to="{name: 'landing.auth.signup'}" v-if="isOnline">{{translations.signup}}</router-link>
                            </li>
                        </div>

                        <!-- Fixed #2 -->
                        <div class="border-inside-card">
                            <li>
                                <router-link :to="{name: 'landing.contact'}">{{translations.contact}}</router-link>
                            </li>

                            <li>
                                <router-link :to="{name: 'landing.simulator'}">{{translations.simulator}}</router-link>
                            </li>
                        </div>

                    </ul>

                    <!-- Logout button -->
                    <router-link tag="button" class="btn btn-mb-primary btn-fixed-bottom" :to="{name: 'landing.auth.logout'}" exact v-if="isLogged">
                        <i class="fa fa-sign-out m-r-5"></i>{{translations.logout}}
                    </router-link>
                </div>

            </div>
        </div>

        <div class="side-menu-bg" id="side-menu-bg" @click="closeMenu(true)"></div>

    </div>

</template>

<script>
    import { mapGetters } from 'vuex'
    import * as translations from '@/translations/components/side-menu'

    export default {
        name: 'side-menu',
        props: {
            left: {
                type: Number,
                default: 0
            }
        },
        data() {
            return {
                showDropdown: {
                    adminPlaces: false,
                    adminPublicPlaces: false,
                },
                hasEventSaved: false,
                isMobile: false,
            }
        },

        computed: {
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

        mounted() {
            var that = this;
            var events = JSON.parse(localStorage.getItem('events'));


            //Esperar o device estar pronto para verificar se é mobile
            if(window.cordova){

                document.addEventListener("deviceready", function(){
                    that.isMobile = true
                }, false);

            }

            if(Array.isArray(events) && events.length){
                this.hasEventSaved = true;
            }

        },

        methods: {
            closeMenu: function () {
                this.$emit('closeMenu')
            },
            checkConnection: function () {
                var that = this
                if (navigator.onLine) {
                    that.isOnline = true
                } else {
                    that.isOnline = false
                }
            },
        }
    }
</script>

<style scoped>

    .side-menu {
        position: fixed;
        top: 0;
        left: 0;
        width: 250px;
        min-height: 100vh;
        background: #000;
        z-index: 777;
        box-shadow: 0 2px 4px rgba(0, 0, 0, .4);
        padding: 80px 0 0 0;
        overflow: hidden;
        transform: translateX(-280px);
    }

    .side-menu-bg {
        content: '';
        position: fixed;
        display: none;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        width: 100vw;
        height: 100vh;
        background: rgba(0, 0, 0, 0);
        z-index: 666;
        transition: ease .1s;
        padding: 0;
    }

    /* Menu Header */
    .side-menu .header {
        background: transparent;
        padding: 10px 5px;
        width: 60%;
        position: absolute;
        top: 0; right: 0;
        overflow: hidden;
    }
    .side-menu .header .logo {
        width: 110px;
        margin: 0 auto;
    }

    /* Main Menu */
    .main-menu {
        list-style: none;
        padding: 5px;
        margin: 0;
        height: calc(100vh - 130px);
        overflow-y: scroll;
    }

    .main-menu .border-inside-card { margin-bottom: 14px; }
    .main-menu .border-inside-card:last-child { margin-bottom: 0; }

    .main-menu li a {
        padding: 7px 14px;
        display: block;
        font-weight: 700;
        background: -webkit-linear-gradient(#FB923B, #F66439);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        position: relative;
    }

    .main-menu li a:hover {
        color: #262626;
        background-color: #f7f7f7;
    }

    .main-menu li a.active {
        color: #fff;
        background: transparent;
        -webkit-background-clip: unset;
        -webkit-text-fill-color: unset;
    }

    a {
        text-decoration: none;
    }

</style>
