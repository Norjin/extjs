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
