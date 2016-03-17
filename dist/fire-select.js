Vue.component('fire-select', {
    template: '#fire-select-template',

    props: {
        options: {
            type: Array,
            default: [],
        },

        multiple: {
            type: Boolean,
            default: false
        },

        create: {
            type: Boolean,
            default: true
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
            type: String,
            default: function () {
                return this.multiple ? 'Select some items' : 'Select an item';
            }
        },

        animation: {
            type: Boolean,
            default: true
        }
    },

    data: function() {
        return {
            options_: [],
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
            return this.options_.filter(function(option) { return option.tip == true && option.selected == false; });
        },

        selected: function() {
            return this.options_.filter(function(option) { return option.selected == true; });
        },
    },

    watch: {
        'input': function (val) {
            this.index = null;

            this.options_.forEach(function(option) {
                var label = option.label.toLowerCase(),
                    value = val.toLowerCase();

                option.tip = val.length ? label.indexOf(value) != -1 : true;
            });
        },

        'options': {
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
            this.options_ = [];
            this.index = null;
            this.isPopulating = true;

            this.options.forEach(function(option, index) {
                if (typeof option == 'string') {
                    this.addOption(index, option, false, true);
                } else {
                    this.addOption(option.value, option.label, option.selected, true);
                }
            }.bind(this));

            this.isPopulating = false;
        },

        addOption: function(value, label, selected, tip) {
            var option = {
                value: value,
                label: label,
                selected: false,
                tip: !! tip,
            };

            if (this.options_.filter(function(item_) {
                return item_.value == value && item_.label == label;
            }).length == 0) {
                this.options_.$set(this.options_.length, option);
                if (! this.isPopulating) this.$dispatch('fsOptionAdded', Vue.util.extend({}, option));
                if (!! selected) this.select(option);
            }
        },

        newOption: function() {
            if (! this.create) return;

            var text = this.input.trim();

            if (! text) return;

            this.singleDeselect();
            this.addOption(text, text, true, true, true);
            this.input = '';
        },

        select: function(option) {
            // get a option by this.index
            if (typeof option != 'object') {
                option = this.tips[this.index];
                this.index = null;
            };

            this.singleDeselect();

            option.selected = true;
            if (! this.isPopulating) this.$dispatch('fsOptionSelected', Vue.util.extend({}, option));

            if (this.multiple) {
                this.skipClose = true;
                if (this.isOpen) this.$els.input.focus();
            } else {
                if (this.isOpen) this.close();
            }
        },

        deselect: function(option) {
            option.selected = false;
            if (! this.isPopulating) this.$dispatch('fsOptionDeselect', Vue.util.extend({}, option));
        },

        singleDeselect: function() {
            if (! this.multiple && this.selected.length) this.deselect(this.selected[0]);
            this.input = '';
        },

        up: function() {
            if (this.index !== null && this.index > -1) {
                this.index--;
            } else {
                this.index = this.tips.length - 1;
            }
        },

        down: function() {
            if (this.index !== null && this.index < (this.tips.length - 1)) {
                this.index++;
            } else {
                this.index = this.input ? -1 : 0;
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
        this.populate();
    }
});
