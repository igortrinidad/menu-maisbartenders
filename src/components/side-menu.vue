<template lang="html">
    <div>
        <div ref="sidemenu" id="side-menu-global-id" class="side-menu active">


            <div class="header text-center" v-if="isLogged && isOnline">
                <img :src="userPhoto" alt="" class="img-circle" width="64">
                <div class="m-t-10">
                    Olá, {{ currentUser.name }} {{ currentUser.last_name.charAt(0) }}.
                </div>
            </div>

            <div class="items">

                <!-- MENU -->
                <div>
                    <ul class="main-menu">

                        <div class="border-inside-card" v-if="isLogged && isOnline">
                            <li>
                                <router-link :to="{name: 'landing.user.preferences'}">Meus drinks</router-link>
                            </li>
                            <li>
                                <router-link :to="{name: 'landing.user.show'}">Meu perfil</router-link>
                            </li>
                        </div>

                        <div class="border-inside-card">
                            <li>
                                <router-link :to="{name: 'landing.home.show'}" exact>Home</router-link>
                            </li>

                            <li>
                                <router-link :to="{name: 'landing.events.list'}" exact>Eventos</router-link>
                            </li>
                            <li>
                                <router-link :to="{name: 'landing.events-offline.list'}" exact>Eventos salvos</router-link>
                            </li>

                            <li>
                                <router-link :to="{name: 'landing.drinks.list'}">Cardápio completo</router-link>
                            </li>
                        </div>

                        <div class="border-inside-card" v-if="!isLogged">
                            <li>
                                <router-link :to="{name: 'landing.auth.login'}" v-if="isOnline">Login</router-link>
                            </li>
                            <li>
                                <router-link :to="{name: 'landing.auth.signup'}" v-if="isOnline">Cadastre-se</router-link>
                            </li>
                        </div>

                        <div class="border-inside-card">
                            <li>
                                <router-link :to="{name: 'landing.contact'}">Contato</router-link>
                            </li>

                            <li>
                                <router-link :to="{name: 'landing.simulator'}">Simulador</router-link>
                            </li>
                        </div>


                        <li v-if="isLogged">
                            <router-link :to="{name: 'landing.auth.logout'}" exact v-if="isOnline">Sair</router-link>
                        </li>

                    </ul>
                </div>

            </div>
        </div>

        <div class="side-menu-bg" id="side-menu-bg"></div>

    </div>

</template>

<script>
    import { mapGetters } from 'vuex'

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
                isOnline: true,
            }
        },

        computed: {
            ...mapGetters(['currentUser', 'isLogged', 'userPhoto']),


        },

        mounted() {
            var that = this;
            var events = JSON.parse(localStorage.getItem('events'));

            if(Array.isArray(events) && events.length){
                this.hasEventSaved = true;
            }

            setInterval(function () {
                that.checkConnection()
            }, 10000)
        },


        methods: {
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
        background: #222;
        z-index: 777;
        box-shadow: 0 2px 4px rgba(0, 0, 0, .4);
        padding: 60px 0 0 0;
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
        padding-left: 0;
        margin: 20px 0 0 0;
        border-top: 1px solid rgba(255, 255, 255, .3);
    }

    .main-menu li a {
        padding: 14px 20px 14px 20px;
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
        color: #262626;
        background: #F4F4F4;
        -webkit-background-clip: unset;
        -webkit-text-fill-color: unset;
    }

    a {
        text-decoration: none;
    }

</style>
