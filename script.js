var obj = [
    {value: 'html', label: 'HyperText Markup Language'},
    {value: 'css', label: 'Cascading Style Sheets'},
    {value: 'js', label: 'Javascript'},
];

var arr = ['HyperText Markup Language', 'Cascading Style Sheets', 'Javascript'];

var vm = new Vue({
    el: 'body',

    data: {
        languagesObj: obj,
        languages: arr,
        options: 'object',
        multiple: false,
        create: true,
        animation: true,
        helperMessage: 'Type anything to search',
        placeholder: 'Select an item',
        addLabel: 'Add:',
        noResultsLabel: 'No results found for:',
    },

    events: {
        fsOptionAdded: function(option) {
            console.log('fire-select option added:', option);
        },

        fsOptionSelected: function(option) {
            console.log('fire-select option selected:', option);
        },

        fsOptionDeselect: function(option) {
            console.log('fire-select option deselected:', option);
        },
    }
});
