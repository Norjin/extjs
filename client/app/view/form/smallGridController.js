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
