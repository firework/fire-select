# 🔥_Fireselect_
Vue component that transforms overwhelming <select> boxes into something fancy, simple and user-friendly.  
It is similar to Selectize, Chosen, Select2, etc. However it was built using Vue.js only ;)

## Options
*name* | *type* | *default*  

- **items** | *Array* | []  
    An array of the initial available options.  

- **multiple** | *Boolean* | false  
    Equivalent to the <select multiple> attribute.  

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


## Events
[Vue.js - Dispatch](http://vuejs.org/api/#vm-dispatch)

- **fsItemAdded**
When a new item is added.

- **fsItemSelected**
When a item is selected.

- **fsItemDeselect**
When a item is deselected.

```js
export default {
  events: {
        fsItemAdded: function(item) {
            // do something
        },
        ...
    }
}
```

