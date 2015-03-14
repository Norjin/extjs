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
