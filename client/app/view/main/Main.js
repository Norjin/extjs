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
