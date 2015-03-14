/**
 * Зүүн талд байрлах жижиг хүснэгт
 * энд үндсэн хүснэгтээс хэрэглэгч дарсан мөр орж ирнэ.
 */
Ext.define('App.view.form.smallGrid', {
  extend: 'Ext.grid.Panel',
  xtype: 'app.view.smallGrid',
  title: 'Зарах номын жагсаалт',
  controller: 'small',
  autoScroll: true,
  store: 'List',
  id: 'listGrid',
  scroll: true,
  features: [{
    ftype: 'summary'
  }],
  columns: [
    {header: 'Номын нэр', text: 'Номын нэр',  dataIndex: 'bookTitle', flex: 1},
    {header: 'Үнэ' , text: 'Үнэ',  dataIndex: 'price'},
    {header: 'Тоо' , text: 'Тоо',  dataIndex: 'selnumber',
      editor: {xtype: 'textfield'}
    },
    {header: 'Нийлбэр', dataIndex: 'sumPrice', summaryType: 'sum',
      summaryRenderer: function(value) {
        return 'Нийт дүн: ' + value;
      }
    },
  ],
  listeners: {
    /**
     * @event rowclick
     * Хэрэглэгч аль нэгэн мөрөн дээр дарахад үндсэн хүснэгтэнд өөрчлөлт орно.
     * @markdown {@link App.view.form.smallGridController#addToMainPanel method} дуудагдаж байна.
     */
    'rowclick': 'addToMainPanel'
  }
});
