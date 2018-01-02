<template lang="html">
    <section>

        <main-header :title="'Simulador'" />

        <div class="container">
            <div class="row">
                <div class="col-lg-12 text-center">
                    <h2 class="section-heading">Simulador</h2>
                    <h3 class="section-subheading text-muted">Calcule a quantidade de bebidas para seu evento.</h3>
                </div>
            </div>
        </div>

        <div class="container">
            <div class="row">

                <!-- Guests -->
                <div class="col-sm-12 text-center">
                    <div class="form-group">
                        <h4>Número de convidados</h4>
                        <input type="number" class="form-control" v-model="guests">
                        <p class="help-block text-danger"></p>
                    </div>
                </div>
                <!-- / Guests -->

                <div class="col-sm-12">
                    <hr>
                </div>

                <!-- Event Type -->
                <div class="col-sm-12 text-center">
                     <h4>Tipo do evento?</h4>
                     <button
                        v-for="type in event_types"
                        class="btn inline m-r-5 m-t-5"
                        @click="addType($event, type)"
                        :class="{'btn-xl':typeSelected.name == type.name}"
                    >{{type.name}}
                     </button>
                </div>
                <!-- / Event Type -->

                <div class="col-sm-12">
                    <hr>
                </div>

                <!-- Drinks -->
                <div class="col-sm-12 text-center">
                    <h4>Bebidas que vou servir?</h4>
                    <button
                        v-for="bev in beverages"
                        class="btn inline m-r-5 m-t-5"
                        @click="addBeverages($event, bev.id)"
                        :class="{'btn-xl':bevSelected.indexOf(bev.id) > -1}"
                    >{{bev.name}}
                    </button>
                </div>
                <!-- / Drinks -->

                <div class="col-sm-12">
                    <hr>
                </div>

                <!-- Bar -->
                <div class="col-sm-12 text-center">
                    <h4>Vai ter bar de drinks?</h4>
                    <button
                        class="btn inline"
                        @click="toggle(has_bar, true)"
                        :class="{'btn-xl':has_bar.selected && sum > 0.4 && is_clicked_bar}"
                        >Sim
                    </button>
                    <button
                        class="btn  inline"
                        @click="toggle(has_bar, false)"
                        :class="{'btn-xl':!has_bar.selected && sum > 0.4 && is_clicked_bar}"
                        data-toggle="modal"
                        data-target="#modalReactionCry"
                    >Não
                    </button>
                </div>
                <!-- Bar -->

                <div class="col-sm-12">
                    <hr>
                </div>

                <!-- Is MaisBartenders ? -->
                <div class="col-sm-12 text-center">
                    <h4>O bar será da Mais Bartenders?</h4>
                    <button
                        class="btn  inline"
                        :class="{'btn-xl':has_mb.selected && sum > 0.4 && is_clicked_mb}"
                        @click="toggle(has_mb, true)"
                        data-toggle="modal"
                        data-target="#modalReaction"
                    >Sim
                    </button>
                    <button
                        class="btn inline"
                        :class="{'btn-xl':!has_mb.selected && sum > 0.4 && is_clicked_mb}"
                        @click="toggle(has_mb, false)"
                        data-toggle="modal"
                        data-target="#modalReactionCry"
                    >Não</button>
                </div>
                <!-- / Is MaisBartenders ? -->

                <div class="col-sm-12">
                    <hr>
                </div>

                <!-- Calculate -->
                <div class="col-sm-12 text-center">
                    <button
                        class="btn inline btn-xl"
                        @click="openResult()"
                        style="background-color:#FA923C;margin: 20px 0 0 0;border: 0px"
                    >Calcular</button>
                </div>
                <!-- / Calculate -->
            </div>
        </div>

        <!-- Modal Party Reaction -->
        <div class="modal fade" id="modalReaction" tabindex="-1" data-backdrop="false"  aria-labelledby="myModalLabel">
            <div class="modal-dialog" >
                <div class="text-center">
                    <br><br><br><br>
                    <img src="https://maisbartenders.com.br/img/cheers.gif" alt="Brindando aos noivos por contratarem a melhor empresa de Belo Horizonte" style="max-width: 100%"/>
                </div>
            </div>
        </div>
        <!-- / Modal Party Reaction -->

        <!-- Modal Cry Reaction -->
        <div class="modal fade" id="modalReactionCry" tabindex="-1" data-backdrop="false"  aria-labelledby="myModalLabel">
            <div class="modal-dialog" >
                <div class="text-center">
                    <br><br><br><br>
                    <img src="https://maisbartenders.com.br/img/sadness.gif" alt="Não chore" style="max-width: 100%"/>
                </div>
            </div>
        </div>
        <!-- / Modal Cry Reaction -->

        <!-- Modal ALERT -->
        <div class="modal fade" id="modalAlert" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
            <br><br><br><br>
            <div class="modal-dialog" role="document">

                <div class="modal-content">
                    <div class="modal-body text-center">
                        <h4>Atenção</h4>
                        <br>
                        <small class="smallCaption">Por favor, preencha todas as informações.</small>
                        <br><br>

                    </div>
                </div>
            </div>
        </div>
        <!-- / Modal Alert -->

        <!-- Modal Result -->
        <div class="modal fade" id="modalCalc" tabindex="-1" aria-labelledby="myModalLabel">
            <div class="modal-dialog" >

                <div class="modal-content">
                    <div class="modal-body text-center">
                        <button type="button" class="close" data-dismiss="modal">&times;</button>
                        <h4>Simulador</h4>
                        <small class="smallCaption">Quantidade indicada para seu evento.</small>
                        <br><br><br>
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
                    <div class="modal-footer">
                        <p class="pull-right" style="font-size:12px">Estimativa somente para referência considerando eventos sociais com duração de 6 horas.</p>
                    </div>
                </div>
            </div>
        </div>
        <!-- / Modal Result -->
    </section>
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
                setTimeout(function(){
                    $('#modalAlert').modal('hide');
                }, 4500);
                return false;
            } else {
                return true;
            }
        },

    }
}
</script>

<style scoped>

    .btn-xl { padding: 10px 20px; }

    .btn:hover, .btn:focus, .btn.focus { color: #2c3e50 !important; }
    .btn-xl:hover,
    .btn-xl:focus,
    .btn-xl:active,
    .btn-xl.active,
    .open .dropdown-toggle.btn-xl
    { color: #2c3e50 !important; background-color: #FED13B; border-color: #FED13B; }

    thead tr th {
        vertical-align: middle;
    }

</style>
