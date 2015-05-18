Ext.define('App.view.person.PersonGrid', {
  extend: 'Ext.grid.Panel',
  xtype: 'persongrid',
  publishes: ['currentPerson'],
  bind: {
    currentPerson: '{currentPerson}',
    store: '{persons}',
    title: '<b>{currentPerson.name}</b>'
  },
  config: {
    currentPerson: null
  },
  //update selection when currentPerson changes
  updateCurrentPerson: function(current, previous){
    var sm = this.getSelectionModel();
    if(current){
      sm.select(current);
    }
    if(previous){
      sm.deselect(previous);
    }
  },
  listeners: {
    scope: 'this',
    select: 'onPersonSelect'
  },
  onPersonSelect: function(grid, person){
    this.setCurrentPerson(person);
  },
  plugins: [{
    ptype: 'cellediting',
    clicksToEdit: 2,
    pluginId: 'cellediting'
  }],
  header: {
    title: 'Person Grid',
    padding: '4 9 5 9',
    items: [{
      text: 'New',
      xtype: 'button',
      itemId: 'add',
      handler: 'onGridButton'
    }, {
      tooltip: 'Reject All',
      text: 'Reject All',
      xtype: 'button',
      itemId: 'reject',
      handler: 'onGridButton',
      disabled: true,
      bind: {
        disabled: '{!storeDirty}'
      },
      margin: '0 0 0 5'
    },{
      tooltip: 'Commit All',
      text: 'Commit All',
      xtype: 'button',
      itemId: 'commit',
      handler: 'onGridButton',
      disabled: true,
      bind: {
        disabled: '{!storeDirty}'
      },
      margin: '0 0 0 5'
    }]
  }, // eo header
  columns: [
    {
      text: 'First Name',
      dataIndex: 'fname',
      editor: {
        xtype: 'textfield',
        bind: '{currentPerson.fname}'
      }
    }, {
      text: 'Last Name',
      flex: 1,
      dataIndex: 'lname',
      editor: {
        xtype: 'textfield',
        bind: '{currentPerson.lname}'
      }
    }, {
      text: 'Age',
      dataIndex: 'age',
      width: 120,
      editor: {
        xtype: 'numberfield',
        bind: '{currentPerson.age}'
      }
    }
  ] // eo columns

});
