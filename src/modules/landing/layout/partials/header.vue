<template>
    <nav class="navbar">
        <div class="container-fluid">

            <div class="navbar-header">
                <button type="button" class="navbar-toggle">
                    <span class="sr-only">Toggle navigation</span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                </button>

                <div class="navbar-brand"><router-link to="/">Menu <strong>Bartenders</strong></router-link></div>
            </div>

            <div class="navbar-nav" id="bs-example-navbar-collapse-2">
                <ul>
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

.navbar {
    min-height: 64px;
    width: 100%;
    background: #222;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 9999;
    font-family: 'montserrat'
}

.container-fluid{
    width: 100%;
    padding: 0 10px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    min-height: 64px;
}

.navbar-nav{

}
.navbar-nav li {
    list-style: none;
    color: #fff;
    display: inline-block;
    font-size: .9rem
}
.navbar-nav li:first-child{ margin-right: 20px }

@media (max-width: 768px) {
    .navbar-nav li {text-align: right; display: block;}
    .navbar-nav li:first-child{ margin-right: 0 }
}

.navbar-toggle{ display: none; }

.navbar-brand{ color: #fff; font-size: 1.2rem}

.navbar-header, .navbar-nav{ align-self:  center; }

</style>
