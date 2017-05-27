<template>
    <!-- Navigation -->
    <nav class="navbar navbar-default navbar-fixed-top navbar-shrink">
        <div class="container">
            <!-- Brand and toggle get grouped for better mobile display -->
            <div class="navbar-header page-scroll">
                <button type="button" class="navbar-toggle" id="navbar-menu-button" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1">
                    <span class="sr-only">Toggle navigation</span> Menu <i class="fa fa-bars"></i>
                </button>
                <ul class="nav navbar-nav navbar-right">
                    <li>
                        <a class="page-scroll close-navbar-mb mb-brand" @click="closeMenu()">Mais Bartenders</a>
                    </li>
                </ul>
                
            </div>

            <!-- Collect the nav links, forms, and other content for toggling -->
            <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                <ul class="nav navbar-nav navbar-right">
                    <li class="hidden">
                        <a class="close-navbar-mb" href="#page-top"></a>
                    </li>
                    <li>
                        <router-link
                            :to="{name: 'landing.home.show'}"
                            class="close-navbar-mb"
                            @click="closeMenu()">
                        Home
                        </router-link>
                    </li>
                    <li>
                        <router-link
                            :to="{name: 'landing.events.list'}"
                            class="close-navbar-mb"
                            @click="closeMenu()">
                        Eventos
                        </router-link>
                    </li>
                    <li>
                        <router-link
                            :to="{name: 'landing.drinks.list'}"
                            class="close-navbar-mb"
                            @click="closeMenu()">
                        Cardápio Mais Bartenders
                        </router-link>
                    </li>

                    <li>
                        <router-link
                            :to="{name: 'landing.auth.login'}"
                            class="close-navbar-mb"
                            @click="closeMenu()">
                        Login
                        </router-link>
                    </li>

                    <li>
                        <router-link
                            :to="{name: 'landing.auth.signup'}"
                            class="close-navbar-mb"
                            @click="closeMenu()">
                        Cadastre-se
                        </router-link>
                    </li>

                    <li class="dropdown">
                        <a href="#" class="dropdown-toggle" data-toggle="dropdown">Nome user <b class="caret"></b></a>
                        <ul class="dropdown-menu">
                            <li>
                                <a>Meu perfil</a>
                                <a>Meus drinks</a>
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

    export default{
        name: 'landing-header',
        data(){
            return {}
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
</style>
