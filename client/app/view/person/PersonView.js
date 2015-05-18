Ext.define('App.view.person.PersonView', {
  extend: 'Ext.view.View',
  xtype: 'personview',
  publishes: ['currentPerson'],
  bind: {
    store: '{personsChained}',
    currentPerson: '{currentPerson}'
  },
  config: {
    currentPerson: null
  },
  updateCurrentPerson: function(current, previous) {
    var sm = this.getSelectionModel();
    if(current) {
      sm.select(current);
    }
    if(previous){
      sm.deselect(previous);
    }
  },
  listeners: {
    scope: 'this',
    select: 'onPersonSelect',
    beforecontainerclick: function(){
      return false;
    }
  },
  //select event handler
  onPersonSelect: function(view, person){
    this.setCurrentPerson(person);
  },
  itemSelector: 'div.person-item',
  selectedItemCls: 'selected',
  itemTpl: [
    '<div class="person-item">',
    '<strong>{fname} {lname}</strong> ({age})',
    '</div>'
  ].join('')
});
