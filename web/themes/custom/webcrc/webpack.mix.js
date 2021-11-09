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
 mix.copy('node_modules/@fortawesome/fontawesome-free/webfonts', 'assets/webfonts')
      .copy('node_modules/material-design-icons-iconfont/dist/fonts/', 'assets/material-iconfont')
      .copy('node_modules/blazy/blazy.min.js', '../../../libraries/blazy/blazy.js')
      .copy('node_modules/jquery-ui-touch-punch/jquery.ui.touch-punch.min.js', '../../../libraries/jquery-ui-touch-punch/jquery.ui.touch-punch.min.js')
      .copy('node_modules/dropzone/', '../../../libraries/dropzone/')
      .copy('node_modules/slick-carousel/slick/slick.css', '../../../libraries/slick/slick/slick.css')
      .copy('node_modules/slick-carousel/slick/slick.min.js', '../../../libraries/slick/slick/slick.min.js')
      .copy('node_modules/slick-carousel/slick/slick-theme.css', '../../../libraries/slick/slick/slick-theme.css')
      .copy('node_modules/slick-carousel/slick/ajax-loader.gif', '../../../libraries/slick/slick/ajax-loader.gif')
      .copy('node_modules/slick-carousel/slick/fonts/', '../../../libraries/slick/slick/fonts/')
      .copy('node_modules/a11y-accordion-tabs/a11y-accordion-tabs.min.js', '../../../libraries/a11y-accordion-tabs/a11y-accordion-tabs.js')
      .copy('node_modules/d3/dist/d3.min.js', '../../../libraries/d3/d3.js')
      .copy('node_modules/highlight.js/', '../../../libraries/highlight.js/')
      .copy('src/extra_libraries/superfish/', '../../../libraries/superfish/')
      .copy('src/extra_libraries/ckeditor/templates/', '../../../libraries/templates/');

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
