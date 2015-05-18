Ext.define('App.model.Person', {
  extend: 'Ext.data.Model',
  idProperty: 'id',
  schema: {
    namespace: 'App.model'
  },
  fields: ['id', 'fname', 'lname', 'age',
  { name: 'name', type: 'string',
    calculate: function(v){
      var val = (v.fname && v.lname) ? v.fname + ' ' + v.lname : v.fname || v.lname;
      return val;
    }
  }]
});
