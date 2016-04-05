var elixir = require('laravel-elixir');
require('laravel-elixir-livereload');

elixir.config.sourcemaps = false;

elixir(function(mix) {
    mix
        .sass('./src/fire-select.scss', './dist/fire-select.css')
        .browserify('./src/fire-select.js', './dist/fire-select.js')

        .livereload([
            './dist/fire-select.css',
            './dist/fire-select.js',
            './example/index.html',
            './example/script.js',
        ]);
});
