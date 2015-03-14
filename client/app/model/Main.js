Ext.define('App.model.Main', {
  extend: 'Ext.data.Model',
  alias: 'bookModel',
  fields: [
    {name: 'id', type: 'integer'},
    {name: 'bookTitle', type: 'string'},
    {name: 'author', convert: function(value) {
      return value;
    }},
    {name: 'bookISBN', type: 'string'},
    {name: 'bookDescription', type: 'string'},
    {name: 'published', type: 'string'},
    {name: 'price', type: 'integer'},
    {name: 'number', type: 'integer'},
    {name: 'created_at', type: 'date'}
  ]
});
