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
