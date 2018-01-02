<template lang="html">
    <div>
        <div ref="sidemenu" id="side-menu-global-id" :class="isOpened ? 'side-menu active' : 'side-menu'">
            <div class="header">
                <img class="logo" src="../assets/logo_mb_2.png"/>
            </div>

            <div class="items">

                    <!-- MENU -->
                <div>
                    <ul class="main-menu">
                        <li class="sub-menu"  v-if="isLogged && isOnline">
                            <a href="#" class="sub-menu user-logged-name">
                                <img :src="userPhoto" alt="" class="img-circle" width="32">
                                {{currentUser.full_name}}
                            </a>
                            <ul>
                                <li>
                                    <router-link :to="{name: 'landing.user.preferences'}">Meus drinks</router-link>
                                </li>
                                <li>
                                    <router-link :to="{name: 'landing.user.show'}">Meu perfil</router-link>
                                </li>
                            </ul>
                        </li>

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

                        <li v-if="!isLogged">
                            <router-link :to="{name: 'landing.auth.login'}" v-if="isOnline">Login</router-link>
                        </li>
                        <li v-if="!isLogged">
                            <router-link :to="{name: 'landing.auth.signup'}" v-if="isOnline">Cadastre-se</router-link>
                        </li>

                        <li>
                            <router-link :to="{name: 'landing.contact'}">Contato</router-link>
                        </li>

                        <li>
                            <router-link :to="{name: 'landing.simulator'}">Simulador</router-link>
                        </li>

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
            isOpened: {
                type: Boolean,
                required: true
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
        left: -100vw;
        width: 250px;
        min-height: 100vh;
        background: #fff;
        z-index: 99999;
        box-shadow: 0 2px 4px rgba(0, 0, 0, .4);
        transition: ease .4s;
        padding: 0;
        overflow-y: scroll;
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
        background: rgba(0, 0, 0, .3);
        z-index: 9999;
        transition: ease .1s;
        padding: 0;
    }

    .side-menu.active + .side-menu-bg { display: block; }
    .side-menu.active {
        left: 0;
        transition: ease .4s;
    }

    /* Menu Header */
    .side-menu .header {
        background: #f2f2f2;
        padding: 11px 40px;
        width: 100%;
        overflow: hidden;
        display: flex;
        align-items: center;
    }
    .side-menu .header .logo {
        width: 110px;
        margin: 0 auto;
    }



.main-menu {
    list-style: none;
    padding-left: 0;
    margin: 20px 0 0 0;
}

.main-menu > li > a {
    padding: 14px 20px 14px 20px;
    display: block;
    color: #4A5464 !important;
    font-weight: 500;
    position: relative;
}

.main-menu > li > a:hover {
    color: #262626;
    background-color: #f7f7f7;
}

.main-menu > li > a > i {
    position: absolute;
    left: 16px;
    font-size: 20px;
    top: 0;
    width: 25px;
    text-align: center;
    padding: 13px 0;
}

.main-menu > li > a.active {
    color: #262626;
    background-color: #F4F4F4;
}

.sub-menu > ul > li > a.active {
    color: #262626;
    background-color: #F4F4F4;
}

.sub-menu > a {
    position: relative;
}

.sub-menu > a:before,
.sub-menu > a:after {
    position: absolute;
    top: 12px;
    color: #4A5464 !important;
    font-family: 'Material-Design-Iconic-Font';
    font-size: 17px;
    right: 15px;
    -webkit-transition: all;
    -o-transition: all;
    transition: all;
    -webkit-transition-duration: 250ms;
    transition-duration: 250ms;
    -webkit-backface-visibility: hidden;
    -moz-backface-visibility: hidden;
    backface-visibility: hidden;
}

.sub-menu > a.user-logged-name:before,
.sub-menu > a.user-logged-name:after {
    top: 17px;
}

.sub-menu > a:before {
    content: "\f107";
    font-family: FontAwesome;
    font-style: normal;
    font-weight: normal;
    text-decoration: inherit;
    -webkit-transform: scale(1);
    -ms-transform: scale(1);
    -o-transform: scale(1);
    transform: scale(1);
}

.sub-menu > a:after {
    content: "\f107";
    font-family: FontAwesome;
    font-style: normal;
    font-weight: normal;
    text-decoration: inherit;
    -webkit-transform: scale(0);
    -ms-transform: scale(0);
    -o-transform: scale(0);
    transform: scale(0);
}

.sub-menu .sub-menu > a:before,
.sub-menu .sub-menu > a:after {
    top: 5px;
}

.sub-menu.toggled > a:before {
    content: "\f106";
    font-family: FontAwesome;
    font-style: normal;
    font-weight: normal;
    text-decoration: inherit;
    -webkit-transform: scale(0);
    -ms-transform: scale(0);
    -o-transform: scale(0);
    transform: scale(0);
}

.sub-menu.toggled > a:after {
  content: "\f106";
    font-family: FontAwesome;
    font-style: normal;
    font-weight: normal;
    text-decoration: inherit;
    -webkit-transform: scale(1);
    -ms-transform: scale(1);
    -o-transform: scale(1);
    transform: scale(1);
}

.sub-menu ul {
    list-style: none;
    display: none;
    padding: 0;
}

.sub-menu ul > li > a {
    color: #4A5464 !important;
    padding: 8px 20px 8px 50px;
    font-weight: 500;
    display: block;
}

.sub-menu ul > li > a.active,
.sub-menu ul > li > a:hover {
    color: #000;
}

.sub-menu ul > li:first-child > a {
    padding-top: 14px;
}

.sub-menu ul > li:last-child > a {
    padding-bottom: 16px;
}

.sub-menu ul > li ul {
    font-size: 12px;
    margin: 10px 0;
    background-color: #f7f7f7;
}

.sub-menu.active > ul {
    display: block;
}

a{
    text-decoration: none;
}

</style>
