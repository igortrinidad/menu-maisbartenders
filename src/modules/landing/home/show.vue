<template>
    <div class="first-container">

        <main-header :title="'logo'" />
        <svg-icons />

        <!-- Icon SVG + Title -->
        <div class="container">

            <div class="svg-container">
                <svg width="80px" height="80px" viewBox="0 0 95 95">
                    <defs>
                        <linearGradient id="linear" x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%"   stop-color="#FB923B"/>
                            <stop offset="100%" stop-color="#F66439"/>
                        </linearGradient>
                    </defs>

                    <path class="non-fill xl fix animated" stroke="url(#linear)"
                        d="m 90.266653,1.6 c -0.3,-0.7 -1,-1.1 -1.8,-1.1 H 2.4666534 c -0.8,0 -1.49999999,0.4 -1.79999999,1.1 -0.3,0.7 -0.2,1.5 0.3,2.1 L 43.666653,53.8 c 0,0.1 0,0.3 0,0.4 v 30.4 h -11.4 c -1.1,0 -2,0.9 -2,1.9 0,1 0.9,1.9 2,1.9 h 26.5 c 1.1,0 2,-0.9 2,-1.9 0,-1 -0.9,-1.9 -2,-1.9 h -11.3 V 54.2 c 0,-0.2 0,-0.3 -0.1,-0.5 l 42.6,-50 c 0.5,-0.6 0.6,-1.4 0.3,-2.1 z M 45.466653,50 6.6666534,4.4 H 84.366653 Z"
                    />
                </svg>
            </div>
        </div>

        <div class="container-colored m-t-20">
            <div class="container">

                <!-- Mais Bartenders -->
                <div class="row">
                    <div class="col-sm-12">
                        <div class="p-5">
                            <div class="card m-0 text-center">
                                <div class="card-body card-padding">
                                    <img class="cat-icon" src="../../../assets/logo_mb_2.png" alt="">
                                    <div class="m-t-5">
                                        <h4 class="card-title m-b-0">{{translations.slogan_mb}}</h4>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Categories -->
                <div class="categories">
                    <div class="category" v-for="(category, indexCategory) in getCategories" >
                        <div tag="div" class="card m-0 text-center cursor-pointer" @click.prevent="goToMenu(category)">
                            <div class="card-body card-padding">
                                <svg style="width: 50px; height: 50px;">
                                    <use :xlink:href="`#icon-${ category.slug_pt }`"></use>
                                </svg>
                                <div class="m-t-5">
                                    <h6 class="card-title m-b-0">{{ category[`name_${language}`] }}</h6>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Call To Create Drink
                <div class="text-center m-t-30 p-5">
                    <h5 class="m-b-20" style="color: #fff">Não encontrou o drink que procura ?</h5>

                    <router-link tag="button" :to="{ name: 'landing.drinks.createdrink' }" class="btn btn-block btn-mb-primary-reverse" v-if="isLogged">
                        Crie o seu próprio drink
                    </router-link>

                    <router-link tag="button" :to="{ name: 'landing.auth.login' }" class="btn btn-block btn-mb-primary-reverse" v-if="!isLogged">
                        Faça login para começar a criar
                    </router-link>
                </div>
                -->

            </div>
        </div>

    </div>
</template>

<script>
    import { mapGetters, mapActions } from 'vuex'
    import Swiper from "swiper"
    import * as translations from '@/translations/home/show'

    import eventObj from '@/models/Event.js'
    import CategoriesModel from '@/models/Categories.js'

    import svgIcons from '@/components/svg-icons.vue'
    import mainHeader from '@/components/main-header.vue'

    export default {
        name: 'show-home',

        components: {
            mainHeader,
            svgIcons
        },

        data () {
            return {
                categories: [],
            }

        },

        computed:{
            // Map the getters from Vuex to this component.
            ...mapGetters(['currentUser', 'isLogged', 'language', 'getCategories']),

            translations() {

                if (this.language === 'en') {
                    return translations.en
                }
                if (this.language === 'pt') {
                    return translations.pt
                }
            }

        },

        mounted() {
            this.initSwiper()
            this.setCategories()
        },

        methods: {

            ...mapActions(['setCategories']),

            openWhatsapp: function(){
                let that = this

                if(that.isLogged){
                    var url = `https://api.whatsapp.com/send?phone=+553182134820&text=[MENU MAIS BARTENDERS] Olá Mais Bartenders, tudo bem? Meu nome é ${that.currentUser.full_name}.`;
                } else {
                    var url = 'https://api.whatsapp.com/send?phone=+553182134820&text=[MENU MAIS BARTENDERS] Olá Mais Bartenders, tudo bem?';
                }

                window.open(url, '_system', null);
            },

            initSwiper() {
                let that = this

                that.$nextTick(()=>{
                    var swiperWelcome = new Swiper(that.$refs.swiperWelcome, {
                        spaceBetween: 0,
                        slidesPerView: 1,
                        pagination: {
                            el: '.swiper-pagination',
                            type: 'bullets',
                            clickable: true,
                        }
                    })
                })
            },

            goToMenu(category){
                localStorage.setItem('selected_category', JSON.stringify(category))
                this.$router.push({name: 'landing.drinks.list'})
            }
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

    .cat-icon {
        width: auto;
        height: 60px;
    }


    #contact{
        background-color: #F7F7F7;
    }
</style>
