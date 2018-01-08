<template lang="html">
    <section id="comments">
        <div class="container">
            <div class="row">
                <div class="col-md-12 col-xs-12">

                    <div class="text-center">
                        <h2>Comentários:</h2>
                        <p class="sub-header">{{ pagination.total > 0 ? `${ pagination.total } comentários` :
                            'Nenhum comentário ainda'}}
                        </p>

                    </div>

                    <div class="text-center m-20">
                        <button class="btn btn-mb-primary" data-target="#modal-comment" data-toggle="modal"><i class="fa fa-comment"></i> Novo comentário</button>
                    </div>

                    <span v-for="(comment, index) in comments">
                        <div class="row">
                            <span class="interactions m-10">
                                <div class="row">
                                    <div class="col-md-1 col-xs-3">
                                        <img :src="comment.guest.photo_url" class="img-circle"
                                             width="60px">
                                    </div>
                                    <div class="col-md-11 col-xs-9">
                                        <br>
                                        <span class="comment-user-name">{{comment.guest.full_name}}</span>
                                    </div>
                                </div>
                                <p class="m-t-10">{{comment.comment}}</p>
                                <span
                                    class="text-right comment-date">Criado em: {{comment.created_at | moment('DD/MM/YYYY HH:mm:ss')
                                    }}</span>
                            </span>
                        </div>
                    </span>

                    <div class="row">
                        <div class="col-sm-12" v-show="comments.length > 6">
                            <div class="text-center">
                                <pagination :source="pagination" @navigate="navigate" :range="6"></pagination>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Modal commentário -->
        <div class="modal fade" id="modal-comment" tabindex="-1" role="dialog">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close text-primary" data-dismiss="modal" aria-label="Close"><span
                            aria-hidden="true">&times;</span></button>
                        <h4 class="modal-title">Novo comentário</h4>
                    </div>
                    <div class="modal-body p-25">

                        <p>
                            Escreva seu comentário para o evento {{event.name}}</p>
                        <br>
                        <div class="form-group">
                            <label>Mensagem*</label>
                            <textarea class="form-control" v-model="newComment.comment" placeholder="Digite seu comentário"></textarea>
                        </div>

                    </div>
                    <div class="modal-footer">
                        <button type="button"
                                class="btn btn-mb-primary m-b-10 btn-block"
                                @click="saveComment()"
                                :disabled="!newComment.comment"> Salvar comentário
                        </button>
                    </div>
                </div>
            </div>
        </div>
        <!-- Modal commentário -->
    </section>
</template>

<script>
    import pagination from '@/components/pagination'
    import {mapGetters} from 'vuex'

    export default {

        name: 'show-event-comments',

        props: {
            event: {
                type: Object,
                required: true
            }
        },

        components: {
            pagination
        },

        data() {
            return {
                comments: [],
                pagination: {},
                newComment: {
                    event_id: '',
                    user_id: '',
                    comment: ''
                },
            }
        },
        computed:{
            ...mapGetters(['currentUser'])
        },

        mounted() {
            this.getEventComments()
        },
        methods: {
            getEventComments: function () {
                let that = this
                that.$http.get('/events/comments/' + that.$route.params.event_slug)
                    .then(function (response) {

                        that.comments = response.data.data

                        that.pagination = {
                            total: response.data.total,
                            per_page: response.data.per_page,
                            current_page: response.data.current_page,
                            last_page: response.data.last_page,
                            next_page_url: response.data.next_page_url,
                            prev_page_url: response.data.prev_page_url,
                            from: response.data.from,
                            to: response.data.to,
                        }


                    })
                    .catch(function (error) {
                        console.log(error)
                    });

            },

            navigate: function (page) {
                let that = this
                that.$http.get('/events/comments/' + that.$route.params.event_slug + '?page=' + page)
                    .then(function (response) {

                        that.comments = response.data.data

                        that.pagination = {
                            total: response.data.total,
                            per_page: response.data.per_page,
                            current_page: response.data.current_page,
                            last_page: response.data.last_page,
                            next_page_url: response.data.next_page_url,
                            prev_page_url: response.data.prev_page_url,
                            from: response.data.from,
                            to: response.data.to,
                        }

                    })
                    .catch(function (error) {
                        console.log(error)
                    });
            },

            saveComment: function () {
                let that = this

                var data = {
                    event_id: that.event.id,
                    guest_id: that.currentUser.id,
                    comment: that.newComment.comment,
                }

                that.$http.post('/guest/eventComment', data)
                    .then(function (response) {

                        that.comments.unshift(response.data.comment)
                        that.pagination.total = that.pagination.total + 1
                        that.resetComment()
                        successNotify('', 'Comentário salvo com sucesso.');
                    })
                    .catch(function (error) {
                        console.log(error)
                    });

            },

            resetComment(){
                let that = this
                that.newComment.comment = '';
                $('#modal-comment').modal('hide');
            }
        }
    }
</script>

<style scoped>
    /* Scoped Styles */
</style>
