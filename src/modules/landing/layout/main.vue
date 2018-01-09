<template>
    <div>
        <main-loader></main-loader>
        <router-view></router-view>
    </div>
</template>

<script>
    import { mapGetters, mapActions } from 'vuex'

    // import appHeader from './partials/header.vue'
    // import appFooter from './partials/footer.vue'

    import mainLoader from '@/components/main-loader.vue'

    export default{
        name: 'landing-layout',
        components:{
            mainLoader
        },
        data(){
            return{
                location: null
            }
        },
        computed:{
            ...mapGetters(['isLogged'])
        },
        mounted() {
            this.location = window.location.href

            if(this.isLogged){
                this.getUserDrinkLikes()
            }
        },
        methods:{
            ...mapActions(['setUserDrinkLikes']),

            getUserDrinkLikes(){
                let that = this

                that.$http.get('/guest/drinkLikes')
                    .then(function (response) {

                        that.setUserDrinkLikes(response.data.likes)

                    })
                    .catch(function (error) {
                        console.log(error)
                    });
            }
        }
    }
</script>

<style>

@import '../../../../assets/css/helpers.css';
@import '../../../../assets/css/general.css';
@import '../../../../assets/css/template_standart.css';


</style>
