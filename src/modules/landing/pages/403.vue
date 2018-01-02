<template>
    <div class="container text-center m-t-20 m-b-20 p-t-80">
        <h1 class="f-700">403</h1>
        <h1 class="text-muted">Forbidden</h1>
        <h4 class="text-info">Você não tem permissão para acessar este recurso.</h4>

        <div class="row m-t-20">
            <router-link to="/" class="btn btn-success" exact>Voltar para home</router-link>
        </div>

    </div>
</template>

<script>
    export default{
        name: 'landing-403',
        components: {
        },
        data(){
            return {}
        },
        mounted(){

        },
        methods: {}
    }
</script>

<style scoped>
    .p-t-80{
        padding-top: 80px;
    }
</style>
