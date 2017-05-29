<template>
   <div>

    <div>
        <header id="header-home" class="header-greeting" v-bind:style="{ backgroundImage: 'url(https://maisbartenders.com.br/img/header-bg.jpg)'}">
            <div class="container" >
                <div class="col-md-6 col-md-offset-3 col-xs-12">
                    <div class="intro-text">
                        <span class="text-box">
                            <span class="event-name">
                                Cardápio Interativo Mais Bartenders
                            </span>
                        </span>
                        <br>
                        <a href="#about" class="page-scroll btn btn-xl m-t-30">Saiba mais</a>
                    </div>
                </div>
            </div>
        </header>
    </div>

    <section id="about">
        <div class="container">
            <div class="row">
                <div class="col-lg-12 text-center">
                    <h2 class="section-heading">Sobre</h2>
                    <p class=" text-description m-t-30">O<span class="text-selected"> Cardápio Interativo </span>é uma exclusiva ferramenta criada pela<span class="text-selected"> Mais Bartenders </span>para quebrar a barreira de interação de você e seus convidados com sua festa. Levando a <span class="text-selected">experiência</span> e socialização do evento a um nível totalmente novo.</p>
                </div>
            </div>
        </div>
    </section>

    <section id="about">
        <div class="container">
            <div class="row">
                <div class="col-lg-12 text-center">
                    <h2 class="section-heading">Como funciona</h2>
                    <p class="text-description m-t-30">Ao contratar os serviços de drinks Mais Bartenders, nós criamos uma página<span class="text-selected"> exclusiva e personalizada </span>para seu evento. <a href="https://menu.maisbartenders.com.br/evento/joana-e-joao" target="_blank">Veja um exemplo</a></p>

                    <p class="text-description m-t-30">
                        E aí começa a brincadeira: você poderá enviar para seus convidados conhecerem e interagirem com o cardápio mesmo antes da festa.
                    </p>
                    <p class="text-description m-t-30">
                        Seus convidados vão conhecer os drinks incluídos em sua proposta, salvar as receitas que mais gostaram e compartilhar no facebook com frases criativas - aumentando ainda mais a <span class="text-selected">expectativa</span> para o grande dia.
                    </p>

                    <img class="m-t-30 m-b-30" src="https://media.giphy.com/media/vQqeT3AYg8S5O/giphy.gif" >

                    <p class="text-description m-t-30">
                        Mas ainda não acabou!
                    </p>

                    <p class="text-description m-t-30">
                        A experiência do Cardápio Interativo acontece também na festa. Seus convidados que não conheceram o <span class="text-selected">Cardápio Interativo</span> antes do grande dia, poderão acessar o seu <span class="text-selected">Cardápio Interativo</span> mesmo do local do evento e interagirem da mesma forma. Imagina isso!
                    </p>

                    <p class="text-description m-t-30">
                        É muito legal não é mesmo?
                    </p>

                    <img class="m-t-30 m-b-30 img-gif" src="https://media.giphy.com/media/QMkPpxPDYY0fu/giphy.gif" />

                    <p class="text-description m-t-30">
                        Entre em contato agora e tenha um <span class="text-selected">Cardápio Interativo</span> também em sua festa! :)
                    </p>

                    <a href="#contact" class="page-scroll btn btn-xl">Contato</a>

                </div>
            </div>
        </div>
    </section>

    <section id="contact">
        <div class="container">
            <div class="row">
                <div class="col-md-6 col-md-offset-3 col-xs-12 text-center">
                    <h2 class="section-heading">Contato</h2>
                    <h4 class="m-t-30 m-b-30">Contrate agora essa novidade para sua festa</h4>

                    <div class="row">
                        <div class="col-md-12 col-xs-12">
                            <a title="Clique para enviar uma mensagem no WhatsApp!" class="btn btn-xl btn-block inline" href="https://api.whatsapp.com/send?phone=+553182134820&text=[MENU-INTERATIVO] Olá Mais Bartenders, tudo bem?" target="_blank">Envie um WhatsApp agora</a>
                        </div>
                    </div>
                    <br>
                    <p class="text-description">ou clique para ligar</p>
                    <br>

                    <div class="row">
                        <div class="col-md-12 col-xs-12 m-b-10">
                            <a title="Clique para ligar!" class="btn btn-xl btn-block inline" href="tel:31 3296-5673">31 3296-5673 <i class="fa fa-phone"></i></a>
                        </div>

                        <div class="col-md-12 col-xs-12">
                             <a title="Clique para enviar uma mensagem no WhatsApp!" class="btn btn-xl btn-block inline" href="tel:31 98213-4820">31 98213-4820 <i class="fa fa-whatsapp"></i></a>
                        </div>
                    </div>

                    <span style="font-size:19px">


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
                $('html, body').stop().animate({
                    scrollTop: $('#header-home').offset().top
                }, 500, 'easeInOutExpo');
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

        },
        mounted() {
        }
    }
</script>

<style scoped>

    .text-selected{

        font-size: 22px;
    }

    .img-gif{
        max-width: 90%;
    }

    #contact{
        background-color: #F7F7F7;
    }
</style>
