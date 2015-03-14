Ext.application({
  name: 'App',

  autoCreateViewport: 'App.view.main.Main',
  stores: [

    'Book',
    'Author',
    'List'
      // TODO: add global / shared stores here
  ],

  launch: function() {

  }
});
