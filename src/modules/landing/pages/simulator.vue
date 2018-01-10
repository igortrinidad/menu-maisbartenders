<template lang="html">
    <div class="first-container">

        <main-header :title="'Simulador'" />

        <!-- Icon SVG + Title -->
        <div class="container">
            <div class="svg-container">
                <svg viewBox="0 0 60 60">
                    <defs>
                        <linearGradient id="linear" x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%"   stop-color="#FB923B"/>
                            <stop offset="100%" stop-color="#F66439"/>
                        </linearGradient>
                    </defs>

                    <path class="non-fill xs fix animated" stroke="url(#linear)"
                       d="m 27.5,54.5 c -14.888,0 -27,-12.112 -27,-27 0,-14.888 12.112,-27 27,-27 14.888,0 27,12.112 27,27 0,14.888 -12.112,27 -27,27 z m 2,-5 h -4 c -1.103,0 -2,-0.897 -2,-2 v -2 h -1 C 16.893,45.5 12.194,41.302 11.569,35.735 11.435,34.546 12.368,33.5 13.563,33.5 h 4.042 c 0.952,0 1.757,0.667 1.959,1.622 0.292,1.378 1.527,2.378 2.936,2.378 h 9.822 c 1.626,0 3.016,-1.185 3.164,-2.697 C 35.663,32.98 34.221,31.5 32.5,31.5 H 22.853 C 16.886,31.5 11.91,26.998 11.525,21.251 11.09,14.75 16.283,9.5 22.5,9.5 h 1 v -2 c 0,-1.103 0.897,-2 2,-2 h 4 c 1.103,0 2,0.897 2,2 v 2 h 1 c 5.607,0 10.306,4.198 10.931,9.765 0.134,1.189 -0.799,2.235 -1.994,2.235 h -4.042 c -0.952,0 -1.757,-0.667 -1.959,-1.622 C 35.144,18.5 33.909,17.5 32.5,17.5 h -9.822 c -1.626,0 -3.016,1.185 -3.164,2.697 -0.177,1.823 1.265,3.303 2.986,3.303 h 9.647 c 5.967,0 10.943,4.502 11.328,10.249 C 43.91,40.25 38.717,45.5 32.5,45.5 h -1 v 2 c 0,1.103 -0.897,2 -2,2 z"
                   />
                </svg>
            </div>
            <h4 class="title-section">Calcule a quantidade de bebidas para seu evento.</h4>
        </div>

        <!-- Simulador -->
        <div class="container-colored m-t-10">
            <div class="container text-center">

                <!-- Guests -->
                <div class="card">
                    <div class="card-body card-padding">
                        <h5 class="card-title" for="guests">Número de convidados</h5>
                        <input id="guests" type="number" class="form-control" v-model="guests">
                        <p class="help-block text-danger"></p>
                    </div>
                </div>

                <!-- Event Type -->
                <div class="card">
                    <div class="card-body card-padding">
                        <h5 class="card-title" for="">Qual o tipo do evento ?</h5>
                        <button
                            v-for="type in event_types"
                            class="btn btn-xs btn-mb-primary"
                            style="margin: 2px;"
                            @click="addType($event, type)"
                            :class="{'outline':typeSelected.name !== type.name}"
                        >
                            {{ type.name }}
                        </button>
                    </div>
                </div>

                <!-- Drinks -->
                <div class="card">
                    <div class="card-body card-padding">
                        <h5 class="card-title">Bebidas que vou servir?</h5>

                        <button
                            v-for="bev in beverages"
                            class="btn btn-xs btn-mb-primary"
                            style="margin: 2px;"
                            @click="addBeverages($event, bev.id)"
                            :class="{'outline':bevSelected.indexOf(bev.id) < 0}"
                        >{{bev.name}}
                        </button>
                    </div>
                </div>

                <!-- Bar -->
                <div class="card">
                    <div class="card-body card-padding">
                        <h5 class="card-title">Vai ter bar de drinks?</h5>

                        <button
                            class="btn btn-mb-primary outline"
                            @click="toggle(has_bar, true)"
                            :class="{'reset-outline':has_bar.selected && sum > 0.4 && is_clicked_bar}"
                            >Sim
                        </button>
                        <button
                            class="btn btn-mb-primary outline"
                            @click="toggle(has_bar, false)"
                            :class="{'reset-outline':!has_bar.selected && sum > 0.4 && is_clicked_bar}"
                            data-toggle="modal"
                            data-target="#modalReactionCry"
                        >Não
                        </button>
                    </div>
                </div>

                <div class="card">
                    <div class="card-body card-padding">
                        <h5 class="card-title">O bar será da Mais Bartenders?</h5>
                        <button
                            class="btn btn-mb-primary outline"
                            :class="{'reset-outline':has_mb.selected && sum > 0.4 && is_clicked_mb}"
                            @click="toggle(has_mb, true)"
                            data-toggle="modal"
                            data-target="#modalReaction"
                        >Sim
                        </button>
                        <button
                            class="btn btn-mb-primary outline"
                            :class="{'reset-outline':!has_mb.selected && sum > 0.4 && is_clicked_mb}"
                            @click="toggle(has_mb, false)"
                            data-toggle="modal"
                            data-target="#modalReactionCry"
                        >Não</button>
                    </div>
                </div>

                <!-- Calculate -->
                <button class="btn btn-block btn-mb-primary-reverse"@click="openResult()">Calcular</button>

            </div>
        </div>



        <!-- Modal Party Reaction -->
        <div class="modal" id="modalReaction" tabindex="-1" data-backdrop="false">
            <div class="modal-dialog container-reaction">
                <div class="text-center">
                    <div class="reaction-pic" :style="`background-image: url('https://maisbartenders.com.br/img/cheers.gif')`">
                    </div>
                </div>
            </div>
        </div>
        <!-- / Modal Party Reaction -->

        <!-- Modal Cry Reaction -->
        <div class="modal" id="modalReactionCry" tabindex="-1" data-backdrop="false">
            <div class="modal-dialog container-reaction">
                <div class="text-center">
                    <div class="reaction-pic" :style="`background-image: url('https://maisbartenders.com.br/img/sadness.gif')`">
                    </div>
                </div>
            </div>
        </div>
        <!-- / Modal Cry Reaction -->

        <!-- Modal ALERT -->
        <div class="modal" id="modalAlert" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
            <div class="modal-dialog" role="document">

                <div class="modal-content">
                    <div class="modal-body text-center" style="margin-top: 100px">
                        <h4 class="title-section m-0 m-b-10">Atenção</h4>
                        <small class="smallCaption">Por favor, preencha todas as informações.</small>
                    </div>
                    <div class="modal-footer">
                        <button class="btn btn-block btn-mb-default">
                            Essa janela fecha em: {{ timeToClose }}s
                        </button>
                    </div>
                </div>

            </div>
        </div>
        <!-- / Modal Alert -->

        <!-- Modal Result -->
        <div class="modal" id="modalCalc" tabindex="-1" aria-labelledby="myModalLabel">
            <div class="modal-dialog" >

                <div class="modal-content">
                    <div class="modal-body ext text-center">
                        <h4 class="title-section m-0 m-b-10">Simulador</h4>
                        <small class="smallCaption">Quantidade indicada para seu evento.</small>

                        <div class="panel panel-default m-t-30" style="color: #222">
                            <table class="table table-bordered">
                                <thead>
                                    <tr>
                                        <th class="text-center">Bebida</th>
                                        <th class="text-center">Qtde indicada</th>
                                        <th class="text-center">Qtde com reserva (20%)</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="bev in bevsFiltered">
                                        <td>{{bev.name}}</td>
                                        <td class="text-center">{{(bev.ref/100  * sum * guests).toFixed(0)}}</td>
                                        <td class="text-center">{{(bev.ref/100  * sum * guests * 1.20).toFixed(0)}}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        <div class="card m-0 attention" style="color: #222">
                            <div class="card-body card-padding">
                                <h5 class="card-title m-0">Atenção</h5>
                                <p class="m-b-0">Estimativa somente para referência considerando eventos sociais com duração de 6 horas.</p>
                            </div>
                        </div>

                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-block btn-mb-default" data-dismiss="modal">Fechar</button>
                    </div>
                </div>
            </div>
        </div>
        <!-- / Modal Result -->
    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import mainHeader from '@/components/main-header.vue'

export default {
    name: 'simulator',
    components: {
        mainHeader
    },
    data() {
        return {
            timeToClose: 0,
            interactions: {
                prospectIsSending: false,
                workerIsSending: false,
            },
            alert: {
                message: 'Mensagem teste',
                isvisible: true,
            },
            guests: 100,
            event_types: [
                {id: '1', name: 'Casamento', coef: 1.6},
                {id: '2', name: '15 anos', coef: 1.7},
                {id: '3', name: 'Formatura', coef: 1.9},
                {id: '4', name: 'Festa Jovem', coef: 2.1},
                {id: '5', name: 'Festa Adulto', coef: 1.5},
            ],
            typeSelected: {id: '1', name: 'Casamento', coef: 1.4},
            beverages: [
                {id: '1', name: 'Cerveja', coef: -0.2, selected: false, ref: 84, quantity: ''},
                {id: '2', name: 'Whisky', coef: -0.1, selected: false, ref: 12, quantity: ''},
                {id: '3', name: 'Vinho', coef: -0.04, selected: false, ref: 14, quantity: ''},
                {id: '4', name: 'Espumante', coef: -0.06, selected: false, ref: 36, quantity: ''},
                {id: '5', name: 'Vodka', coef: -0.08, selected: false, ref: 8, quantity: ''},
                {id: '7', name: 'Energético', coef: 0.1, selected: false, ref: 40, quantity: ''},
                {id: '8', name: 'Gin', coef: -0.08, selected: false, ref: 8, quantity: ''},
                {id: '9', name: 'Tônica', coef: 0.1, selected: false, ref: 45, quantity: ''},
            ],
            bevSelected: [],
            has_bar: {name: 'has_bar', selected: false, coef: -0.1},
            has_mb: {name: 'has_mb', selected: false, coef: -0.1},
            is_clicked_bar: false,
            is_clicked_mb: false,
            sum: '',
            tacasUp: {
                heightScroll: 0,
                bodyHeight: 0,
                tacasPercent: 100,
                styles: {
                    bottom: 0
                }
            },
            prospect: {
                nameOrcamento: '',
                emailOrcamento: '',
                phoneOrcamento: '',
                dataEvento: '',
                tipoEvento: '',
                motivoEvento: '',
                numeroConvidados: '',
                localEvento: '',
                cidadeEvento: '',
                horaOrcamento: '',
                ondeConheceu: '',
                messageOrcamento: '',
            },
            work: {
                nomeTrabalhe: '',
                telefoneTrabalhe: '',
                emailTrabalhe: '',
                cidadeTrabalhe: '',
                nascimentoTrabalhe: '',
                faceTrabalhe: '',
                estudaTrabalhe: '',
                experienciaTrabalhe: '',
                experienciaBarTrabalhe: '',
                mensagemTrabalhe: '',
            }
        }
    },
    computed:{
        ...mapGetters(['isLogged', 'currentUser']),

        bevsFiltered: function() {

            let data = []

            this.beverages.forEach( function(bev){
                if(bev.selected){
                    data.push(bev)
                }
            })

            return data
        }
    },
    mounted(){

    },
    methods: {
        ...mapActions(['setLoading']),

        addType: function(ev, type){
            ev.preventDefault();

            this.typeSelected = type;

            this.calc();
        },

        addBeverages: function(ev, id){
            ev.preventDefault();

            const index = this.bevSelected.indexOf(id);

            if(index > -1) {
                this.bevSelected.splice(index, 1);
            } else {
                this.bevSelected.push(id);
            }
            this.beverages.toggleFromAttr('id', id, 'selected')
            this.calc();
        },

        calc: function(){

            let sumBevs = this.beverages.applySumFromAttrInArray('selected', true, 'coef');

            this.sum = sumBevs + this.typeSelected.coef;

            if(this.has_bar.selected) {
                this.sum = this.sum + this.has_bar.coef;
            }
            if(this.has_mb.selected) {
                this.sum = this.sum + this.has_mb.coef;
            }
            this.sum = this.sum.toFixed(2);
        },

        toggle: function(obj, selected){

            self = this;

            if(obj.name == 'has_bar' &&  selected == false){
                self.has_bar.selected = false;
                self.is_clicked_bar = true;
                self.has_mb.selected = false;
                self.is_clicked_mb = true;
                self.calc();
            }

            if(obj.name == 'has_bar' && selected == true) {
                self.has_bar.selected = true;
                self.is_clicked_bar = true;
                self.calc();
            }

            if(obj.name == 'has_mb' &&  selected == false){
                self.has_mb.selected = false;
                self.is_clicked_mb = true;
                self.calc();
            }

            if(obj.name == 'has_mb' && selected == true) {
                self.has_bar.selected = true;
                self.has_mb.selected = true;
                self.is_clicked_mb = true;
                self.is_clicked_bar = true;
                self.calc();
            }

            setTimeout(function(){
                $('#modalReaction').modal('hide');
                $('#modalReactionCry').modal('hide');
            }, 4500);
        },

        openResult: function(){

            if(this.checkAlert()){
                $('#modalCalc').modal('show');
            }

        },

        checkAlert: function(){
            if(this.sum < 0.1 || !this.is_clicked_bar || !this.is_clicked_mb || this.bevSelected.length < 1){
                $('#modalAlert').modal('show');

                let that = this
                that.timeToClose = 5
                var time = setInterval(() => {
                    if (that.timeToClose > 1) {
                        that.timeToClose--
                    } else {
                        clearInterval(time)
                    }
                }, 1000);

                setTimeout(function(){
                    $('#modalAlert').modal('hide');
                }, 5000);
                return false;
            } else {
                return true;
            }
        },

    }
}
</script>

<style scoped>

    .btn {
        border-width: 2px;
    }

    thead tr th {
        vertical-align: middle;
    }

    /* Card Attention */
    .card.attention p {
        line-height: 1.3;
        font-size: 12px;
        margin-top: 10px;
    }

    .container-reaction {
        position: fixed;
        top: -10px; left: -10px; right: -10px; bottom: -10px;
    }

    .reaction-pic {
        width: 200px; height: 200px;
        border-radius: 50%;
        background-size: cover;
        background-position: center;
        position: absolute;
        top: calc(50% - 100px);
        left: calc(50% - 100px);
        box-shadow: 0 0 50px rgba(0, 0, 0, .8);
    }

</style>
