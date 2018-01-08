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

                    <span v-for="(comment, index) in comments">
                        <div class="row">
                            <span class="interactions m-10">
                                <div class="row">
                                    <div class="col-md-1 col-xs-3">
                                        <img :src="handleGuestAvatar(comment.guest)" class="img-circle"
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
    </section>
</template>

<script>
    import pagination from '@/components/pagination'

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
            }
        },

        mounted() {

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
        }
    }
</script>

<style scoped>
    /* Scoped Styles */
</style>
