<template>
    <div>
        <side-menu v-if="type === 'menu'" />
        <div id="hammer-menu" ref="hammerMenu" v-if="type === 'menu'"></div>

        <div class="circle" v-if="type === 'menu'">
            <svg viewBox="0 0 100 100">
                <defs>
                    <linearGradient id="linear" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%"   stop-color="#FB923B"/>
                        <stop offset="100%" stop-color="#F66439"/>
                    </linearGradient>
                </defs>
                <circle cx="50" cy="50" r="40" stroke="url(#linear)" stroke-width="5" fill="transparent" />
            </svg>
        </div>

        <button type="button" class="hamburger" :class="{ 'back': type === 'back' }" @click="handleSideMenu()">
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


                <div class="flags">
                    <img
                        src="../assets/images/brazil.png"
                        :class="{ 'in': language === 'pt' }"
                        @click="setLanguage('pt')"
                    >
                    <img
                        class="m-l-5"
                        src="../assets/images/united-kingdom.png"
                        :class="{ 'in': language === 'en' }"
                        @click="setLanguage('en')"
                    >
                </div>
            </div>
            <!-- /.container-fluid -->
        </nav>
    </div>
</template>

<script>
    import { mapGetters, mapActions } from 'vuex'
    import { transition } from 'jquery.transit'

    import Hammer from 'hammerjs'
    import sideMenu from '@/components/side-menu.vue'

    export default {
        name: 'main-header',
        props: {
            type: {
                type: String,
                default: 'menu'
            },
            title: {
                type: String,
                required: true,
                default: 'logo'
            },
            action: {
                type: Function,
                default: function(){
                    window.history.back();
                }
            },
        },
        components: {
            sideMenu,
        },
        data(){
            return {
                sideMenuStatus: false,
                hasEventSaved: false,
                navbarTransparent: false,
                left: 0,
                menu: false,
                rotateIcon: 0
            }
        },
        computed: {
            ...mapGetters(['currentUser', 'isLogged', 'userPhoto', 'language']),
        },

        mounted(){


            if (this.type === 'menu') {
                this.mountMenuHammer()
            }

            var events = JSON.parse(localStorage.getItem('events'));

            if(Array.isArray(events) && events.length){
                this.hasEventSaved = true;
            }

        },
        methods:{

            ...mapActions(['setLanguage']),

            mountMenuHammer() {
                let that = this
                if (that.hammerMenu) {
                    that.hammerMenu = false
                }
                that.hammerMenu = new Hammer(that.$refs.hammerMenu)
                that.hammerMenu.get('pan').set({ direction: Hammer.DIRECTION_ALL })
                that.hammerMenu.on('panleft panright panup pandown tap press', function(ev) {
                    that.animateMenu(ev)
                })
                $(that.$refs.hammerMenu).bind('touchend', function(ev) {
                    that.touchMenuEnd()
                })
            },

            animateMenu(ev) {
                this.left = ev.center.x
                const x = -250 + this.left

                // Animate Icon
                if (ev.type === 'panright') {
                    this.rotateIcon++
                }
                if (ev.type === 'panleft') {
                    this.rotateIcon--
                }
                if (this.rotateIcon >= 0 && this.rotateIcon <= 45) {
                    $('.hamburger .line:nth-child(1)').transition({ top: '8px', rotate: `-${ this.rotateIcon }deg` }, 0);
                    $('.hamburger .line:nth-child(2)').css({ opacity: 0 });
                    $('.hamburger .line:nth-child(3)').transition({ top: '-8px', rotate: `${ this.rotateIcon }deg` }, 0);
                }

                // Display overlay
                $('.side-menu-bg').css({ display: 'block' })

                // Move Menu Content && Animate Overlay
                if (this.left > 0 && this.left < 250) {

                    // Move Menu Content
                    $('#side-menu-global-id').transition({ y: 0, x: x }, 0)

                    // Animate Overlay
                    if (this.left/200 <= 0.9) {
                        $('.side-menu-bg').transition({ background: `rgba(0, 0, 0, ${ this.left/200 })` }, 0)
                    }
                }
            },

            touchMenuEnd() {
                // Fecha o menu
                if (this.left < 100) {
                    this.left = 0
                    this.menu = false

                    this.fixIcon(false)
                    $('.side-menu-bg').css({ display: 'none' })
                    $('.circle').removeClass('in')
                    $('.hamburger').removeClass('is-active')
                    $('#side-menu-global-id').transition({ y: 0, x: -280 }, 300)
                    $('.side-menu-bg').transition({ background: 'rgba(0, 0, 0, 0)' }, 300)
                    $(this.$refs.hammerMenu).transition({ y: 0, x: 0 }, 0)
                }
                // Abre o menu
                else {
                    this.menu = true
                    this.fixIcon(true)
                    $('.side-menu-bg').css({ display: 'block' })
                    $('.circle').addClass('in')
                    $('.hamburger').addClass('is-active')
                    $('#side-menu-global-id').transition({ y: 0, x: 0 }, 300)
                    $(this.$refs.hammerMenu).transition({ y: 0, x: 260 }, 0)
                    $('.side-menu-bg').transition({ background: 'rgba(0, 0, 0, 0.9' }, 300)
                }
            },

            fixIcon(toOpen) {
                if (toOpen) {
                    $('.hamburger .line:nth-child(1)').transition({ top: '8px', rotate: `-45deg` }, 300);
                    $('.hamburger .line:nth-child(2)').transition({ opacity: 0 });
                    $('.hamburger .line:nth-child(3)').transition({ top: '-8px', rotate: `45deg` }, 300);
                } else {
                    $('.hamburger .line:nth-child(1)').transition({ top: '0', rotate: `0deg` }, 300);
                    $('.hamburger .line:nth-child(2)').transition({ opacity: 1 });
                    $('.hamburger .line:nth-child(3)').transition({ top: '0', rotate: `0deg` }, 300);
                }
            },

            handleSideMenu() {
                var that = this

                //Se o titulo do menu for diferente da logo, executa a action do header
                if (that.type !== 'menu') {

                    that.action();

                } else {

                    // toggle menu by click
                    if (!that.menu) {
                        that.left = 250
                    } else {
                        that.left = 0
                    }

                    that.touchMenuEnd()


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
        z-index: 555 !important;
        box-shadow: 0px 5px 10px 0px rgba(0, 0, 0, .2);
        background-color: #000000;
    }

    .title-header {
        margin: 0;
        width: 100%;
        height: 43px;
        color: #fff;
        display: flex;
        padding: 27px 80px;
        font-weight: 700;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .logo-header{
        width: 90px;
        margin-top: 9px;
    }

    /* Hamburger Button Effect */

    .circle {
        position: fixed;
        z-index: 999;
        top: 7px;
        left: 5px;
        width: 60px;
        stroke-dasharray: 300;
        stroke-dashoffset: 300;
        transition: ease .3s;
    }
    .circle.in {
        stroke-dashoffset: 0;
        transition: ease .3s;
    }

    .hamburger {
        background: transparent;
        border: none;
        padding: 0;
        cursor: pointer;
        transition: all 0.3s ease-in-out;
        width: 30px;
        position: fixed;
        top: 23px; left: 20px;
        z-index: 999;
    }

    .hamburger:focus { outline: none; }

    .hamburger.is-active {
      animation: smallbig 0.6s forwards;
    }

    .hamburger .line {
        width: 100%;
        height: 3px;
        background: linear-gradient(left, #FB923B, #F66439);
        display: block;
        margin: 5px 0;
        border-radius: 4px;
        position: relative;
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

    /* Hammer Menu */
    #hammer-menu {
        position: fixed;
        top: 74px; left: -50px; bottom: 0;
        width: 100px;
        background: transparent;
        z-index: 77777;
    }

    .flags {
        position: absolute;
        top: 22px;
        right: 20px;
        cursor: pointer;
        transition: all .4s linear;
        transform: rotateY(0deg);
    }

    .flags img {
        width: 32px;
        filter: grayscale(.9);
        transition: ease .4s;
    }

    .flags img.in { filter: grayscale(0); }

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
