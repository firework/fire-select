var elixir = require('laravel-elixir');
require('laravel-elixir-livereload');

elixir.config.sourcemaps = false;

elixir(function(mix) {
    mix.sass('./src/fire-select.scss', './dist/fire-select.css');
    mix.copy('./src/fire-select.js', './dist/fire-select.js');
    mix.copy('./src/fire-select.html', './dist/fire-select.html');

    mix.livereload([
        './dist/*'
    ]);
});
