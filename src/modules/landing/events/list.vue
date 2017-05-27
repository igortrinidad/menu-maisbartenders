<template>
   <div>

        <section id="events">
            <div class="container">
                
                <div class="intro-text">
                    <h2 class="section-heading m-b-30">Eventos</h2>
                </div>

                <table class="table table-bordered table-hover table-striped">
                    <thead>
                        <tr>
                            <th>Nome do evento</th>
                            <th>Url</th>
                            <th>Data</th>
                            <th class="text-center">Visualizar página</th>
                            <th class="text-center">Salvar offline</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="event in events">
                            <td>{{event.name}}</td>
                            <td>{{event.url}}</td>
                            <td>{{event.date}}</td>
                            <td class="text-center">
                                <router-link
                                    :to="{name: 'landing.events.show', params: {event_slug: event.url}}"
                                    class="btn btn-sm btn-info">
                                Visualizar
                                </router-link>
                            </td>
                            <td class="text-center"><button class="btn btn-sm btn-info">Salvar no dispositivo</button></td>
                        </tr>
                    </tbody>
                </table>
            </div>

        </section>

   </div>
</template>

<script>
    import { mapGetters } from 'vuex'
    import drinkObj from '../../../models/Drink.js'

    export default {
        name: 'show-drink',
        data () {
            return {
                eventFound: true,
                events: [],
            }
        },
        computed:{
            // Map the getters from Vuex to this component.

            ...mapGetters(['currentUser', 'isLogged']),

        },
        mounted(){
            this.getEvents();
        },
        methods: {

            openShareFacebook: function(drink){
                let that = this

                var url = `https://www.facebook.com/dialog/share?app_id=210359702307953&href=https://maisbartenders.com.br/opengraph/drinks/${drink.id}/Quero%20muito%20experimentar%o%20drink%20Drink%20${drink.name}.&display=popup&mobile_iframe=true`;

                window.open(url,'_blank');
            },


            getEvents: function(){
                let that = this
                    
                //that.$route.params.place_slug

                that.$http.get('/events/fetchAll')
                    .then(function (response) {
                        
                        that.events = response.data;
                        that.eventFound = true;
                        that.initSwiper();

                    })
                    .catch(function (error) {
                        console.log(error)
                        that.eventFound = false;
                        //that.$router.push({name: 'landing.404'})
                    });
                
            },
        }
    }
</script>

<style scoped>

.header-greeting{
    text-align: center;
    background-attachment: scroll;
    background-position: center center;
    background-repeat: none;
    -webkit-background-size: cover;
    -moz-background-size: cover;
    background-size: cover;
    -o-background-size: cover;
}

header .intro-text .intro-heading{
    font-size: 40px;
}

.swiper-row{
    margin: 50px;
}
.btn.tag:hover,
.btn.tag:focus{color:#2c3e50;}

.btn.btn-xl.tag:hover,
.btn.btn-xl.tag:focus{color:#fff;}


.tag {
    font-size: 1.4rem;
    margin: 7px;
}

.stars{
    color: #fed136;
}

.drink-desc{
    display: block;
    height: 60px;
}


.drink-photo{
  max-height: 350px
}

/* Swiper */

.gallery-top {
    height: 80%;
    width: 100%;
}
.gallery-thumbs {
    height: 20%;
    box-sizing: border-box;
    padding: 10px 0;
}
.gallery-thumbs .swiper-slide {
    width: 200px;
    height: 100px;
    opacity: 0.4;
}
.gallery-thumbs .swiper-slide-active {
    opacity: 1;
}

.swiper-button-prev, .swiper-button-next{
    bottom: 20%;
}

.priority{
    display: block;
}
.priority i {
    color: #4b2c50;
    margin: 0 5px;
}


</style>
