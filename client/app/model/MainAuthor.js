Ext.define('App.model.MainAuthor', {
  extend: 'Ext.data.Model',
  alias: 'authorModel',
  fields: [
    {name: 'id', type: 'integer'},
    {name: 'name', type: 'string'},
    {name: 'surname', type: 'string'},
    {name: 'born', type: 'string'},
    {name: 'dead', type: 'string'},
    {name: 'addedBy', type: 'string'},
    {name: 'created_at', type: 'date'},
    {name: 'updated_at', type: 'date'},
  ],
  hasMany: {model: 'App.model.Main', name: 'books'}
});
