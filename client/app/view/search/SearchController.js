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
