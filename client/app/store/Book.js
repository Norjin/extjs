Ext.define('App.store.Book',  {
  extend: 'Ext.data.Store',
  model:  'App.model.Main',
  id: 'bookstore',
  autoLoad: true,
  proxy: {
    type: 'rest',
    url: '/v1/books',
    reader: {
      type: 'json',
      rootProperty: 'books'
    },
    writer:{
      type: 'json'
    }
  }
});
