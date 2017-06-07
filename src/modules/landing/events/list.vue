<template>
   <div class="page">

        <div>
            <div class="container m-t-30 text-center">
                <h2>Eventos</h2>
                <span class="sub-header">Digite o código do evento ou selecione abaixo.</span>

                <div class="form-group">
                    <input class="form-control" v-model="event_url" placeholder="Código de acesso do evento.">

                </div>
                <div class="form-group">
                    <button class="btn btn-primary btn-block" @click="eventGo()" :disabled="!event_url">Acessar com código</button>
                </div>
                <p></p>
            </div>
        </div>

        <div class="list-events">
               <div class="container">
                   <div class="cols">
                       <div v-for="(event, index) in events" class="col">
                           <div tag="div" class="box event" :to="{name: 'landing.events.show', params: {event_slug: event.url}}">

                               <router-link tag="span" :to="{name: 'landing.events.show', params: {event_slug: event.url}}">
                                <img :src="event.photo_url" :alt="event.name" class="event-gallery-image">
                                <div class="details">
                                    <h4 class="event-name">{{ event.name }}</h4>
                                    <!-- <i class="stars fa fa-star" v-for="n in drink.priority"></i> -->
                                    <span class="description">{{ event.greeting }}</span>
                                </div>

                               </router-link >

                            </div>
                        </div>
                   </div>
               </div>
           </div>

   </div>
</template>

<script>
    import { mapGetters, mapActions } from 'vuex'

    export default {
        name: 'list-events',
        data () {
            return {
                eventFound: true,
                events: [],
                event_url: '',
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
            ...mapActions(['setLoading']),
            
            openShareFacebook: function(){
                let that = this

                var url = `https://www.facebook.com/dialog/share?app_id=210359702307953&href=https://maisbartenders.com.br/opengraph/drinks/${that.interactions.drinkSelected.url}/${that.interactions.phraseSelected.replace(" ", "%20")}${that.event.hashtag}/123123&picture=${that.interactions.drinkSelected.photo_url}&display=popup&mobile_iframe=true&hashtag=${that.event.hashtag}`;

                window.open(url,'_blank');

            },

            eventGo: function(){
                this.$router.push({name: 'landing.events.show', params: {event_slug: this.event_url}})
            },

            getEvents: function(){
                let that = this

                that.setLoading({is_loading: true, message: ''})

                that.$http.get('/events/fetchAll')
                    .then(function (response) {

                        that.events = response.data;
                        that.eventFound = true;
                        that.setLoading({is_loading: false, message: ''})

                    })
                    .catch(function (error) {
                        console.log(error)
                        that.eventFound = false;
                        that.setLoading({is_loading: false, message: ''})

                    });

            },
        }
    }
</script>

<style scoped>


/* Page & Grid*/

#drinks{
    background-color: rgba(44, 60, 80, .07);
    padding: 80px 0;
}
.cols {
    width: 100%;
    column-count: 3;
    column-gap: 0;

}
.col {
    width: 100%;
    display: inline-block;
    padding: 5px;
}

.cols.align-block{ display: flex; }
.cols.align-block .col{ width: 33.3333%; }

@media(max-width: 768px) { .cols{ column-count: 2; } .cols.align-block .col{ width: 50%; } }
@media(max-width: 414px) { .cols{ column-count: 1; } .cols.align-block { display: grid;} .cols.align-block .col{ width: 100%; } }

/* Drinks & Drink Card */

.event{
    padding: 20px;
    border-radius: 4px;
    background: #fff;
    box-shadow: 0px 0px 3px rgba(0, 0, 0, .2);
    position: relative;
}
.event img{
    max-width: 100%;
    border-top-left-radius: 4px;
    border-top-right-radius: 4px;
    cursor: pointer;
}


.event .description{
    display: block;
    max-width: 100%;
}

.event-name{
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}

.drink .stars { margin-right: 3px; }

</style>
