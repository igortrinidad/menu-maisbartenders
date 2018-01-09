<template>
    <div class="first-container">

        <main-header :title="'Eventos salvos'" />

        <!-- Icon SVG + Title -->
        <div class="container text-center">
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

            <h4 class="title-section m-b-10">
                {{ events.length ? 'Eventos Salvos' : 'Nenhum Evento Salvo' }}
            </h4>

            <span class="text-muted">
                {{ events.length ? 'Seus eventos salvos estão listados abaixo' : 'Salve eventos agora mesmo para acessar a qualquer momento mesmo sem conexão com a internet' }}
            </span>

        </div>

        <div class="container-colored m-t-30" v-if="events.length">
            <div class="container">
                <!-- Cards Events -->
                <router-link
                    tag="div"
                    class="card"
                    v-for="(event, index) in events"
                    :key="index"
                    :to="{ name: 'landing.events.show-offline', params: { event_slug: event.url } }"
                >

                    <div class="card-header cover" :style="`background-image: url(${ event.photo_url })`">
                    </div>

                    <div class="card-body card-padding">
                        <h4 class="event-name">{{ event.name }}</h4>
                    </div>

                </router-link>
            </div>
        </div>

        <router-link tag="button" class="btn btn-fixed-bottom btn-mb-info" style="position: fixed" :to="{ name: 'landing.events.list' }" exact>
            Todos os eventos
        </router-link>

   </div>
</template>

<script>
    import { mapGetters, mapActions } from 'vuex'
    import mainHeader from '@/components/main-header.vue'


    export default {
        name: 'list-events',
        components: {
            mainHeader
        },
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

            systemUrl: function (event) {
                return `${ cordova.file.dataDirectory }/evento-${ event.url }.${ event.typeImg }`
            },

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

                            var check = pass === localStorage.getItem('device_pass') || pass == '1010';

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
