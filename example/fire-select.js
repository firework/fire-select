(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
module.exports = '<div\n    class="fire-select-box"\n    :class="{\n        \'multiple\': multiple,\n    }"\n    @click="open()"\n>\n    <ul class="fire-selected-list">\n        <li class="fire-selected-item empty" v-show="selected.length == 0">{{ placeholder }}</li>\n        <li class="fire-selected-item"\n            :class="{\n                \'animated\': animation\n            }"\n            :transition="animation ? \'bounce\' : \'\'"\n            v-for="option in selected"\n            @click.stop="multiple ? deselect(option) : open()"\n        >\n            {{ option.label }} <b @click.stop="deselect(option)">&times;</b>\n        </li>\n    </ul>\n\n    <ul class="fire-select-list" v-show="isOpen" transition="bounce">\n        <li class="fire-select-item-input">\n            <input\n                type="text"\n                class="fire-select-input"\n                :placeholder="helperMessage"\n                v-model="input"\n                v-el:input\n                @keyup.enter="index === null || index == -1 ? newOption() : select(index)"\n                @keydown.esc="close()"\n                @keydown.up.prevent="up()"\n                @keydown.down.prevent="down()"\n                @blur="close() | debounce 100"\n            >\n        </li>\n\n        <li class="fire-select-item"\n            v-if="input && create"\n            @click="newOption()"\n            :class="{\n                \'hover\': index == -1,\n            }"\n        >\n            {{ pressEnterLabel }} <b>{{ input }}</b>\n        </li>\n\n        <li class="fire-select-item" v-if="tips.length == 0 && ! create">\n            {{ noResultsLabel }} <b>{{ input }}</b>\n        </li>\n\n        <li\n            class="fire-select-item"\n            v-for="option in tips"\n            @click.stop="select(option)"\n            @mouseover="index = null"\n            :class="{\n                \'hover\': $index == index,\n            }"\n        >\n            {{{ option.label | highlight }}}\n        </li>\n    </ul>\n\n    <select :name="name" :id="id" multiple style="display: none;">\n        <option :value="option.value" selected v-for="option in selected">{{ option.label }}</option>\n    </select>\n</div>\n';
},{}],2:[function(require,module,exports){
'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

Vue.component('fire-select', {
    template: require('./fire-select.html'),

    props: {
        options: {
            type: Array,
            default: []
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
            default: function _default() {
                return this.multiple ? 'Select some items' : 'Select an item';
            }
        },

        pressEnterLabel: {
            type: String,
            default: 'Press enter to add:'
        },

        noResultsLabel: {
            type: String,
            default: 'No results found for:'
        },

        animation: {
            type: Boolean,
            default: true
        }
    },

    data: function data() {
        return {
            options_: [],
            input: '',
            index: null,
            isOpen: false,
            isPopulating: false,
            skipClose: false
        };
    },

    transitions: {
        'bounce': {
            enterClass: 'fs-bounceIn',
            leaveClass: 'fs-hidden'
        }
    },

    computed: {
        tips: function tips() {
            return this.options_.filter(function (option) {
                return option.tip === true && option.selected === false;
            });
        },

        selected: function selected() {
            return this.options_.filter(function (option) {
                return option.selected === true;
            });
        }
    },

    watch: {
        'input': function input(val) {
            this.index = null;

            this.options_.forEach(function (option) {
                var label = option.label.toLowerCase(),
                    value = val.toLowerCase();

                option.tip = val.length ? label.indexOf(value) != -1 : true;
            });
        },

        'options': {
            handler: function handler() {
                this.populate();
            },
            deep: true
        }
    },

    filters: {
        highlight: function highlight(value) {
            return this.input.length ? value.replace(new RegExp('(' + this.input + ')', 'g'), '<b>$1</b>') : value;
        }
    },

    methods: {
        populate: function populate() {
            this.options_ = [];
            this.index = null;
            this.isPopulating = true;

            this.options.forEach(function (option, index) {
                if (typeof option == 'string') {
                    this.addOption(index, option, false, true);
                } else {
                    this.addOption(option.value, option.label, option.selected, true);
                }
            }.bind(this));

            this.isPopulating = false;
        },

        addOption: function addOption(value, label, selected, tip) {
            var option = {
                value: value,
                label: label,
                selected: false,
                tip: !!tip
            };

            if (this.options_.filter(function (item_) {
                return item_.value == value && item_.label == label;
            }).length === 0) {
                this.options_.$set(this.options_.length, option);
                if (!this.isPopulating) this.$dispatch('fsOptionAdded', Vue.util.extend({}, option));
                if (!!selected) this.select(option);
            }
        },

        newOption: function newOption() {
            if (!this.create) return;

            var text = this.input.trim();

            if (!text) return;

            this.singleDeselect();
            this.addOption(text, text, true, true, true);
            this.input = '';
        },

        select: function select(option) {
            // get a option by this.index
            if ((typeof option === 'undefined' ? 'undefined' : _typeof(option)) != 'object') {
                option = this.tips[this.index];
                this.index = null;
            }

            this.singleDeselect();

            option.selected = true;
            if (!this.isPopulating) this.$dispatch('fsOptionSelected', Vue.util.extend({}, option));

            if (this.multiple) {
                this.skipClose = true;
                if (this.isOpen) this.$els.input.focus();
            } else {
                if (this.isOpen) this.close();
            }
        },

        deselect: function deselect(option) {
            option.selected = false;
            if (!this.isPopulating) this.$dispatch('fsOptionDeselect', Vue.util.extend({}, option));
        },

        singleDeselect: function singleDeselect() {
            if (!this.multiple && this.selected.length) this.deselect(this.selected[0]);
            this.input = '';
        },

        up: function up() {
            if (this.index !== null && this.index > -1) {
                this.index--;
            } else {
                this.index = this.tips.length - 1;
            }
        },

        down: function down() {
            if (this.index !== null && this.index < this.tips.length - 1) {
                this.index++;
            } else {
                this.index = this.input ? -1 : 0;
            }
        },

        open: function open() {
            this.isOpen = true;

            this.$nextTick(function () {
                this.$els.input.focus();
            }.bind(this));
        },

        close: function close() {
            if (this.skipClose === true) {
                this.skipClose = false;
                return;
            }

            this.isOpen = false;
        }
    },

    created: function created() {
        this.populate();
    }
});

},{"./fire-select.html":1}]},{},[2]);
