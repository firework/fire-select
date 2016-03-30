# 🔥_Fireselect_

Vue component that transforms overwhelming `select` boxes into something fancy, simple and user-friendly.

It is similar to Selectize, Chosen, Select2, etc. However it was built using Vue.js only ;)

## Options
*name* | *type* | *default*  

- **options** | *Array* | []  
    An array of the initial available options.  

- **multiple** | *Boolean* | false  
    Equivalent to the `select multiple` attribute.  

- **create** | *Boolean* | false  
    Allows the creation of new items that aren't in the list of options.    

- **placeholder** | *String* | 'Type anything to search'  
    Placeholder attribute of input.  

- **empty-message** | *String* | 'Select an item'  
    Placeholder text displayed before an option is selected.

- **animation** | *Boolean* | true  
    Show animation when item is selected  

- **name** | *String* | fire-select[]  
    Name attribute of input  

- **id** | *String* | fire-select  
    Id attribute of input

## Usage
```html
<!-- Import -->
<link rel="stylesheet" href="../src/fire-select.css">
..
<script src="http://cdnjs.cloudflare.com/ajax/libs/vue/1.0.20/vue.min.js"></script>
<script src="../src/fire-select.js"></script>

<!-- Import fire-select template ../src/fireselect.html -->
<template id="fire-select-template">
....
</template>

<!-- Use fire-select componenet -->
<fire-select :options="options"></fire-select>

```

### Options
```javascript
var obj = [
    {value: 'html', label: 'HyperText Markup Language', selected: true},
    {value: 'css', label: 'Cascading Style Sheets'},
    {value: 'js', label: 'Javascript'},
];

var arr = ['HyperText Markup Language', 'Cascading Style Sheets', 'Javascript'];
```

## Events
[Vue.js - Dispatch](http://vuejs.org/api/#vm-dispatch)

- **fsOptionAdded**
When a new item is added.

- **fsOptionSelected**
When a item is selected.

- **fsOptionDeselect**
When a item is deselected.

```js
new Vue({
  ...
  events: {
    fsOptionAdded: function(option) {
      // do something
    }
  }
}
```
