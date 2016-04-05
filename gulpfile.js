var elixir = require('laravel-elixir');
require('laravel-elixir-livereload');

elixir.config.sourcemaps = false;

elixir(function(mix) {
    mix
        .sass('./src/fire-select.scss', './example/fire-select.css')
        .browserify('./src/fire-select.js', './example/fire-select.js')

        .livereload([
            './src/fire-select.css',
            './src/fire-select.js',
            './example/index.html',
        ]);
});
