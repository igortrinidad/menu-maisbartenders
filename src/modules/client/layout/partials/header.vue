<template>

    <nav class="navbar navbar-inverse">
        <div class="container-fluid">
            <div class="navbar-header">
                <button type="button" class="navbar-toggle collapsed" data-toggle="collapse"
                        data-target="#bs-example-navbar-collapse-2">
                    <span class="sr-only">Toggle navigation</span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                </button>

                <div class="navbar-brand">Client Dashboard</div>
            </div>

            <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-2">

            </div>
        </div>
    </nav>
</template>

<script>
    import { mapGetters } from 'vuex'
    export default{
        name: 'client-header',
        data(){
            return {}
        },
        mounted(){

        },
        methods:{

        }
    }
</script>

<style>
.navbar {
    border-radius: 0px;
}



</style>
