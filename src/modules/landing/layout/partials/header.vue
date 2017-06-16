<template>
    <!-- Navigation -->
    <nav class="navbar navbar-default navbar-fixed-top navbar-shrink">
        <div class="container">
            <!-- Brand and toggle get grouped for better mobile display -->
            <div class="navbar-header page-scroll" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1">
                <button type="button" class="navbar-toggle" id="navbar-menu-button" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1">
                    <span class="sr-only">Toggle navigation</span> Menu <i class="fa fa-bars"></i>
                </button>
                <ul class="nav navbar-nav navbar-right">
                    <li>
                        <a class="close-navbar-mb mb-brand" @click="closeMenu()">Mais Bartenders</a>
                    </li>
                </ul>

            </div>

            <!-- Collect the nav links, forms, and other content for toggling -->
            <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1" aria-expanded="true">
                <ul class="nav navbar-nav navbar-right">
                    <li class="hidden">
                        <a class="close-navbar-mb" href="#page-top"></a>
                    </li>
                    <li @click="closeMenu()">
                        <router-link
                            :to="{name: 'landing.home.show'}"
                            class="close-navbar-mb">
                        Home
                        </router-link>
                    </li>
                    <li @click="closeMenu()">
                        <router-link
                            :to="{name: 'landing.events.list'}"
                            class="close-navbar-mb">
                        Eventos
                        </router-link>
                    </li>
                    <li @click="closeMenu()">
                        <router-link
                            :to="{name: 'landing.drinks.list'}"
                            class="close-navbar-mb">
                        Cardápio Completo
                        </router-link>
                    </li>

                    <li v-if="!isLogged" @click="closeMenu()">
                        <router-link
                            :to="{name: 'landing.auth.login'}"
                            class="close-navbar-mb">
                        Login
                        </router-link>
                    </li>

                    <li v-if="!isLogged" @click="closeMenu()">
                        <router-link
                            :to="{name: 'landing.auth.signup'}"
                            class="close-navbar-mb">
                        Cadastre-se
                        </router-link>
                    </li>

                    <li @click="closeMenu()">
                        <router-link
                            :to="{name: 'landing.contact'}"
                            class="close-navbar-mb">
                        Contato
                        </router-link>
                    </li>

                    <li class="dropdown"  v-if="isLogged">
                        <a href="#" class="dropdown-toggle user-logged-name" data-toggle="dropdown">
                            <img :src="userPhoto" alt="" class="img-circle" width="32">
                            {{currentUser.full_name}} <b class="caret"></b>
                        </a>
                        <ul class="dropdown-menu" @click="closeMenu()">
                            <li>
                                <router-link
                                    :to="{name: 'landing.user.preferences'}"
                                    class="close-navbar-mb">
                                Meus drinks
                                </router-link>
                                <router-link
                                    :to="{name: 'landing.user.show'}"
                                    class="close-navbar-mb">
                                Meu perfil
                                </router-link>

                                <router-link
                                    :to="{name: 'landing.auth.logout'}"
                                    class="close-navbar-mb">
                                    Sair
                                </router-link>
                            </li>

                        </ul>
                    </li>

                </ul>
            </div>
            <!-- /.navbar-collapse -->
        </div>
        <!-- /.container-fluid -->
    </nav>
</template>

<script>
    import { mapGetters } from 'vuex'
    export default{
        name: 'landing-header',
        data(){
            return {}
        },
        computed: {
            ...mapGetters(['currentUser', 'isLogged', 'userPhoto']),
        },
        mounted(){

        },
        methods:{
            closeMenu: function(){
                if(window.innerWidth <= 768){
                    $('#navbar-menu-button').click();
                }
            },
        }
    }
</script>

<style scoped>
    .mb-brand{
        margin: 0px 0 0 15px;
        font-size: 20px;
    }

    @media(max-width:768px){
        .mb-brand{
            margin: 10px 0 0 15px;
        }

        .navbar-default .navbar-toggle {
            margin-top: 20px;
        }
    }

    .user-logged-name{
        top: -4px;
    }

    .navbar{
        z-index: 1000 !important;
    }

/* NAV BAR BREAKPOINT TO COLLAPSE ON IPAD AND OTHERS SMALL SCREENS */
@media (max-width: 1200px) {
    .navbar-header {
        float: none;
    }
    .navbar-left,.navbar-right {
        float: none !important;
    }
    .navbar-toggle {
        display: block;
    }
    .navbar-collapse {
        border-top: 1px solid transparent;
        box-shadow: inset 0 1px 0 rgba(255,255,255,0.1);
    }
    .navbar-fixed-top {
        top: 0;
        border-width: 0 0 1px;
    }
    .navbar-collapse.collapse {
        display: none!important;
    }
    .navbar-nav {
        float: none!important;
        margin-top: 7.5px;
    }
    .navbar-nav>li {
        float: none;
    }
    .navbar-nav>li>a {
        padding-top: 10px;
        padding-bottom: 10px;
    }
    .collapse.in{
        display:block !important;
    }
}

/* NAV BAR BREAKPOINT TO COLLAPSE ON IPAD AND OTHERS SMALL SCREENS */

</style>
