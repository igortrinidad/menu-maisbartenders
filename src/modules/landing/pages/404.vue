<template>
    <div class="container text-center m-t-20 m-b-20 p-t-80">
        <h1 class="f-700">404</h1>
        <h1 class="text-muted">Ops! :(</h1>
        <h4 class="text-muted">A página que você está procurando não foi encontrada.</h4>

        <div class="row m-t-20">
            <router-link to="/" class="btn btn-primary">Voltar para home</router-link>
        </div>

    </div>
</template>

<script>
    export default{
        name: 'landing-404',
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
