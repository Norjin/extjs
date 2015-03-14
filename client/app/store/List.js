Ext.define('App.store.List',  {
  extend: 'Ext.data.Store',
  model:  'App.model.List',
  id: 'liststore',
  proxy: {
    type: 'memory',
  //url: '/v1/books',
    reader: {
      type: 'json',
      rootProperty: 'books'
    },
    writer:{
      type: 'json'
    }
  }
});
