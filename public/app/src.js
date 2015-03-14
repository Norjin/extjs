Ext.define('App.view.main.Main', {
  extend: 'Ext.container.Container',

  xtype: 'app-main',

  controller: 'main',
  viewModel: {
    type: 'main'
  },

  layout: {
    type: 'border'
  },

  items: [{
    xtype: 'panel',
    bind: {
      title: '{name}'
    },
    region: 'west',
    html: '<ul><li>This area is commonly used for navigation, for example, using a "tree" component.</li></ul>',
    width: 250,
    split: true,
    tbar: [{
      text: 'Button',
      handler: 'onClickButton'
    }]
  },
  {
    region: 'center',
    xtype: 'tabpanel',
    items:[{
      title: 'Tab 1',
      html: '<h2>Content appropriate for the current navigation.</h2>'
    }]
  }]
});

/**
 * This class is the main view for the application. It is specified in app.js as the
 * "autoCreateViewport" property. That setting automatically applies the "viewport"
 * plugin to promote that instance of this class to the body element.
 *
 * TODO - Replace this content of this view to suite the needs of your application.
 */
Ext.define('App.view.main.MainController', {
  extend: 'Ext.app.ViewController',

  requires: [
    'Ext.MessageBox'
  ],

  alias: 'controller.main',

  onClickButton: function() {
    Ext.Ajax.request({
      url: 'http://google.com',

      success: function(response) {
        console.log(response);
      },

      failure: function(response) {
        console.log(response);
      }
    });
  },

  onConfirm: function() {
  }
});

/**
 * This class is the view model for the Main view of the application.
 */
Ext.define('App.view.main.MainModel', {
  extend: 'Ext.app.ViewModel',

  alias: 'viewmodel.main',

  data: {
    name: 'test'
  }
  //TODO - add data, formulas and/or methods to support your view
});
