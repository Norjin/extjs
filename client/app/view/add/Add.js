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
