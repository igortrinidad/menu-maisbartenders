<template lang="html">
    <div>
        <!-- Icon SVG + Title -->
        <div class="container text-center p-t-30" style="position: relative">
            <!-- Event Name -->
            <!-- <div v-html="event.greeting">
            </div> -->
            <h4 class="m-t-0 title-section">{{ event.name }}</h4>
            <!-- Event HashTag -->
            <span class="hashtag btn btn-mb-primary">{{ event.hashtag }}</span>

        </div>

        <!-- Container Colored -->
        <div class="container-colored m-t-30">
            <div class="container">
                <div class="card">
                    <div class="card-body card-padding">
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'show-event-about',
        props: {
            event: {
                type: Object,
                required: true
            }
        },
        data() {
            return {

            }
        },
        mounted() {

        },
        methods: {

        }
    }
</script>

<style scoped>
    /* Scoped Styles */
</style>
