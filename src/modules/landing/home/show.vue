<template>
   <div>

    <header class="header-greeting" v-bind:style="{ backgroundImage: 'url(https://maisbartenders.com.br/img/header-bg.jpg)'}">
        <div class="container" >
            <div class="intro-text text-center">
                <div class="intro-lead-in">Bem vindo ao Cardápio Interativo</div>
                <div class="intro-heading">Mais Bartenders</div>
                <a href="#about" class="page-scroll btn btn-xl">Saiba mais</a>
            </div>
        </div>
    </header>

    <section id="about">
        <div class="container">
            <div class="row">
                <div class="col-lg-12 text-center">
                    <h2 class="section-heading">Sobre</h2>
                    <h4 class="text-muted m-t-30">O<span class="text-selected"> Cardápio Interativo </span>é uma ferramenta exclusiva criada pela<span class="text-selected"> Mais Bartenders </span>para quebrar as barreiras do atendimento e interação entre seus convidados e o bar de seu evento.</h4>
                </div>
            </div>
        </div>
    </section>

    <section id="about">
        <div class="container">
            <div class="row">
                <div class="col-lg-12 text-center">
                    <h2 class="section-heading">Como funciona</h2>
                    <h4 class=" text-muted m-t-30">Ao contratar os serviços de drinks Mais Bartenders, nós disponibilizamos uma página<span class="text-selected"> exclusiva e personalizada </span>para o cardápio de seu evento.</h4>

                    <h4 class=" text-muted m-t-30">E aí começa a brincadeira: você terá uma URL única de seu evento, um endereço fixo (<a href="https://menu.maisbartenders.com.br/evento/joana-e-joao" target="_blank">Veja um exemplo</a>) para enviar para seus convidados conhecerem e interagirem com o cardápio, com os drinks e com seu evento antes, durante e mesmo depois da festa.</h4>

                    <h4 class=" text-muted m-t-30">Você e seus convidados vão poder compartilhar em suas redes sociais os drinks que mais gostaram, salvarem suas preferências para pedirem no grande dia e muito mais.</h4>

                </div>
            </div>
        </div>
    </section>

    <section id="contact">
        <div class="container">
            <div class="row">
                <div class="col-lg-12 text-center">
                    <h2 class="section-heading">Contato</h2>
                    <h4 class=" text-muted m-t-30 m-b-30">Contrate agora essa novidade para sua festa!</h4>

                    <a title="Clique para enviar uma mensagem no WhatsApp!" class="btn btn-xl inline" href="https://api.whatsapp.com/send?phone=+553182134820&text=Olá Mais Bartenders, tudo bem?" target="_blank">Envie um WhatsApp agora</a>
                    <br><br>
                    <p>ou clique para ligar</p>
                    <br>

                    <span style="font-size:19px">
                        <a title="Clique para ligar!" class="btn btn-xl inline" href="tel:31 3296-5673">31 3296-5673 <i class="fa fa-phone"></i></a>
                        <a title="Clique para enviar uma mensagem no WhatsApp!" class="btn btn-xl inline" href="tel:31 98213-4820">31 98213-4820 <i class="fa fa-whatsapp"></i></a>
                    </span>

                </div>
            </div>
        </div>
    </section>


   </div>
</template>

<script>
    import { mapGetters } from 'vuex'
    import eventObj from '../../../models/Event.js'

    var Swiper = require('swiper')

    export default {
        name: 'show-home',
        data () {
            return {

            }
        },
        computed:{
            // Map the getters from Vuex to this component.

            ...mapGetters(['currentUser', 'isLogged']),

        },
        mounted(){
            var that = this
            this.$nextTick(()=>{
                that.initPageScroll()
            })
        },
        methods: {
            initPageScroll: function(){
                let that = this
            
                $('a.page-scroll').bind('click', function(event) {
                    var $anchor = $(this);

                    $('html, body').stop().animate({
                        scrollTop: $($anchor.attr('href')).offset().top
                    }, 1500, 'easeInOutExpo');
                    event.preventDefault();
                });
            },
        }
    }
</script>

<style scoped>

    .text-selected{
        background-color: #FED136;
        font-size: 22px;
    }

    #contact{
        background-color: #F7F7F7;
    }
</style>
