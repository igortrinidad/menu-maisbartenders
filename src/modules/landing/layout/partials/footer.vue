<template>
    <!-- Navigation -->
    <footer class="bg-footer">
        <div>
        <!--
            <small class="created-by">Created By</small>
            <a class="" href="https://we-planner.com" target="_blank">We-Planner</a>
            <a class="" href="https://menu.maisbartenders.com.br/#/termos-de-uso-e-privacidade" target="_blank">Termos de uso e politica de privacidade</a>
        -->
        </div>
    </footer>
</template>

<script>

    export default{
        name: 'landing-footer',
        data(){
            return {}
        },
        mounted(){

        },
        methods:{
        }
    }
</script>

<style scoped>
    .bg-footer{
        background-color: #000000;
        display: block;
        height: auto;
        width: 100%;
        padding: 30px;

    }

    .privacy {
        display: block;
        font-size: 11px;
        margin-top: 20px;
        color: #C0C0C0;
    }
    .privacy:focus,
    .privacy:hover{ text-decoration: none; }

    .created-by{
        color: #C0C0C0;
    }
</style>
