<template>

    <nav class="navbar navbar-inverse">
        <div class="container-fluid">
            <div class="navbar-header">
                <button type="button" class="navbar-toggle collapsed" data-toggle="collapse"
                        data-target="#bs-example-navbar-collapse-2">
                    <span class="sr-only">Toggle navigation</span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                </button>

                <router-link class="navbar-brand" to="/dashboard">We Planner Vue Starter</router-link>
            </div>

            <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-2">
                <ul class="nav navbar-nav">
                    <router-link  tag="li" to="/dashboard" exact>
                        <a>Dashboard</a>
                    </router-link>
                </ul>
                <ul class="nav navbar-nav navbar-right">
                    <router-link  tag="li" to="/" exact>
                        <a>Home</a>
                    </router-link>

                    <li class="dropdown" :class="{'active': subIsActive('/dashboard/')}">
                        <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-expanded="false">{{currentUser.full_name}}
                            <span class="caret"></span></a>
                        <ul class="dropdown-menu" role="menu">
                            <router-link  tag="li" to="/dashboard/profile" exact>
                                <a>Meu perfil</a>
                            </router-link>
                            <li><a href="#">Configurações</a></li>
                            <li class="divider"></li>
                            <li>
                                <router-link to="/logout">Sair</router-link>
                            </li>
                        </ul>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
</template>

<script>
    import { mapGetters } from 'vuex'
    export default{
        name: 'header',
        data(){
            return {}
        },
        computed: {
            /**
             * Map the getters from Vuex to this component.
             */
            ...mapGetters(['currentUser', 'isLogged']),
        },
        mounted(){

        },
        methods:{

            subIsActive(input) { // Handle with active class on dropdown / submenu
                const paths = Array.isArray(input) ? input : [input]
                return paths.some(path => {


                    return this.$route.path.indexOf(path) === 0
                })
            }
        }
    }
</script>

<style>
.navbar {
    border-radius: 0px;
}



</style>
