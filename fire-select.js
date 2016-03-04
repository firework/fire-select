Vue.component('fire-select', {
    template: '#fire-select-template',

    props: ['items', 'multiple'],

    data: function() {
        return {
            input: '',
            active: null,
            listWidth: 0,
            wrapperWidth: 0,
            opened: false,
        }
    },

    computed: {
        tips: function() {
            return this.items.filter(function(item) { return item.tip == true && item.selected == false; });
        },

        selected: function() {
            return this.items.filter(function(item) { return item.selected == true; });
        },
    },

    watch: {
        'input': function (val) {
            this.items.forEach(function(item) {
                item.tip = val.length > 0 && item.value.indexOf(val) != -1;
            });
        },

        'items': {
            handler: function() {
                Vue.nextTick(function () {
                    this.listWidth = this.$els.list.offsetWidth;
                }.bind(this));
            },
            deep: true
        }
    },

    filters: {
        highlight: function(value) {
            return value.replace(new RegExp('('+this.input+')', 'g'), '<strong>$1</strong>');
        }
    },

    methods: {
        open: function() {
            if (this.multiple || this.selected.length == 0) {
                this.opened = true;
            }
        },

        isOpen: function() {
            return this.opened;
        },

        newItem: function() {
            if (! this.multiple && this.selected.length >= 1) return;

            var text = this.input.trim();

            if (! text) return;

            this.addItem(text, text, true, false, true)
            this.input = '';
        },

        addItem: function(key, value, selected, tip, dispatch) {
            // if (! this.multiple && this.selected.length > 0) return;

            var item = {
                key: key,
                value: value,
                selected: !! selected,
                tip: !! tip,
            };

            if (this.items.filter(function(item) {
                return item.key == key && item.value == value;
            }).length == 0) {
                this.items.push(item);

                if (dispatch) {
                    this.$dispatch('fsItemAdded', item);
                    this.$dispatch('fsItemSelected', item);
                }
            }
        },

        select: function(item) {
            item.selected = true;
            this.opened = false;
            this.$dispatch('fsItemSelected', item);
        },

        deselect: function(item) {
            item.selected = false;
            this.$dispatch('fsItemDeselect', item);
        },

        getInputWidth: function() {
            var width = this.wrapperWidth - this.listWidth - 1;

            return width > 300 ? width + 'px' : '100%';
        }
    },

    created: function() {
        var items = this.items;

        this.items = [];

        items.forEach(function(item, index) {
            if (typeof item == 'string') {
                this.addItem(index, item, false, ! this.multiple);
            } else {
                this.addItem(item.key, item.value, item.selected, ! this.multiple)
            }
        }.bind(this));

        Vue.nextTick(function () {
            this.wrapperWidth = this.$els.wrapper.clientWidth;
        }.bind(this));
    }
});