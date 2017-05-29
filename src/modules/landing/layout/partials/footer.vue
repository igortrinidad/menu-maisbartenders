<template>
    <!-- Navigation -->
    <footer class="bg-footer">
        <div >
            <small class="created-by">Created By</small>
            <a class="" href="https://we-planner.com" target="_blank">We-Planner</a>
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
        height: 80px;
        width: 100%;
        padding: 30px;
        
    }

    .created-by{
        color: #C0C0C0;
    }
</style>
