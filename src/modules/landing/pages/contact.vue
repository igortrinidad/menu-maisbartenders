<template lang="html">
    <section>

        <main-header :title="'Entre em contato'" />

        <div class="container">

            <div class="svg-container">
                <svg viewBox="0 0 90 90">

                    <defs>
                        <linearGradient id="linear" x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%"   stop-color="#FB923B"/>
                            <stop offset="100%" stop-color="#F66439"/>
                        </linearGradient>
                    </defs>

                    <g id="phone-svg" transform="translate(-6.5004535,-959.86214)">
                        <g transform="translate(-926.99994,1103)">
                            <path class="non-fill fix animated" stroke="url(#linear)"
                                d="m 969.89458,-87.40339 c 2.1795,2.28415 4.80929,3.69432 7.29207,3.97744 2.54299,0.24277 5.22869,-0.59673 8.19796,-3.91112 0.92015,-1.02707 1.92827,-2.2162 3.62395,-2.78427 1.69567,-0.56805 3.73326,-0.21549 5.89993,0.95019 4.13354,3.13892 8.39641,6.31786 12.46271,9.54593 1.9385,1.93845 2.4375,4.49156 1.812,6.49655 -0.6254,2.00499 -1.9654,3.52366 -3.2041,4.7951 -6.90552,7.19568 -15.08521,10.673 -23.11337,9.45737 -7.75498,-1.34253 -15.2594,-6.77414 -23.57759,-15.09232 -3.57547,-3.57546 -6.36097,-6.36098 -9.89949,-9.89949 -8.31818,-8.31818 -13.74979,-15.8226 -15.09231,-23.57759 -1.59624,-9.5909 3.49885,-17.39765 9.45732,-23.11336 1.27145,-1.23864 2.79011,-2.57867 4.7951,-3.20412 2.00499,-0.62544 4.55809,-0.12649 6.49655,1.81197 3.22808,4.0663 6.40701,8.32923 9.54594,12.46275 1.16566,2.16666 1.51823,4.20425 0.95017,5.89993 -0.56806,1.6957 -1.75719,2.70381 -2.78426,3.62396 -3.31439,2.96926 -4.17696,5.65729 -3.91112,8.19796 0.26005,2.485291 1.69293,5.11291 3.97744,7.29206"
                            />
                            <path class="non-fill fix animated" stroke="url(#linear)"
                                d="m 971.89021,-140.52839 c 0.0573,1.0473 1.06232,1.948 2.10958,1.8906 23.21965,0 41.99991,18.7803 41.99991,42 -0.015,1.0566 0.9433,2.0285 2,2.0285 1.0568,0 2.015,-0.9719 2,-2.0285 0,-25.3814 -20.61846,-46 -45.99991,-46 -1.19787,-0.01 -2.12962,1.075 -2.10958,2.1094 z m 0,12 c 0.0573,1.0473 1.06232,1.948 2.10958,1.8906 16.59222,0 29.99991,13.4077 29.99991,30 -0.015,1.0566 0.9433,2.0285 2,2.0285 1.0568,0 2.015,-0.9719 2,-2.0285 0,-18.754 -15.24593,-34 -33.99991,-34 -1.24903,0.01 -2.12965,1.145 -2.10958,2.1094 z"
                            />
                        </g>
                    </g>
                </svg>
            </div>

            <h4 class="title-section">Contrate o melhor BAR para sua festa</h4>

            <!-- Card Form -->
            <div class="card">
                <div class="card-body card-padding">
                    <form @submit.prevent="submitForm()">
                        <div class="form-group">
                            <label class="cursor-pointer" for="contact-name">Nome</label>
                            <input
                                id="contact-name"
                                class="form-control"
                                placeholder="Seu nome"
                                type="text"
                                v-model="contact.name"
                            >
                        </div>
                        <div class="form-group">
                            <label class="cursor-pointer" for="contact-email">E-mail</label>
                            <input
                                id="contact-email"
                                class="form-control"
                                placeholder="Seu E-mail"
                                type="email"
                                v-model="contact.email"
                            >
                        </div>
                        <div class="form-group">
                            <label class="cursor-pointer" for="contact-phone">Celular</label>
                            <input
                                id="contact-phone"
                                class="form-control"
                                placeholder="Seu número de ceular com ddd"
                                type="text"
                                v-model="contact.phone"
                            >
                        </div>
                        <div class="form-group">
                            <label for="drink-style">Assunto</label>
                            <v-select
                                id="drink-style"
                                :label="'name'"
                                :options="services"
                                :multiple="false"
                                placeholder="Escolha uma opção."
                                v-model="contact.subject"
                            >
                                <span slot="no-options">Não foi possível localizar uma opção :(</span>
                            </v-select>
                        </div>
                        <div class="form-group">
                            <label class="cursor-pointer" for="contact-msg">Mensagem</label>
                            <textarea
                                id="contact-msg"
                                class="form-control"
                                placeholder="Sua mensagem"
                                type="text"
                                v-model="contact.message"
                            >
                            </textarea>
                        </div>
                        <button class="btn btn-block btn-xl m-t-30" type="submit">Enviar</button>
                    </form>
                </div>
            </div>
            <!-- / Card Form -->

            <!-- Card Call -->
            <div class="card text-center">
                <div class="card-body card-padding">
                    <button title="Clique para enviar uma mensagem no WhatsApp!" @click="openWhatsapp()" class="btn btn-xl btn-block inline">Envie um WhatsApp agora</button>

                    <p class="m-t-10 text-description">ou clique para ligar</p>

                    <a title="Clique para ligar!" class="btn btn-xl btn-block inline" href="tel:31 3296-5673">31 3296-5673</a>
                    <a title="Clique para enviar uma mensagem no WhatsApp!" class="btn btn-xl btn-block inline" href="tel:31 98213-4820">31 98213-4820</a>
                </div>
            </div>
            <!-- / Card Call -->

        </div>
    </section>
</template>

<script>
import vSelect from 'vue-select'
import {mapGetters, mapActions} from 'vuex'
import mainHeader from '@/components/main-header.vue'

export default {
    name: 'contact',
    components: { vSelect, mainHeader },
    data() {
        return {
            services: ['Orçamentos', 'Informações', 'Sugestões'],
            contact: {
                name: '',
                email: '',
                phone: '',
                subject: '',
                message: ''
            }
        }
    },
    computed:{
        ...mapGetters(['isLogged', 'currentUser'])
    },
    mounted(){
        if(this.isLogged){
            this.contact.name = this.currentUser.full_name
            this.contact.email = this.currentUser.email
            this.contact.phone = this.currentUser.phone
        }
    },
    methods: {
        ...mapActions(['setLoading']),

        openWhatsapp: function(){
            let that = this

            if(that.isLogged){
                var url = `https://api.whatsapp.com/send?phone=+553182134820&text=[MENU MAIS BARTENDERS] Olá Mais Bartenders, tudo bem? Meu nome é ${that.currentUser.full_name}.`;
            } else {
                var url = 'https://api.whatsapp.com/send?phone=+553182134820&text=[MENU MAIS BARTENDERS] Olá Mais Bartenders, tudo bem?';
            }

            window.open(url, '_system', null);
        },

        validateForm: function() {
            if (!this.contact.name) return { validated: false, message: 'Informe seu nome' }
            if (!this.contact.email) return { validated: false, message: 'Informe seu e-mail' }
            if (!this.contact.phone) return { validated: false, message: 'Informe seu celular' }
            if (!this.contact.subject) return { validated: false, message: 'Infrome algum serviço' }
            if (!this.contact.message) return { validated: false, message: 'Deixe uma messagem' }

            return { validated: true }
        },
        submitForm: function() {
            let that = this

            const validate = this.validateForm()

            if (validate.validated) {
                // send message
                that.setLoading({is_loading: true, message: ''})

                that.$http.post('/contact/send', that.contact)
                    .then(function (response) {

                        that.setLoading({is_loading: false, message: ''})

                        successNotify('', 'Mensagem enviada!')

                        that.resetForm()
                    })
                    .catch(function (error) {
                        errorNotify('', 'Não foi possível enviar sua mensagem, tente novamente mais tarde.')
                        that.setLoading({is_loading: false, message: ''})
                    });
            }
            else {
                errorNotify('', validate.message)
            }
        },

        resetForm(){
            this.contact.name = ''
            this.contact.email = ''
            this.contact.phone = ''
            this.contact.subject = ''
            this.contact.message = ''

            if(this.isLogged){
                this.contact.name = this.currentUser.full_name
                this.contact.email = this.currentUser.email
                this.contact.phone = this.currentUser.phone
            }
        }
    }
}
</script>

<style scoped>
.contact-box{
    border-radius: 4px;
    padding: 10px;
    box-shadow: 0px 0px 4px rgba(0, 0, 0, .2);
    margin: 15px 0;
}

</style>
