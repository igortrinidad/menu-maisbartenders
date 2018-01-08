<template lang="html">
    <div class="">

            <!-- CATEGORIES -->
            <h3 class="text-center">Categorias</h3>

            <div class="category" v-for="(category) in event.drink_categories">
                <div tag="div" class="card m-0 text-center cursor-pointer card-cat"
                     @click="selectCategory(category)">
                    <div class="card-body card-padding">
                        <img class="cat-icon" :src="category.photo_url" alt="">
                        <div class="m-t-5">
                            <h6 class="card-title m-b-0">{{ category['name_pt'] }}</h6>
                        </div>
                    </div>
                </div>
            </div>

    </div>
</template>

<script>
    export default {
        name: 'show-event-drinks',
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
