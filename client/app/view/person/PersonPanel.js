Ext.define('App.view.person.PersonPanel', {
  extend: 'Ext.panel.Panel',
  alias: 'widget.personpanel',
  bodyPadding: 10,
  bind: {
    data:{
      bindTo: '{currentPerson}',
      deep: true
    },
    title: '<b>{currentPerson.lname}</b>'
  },
  tpl: [
    '<table>',
    '<tr><td>First Name:</td><td><strong>{fname}</strong></td></tr>',
    '<tr><td>Last Name:</td><td><strong>{lname}</strong></td></tr>',
    '<tr><td>Age:</td><td><strong>{age}</strong></td></tr>',
    '</table>'
  ]
});
