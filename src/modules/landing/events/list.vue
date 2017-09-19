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
                                    <span class="description">{{ event.greeting }}</span>
                                </div>

                            </router-link >

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
            this.checkIfHasCommentToSave();
            this.download();
        },
        methods: {
            ...mapActions(['setLoading']),

            download: function() {
                if (window.cordova) {
                    const fileTransfer = new FileTransfer();
                    console.log(fileTransfer);
                    // const uri = encodeURI('https://s3.amazonaws.com/mais-bartenders-dev/events/daa8db33fea5a60bb314acf41d319cf7.jpg');
                    // const file = 'evento.jpg';
                    //
                    // fileTransfer.download(
                    //     uri,
                    //     file,
                    //     function(entry) {
                    //         alert("download completed: " + entry.toURL());
                    //     },
                    //     function(error) {
                    //         alert("error")
                    //         console.log("download error source " + error.source);
                    //         console.log("download error target " + error.target);
                    //         console.log("download error code" + error.code);
                    //     },
                    //     false,
                    //     {
                    //         headers: {
                    //             "Authorization": "Basic dGVzdHVzZXJuYW1lOnRlc3RwYXNzd29yZA=="
                    //         }
                    //     }
                    // );

                    const transfer = new Transfer();
                    console.log(transfer);
                    let url = encodeURI("http://s14.postimg.org/i8qvaxyup/bitcoin1.jpg");
                    let fileName = "bitcoin.jpg";

                    transfer.download(url, cordova.file.dataDirectory + fileName)
                    .then((entry)=>{
                        console.log('download complete: ' + entry.toURL());
                    }, (error) => {
                        console.log("error", "Error file transfert");
                    });

                }
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
