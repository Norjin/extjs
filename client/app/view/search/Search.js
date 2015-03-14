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
