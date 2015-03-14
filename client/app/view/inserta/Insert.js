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
