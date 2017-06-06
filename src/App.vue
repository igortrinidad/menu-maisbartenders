<template>
    <div>
        <router-view></router-view>
        <div id="root"></div>
    </div>
</template>

<script>
    import { mapGetters } from 'vuex'
    export default {
        name: 'App',
        data(){
            return {}
        },
        computed: {
            ...mapGetters(['currentUser', 'isLogged']),
        },
        mounted(){
            let that = this
            /*//Init facebook SDK
            window.fbAsyncInit = () => {
                FB.init({
                    appId: '262783620860879',
                    cookie: true,
                    xfbml: true,
                    version: 'v2.8'
                })

                FB.getLoginStatus(function (response) {
                    that.statusChangeCallback(response);
                })
            }*/


            if(this.isLogged){
                this.$auth.user(this.currentUser)
                this.$auth.watch.authenticated = true
            }
        },
        methods: {

            /*statusChangeCallback(response) {
                let that = this
                console.log('statusChangeCallback');
                console.log(response);
                // The response object is returned with a status field that lets the
                // app know the current login status of the person.
                // Full docs on the response object can be found in the documentation
                // for FB.getLoginStatus().
                if (response.status === 'connected') {
                    // Logged into your app and Facebook.
                    that.testAPI();
                } else {
                    // The person is not logged into your app or we are unable to tell.
                    document.getElementById('status').innerHTML = 'Please log ' +
                        'into this app.';
                }
            },
            testAPI() {
                console.log('Welcome!  Fetching your information.... ');
                FB.api('/me', function(response) {
                    console.log('Successful login for: ' + response.name);
                    document.getElementById('status').innerHTML =
                        'Thanks for logging in, ' + response.name + '!';
                });
            }*/
        }
    }
</script>
