Ext.define('App.store.Author',  {
  extend: 'Ext.data.Store',
  model:  'App.model.MainAuthor',
  //id: 'bookstore',
  remoteFilter: true,
  proxy: {
    type: 'rest',
    url: '/v1/authors',
    reader: {
      type: 'json',
      rootProperty: 'authors'
    },
    writer:{
      type: 'json'
    }
  }
});
