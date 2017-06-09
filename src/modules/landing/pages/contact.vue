<template lang="html">
    <section>
        <div class="container">
            <div class="row">
                <div class="col-sm-12">
                    <div class="text-center">
                        <h2>Entre em contato</h2>
                        <h4 class="m-t-30 m-b-30">Contrate agora essa novidade para sua festa</h4>

                    </div>
                </div>
                <div class="col-sm-6">
                    <div class="contact-box">
                        <form @submit.prevent="submitForm()">
                            <div class="form-group">
                                <label class="cursor-pointer" for="contact-name">Nome</label>
                                <input
                                    id="contact-name"
                                    class="form-control"
                                    placeholder="Seu nome"
                                    type="text"
                                    v-model="message.name"
                                >
                            </div>
                            <div class="form-group">
                                <label class="cursor-pointer" for="contact-email">E-mail</label>
                                <input
                                    id="contact-email"
                                    class="form-control"
                                    placeholder="Seu E-mail"
                                    type="email"
                                    v-model="message.email"
                                >
                            </div>
                            <div class="form-group">
                                <label class="cursor-pointer" for="contact-phone">Celular</label>
                                <input
                                    id="contact-phone"
                                    class="form-control"
                                    placeholder="Seu número de ceular com ddd"
                                    type="text"
                                    v-model="message.phone"
                                >
                            </div>
                            <div class="form-group">
                                <label for="drink-style">Serviço</label>
                                <v-select
                                    id="drink-style"
                                    :label="'name'"
                                    :options="services"
                                    :multiple="false"
                                    placeholder="Escolha o serviço."
                                    v-model="message.service"
                                >
                                    <span slot="no-options">Não foi possível localizar serviços :(</span>
                                </v-select>
                            </div>
                            <div class="form-group">
                                <label class="cursor-pointer" for="contact-msg">Mensagem</label>
                                <textarea
                                    id="contact-msg"
                                    class="form-control"
                                    placeholder="Sua mensagem"
                                    type="text"
                                    v-model="message.msg"
                                >
                                </textarea>
                            </div>
                            <button class="btn btn-block btn-xl m-t-30" type="submit">Enviar</button>
                        </form>
                    </div>
                </div>
                <div class="col-sm-6">
                    <div class="contact-box">
                        <div class="row">
                            <div class="col-md-12 col-xs-12">
                                <a title="Clique para enviar uma mensagem no WhatsApp!" class="btn btn-xl btn-block inline" href="https://api.whatsapp.com/send?phone=+553182134820&text=[MENU-INTERATIVO] Olá Mais Bartenders, tudo bem?" target="_blank">Envie um WhatsApp agora</a>
                            </div>
                        </div>
                        <br>
                        <div class="text-center">
                            <p class="text-description">ou clique para ligar</p>
                        </div>
                        <br>

                        <div class="row">
                            <div class="col-md-12 col-xs-12 m-b-10">
                                <a title="Clique para ligar!" class="btn btn-xl btn-block inline" href="tel:31 3296-5673">31 3296-5673 <i class="fa fa-phone"></i></a>
                            </div>

                            <div class="col-md-12 col-xs-12">
                                 <a title="Clique para enviar uma mensagem no WhatsApp!" class="btn btn-xl btn-block inline" href="tel:31 98213-4820">31 98213-4820 <i class="fa fa-whatsapp"></i></a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="backsection">
            <div class="container">
                <hr>
                <div class="row">
                    <div class="col-sm-12">
                        <div class="text-center">
                            <h3>Volte para o início</h3>
                            <router-link class="btn inline btn-xl m-t-30" :to="{ name: 'landing.home.show' }">
                                Voltar
                            </router-link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
import vSelect from 'vue-select'

export default {
    name: 'contact',
    components: { vSelect },
    data() {
        return {
            services: ['Duvidas', 'Sugestões'],
            message: {
                name: '',
                email: '',
                phone: '',
                service: '',
                msg: ''
            }
        }
    },
    methods: {
        validateForm: function() {
            if (!this.message.name) return { validated: false, message: 'Informe seu nome' }
            if (!this.message.email) return { validated: false, message: 'Informe seu e-mail' }
            if (!this.message.phone) return { validated: false, message: 'Informe seu celular' }
            if (!this.message.service) return { validated: false, message: 'Infrome algum serviço' }
            if (!this.message.msg) return { validated: false, message: 'Deixe uma messagem' }

            return { validated: true }
        },
        submitForm: function() {
            const validate = this.validateForm()
            if (validate.validated) {
                // send message
                successNotify('', 'Mensagem enviada!')
                console.log(this.message)
            }
            else {
                errorNotify('', validate.message)
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
