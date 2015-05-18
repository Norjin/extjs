Ext.define('App.view.person.PersonForm', {
  extend: 'Ext.form.Panel',
  xtype: 'personform',
  config: {
    currentPerson: null
  },
  bind: {
    currentPerson: '{currentPerson}',
    title: '<b>{currentPerson.name}</b>'
  },
  header: {
    title: 'Person Form',
    padding: '4 9 5 9',
    items: [
      {
        text: 'Reject',
        xtype: 'button',
        itemId: 'reject',
        handler: 'onFormButton',
        // disabled until currentPerson dirty
        disabled: true,
        bind: {
          disabled: '{!dirty}'
        }
      },{
        text: 'Commit',
        xtype: 'button',
        itemId: 'commit',
        handler: 'onFormButton',
        margin: '0 0 0 5',
        disabled: true,
        bind: {
          disabled: '{!dirty}'
        }
      }
    ]

  },
  bodyPadding: 10,
  defaultType: 'textfield',
  defaults: {
    anchor: '100%',
    selectOnFocus: true
  },
  items: [
    {
      fieldLabel: 'First Name',
      disabled: true,
      bind: {
        value: '{currentPerson.fname}',
        disabled: '{!currentPerson}'
      }
    }, {
      fieldLabel: 'Last Name',
      disabled: true,
      bind: {
        value: '{currentPerson.lname}',
        disabled: '{!currentPerson}',
      }
    }, {
      fieldLabel: 'Age',
      xtype: 'numberfield',
      disabled: true,
      bind: {
        value: '{currentPerson.age}',
        disabled: '{!currentPerson}'
      }
    }
  ]
});
