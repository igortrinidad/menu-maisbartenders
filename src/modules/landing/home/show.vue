<template>
    <div class="first-container">

        <main-header :title="'logo'" />
        <svg-icons />

        <!-- Icon SVG + Title -->
        <div class="container">

            <div class="svg-container">
                <svg viewBox="0 0 50 55">
                    <defs>
                        <linearGradient id="linear" x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%"   stop-color="#FB923B"/>
                            <stop offset="100%" stop-color="#F66439"/>
                        </linearGradient>
                    </defs>

                    <!-- <path class="non-fill xl fix animated" stroke="url(#linear)"
                        d="m 90.266653,1.6 c -0.3,-0.7 -1,-1.1 -1.8,-1.1 H 2.4666534 c -0.8,0 -1.49999999,0.4 -1.79999999,1.1 -0.3,0.7 -0.2,1.5 0.3,2.1 L 43.666653,53.8 c 0,0.1 0,0.3 0,0.4 v 30.4 h -11.4 c -1.1,0 -2,0.9 -2,1.9 0,1 0.9,1.9 2,1.9 h 26.5 c 1.1,0 2,-0.9 2,-1.9 0,-1 -0.9,-1.9 -2,-1.9 h -11.3 V 54.2 c 0,-0.2 0,-0.3 -0.1,-0.5 l 42.6,-50 c 0.5,-0.6 0.6,-1.4 0.3,-2.1 z M 45.466653,50 6.6666534,4.4 H 84.366653 Z"
                    /> -->

                    <path fill="url(#linear)"
                        d="m 47.29,0.16947166 c -0.46,-0.31 -1.08,-0.18 -1.39,0.27 L 42.32,5.7894712 c -3.74,-1.6 -9.9,-2.4899995 -15.94,-2.4899995 -3.97,0 -7.77,0.38 -11.1,1.0799995 C 13.75,2.2594717 11.26,0.85947166 8.44,0.85947166 3.79,0.86947166 0,4.6594712 0,9.3094712 c 0,4.6499998 3.79,8.4399998 8.44,8.4399998 0.94,0 1.86,-0.16 2.74,-0.47 0.78,1.09 1.62,2.23 2.51,3.4 0.09,0.19 0.22,0.37 0.4,0.53 3.35,4.39 7.13,8.95 9.45,11.71 0.61,0.73 1.43,1.22 2.34,1.42 v 10.98 c -3.2,0.07 -11,0.54 -11,3.49 0,3.33 10,3.5 12,3.5 2,0 12,-0.17 12,-3.5 0,-2.94 -7.8,-3.42 -11,-3.49 v -11.02 c 0.89,-0.23 1.69,-0.73 2.28,-1.46 3.53,-4.42 6.46,-8.23 8.81,-11.47 0.27,-0.22 0.44,-0.46 0.53,-0.73 3.89,-5.42 6.01,-9.06 6.33,-10.8899998 0.03,-0.14 0.05,-0.29 0.05,-0.45 0,-0.96 -0.65,-1.82 -1.78,-2.57 l 3.47,-5.1799995 c 0.3,-0.45 0.17,-1.07000004 -0.28,-1.38000004 z M 16.28,6.2094712 c 3.03,-0.58 6.56,-0.9 10.1,-0.9 6.78,0 11.9,1.08 14.8,2.19 l -2.61,3.8999998 c -2.81,0.52 -6.8,0.92 -12.19,0.92 -3.62,0 -7,-0.19 -9.86,-0.56 0.02,-0.07 0.03,-0.14 0.05,-0.2 0.07,-0.26 0.13,-0.52 0.18,-0.78 0.02,-0.11 0.04,-0.22 0.06,-0.34 0.05,-0.37 0.08,-0.7399998 0.08,-1.1199998 0,-0.27 -0.01,-0.55 -0.04,-0.82 -0.03,-0.17 -0.06,-0.34 -0.09,-0.5 -0.02,-0.1 -0.03,-0.2 -0.05,-0.3 -0.04,-0.21 -0.09,-0.41 -0.15,-0.61 -0.01,-0.05 -0.02,-0.1 -0.04,-0.15 -0.06,-0.22 -0.14,-0.44 -0.22,-0.65 0,-0.03 -0.01,-0.06 -0.02,-0.08 z M 38.39,18.749471 c -0.46,-0.24 -1.08,-0.46 -1.9,-0.66 l 3.27,-4.89 c 1.01,-0.21 1.95,-0.47 2.77,-0.77 -0.88,1.54 -2.23,3.62 -4.14,6.32 z m -3.11,1.13 c 0.65,0.11 1.18,0.22 1.58,0.34 -0.51,0.16 -1.24,0.33 -2.13,0.49 z m -3.19,1.18 c -1.5,0.15 -3.24,0.24 -5.21,0.24 -4.62,0 -8.63,-0.55 -10.46,-1.08 1.75,-0.46 5.52,-0.92 10.46,-0.92 2.41,0 4.51,0.11 6.2,0.29 z m 2.25,-3.36 c -1.83,-0.24 -4.26,-0.39 -7.47,-0.39 -7.18,0 -10.57,0.7 -12.11,1.49 -0.84,-1.12 -1.63,-2.2 -2.36,-3.23 l -0.05,-0.07 c -0.05,-0.07 -0.09,-0.14 -0.14,-0.21 -0.18,-0.26 -0.37,-0.53 -0.54,-0.78 -0.07,-0.1 -0.13,-0.2 -0.2,-0.29 -0.17,-0.25 -0.33,-0.5 -0.49,-0.75 -0.05,-0.07 -0.1,-0.15 -0.14,-0.22 -0.16,-0.25 -0.32,-0.5 -0.46,-0.74 0.54,0.18 1.14,0.35 1.81,0.51 0.46,0.11 0.93,0.22 1.45,0.31 l -0.01,0.02 1.34,0.21 0.73,0.11 v -0.01 c 3.07,0.43 6.74,0.66 10.68,0.66 2.15,0 6.57,-0.08 10.67,-0.64 z m -25.9,-1.95 c -3.55,0 -6.44,-2.89 -6.44,-6.4399998 0,-3.55 2.89,-6.4399995 6.44,-6.4399995 2.35,0 4.4,1.2699995 5.52,3.1499995 0.29,0.49 0.52,1.01 0.67,1.55 0.01,0.03 0.02,0.06 0.02,0.09 0.06,0.22 0.11,0.45 0.14,0.68 0.01,0.06 0.02,0.11 0.03,0.17 0.03,0.26 0.05,0.53 0.05,0.8 0,0.33 -0.03,0.65 -0.08,0.9599998 -0.01,0.08 -0.03,0.16 -0.04,0.24 -0.06,0.32 -0.14,0.63 -0.25,0.94 -0.3,-0.05 -0.58,-0.11 -0.85,-0.16 -0.19,-0.04 -0.36,-0.08 -0.54,-0.11 -0.07,-0.02 -0.15,-0.03 -0.21,-0.05 -0.2,-0.05 -0.39,-0.09 -0.57,-0.14 -0.03,-0.01 -0.06,-0.01 -0.09,-0.02 -0.19,-0.05 -0.38,-0.1 -0.55,-0.15 -0.01,0 -0.03,-0.01 -0.04,-0.01 -0.17,-0.05 -0.34,-0.1 -0.49,-0.15 -0.01,0 -0.02,-0.01 -0.03,-0.01 -0.15,-0.05 -0.29,-0.1 -0.42,-0.15 -0.02,-0.01 -0.04,-0.02 -0.06,-0.02 -0.11,-0.04 -0.21,-0.08 -0.31,-0.13 -0.06,-0.02 -0.11,-0.05 -0.16,-0.07 -0.05,-0.02 -0.11,-0.05 -0.15,-0.07 C 9,9.7094712 8.88,9.3394712 8.88,9.3394712 c 0,0 0,0 0,0 0,-0.01 -0.01,-0.02 -0.01,-0.03 v 0 c -0.15,-0.49 -0.64,-0.77 -1.13,-0.67 -0.36,0.07 -0.63,0.34 -0.75,0.67 H 6.87 v 0 c 0,0.7099998 0.31,1.9299998 2.32,5.0599998 0.01,0.01 0.02,0.03 0.02,0.04 0.01,0.02 0.03,0.04 0.04,0.06 0.22,0.34 0.45,0.69 0.71,1.08 -0.49,0.13 -1,0.2 -1.52,0.2 z m 28.28,33.06 c -0.89,0.59 -4.25,1.5 -9.84,1.5 -5.59,0 -8.95,-0.91 -9.84,-1.5 0.84,-0.56 3.85,-1.39 8.84,-1.49 v 1.13 c 0,0.55 0.45,1 1,1 0.55,0 1,-0.45 1,-1 v -1.13 c 4.99,0.1 8,0.93 8.84,1.49 z m -8.13,-17.22 c -0.44,0.54 -1.08,0.86 -1.78,0.86 -0.68,0 -1.31,-0.3 -1.75,-0.82 -1.85,-2.2 -4.63,-5.56 -7.38,-9.05 3.4,0.67 7.86,0.72 9.19,0.72 1.27,0 2.56,-0.05 3.79,-0.13 l -4.4,6.57 c -0.31,0.46 -0.18,1.08 0.27,1.39 0.17,0.11 0.36,0.17 0.56,0.17 0.32,0 0.64,-0.16 0.83,-0.44 l 5.3,-7.91 c 0.67,-0.08 1.3,-0.17 1.89,-0.27 0.17,-0.03 0.31,-0.06 0.46,-0.09 -1.92,2.58 -4.23,5.57 -6.98,9 z M 43.88,9.3094712 c 0,0.34 -0.77,0.8699998 -2.44,1.3899998 L 43,8.3694712 c 0.56,0.35 0.88,0.68 0.88,0.94 z"
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
                categories: []
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
