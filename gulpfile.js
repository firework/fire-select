var elixir = require('laravel-elixir');
require('laravel-elixir-livereload');

elixir(function(mix) {
    mix.sass('./fire-select.scss', './fire-select.css');
    mix.livereload([
        'fire-select.css',
        'fire-select.js',
        'index.html',
    ]);
});
