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
