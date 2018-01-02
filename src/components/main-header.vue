<template>
    <div>

        <side-menu :isOpened="sideMenuStatus"></side-menu>

        <button type="button" class="hamburger" :class="{ 'back': title !== 'logo' }" @click="handleSideMenu()">
            <span class="line"></span>
            <span class="line"></span>
            <span class="line"></span>
        </button>

        <nav class="navbar navbar-default navbar-fixed-top navbar-shrink" :class="navbarTransparent ? 'navbar-transparent transparent' : ''">
            <div class="container">

                <div class="text-center m-10">
                    <img v-if="title === 'logo'" src="../assets/logo_mb.png" class="logo-header" alt="Mais Bartenders">
                    <span v-if="title !== 'logo'" class="title-header">
                        <span class="t-overflow">{{ title }}</span>
                    </span>
                </div>
            </div>
            <!-- /.container-fluid -->
        </nav>
    </div>
</template>

<script>
    import sideMenu from '@/components/side-menu.vue'
    import { mapGetters } from 'vuex'

    export default {
        name: 'main-header',
        props: {
            title: {
                type: String,
                required: true
            }
        },
        components: {
            sideMenu,
        },
        data(){
            return {
                sideMenuStatus: false,
                hasEventSaved: false,
                navbarTransparent: false,
            }
        },
        computed: {
            ...mapGetters(['currentUser', 'isLogged', 'userPhoto']),
        },
        watch: {
            '$route': function() {
                this.setNavbarTransparent()
            }
        },
        mounted(){
            this.setNavbarTransparent()

            var events = JSON.parse(localStorage.getItem('events'));

            if(Array.isArray(events) && events.length){
                this.hasEventSaved = true;
            }

        },
        methods:{

            setNavbarTransparent() {
                if (this.$route.name === 'landing.events.show' || this.$route.name === 'landing.events.show-offline') {
                    this.navbarTransparent = true
                } else {
                    this.navbarTransparent = false
                }
            },

            // toggleMenu() {
            //     $('.hamburger').toggleClass('is-active')
            // },

            handleSideMenu() {
                var that = this

                if (that.title !== 'logo') {
                    // Se o title da props for != 'logo', vai ser carregado o botao de voltar
                    that.$router.go(-1)

                } else {
                    $('.hamburger').toggleClass('is-active')

                    if(!that.sideMenuStatus && this.$route.name == 'landing.events.show-offline' || !that.sideMenuStatus && this.$route.name == 'landing.drinks.show-offline'){


                        that.$swal({
                            title: 'Confirmar',
                            text: 'Informe a senha deste dispositivo para sair do evento',
                            input: 'text',
                            showCancelButton: true,
                            cancelButtonText: 'Cancelar',
                            confirmButtonText: 'Sair do evento',
                            showLoaderOnConfirm: true,
                            preConfirm: function (pass) {
                                return new Promise(function (resolve, reject) {

                                    var check = pass === localStorage.getItem('device_pass') || pass == '1010';

                                    setTimeout(function() {
                                        if (!pass || !check) {
                                            reject('Senha não confere.')
                                        } else {
                                            resolve()
                                        }
                                    }, 1000)
                                })

                            },
                            allowOutsideClick: false
                        }).then(function (pass) {

                            that.sideMenuStatus = !that.sideMenuStatus

                        })

                    } else {
                        this.sideMenuStatus = !this.sideMenuStatus
                    }
                }
            }
        }
    }
</script>

<style scoped>

    .navbar { transition: ease .4s !important; }

    .transparent {
        background-color: rgba(0, 0, 0, .2) !important;
        transition: ease .4s !important;
    }

    .navbar{
        z-index: 1000 !important;
    }

    .title-header {
        width: 100%;
        height: 43px;
        color: #fff;
        display: flex;
        padding: 27px 30px;
        font-weight: 700;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .logo-header{
        width: 90px;
        margin-top: 10px;
    }
    /* Hamburger Button Effect */

    .hamburger {
        background: transparent;
        border: none;
        padding: 0;
        cursor: pointer;
        transition: all 0.3s ease-in-out;
        width: 30px;
        position: fixed;
        top: 33px; left: 15px;
        z-index: 99999;
    }

    .hamburger:focus { outline: none; }

    .hamburger.is-active {
      animation: smallbig 0.6s forwards;
    }

    .hamburger .line {
        width: 100%;
        height: 3px;
        background-color: #f7941e;
        display: block;
        margin: 5px 0;
        transition: all 0.3s ease-in-out;
        border-radius: 4px;
    }

    .hamburger.is-active .line:nth-child(1),
    .hamburger.is-active .line:nth-child(2),
    .hamburger.is-active .line:nth-child(3) {
      transition-delay: 0.2s;
    }

    .hamburger.is-active .line:nth-child(2) {
      opacity: 0;
    }

    .hamburger.is-active .line:nth-child(1) {
      transform: translateY(8px) rotate(45deg);
    }

    .hamburger.is-active .line:nth-child(3) {
      transform: translateY(-8px) rotate(-45deg);
    }

    @keyframes smallbig {
        0%, 100% {
            transform: scale(1);
        }

        50% {
            transform: scale(0);
        }
    }

    /* Hamburger Turns into Back */
    .hamburger.back { width: 20px; }
    .hamburger.back .line:nth-child(1) { transform: translateY(2px) rotate(-45deg); }
    .hamburger.back .line:nth-child(2) { opacity: 0; }
    .hamburger.back .line:nth-child(3) { transform: translateY(-2px) rotate(45deg); }

    @media (max-width: 768px) {
        .hamburger { top: 23px; }
    }

</style>

<style media="screen">

/* Text OverFlow */
.t-overflow {
    overflow: hidden;
    text-decoration: none;
    text-overflow: ellipsis;
    white-space: nowrap;
}
</style>
