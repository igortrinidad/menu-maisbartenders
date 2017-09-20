<template>
    <div class="page">

        <div v-if="events.length">
            <div class="container m-t-30 text-center">
                <h2>Eventos</h2>
            </div>

            <div class="list-events">
                <div class="container">
                    <div class="cols">
                        <div v-for="(event, index) in events" class="col">
                            <div tag="div" class="box event" :to="{name: 'landing.events.show-offiline', params: {event_slug: event.url}}">

                                <router-link tag="span" :to="{name: 'landing.events.show-offline', params: {event_slug: event.url}}">
                                    <img :src="event.photo_url" :alt="event.name" class="event-gallery-image">
                                    <div class="details">
                                        <h4 class="event-name">{{ event.name }}</h4>
                                        <span class="description">{{ event.greeting }}</span>
                                    </div>

                                </router-link >
                                <button class="btn btn-sm btn-block btn-danger m-t-10" @click="removeEvent(event)">Excluir evento do dispositivo</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <section v-if="!events.length">
            <div class="container">
                <div class="row">
                    <div class="col-sm-12 text-center">
                        <h2 class="section-heading">Nenhum evento salvo ainda.</h2>
                        <h3 class="section-subheading text-muted">Salve eventos agora mesmo para acessar a qualquer momento mesmo sem conexão com a internet</h3>
                    </div>

                    <div class="col-sm-12 text-center">
                        <router-link tag="button" class="btn btn-xl" :to="{ name: 'landing.events.list' }" exact>
                            Eventos
                        </router-link>
                    </div>
                </div>
            </div>
        </section>

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
            if (JSON.parse(localStorage.getItem('events')) !== null) {
                this.events = JSON.parse(localStorage.getItem('events'));
            }
        },
        methods: {
            ...mapActions(['setLoading']),

            eventGo: function(){
                this.$router.push({name: 'landing.events.show', params: {event_slug: this.event_url}})
            },

            removeEvent: function(event){
                let that = this

                that.$swal({
                      title: 'Informe a senha deste dispositivo',
                      input: 'text',
                      showCancelButton: true,
                      confirmButtonText: 'Salvar',
                      showLoaderOnConfirm: true,
                      preConfirm: function (pass) {
                        return new Promise(function (resolve, reject) {

                            var check = pass === localStorage.getItem('device_pass');

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

                        that.events.splice(that.events.indexOf(event), 1);
                        localStorage.setItem('events', JSON.stringify(that.events));

                        that.$swal({
                            type: 'success',
                            title: 'Evento deletado com sucesso!'
                        })

                    })
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
