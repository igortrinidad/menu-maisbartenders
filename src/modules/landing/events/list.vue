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


</style>
