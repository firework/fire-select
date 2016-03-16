Vue.component('fire-select', {
    template: '#fire-select-template',

    props: {
        items: {
            type: Array,
            default: [],
        },

        multiple: {
            type: Boolean,
            default: false
        },

        create: {
            type: Boolean,
            default: false
        },

        name: {
            type: String,
            default: 'fire-select[]'
        },

        id: {
            type: String,
            default: 'fire-select'
        },

        helperMessage: {
            type: String,
            default: 'Type anything to search'
        },

        placeholder: {
            type: String
        },

        animation: {
            type: Boolean,
            default: true
        }
    },

    data: function() {
        return {
            items_: [],
            input: '',
            index: null,
            isOpen: false,
            isPopulating: false,
            skipClose: false,
        }
    },

    transitions: {
        'bounce': {
            enterClass: 'fs-bounceIn',
            leaveClass: 'fs-hidden'
        },
    },

    computed: {
        tips: function() {
            return this.items_.filter(function(item) { return item.tip == true && item.selected == false; });
        },

        selected: function() {
            return this.items_.filter(function(item) { return item.selected == true; });
        },
    },

    watch: {
        'input': function (val) {
            this.index = null;

            this.items_.forEach(function(item) {
                item.tip = val.length ? item.value.indexOf(val) != -1 : true;
            });
        },

        'items': {
            handler: function() {
                this.populate();
            },
            deep: true
        }
    },

    filters: {
        highlight: function(value) {
            return this.input.length
                ? value.replace(new RegExp('('+this.input+')', 'g'), '<b>$1</b>')
                : value;
        }
    },

    methods: {
        populate: function() {
            this.index = null;
            this.isPopulating = true;

            this.items.forEach(function(item, index) {
                if (typeof item == 'string') {
                    this.addItem(index, item, false, true);
                } else {
                    this.addItem(item.key, item.value, item.selected, true);
                }
            }.bind(this));

            this.isPopulating = false;
        },

        addItem: function(key, value, selected, tip) {
            var item = {
                key: key,
                value: value,
                selected: false,
                tip: !! tip,
            };

            if (this.items_.filter(function(item_) {
                return item_.key == key && item_.value == value;
            }).length == 0) {
                this.items_.$set(this.items_.length, item);
                if (! this.isPopulating) this.$dispatch('fsItemAdded', Vue.util.extend({}, item));
                if (!! selected) this.select(item);
            }
        },

        newItem: function() {
            if (! this.create) return;

            var text = this.input.trim();

            if (! text) return;

            this.singleDeselect();
            this.addItem(text, text, true, true, true);
            this.input = '';
        },

        select: function(item) {
            // get a item by this.index
            if (typeof item != 'object') {
                item = this.tips[this.index];
                this.index = null;
            };

            this.singleDeselect();

            item.selected = true;
            if (! this.isPopulating) this.$dispatch('fsItemSelected', Vue.util.extend({}, item));

            if (this.multiple) {
                this.skipClose = true;
                if (this.isOpen) this.$els.input.focus();
            } else {
                if (this.isOpen) this.close();
            }
        },

        deselect: function(item) {
            item.selected = false;
            if (! this.isPopulating) this.$dispatch('fsItemDeselect', Vue.util.extend({}, item));
        },

        singleDeselect: function() {
            if (! this.multiple && this.selected.length) this.deselect(this.selected[0]);
        },

        up: function() {
            if (this.index !== null && this.index > 0) {
                this.index--;
            } else {
                this.index = this.tips.length - 1;
            }
        },

        down: function() {
            if (this.index !== null && this.index < (this.tips.length - 1)) {
                this.index++;
            } else {
                this.index = 0;
            }
        },

        open: function() {
            this.isOpen = true;

            this.$nextTick(function () {
                this.$els.input.focus();
            }.bind(this));
        },

        close: function() {
            if (this.skipClose === true) {
                this.skipClose = false;
                return;
            }

            this.isOpen = false;
        },
    },

    created: function() {
        // set default value to placeholder
        this.placeholder = this.placeholder || (this.multiple ? 'Select some items' : 'Select an item');

        // populate the items_
        this.populate();
    }
});
