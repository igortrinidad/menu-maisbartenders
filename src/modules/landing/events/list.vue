<template>
   <div class="first-container">

       <main-header :title="'Eventos'" />

       <!-- Icon SVG + Title -->
       <div class="container">
           <div class="svg-container">
               <svg viewBox="0 0 90 90">
                   <defs>
                       <linearGradient id="linear" x1="0%" y1="0%" x2="100%" y2="0%">
                           <stop offset="0%"   stop-color="#FB923B"/>
                           <stop offset="100%" stop-color="#F66439"/>
                       </linearGradient>
                   </defs>

                    <path class="non-fill fix animated" stroke="url(#linear)"
                        d="m 35.86,55.74 a 1.5,1.5 0 0 0 2.12,0 L 62.16,31.56 a 1.5,1.5 0 0 0 -2.12,-2.12 l -23.12,23.11 -12,-12 a 1.5,1.5 0 1 0 -2.12,2.12 z"
                    />
                    <path class="non-fill xl fix animated" stroke="url(#linear)"
                        d="m 0,67.75 a 9.51,9.51 0 0 0 9.5,9.5 h 66 a 9.51,9.51 0 0 0 9.5,-9.5 v -49 A 9.51,9.51 0 0 0 75.5,9.25 H 64 V 1.5 a 1.5,1.5 0 1 0 -3,0 V 9.25 H 24 V 1.5 a 1.5,1.5 0 1 0 -3,0 V 9.25 H 9.5 A 9.51,9.51 0 0 0 0,18.75 Z m 3,-49 a 6.51,6.51 0 0 1 6.5,-6.5 H 21 v 5.5 a 1.5,1.5 0 0 0 3,0 v -5.5 h 37 v 5.5 a 1.5,1.5 0 0 0 3,0 v -5.5 h 11.5 a 6.51,6.51 0 0 1 6.5,6.5 v 49 a 6.51,6.51 0 0 1 -6.5,6.5 H 9.5 A 6.51,6.51 0 0 1 3,67.75 Z"
                    />
               </svg>
           </div>

           <h4 class="title-section">Eventos Mais Bartenders</h4>
       </div>

       <!-- Event Code -->
        <div>
            <div class="container m-t-30 text-center">
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
                                </div>

                            </router-link >

                        </div>
                    </div>
                </div>

                <div class="row">
                    <div class="col-sm-12" v-show="events.length">
                        <div class="text-center">
                            <pagination :source="pagination" @navigate="getEvents" :range="6"></pagination>
                        </div>
                    </div>
                </div>

            </div>
        </div>

        <div class="backsection">
            <div class="container">
                <hr>
                <div class="text-center">
                    <h3>Veja o menu de drinks mais bartenders</h3>
                    <router-link class="btn inline btn-xl m-t-30" :to="{ name: 'landing.drinks.list' }">
                        Acesse o menu
                    </router-link>
                </div>
            </div>
        </div>

   </div>
</template>

<script>
    import { mapGetters, mapActions } from 'vuex'
    import pagination from '@/components/pagination'

    import mainHeader from '@/components/main-header.vue'

    export default {
        name: 'list-events',
        components: {
            mainHeader,
            pagination
        },
        data () {
            return {
                eventFound: true,
                events: [],
                pagination: {},
                event_url: '',
            }
        },
        computed:{
            // Map the getters from Vuex to this component.

            ...mapGetters(['currentUser', 'isLogged']),

        },
        mounted(){
            this.getEvents();
            this.checkIfHasCommentToSave();
        },
        methods: {
            ...mapActions(['setLoading']),

            eventGo: function(){
                this.$router.push({name: 'landing.events.show', params: {event_slug: this.event_url}})
            },

            getEvents: function(page){
                let that = this

                page = page ? page : 1

                that.setLoading({is_loading: true, message: ''})

                that.$http.get(`/events/fetchAll?page=${page}`)
                    .then(function (response) {

                        that.events = response.data.events
                        that.pagination = response.data.pagination
                        that.eventFound = true;
                        that.setLoading({is_loading: false, message: ''})

                    })
                    .catch(function (error) {
                        console.log(error)
                        that.eventFound = false;
                        that.setLoading({is_loading: false, message: ''})

                    });


            },

            checkIfHasCommentToSave: function(){
                let that = this

                var comments_to_save_later = JSON.parse(localStorage.getItem('comments_to_save_later'));

                if(Array.isArray(comments_to_save_later) && comments_to_save_later.length){
                    that.loopTo(comments_to_save_later)
                }
            },

            loopTo: function(comments_to_save_later, i = 0){
                let that = this

                if (i <= comments_to_save_later.length){
                    that.saveComment(comments_to_save_later, i)
                };
            },

            saveComment: function(comments_to_save_later, i){
                let that = this

                that.$http.post('/guest/eventRunningComment', comments_to_save_later[i])
                .then(function (response) {
                    comments_to_save_later.splice(i, 1);
                    localStorage.setItem('comments_to_save_later', JSON.stringify(comments_to_save_later));
                    console.log('Salvou o comentario' + comments_to_save_later[i].comment)

                    that.loopTo(comments_to_save_later, i)

                })
                .catch(function (error) {

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
