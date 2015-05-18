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

Ext.define('App.model.Person', {
  extend: 'Ext.data.Model',
  idProperty: 'id',
  schema: {
    namespace: 'App.model'
  },
  fields: ['id', 'fname', 'lname', 'age',
  { name: 'name', type: 'string',
    calculate: function(v){
      var val = (v.fname && v.lname) ? v.fname + ' ' + v.lname : v.fname || v.lname;
      return val;
    }
  }]
});

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

/**
 * This class is form for adding book
 */
Ext.define('App.view.add.Add', {
  extend: 'Ext.form.FormPanel',
  title: 'Ном нэмэх',
  width: 650,
  cls: 'addPanel',
  jsonSubmit: true,
  id: 'addform',
  floating: true,
  bodyPadding: 5,
  reference: 'addForm',
  //  parent: Ext.getBody(),
  closable:true,
  url: 'v1/books',
  autoHeight: true,
  draggable:true,
  //   renderTo:Ext.getBody(),
  defaultType: 'textfield',
  items: [{
    fieldLabel: 'Номны Нэр',
    name: 'bookTitle',
    allowBlank: false
  },
  {
    fieldLabel: 'Зохиолчын Нэр',
    xtype: 'combobox',
    store: 'Author',
    name: 'author',
    allowBlank: false,
    displayField: 'name'
  },
  {
    fieldLabel: 'ISBN',
    name: 'bookISBN',
    allowBlank: false
  },
  {
    fieldLabel: 'Агуулга',
    xtype: 'textareafield',
    name: 'bookDescription',
    allowBlank: false
  },
  {
    fieldLabel: 'Хэвлэгдсэн Огноо',
    name: 'published',
    xtype: 'datefield',
    format: 'd/m/y',
    allowBlank: false
  },
  {
    fieldLabel: 'Үнэ',
    name: 'price',
    xtype: 'numberfield',
    minvalue: 0,
    hideTrigger: true,
    keyNavEnabled: false,
    mouseWheelEnabled: false,
    allowBlank: false
  },
  {
    fieldLabel: 'Тоо',
    name: 'number',
    xtype: 'numberfield',
    minvalue: 0,
    hideTrigger: true,
    keyNavEnabled: false,
    mouseWheelEnabled: false,
    allowBlank: false
  }
],
buttons: [
  {
    text: 'Save',
    formBind: true,
    disabled: true,
    handler: 'addBookSaveBtn'
  }]
});

Ext.define('App.view.edit.Edit', {
  extend: 'Ext.form.FormPanel',
  xtype: 'app.center.edit',
  itemId: 'formEdit',
  id: 'editForm',
  title: 'Ном засах',
  width: 650,
  cls: 'editPanel',
  jsonSubmit: true,
  floating:true,
  bodyPadding: 5,
 // parent: Ext.getBody(),
  closable:true,
 // url: 'v1/books',
  autoHeight: true,
  draggable:true,
  controller: 'edit',
  //renderTo:Ext.getBody(),
  defaultType: 'textfield',
  items: [
    {
      fieldLabel: 'Үнэ',
      name: 'price',
      xtype: 'numberfield',
      minvalue: 0,
      hideTrigger: true,
      itemId: 'priceField',
      keyNavEnabled: false,
      mouseWheelEnabled: false,
      allowBlank: false
    },
    {
      fieldLabel: 'Тоо',
      itemId: 'numField',
      name: 'number',
      xtype: 'numberfield',
      minvalue: 0,
      hideTrigger: true,
      keyNavEnabled: false,
      mouseWheelEnabled: false,
      allowBlank: false
    }
  ],
  buttons: [
    {
      text: 'Update',
      xtype: 'button',
      itemId: 'upButton',
      formBind: true,
      disabled: true,
      handler: 'onUpdateClick',
    }]
  });

Ext.define('App.view.edit.EditController', {
  extend: 'Ext.app.ViewController',

  alias: 'controller.edit',

  /**
   * @event onUpdateClick
   * Хэрэглэгч edit форм дээр дарсан утгуудыг аван датабааздаа нэмдэг.
   */
  onUpdateClick: function(btn) {
    var price = btn.up('form').getForm().findField('price').getValue();
    var number = btn.up('form').getForm().findField('number').getValue();
    var record = btn.up('form').getForm().getRecord();
    var store = Ext.getStore('Book');
    record.set('price', price);
    record.set('number', number);
    store.sync();
    Ext.getCmp('editForm').close();
  },
});

/**
 * This class is the view model for the Main view of the application.
 */
Ext.define('App.view.edit.EditModel', {
  extend: 'Ext.app.ViewModel',

  alias: 'viewmodel.edit',

  data: {
    name: 'Номнууд'
  }
  //TODO - add data, formulas and/or methods to support your view
});

/**
 * Зүүн талд байрлах жижиг хүснэгт
 * энд үндсэн хүснэгтээс хэрэглэгч дарсан мөр орж ирнэ.
 */
Ext.define('App.view.form.smallGrid', {
  extend: 'Ext.grid.Panel',
  xtype: 'app.view.smallGrid',
  title: 'Зарах номын жагсаалт',
  controller: 'small',
  autoScroll: true,
  store: 'List',
  id: 'listGrid',
  scroll: true,
  features: [{
    ftype: 'summary'
  }],
  columns: [
    {header: 'Номын нэр', text: 'Номын нэр',  dataIndex: 'bookTitle', flex: 1},
    {header: 'Үнэ' , text: 'Үнэ',  dataIndex: 'price'},
    {header: 'Тоо' , text: 'Тоо',  dataIndex: 'selnumber',
      editor: {xtype: 'textfield'}
    },
    {header: 'Нийлбэр', dataIndex: 'sumPrice', summaryType: 'sum',
      summaryRenderer: function(value) {
        return 'Нийт дүн: ' + value;
      }
    },
  ],
  listeners: {
    /**
     * @event rowclick
     * Хэрэглэгч аль нэгэн мөрөн дээр дарахад үндсэн хүснэгтэнд өөрчлөлт орно.
     * @markdown {@link App.view.form.smallGridController#addToMainPanel method} дуудагдаж байна.
     */
    'rowclick': 'addToMainPanel'
  }
});

/**
 * Зарах номны жагсаалт гаргадаг grid ын controller
 */
Ext.define('App.view.form.smallGridController', {
  extend: 'Ext.app.ViewController',

  alias: 'controller.small',
  /**
   * @method addToMainPanel
   * Үндсэн грид рүү шилжүүлдэг. method
   */
  addToMainPanel: function(table, rec) {
    var selected = rec.get('selnumber');
    var mainGrid = Ext.getCmp('mainGrid');
    var availnum = rec.get('number');
    if (selected > 0) {
      selected--;
      availnum++;
      rec.set('selnumber', selected);
      rec.set('number', availnum);
      var price = rec.get('price');
      price *= selected;
      rec.set('sumPrice', price);
      rec.commit();
      mainGrid.getStore().sync();
    }
    else {
      var listGrid = Ext.getCmp('listGrid');
      listGrid.getStore().remove(rec);
    }
  }

});

/** This is the _main grid_ that *shows book* records table
 * and __update__, **delete** buttons in the each row
 */
Ext.define('App.view.grid.MainGrid', {
  extend: 'Ext.grid.Panel',
  xtype: 'grid.mainGrid',
  title: 'Номын жагсаалт',
  //controller: 'mainGrid',
  autoScroll: true,
  reference: 'northSearch',
  store: 'Book',
  scroll: true,
  id:'mainGrid',
  stripeRows: true,
  columns: [
    {
      xtype:'actioncolumn',
      header: 'Action',
      items: [{
        header: 'Update',
        tooltip: 'Update',
        iconCls: 'editButton',
        handler: 'onEditClick'
      },
      {
        header: 'Delete',
        iconCls: 'delButton',
        tooltip: 'Delete',
        handler: 'deleteBtn'
      }]
    },
    {header: 'Номын нэр', text: 'Номын нэр',  dataIndex: 'bookTitle'},
    {header: 'Зохиолч', text: 'Зохиолч',  dataIndex: 'author', renderer: function(value) {
      return value.name;
    }},
    {header: 'ISBN', text: 'ISBN', dataIndex: 'bookISBN'},
    {header: 'Агуулга', text: 'Агуулга', dataIndex: 'bookDescription' , flex: 1},
    {header: 'Хэвлэгдсэн огноо' , text: 'Хэвлэгдсэн огноо',
    dataIndex: 'published', xtype: 'datecolumn', format: 'Y-M-D'},
    {header: 'Үнэ' , text: 'Үнэ',  dataIndex: 'price'},
    {header: 'Тоо' , text: 'Тоо',  dataIndex: 'number'},
    {header: 'Нэмсэн огноо' , text: 'Нэмсэн огноо',  dataIndex: 'created_at', xtype: 'datecolumn', format: 'Y-M-D'},
    {header: 'Зассан огноо' , text: 'Зассан огноо',  dataIndex: 'updated_at', xtype: 'datecolumn', format: 'Y-M-D'}
  ],
  /**
   * @event rowclick
   * @param table
   * @param rec
   * record of the row that user clicked on
   */
  listeners: {
    'rowclick': 'rowclick'
  }
});

/**
 * Зохиолч нэмдэг форм цонх <br />
 * @markdown {@link App.view.inserta.Insert#name click here}
 */
Ext.define('App.view.inserta.Insert', {
  extend: 'Ext.form.FormPanel',
  /** @cfg {String} xtype: нэр өгч байгаа хэсэг*/
  xtype: 'app.insert',
  itemId: 'formInsert',
  id: 'authorAdd',
  title: 'Author insert',
  reference: 'authorForm',
  width: 650,
  cls: 'insertPanel',
  jsonSubmit: true,
  floating:true,
  //@property {Integer} [name="default value"]
  bodyPadding: 5,
 // parent: Ext.getBody(),
  closable:true,
  url: 'v1/authors',
  autoHeight: true,
  draggable:true,
  controller: 'insert',
  //renderTo:Ext.getBody(),
  defaultType: 'textfield',
  items: [
    {
      fieldLabel: 'Author name:',
      name: 'name',
      xtype: 'textfield',
      allowBlank: false
    },
    {
      fieldLabel: 'Author surname:',
      name: 'surname',
      xtype: 'textfield',
      allowBlank: false
    },
    {
      fieldLabel: 'Born date:',
      name: 'born',
      xtype: 'datefield',
      format: 'd/m/y',
      allowBlank: false
    },
    {
      fieldLabel: 'Dead date:',
      name: 'dead',
      xtype: 'datefield',
      format: 'd/m/y',
      allowBlank: true
    },
    {
      fieldLabel: 'Added by:',
      name: 'addedBy',
      xtype: 'textfield',
      allowBlank: false
    }
  ],
  buttons: [
    {
      text: 'Insert',
      xtype: 'button',
      itemId: 'addButton',
      formBind: true,
      disabled: true,
      bodyPadding: 50,
      /**
       *@property handler
       * Зохиогч Нэмэх хэсгийг товчин дээр дарахад
       * {@link App.view.inserta.insertController#onInsertClick onInsertClick} method дуудагддаг.
       */
      handler: 'onInsertClick',
    }]
  });

/**
 * Зохиогч нэмдэг формын контроллер
 */
Ext.define('App.view.inserta.InsertController', {
  extend: 'Ext.app.ViewController',

  alias: 'controller.insert',

  /** @method onInsertClick
   * Форм дээрх утгуудыг авч модел, стор дээр нэмээд датабааз руу явуулдаг метод
   */
  onInsertClick: function(btn) {
    /*var price = btn.up('form').getForm().findField('price').getValue();
    var number = btn.up('form').getForm().findField('number').getValue();
    */
    if (btn.up('form').getForm().isValid()) {
      var form = btn.up('form').getForm();
      //btn.setPosition(10, 50, true);
      var store = Ext.getStore('Author');

      /*form.submit({
        success:function(form, action) {
          var json = Ext.util.JSON.decode(action.response.responseText);
          console.log(json.books);
         */
      var model = Ext.create('authorModel', form.getValues());
      store.insert(0, model);
      store.sync();
      Ext.getCmp('authorAdd').close();
      //}
    //})
    }
  }
});

Ext.define('App.view.inserta.InsertModel', {
  extend: 'Ext.app.ViewModel',

  alias: 'viewmodel.insert',

  data: {
    name: 'Authors'
  }
  //TODO - add data, formulas and/or methods to support your view
});

/**
 * This is the main class that contains all links and layout
 *
 */
Ext.define('App.view.main.Main', {
  extend: 'Ext.panel.Panel',
  alias: 'widget.main',
  controller: 'main',
  viewModel: {
    type: 'main'
  },
  layout: {
    type: 'hbox',
    align: 'stretch'
  },
  defaults: {
    flex: 1
  },
  items: [
    {
      xtype: 'container',
      layout: {
        type: 'vbox',
        align: 'stretch'
      },
      defaults: {
        flex: 1,
        margin: 5,
        border: true
      },
      items: [{
        xtype: 'persongrid',
        glyph: 0xf0ce
      }, {
        title: 'DataView',
        autoScroll: true,
        glyph: 0xf009,
        bind: {
          title: '<b>{currentPerson.name}</b>'
        },
        items: [{
          xtype: 'personview'
        }]
      }]
  },
  {
    xtype: 'container',
    layout: {
      type: 'vbox',
      align: 'stretch'
    },
    defaults: {
      flex: 1,
      margin: 5,
      border: true
    },
    items: [{
      title: 'Form',
      xtype: 'personform'
    },
    {
      title: 'Data Panel',
      xtype: 'personpanel'
    }]
  }]
});
// Ext.define('App.view.main.Main', {
//   extend: 'Ext.container.Container',
//   xtype: 'main',
//   controller: 'personmain',
//   viewModel: {
//     type: 'main'
//   },
//
//   layout: {
//     type: 'hbox',
//     align: 'stretch'
//     // type: 'border'
//   },
//   defaults: {
//     flex: 1
//   },
//
//   items: [
//     {
//       xtype: 'container',
//       layout: {
//         type: 'vbox',
//         align: 'stretch'
//       },
//       defaults: {
//         flex: 1,
//         margin: 5,
//         border: true
//       },
//       items: [{
//         xtype: 'persongrid',
//         glyph: 0xf0ce
//       }, {
//         title: 'DataView',
//         autoScroll: true,
//         glyph: 0xf009,
//         bind: {
//           title: '<b>{currentPerson.name}</b>'
//         },
//         items: [{
//           xtype: 'personview'
//         }]
//       }]
//   },
//   {
//     xtype: 'container',
//     layout: {
//       type: 'vbox',
//       align: 'stretch'
//     },
//     defaults: {
//       flex: 1,
//       margin: 5,
//       border: true
//     },
//     items: [{
//       title: 'Form',
//       xtype: 'personform'
//     },
//     {
//       title: 'Data Panel',
//       xtype: 'personpanel'
//     }]
//   }]
//   // items: [{
//   //   xtype: 'panel',
//   //   bind: {
//   //     title: '{name}'
//   //   },
//   //   region: 'east',
//   //   width: 400,
//   //   items: [{
//   //     #<{(|* @property xtype
//   //      * Зүүн талд байрлах хүснэгт
//   //      * @markdown {@link App.view.form.smallGrid Grid} дуудаж байна.
//   //      |)}>#
//   //     xtype: 'app.view.smallGrid'
//   //   },
//   //   {
//   //     #<{(|* @cfg tbar
//   //      *энэ товчин дээр дарахад
//   //      *@event bought
//   //      *@markdown {@link App.view.main.MainController#bought энэ method} дуудагдана.
//   //      |)}>#
//   //     tbar:[{
//   //       text: 'Зарагдсан >> ',
//   //       handler: 'bought'
//   //     }]
//   //   }]
//   // },
//   // {
//   //   region: 'west',
//   //   xtype: 'panel',
//   //   bodyPadding: 50,
//   //   collapsible: true,
//   //   collapsed: true,
//   //   title: 'Authors',
//   //   width: 350,
//   //   items: [{
//   //     xtype: 'combobox',
//   //     name: 'author',
//   //     store: 'Author',
//   //     fieldLabel: 'Author:',
//   //     displayField: 'name',
//   //     valueField: 'name'
//   //   },
//   //   {
//   //     xtype: 'button',
//   //     name: 'insert',
//   //     bodyPadding: 50,
//   //     scale: 'large',
//   //     text: 'Insert',
//   //     #<{(|* @method onInsertButtonClick
//   //      * шинээр зохиолч нэмдэг товч
//   //      *{@link app.view.main.MainController#onInsertClick insertauthor}
//   //      |)}>#
//   //     handler: 'onInsertClick'
//   //   }]
//   // },
//   // {
//   //   region: 'center',
//   //   xtype: 'panel',
//   //   items:[
//   //     {
//   //
//   //       region: 'north',
//   //       bodyPadding: 30,
//   //       layout: {
//   //         type: 'hbox',
//   //         align: 'stretch'
//   //       },
//   //       tbar: [{
//   //         text: '<b>Ном шинээр нэмэх</b>',
//   //         width: '190',
//   //         #<{(|*
//   //          * @event addBook
//   //          * хэрэглэгч **ном** **шинээр** **нэмэх** гэсэн товчин дээр дарахад дуудагдана.
//   //          * {@link App.view.main.MainController#addBook addbook} method
//   //          |)}>#
//   //         handler: 'addBook'
//   //       }], //eo tbar
//   //       items:[
//   //         {
//   //         #<{(|* @cfg xtype
//   //          * Хайлтын цонхыг гаргаж байна.
//   //          |)}>#
//   //           xtype: 'app.north.search',
//   //           layout: 'hbox'
//   //         }
//   //       ]
//   //     },
//   //     {
//   //       region: 'center',
//   //       xtype: 'panel',
//   //       items: [
//   //         {
//   //         #<{(|* @cfg xtype
//   //          *@markdown {@link App.view.grid.MainGrid том хүснэгт} дуудаж байна.
//   //          |)}>#
//   //           xtype: 'grid.mainGrid',
//   //         }]
//   //       }] //eo region center item
//   //     }] //eo Panel
//     }); //eof

Ext.define('App.view.main.MainController', {
  extend: 'Ext.app.ViewController',
  alias: 'controller.main',
  onFormButton: function(btn) {
    var person = this.getViewModel().get('currentPerson'),
    action = btn.getItemId();
    if(person && person.isModel){
      if('reject' === action){
        person.reject();
      }
      if('commit' === action) {
        person.commit();
        // Ext bug workaround
        // dirty flag is not refreshed without this
        person.reject();
      }
    }
  },
  onGridButton: function(btn){
    var action = btn.getItemId(), vm = this.getViewModel(), store = vm.getStore('persons'), record;
    if('add' === action){
      debugger;
      record = store.insert(0, {})[0];
      vm.set('currentPerson', record);
    }
    if('reject' === action){
      store.rejectChanges()
    }
    if('commit' === action){
      store.commitChanges();

      // Ext bug workaround
      // dirty flag is not refreshed without this
      record = vm.get('currentPerson');
      record.commit();
      record.reject();
    }
  }
});
// #<{(|*
//  * This class is the main view for the application. It is specified in app.js as the
//  * "autoCreateViewport" property. That setting automatically applies the "viewport"
//  * plugin to promote that instance of this class to the body element.
//  *
//  *
//  |)}>#
// Ext.define('App.view.main.MainController', {
//   extend: 'Ext.app.ViewController',
//
//   requires: [
//     'Ext.MessageBox'
//   ],
//
//   alias: 'controller.main',
//   stores: ['Book', 'Author', 'List'],
//     #<{(|*
//      * @method {@link App.view.inserta.insert шинээр зохиолч нэмдэг} форм үүсгэн харуулдаг.
//      |)}>#
//   onInsertClick: function() {
//     Ext.create('App.view.inserta.Insert').show();
//   },
//   #<{(|*
//    * @method onEditClick
//    * form дээр бөглөгдсөн байх өгөгдөлүүд
//    |)}>#
//   onEditClick:  function(grid, rowIndex, colIndex, items, e, record) {
//     var win = Ext.create('App.view.edit.Edit');
//     win.show();
//     win.loadRecord(record);
//   },
//   #<{(|*
//    * @method onDeleteButtonClick
//    *Устгах товчин дээр дарахад confirm box гарч ирэн тухайн мөрийг устгах эсэхийг баталгаажуулна.
//    |)}>#
//   deleteBtn:  function(grid, rowIndex, colIndex, item, e, record) {
//     Ext.Msg.show({
//       title:'Are you sure?',
//       message: 'Delete ?',
//       buttons: Ext.Msg.YESNO,
//       icon: Ext.Msg.QUESTION,
//       fn: function(btn) {
//         if (btn === 'yes') {
//           grid.store.remove(record);
//           grid.store.sync();
//         } else if (btn === 'no') {
//           console.log('No pressed');
//         } else {
//         console.log('Cancel pressed');}
//       }
//     });
//   },
//   #<{(|*
//    * @method rowclick
//    * хэрэглэгчийн дарсан мөрөн дэх рэкордын боломжит тоог нэгээр багасгаж зүүн талын хүснэгтэд нэмдэг.
//    * @property availnum checks whether this row has been added or not before
//    |)}>#
//   rowclick: function(table, rec) {
//     var listGrid = Ext.getCmp('listGrid');
//     var exist = listGrid.store.findExact('bookTitle', rec.data.bookTitle);
//     var availnum = rec.get('number');
//     if (availnum > 0) {
//       if (exist < 0) {
//         rec.set('selnumber', 1);
//         rec.set('sumPrice', rec.get('price'));
//         availnum = availnum - rec.get('selnumber');
//         rec.set('number', availnum);
//         listGrid.getStore().insert(0, rec);
//         listGrid.store.sync();
//       }
//       else {
//         var shirheg = rec.get('selnumber');
//         shirheg++;
//         var price = rec.get('price');
//         price *= shirheg;
//         rec.set('selnumber', shirheg);
//         rec.set('sumPrice', price);
//         availnum-- ;
//         rec.set('number', availnum);
//         listGrid.store.sync();
//       }
//       console.log(rec.get('number'));
//     }
//     else {
//       alert('Байхгүй номыг зарах боломжгүйштэээ');
//     }
//   },
//   #<{(|*
//    * @method bought
//    * listgrid ээс утгуудаа аваад {@link Ext.Ajax#request} ашиглан өгөдөлүүдээ сэрвэр рүү явуулдаг.
//    |)}>#
//   bought: function() {
//     var listGrid = Ext.getCmp('listGrid');
//     var store = listGrid.getStore();
//     store.each(function(record) {
//       console.log(record.get('id'));
//       Ext.Ajax.request({
//         method: 'PUT',
//         url: '/v1/books',
//         useDefaultXhrHeader: true,
//         params:{
//           REC_ID: record.get('id'),
//           REC_SELNUM: record.get('selnumber')
//         },
//         success: function(response) {
//           console.log(response.responseText);
//           store.remove(record);
//           store.sync({
//             success: function() {
//               var mainGrid = Ext.getCmp('mainGrid');
//               var mainStore = mainGrid.getStore();
//               mainStore.each(function(record) {
//                 var eachAvailNum = record.get('number');
//                 if (eachAvailNum <= 0) {
//                   mainStore.remove(record);
//                 }
//                 mainStore.sync();
//               }); //eo mainstore.each
//             } // eo success
//           }); //eo store.sync
//         }
//       }); //eo ajax request
//     }); //eo listGrid store.each
//   }, //eo bounght function
//
//   #<{(|*
//    * @method addBook
//    * this  method creates {@link App.view.add.Add AddbookForm} Window
//    |)}>#
//   addBook: function() {
//     var formWindow = Ext.create('App.view.add.Add');
//     formWindow.show();
//     formWindow.center();
//   },
//   #<{(|*
//    * @method addBookSaveBtn
//    * gets form records and saves values
//    |)}>#
//   addBookSaveBtn: function() {
//     var form = this.lookupReference('addForm');
//     //var form = this.up('form').getForm();
//     if (form.isValid()) {
//       #<{(|form.submit({
// success:function(form, action) {|)}>#
//       var model = Ext.create('bookModel', form.getValues());
//       var grid = Ext.getCmp('mainGrid');
//       grid.store.insert(0, model);
//       //store.sync();
//       grid.store.sync();
//       //Ext.getCmp('addform').close();
//       form.close();
//       #<{(|},
// failure: function(form, action) {
// Ext.Msg.alert('Failed', action.result.msg);
// }
// });|)}>#
//     } //eo if
//   }
//
// }); //eof

Ext.define('App.view.main.MainModel', {
  extend: 'Ext.app.ViewModel',
  alias: 'viewmodel.main',
  data: {
    currentPerson: null
  },
  formulas: {
    dirty: {
      bind: {
        bindTo: '{currentPerson}',
        deep: true
      },
      get: function(data){
        return data ? data.dirty : false;
      }
    },
    storeDirty: {
      bind: {
        bindTo: '{currentPerson}',
        deep: true
      },
      get: function() {
        return this.getStore('persons').isDirty()
      }
    }
  }, //eo formulas
  stores: {
    persons: {
      model: 'Person',
      data: [
        {id: 1, fname: 'John', lname: 'Lennon', age: 74},
        {id: 2, fname: 'Paul', lname: 'McCartney', age: 72},
        {id: 3, fname: 'George', lname: 'Harrison', age: 71},
        {id: 4, fname: 'Ringo', lname: 'Starr', age: 74}
      ],
      isDirty: function() {
        var dirty = this.getModifiedRecords().length;
        dirty = dirty || this.getNewRecords().length;
        dirty = dirty || this.getRemovedRecords().length;
        return !!dirty;
      }
    },
    personsChained: {
      source: '{persons}'
    }
  }
});
// Ext.define('App.view.main.MainModel', {
//   extend: 'Ext.app.ViewModel',
//
//   alias: 'viewmodel.main',
//   data: {
//     currentPerson: null
//   },
//   formulas: {
//     dirty: {
//       bind: {
//         bindTo: '{currentPerson}',
//         deep: true
//       },
//       get: function(data){
//         return data ? data.dirty : false;
//       }
//     },
//     storeDirty: {
//       bind: {
//         bindTo: '{currentPerson}',
//         deep: true
//       },
//       get: function() {
//         return this.getStore('persons').isDirty()
//       }
//     }
//   }, //eo formulas
//   stores: {
//     persons: {
//       model: 'SmartCity.model.Person',
//       // proxy: {
//       //   type: 'memory',
//       //   reader: {
//       //     type: 'json'
//       //   }
//       // },
//       data: [
//         {id: 1, fname: 'John', lname: 'Lennon', age: 74},
//         {id: 2, fname: 'Paul', lname: 'McCartney', age: 72},
//         {id: 3, fname: 'George', lname: 'Harrison', age: 71},
//         {id: 4, fname: 'Ringo', lname: 'Starr', age: 74}
//       ],
//       isDirty: function() {
//         var dirty = this.getModifiedRecords().length;
//         dirty = dirty || this.getNewRecords().length;
//         dirty = dirty || this.getRemovedRecords().length;
//         return !!dirty;
//       }
//     },
//     personsChained: {
//       sources: '{persons}'
//     }
//   }
// });

Ext.define('App.view.person.PersonForm', {
  extend: 'Ext.form.Panel',
  xtype: 'personform',
  config: {
    currentPerson: null
  },
  bind: {
    currentPerson: '{currentPerson}',
    title: '<b>{currentPerson.name}</b>'
  },
  header: {
    title: 'Person Form',
    padding: '4 9 5 9',
    items: [
      {
        text: 'Reject',
        xtype: 'button',
        itemId: 'reject',
        handler: 'onFormButton',
        // disabled until currentPerson dirty
        disabled: true,
        bind: {
          disabled: '{!dirty}'
        }
      },{
        text: 'Commit',
        xtype: 'button',
        itemId: 'commit',
        handler: 'onFormButton',
        margin: '0 0 0 5',
        disabled: true,
        bind: {
          disabled: '{!dirty}'
        }
      }
    ]

  },
  bodyPadding: 10,
  defaultType: 'textfield',
  defaults: {
    anchor: '100%',
    selectOnFocus: true
  },
  items: [
    {
      fieldLabel: 'First Name',
      disabled: true,
      bind: {
        value: '{currentPerson.fname}',
        disabled: '{!currentPerson}'
      }
    }, {
      fieldLabel: 'Last Name',
      disabled: true,
      bind: {
        value: '{currentPerson.lname}',
        disabled: '{!currentPerson}',
      }
    }, {
      fieldLabel: 'Age',
      xtype: 'numberfield',
      disabled: true,
      bind: {
        value: '{currentPerson.age}',
        disabled: '{!currentPerson}'
      }
    }
  ]
});

Ext.define('App.view.person.PersonGrid', {
  extend: 'Ext.grid.Panel',
  xtype: 'persongrid',
  publishes: ['currentPerson'],
  bind: {
    currentPerson: '{currentPerson}',
    store: '{persons}',
    title: '<b>{currentPerson.name}</b>'
  },
  config: {
    currentPerson: null
  },
  //update selection when currentPerson changes
  updateCurrentPerson: function(current, previous){
    var sm = this.getSelectionModel();
    if(current){
      sm.select(current);
    }
    if(previous){
      sm.deselect(previous);
    }
  },
  listeners: {
    scope: 'this',
    select: 'onPersonSelect'
  },
  onPersonSelect: function(grid, person){
    this.setCurrentPerson(person);
  },
  plugins: [{
    ptype: 'cellediting',
    clicksToEdit: 2,
    pluginId: 'cellediting'
  }],
  header: {
    title: 'Person Grid',
    padding: '4 9 5 9',
    items: [{
      text: 'New',
      xtype: 'button',
      itemId: 'add',
      handler: 'onGridButton'
    }, {
      tooltip: 'Reject All',
      text: 'Reject All',
      xtype: 'button',
      itemId: 'reject',
      handler: 'onGridButton',
      disabled: true,
      bind: {
        disabled: '{!storeDirty}'
      },
      margin: '0 0 0 5'
    },{
      tooltip: 'Commit All',
      text: 'Commit All',
      xtype: 'button',
      itemId: 'commit',
      handler: 'onGridButton',
      disabled: true,
      bind: {
        disabled: '{!storeDirty}'
      },
      margin: '0 0 0 5'
    }]
  }, // eo header
  columns: [
    {
      text: 'First Name',
      dataIndex: 'fname',
      editor: {
        xtype: 'textfield',
        bind: '{currentPerson.fname}'
      }
    }, {
      text: 'Last Name',
      flex: 1,
      dataIndex: 'lname',
      editor: {
        xtype: 'textfield',
        bind: '{currentPerson.lname}'
      }
    }, {
      text: 'Age',
      dataIndex: 'age',
      width: 120,
      editor: {
        xtype: 'numberfield',
        bind: '{currentPerson.age}'
      }
    }
  ] // eo columns

});

Ext.define('App.view.person.PersonPanel', {
  extend: 'Ext.panel.Panel',
  alias: 'widget.personpanel',
  bodyPadding: 10,
  bind: {
    data:{
      bindTo: '{currentPerson}',
      deep: true
    },
    title: '<b>{currentPerson.lname}</b>'
  },
  tpl: [
    '<table>',
    '<tr><td>First Name:</td><td><strong>{fname}</strong></td></tr>',
    '<tr><td>Last Name:</td><td><strong>{lname}</strong></td></tr>',
    '<tr><td>Age:</td><td><strong>{age}</strong></td></tr>',
    '</table>'
  ]
});

Ext.define('App.view.person.PersonView', {
  extend: 'Ext.view.View',
  xtype: 'personview',
  publishes: ['currentPerson'],
  bind: {
    store: '{personsChained}',
    currentPerson: '{currentPerson}'
  },
  config: {
    currentPerson: null
  },
  updateCurrentPerson: function(current, previous) {
    var sm = this.getSelectionModel();
    if(current) {
      sm.select(current);
    }
    if(previous){
      sm.deselect(previous);
    }
  },
  listeners: {
    scope: 'this',
    select: 'onPersonSelect',
    beforecontainerclick: function(){
      return false;
    }
  },
  //select event handler
  onPersonSelect: function(view, person){
    this.setCurrentPerson(person);
  },
  itemSelector: 'div.person-item',
  selectedItemCls: 'selected',
  itemTpl: [
    '<div class="person-item">',
    '<strong>{fname} {lname}</strong> ({age})',
    '</div>'
  ].join('')
});

/**
 * Хайлтын цонхны **toolbar** <br />
 * Номны нэр, зохиолч, ISBN-р хайдаг хэсэг
 *
 */
Ext.define('App.view.search.Search', {
  extend: 'Ext.toolbar.Toolbar',
  xtype: 'app.north.search',
  title: 'ХАЙЛТ',
  region: 'north',
  //width: 300,
  split: true,
  collapsible: true,

  controller: 'search',

  items: [
    {
      xtype: 'textfield',
      anchor: '100%',
      fieldLabel: 'Номын нэр, Зохиолчын нэр эсвэл ISBN дугаарын аль нэгээр нь хайна уу',
      labelWidth: '170px',
      valueField: 'bookTitle',
      style: {width:'500px;'},
      typeAheadDelay:200,
      /** @cfg listeners
       * Хэрэглэгч textfield дээр өөрчлөлт оруулахад
       * @markdown {@link Ext.ux.LiveSearchGridPanel#onTextFieldChange onTextFieldChange} method дуудагдана
       */
      listeners: {
        change: 'onTextFieldChange'
      }
    }
  ]
});

/**
 * Хайлтын цонхны контроллер
 */
Ext.define('Ext.ux.LiveSearchGridPanel', {
  extend: 'Ext.app.ViewController',

  alias: 'controller.search',

  /**
   * @method onTextFieldChange
   * Хайлт хийхэд дуудагддаг
   */
  onTextFieldChange: function(field, newValue) {
   // var grid = this.lookupReference('northSearch');
    var grid = Ext.getCmp('mainGrid');
    grid.store.clearFilter();

    if (newValue) {
      /** @method new RegExp
       * @param newValue
       * textfield-ээс нэмэгдсэн утгыг авдаг.
       * @param {String}
       *    + "g" - Глобалаар хайна.
       *    + "i" - Том жижиг үсэг үл харгалзана.
       *    + "m" - Олон мөрүүдтэй ажиллаж байхдаа эхлэл болон төгсгөлийн тэмдэгтүүдийг (^ болон $) тавина.
       * ( Жишээ нь мөр болгоны эхлэл болон төгсгөлийн (\n эсвэл \r зааглана) тохируулана, зөвхөн оруулсан string-ын эхлэл болон төгсгөлөөр нь биш
       */
      var matcher = new RegExp(Ext.String.escapeRegex(newValue), 'i');
      grid.store.filter({
        filterFn: function(record) {
          return matcher.test(record.get('bookTitle')) ||
            matcher.test(record.get('author').name) ||
            matcher.test(record.get('bookDescription')) ||
            matcher.test(record.get('bookISBN'));
        }
      });
    }
  }
});

Ext.application({
  name: 'App',

  autoCreateViewport: 'App.view.main.Main',
  // stores: [
  //
  //   'Book',
  //   'Author',
  //   'List'
  //     // TODO: add global / shared stores here
  // ],
  // models: [
  //   'Person'
  // ],

  launch: function() {

  }
});
