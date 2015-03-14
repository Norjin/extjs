/** This is the _main grid_ that *shows book* records table
 * and __update__, **delete** buttons in the each row
 */
Ext.define('App.view.grid.MainGrid', {
  extend: 'Ext.grid.Panel',
  xtype: 'grid.mainGrid',
  title: 'Номын жагсаалт',
  //controller: 'mainGrid',
  autoScroll: true,
  reference: 'northSearch',
  store: 'Book',
  scroll: true,
  id:'mainGrid',
  stripeRows: true,
  columns: [
    {
      xtype:'actioncolumn',
      header: 'Action',
      items: [{
        header: 'Update',
        tooltip: 'Update',
        iconCls: 'editButton',
        handler: 'onEditClick'
      },
      {
        header: 'Delete',
        iconCls: 'delButton',
        tooltip: 'Delete',
        handler: 'deleteBtn'
      }]
    },
    {header: 'Номын нэр', text: 'Номын нэр',  dataIndex: 'bookTitle'},
    {header: 'Зохиолч', text: 'Зохиолч',  dataIndex: 'author', renderer: function(value) {
      return value.name;
    }},
    {header: 'ISBN', text: 'ISBN', dataIndex: 'bookISBN'},
    {header: 'Агуулга', text: 'Агуулга', dataIndex: 'bookDescription' , flex: 1},
    {header: 'Хэвлэгдсэн огноо' , text: 'Хэвлэгдсэн огноо',
    dataIndex: 'published', xtype: 'datecolumn', format: 'Y-M-D'},
    {header: 'Үнэ' , text: 'Үнэ',  dataIndex: 'price'},
    {header: 'Тоо' , text: 'Тоо',  dataIndex: 'number'},
    {header: 'Нэмсэн огноо' , text: 'Нэмсэн огноо',  dataIndex: 'created_at', xtype: 'datecolumn', format: 'Y-M-D'},
    {header: 'Зассан огноо' , text: 'Зассан огноо',  dataIndex: 'updated_at', xtype: 'datecolumn', format: 'Y-M-D'}
  ],
  /**
   * @event rowclick
   * @param table
   * @param rec
   * record of the row that user clicked on
   */
  listeners: {
    'rowclick': 'rowclick'
  }
});
