var elixir = require('laravel-elixir');


/*
 |--------------------------------------------------------------------------
 | Elixir Asset Management
 |--------------------------------------------------------------------------
 |
 | Elixir provides a clean, fluent API for defining some basic Gulp tasks
 | for your Laravel application. By default, we are compiling the Sass
 | file for our application, as well as publishing vendor resources.
 |
 */

elixir(function(mix) {


	mix.styles([
        './assets/flatly/css/bootstrap.css',
        './assets/css/custom.css',
        './node_modules/izitoast/dist/css/iziToast.css',
        './node_modules/font-awesome/css/font-awesome.css',
        './node_modules/swiper/dist/css/swiper.css',
        './static/build/css/general_styles.css',
	], './static/build/css/vendor.css');

	mix.scripts([
		'./node_modules/jquery/dist/jquery.js',
		'./assets/flatly/js/bootstrap.js',
        './node_modules/izitoast/dist/js/iziToast.js',
        './node_modules/jquery.easing/jquery.easing.js',
        './src/utils/notifications.js',
		'./static/build/js/agency.js',
        './node_modules/swiper/dist/js/swiper.js',

	], './static/build/js/vendor.js');

    mix.copy('node_modules/font-awesome/fonts', './static/build/fonts');

});
