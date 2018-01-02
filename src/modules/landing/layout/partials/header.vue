<template>
    <div>
        <main-header />
    </div>
</template>

<script>
    import { mapGetters } from 'vuex'
    import mainHeader from '@/components/main-header.vue'

    export default {
        name: 'landing-header',
        components: {
            mainHeader,
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

            handleSideMenu() {
                var that = this

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
</script>

<style scoped>

    .navbar { transition: ease .4s !important; }
    .transparent {
        background-color: rgba(0, 0, 0, .2) !important;
        transition: ease .4s !important;
    }

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

    .logo-header{
        width: 110px;
        margin-top: 0px;
    }

/* NAV BAR BREAKPOINT TO COLLAPSE ON IPAD AND OTHERS SMALL SCREENS */
@media (max-width: 1200px) {

    .logo-header{
        width: 90px;
        margin-top: 7px;
        margin-left: 15px;
    }
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
