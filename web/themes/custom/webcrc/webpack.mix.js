/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your application. See https://github.com/JeffreyWay/laravel-mix.
 |
 */
const proxy = 'http://drupal.local';
const mix = require('laravel-mix');

/*
 |--------------------------------------------------------------------------
 | Configuration
 |--------------------------------------------------------------------------
 */
mix
  .setPublicPath('assets')
  .disableNotifications()
  .options({
    processCssUrls: false
  });

/*
 |--------------------------------------------------------------------------
 | Browsersync
 |--------------------------------------------------------------------------
 */
mix.browserSync({
  proxy: proxy,
  files: ['assets/js/**/*.js', 'assets/css/**/*.css'],
  stream: true,
});

/*
 |--------------------------------------------------------------------------
 | COPY FILES
 |--------------------------------------------------------------------------
 */
 mix.copy('node_modules/blazy/blazy.min.js', '../../../libraries/blazy/blazy.js')
      .copy('node_modules/jquery-ui-touch-punch/jquery.ui.touch-punch.min.js', '../../../libraries/jquery-ui-touch-punch/jquery.ui.touch-punch.min.js')
      .copy('node_modules/dropzone/', '../../../libraries/dropzone/')
      .copy('node_modules/slick-carousel/slick/slick.css', '../../../libraries/slick/slick/slick.css')
      .copy('node_modules/slick-carousel/slick/slick.min.js', '../../../libraries/slick/slick/slick.min.js')
      .copy('src/extra_libraries/superfish/', '../../../libraries/superfish/');

/*
 |--------------------------------------------------------------------------
 | SASS
 |--------------------------------------------------------------------------
 */
mix.sass('src/sass/webcrc.style.scss', 'css');

/*
 |--------------------------------------------------------------------------
 | JS
 |--------------------------------------------------------------------------
 */
mix.js('src/js/webcrc.script.js', 'js');
