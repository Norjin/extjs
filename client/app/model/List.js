Ext.define('App.model.List', {
  extend: 'Ext.data.Model',
  fields: [
    {name: 'id', type: 'integer'},
    {name: 'bookTitle', type: 'string'},
    {name: 'published', type: 'date'},
    {name: 'price', type: 'integer'},
    {name: 'selnumber', type: 'integer'},
    {name: 'sumPrice', type: 'integer'}
  ]
});
