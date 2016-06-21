var elixir = require('laravel-elixir');
require('laravel-elixir-browserify-official');

elixir.config.sourcemaps = false;

elixir(function(mix) {
    mix
        .sass('./src/fire-select.scss', './dist/fire-select.css')
        .browserify('./src/fire-select.js', './dist/fire-select.js')
    ;
});
