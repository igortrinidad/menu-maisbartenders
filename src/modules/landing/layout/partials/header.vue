<template>

    <nav class="navbar navbar-default">
        <div class="container-fluid">
            <div class="navbar-header">
                <button type="button" class="navbar-toggle collapsed" data-toggle="collapse"
                        data-target="#bs-example-navbar-collapse-2">
                    <span class="sr-only">Toggle navigation</span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                </button>

                <div class="navbar-brand">We Planner <strong>Vue</strong> Starter</div>
            </div>

            <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-2">

                <ul class="nav navbar-nav navbar-right">
                    <router-link  tag="li" to="/cadastro" exact>
                        <a>Cadastre-se</a>
                    </router-link>
                    <router-link  tag="li" to="/login" exact>
                        <a>Login</a>
                    </router-link>
                </ul>
            </div>
        </div>
    </nav>
</template>

<script>

    export default{
        name: 'landing-header',
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

</style>
