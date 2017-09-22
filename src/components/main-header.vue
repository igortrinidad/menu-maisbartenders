<template>
    <div>

        <side-menu :isOpened="sideMenuStatus"></side-menu>

        <nav class="navbar navbar-default navbar-fixed-top">
            <div class="container-fluid">
                <div class="navbar-header">

                    <button
                        type="button"
                        id="navbar-menu-button"
                        class="navbar-toggle"
                        @click="handleSideMenu()"
                    >
                        <span class="sr-only">Toggle navigation</span> Menu
                        <i :class="sideMenuStatus ? 'fa fa-close' : 'fa fa-bars'"></i>
                    </button>

                    <router-link to="/" class="navbar-brand" style="padding: 11px">
                        <img src="../assets/logos/LOGO-1-06.png" style="width: 130px" alt="Places Weplanner">
                    </router-link>
                </div>

                <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-2">

                    <ul class="nav navbar-nav navbar-right" v-if="!isLogged">

                        <router-link tag="li" to="/" exact>
                            <a>Home</a>
                        </router-link>

                        <router-link  tag="li" to="/cliente/login" exact>
                            <a>Login <strong>cliente</strong></a>
                        </router-link>
                        <router-link  tag="li" to="/login" exact>
                            <a>Login <strong>admin</strong></a>
                        </router-link>
                        <router-link  tag="li" to="/cadastrar" exact>
                            <a>Cadastre-se</a>
                        </router-link>
                    </ul>

                    <ul class="nav navbar-nav navbar-right" v-if="isLogged">

                        <router-link  tag="li" to="/" exact>
                            <a>Home</a>
                        </router-link>

                        <router-link  tag="li" to="/cliente/dashboard/reservas" exact>
                            <a>Minhas Reservas <span class="badge badge-primary">{{clientReservationsCount}}</span></a>
                        </router-link>

                        <router-link  tag="li" :to="{ name: 'landing.places.listall'}">
                            <a>Procurar locais</a>
                        </router-link>

                        <li class="dropdown">

                            <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-expanded="false">{{currentUser.full_name}}
                                <span class="caret"></span></a>
                            <ul class="dropdown-menu" role="menu">
                                <router-link  tag="li" :to="{ name: 'client.dashboard.profile'}" exact>
                                    <a>Meu perfil</a>
                                </router-link>
                                <li><a href="#">Configurações</a></li>
                                <li class="divider"></li>
                                <li>
                                    <router-link to="/cliente/logout">Sair</router-link>
                                </li>
                            </ul>
                        </li>
                    </ul>


                    <ul class="nav navbar-nav navbar-right" v-if="isLogged && checkRole('admin')">

                            <router-link  tag="li" to="/" exact>
                                <a>Home</a>
                            </router-link>

                            <router-link  tag="li" to="/dashboard" exact>
                                <a>Dashboard</a>
                            </router-link>

                            <li class="dropdown">
                                <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-expanded="false">
                                    Meus locais <span class="badge badge-primary">{{currentUser.places_count}}</span>
                                    <span class="caret"></span></a>
                                <ul class="dropdown-menu" role="menu">
                                    <router-link  tag="li" :to="{ name: 'places.index'}" exact>
                                        <a>Listar</a>
                                    </router-link>
                                    <router-link  tag="li" :to="{ name: 'places.create'}" exact>
                                        <a>Adicionar local</a>
                                    </router-link>
                                </ul>
                            </li>

                            <li class="dropdown">
                                <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-expanded="false">
                                    Locais públicos
                                    <span class="caret"></span></a>
                                <ul class="dropdown-menu" role="menu">
                                    <router-link  tag="li" :to="{ name: 'common.places.index'}" exact>
                                        <a>Cadastrados por mim</a>
                                    </router-link>
                                    <router-link  tag="li" :to="{ name: 'common.places.create'}" exact>
                                        <a>Adicionar local público</a>
                                    </router-link>
                                </ul>
                            </li>

                            <li class="dropdown">
                                <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-expanded="false">{{currentUser.full_name}}
                                    <span class="caret"></span></a>
                                <ul class="dropdown-menu" role="menu">
                                    <router-link  tag="li" :to="{ name: 'dashboard.profile'}" exact>
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


                    <ul class="nav navbar-nav navbar-right" v-if="isLogged && checkRole('oracle')">


                            <router-link  tag="li" to="/" exact>
                                <a>Home</a>
                            </router-link>

                            <router-link  tag="li" to="/oracle/dashboard" exact>
                                <a>Dashboard</a>
                            </router-link>

                            <li class="dropdown">
                                <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-expanded="false">
                                    Locais
                                    <span class="caret"></span></a>
                                <ul class="dropdown-menu" role="menu">
                                    <router-link  tag="li" :to="{ name: 'oracle.places.index'}" exact>
                                        <a>Confirmados</a>
                                    </router-link>
                                    <router-link  tag="li" :to="{ name: 'oracle.places.unconfirmeds'}" exact>
                                        <a>Não confirmados</a>
                                    </router-link>
                                </ul>
                            </li>

                            <li class="dropdown">
                                <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-expanded="false">{{currentUser.full_name}}
                                    <span class="caret"></span></a>
                                <ul class="dropdown-menu" role="menu">
                                    <router-link  tag="li" :to="{ name: 'oracle.dashboard.profile'}" exact>
                                        <a>Meu perfil</a>
                                    </router-link>
                                    <li><a href="#">Configurações</a></li>
                                    <li class="divider"></li>
                                    <li>
                                        <router-link :to="{ name: 'oracle.auth.logout'}">Sair</router-link>
                                    </li>
                                </ul>
                            </li>
                    </ul>

                </div>
            </div>
        </nav>
    </div>
</template>

<script>
    import sideMenu from '@/components/side-menu.vue'
    import { mapGetters } from 'vuex'

    export default{
        name: 'landing-header',
        components: {
            sideMenu
        },
        data(){
            return {
                sideMenuStatus: false
            }
        },
        computed: {
            ...mapGetters(['currentUser', 'isLogged', 'checkRole', 'clientReservationsCount']),
        },
        mounted(){

        },
        methods:{
            handleSideMenu() {
                this.sideMenuStatus = !this.sideMenuStatus
            },
        }
    }
</script>

<style scoped>
</style>
