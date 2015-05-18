Ext.define('App.view.main.MainModel', {
  extend: 'Ext.app.ViewModel',
  alias: 'viewmodel.main',
  data: {
    currentPerson: null
  },
  formulas: {
    dirty: {
      bind: {
        bindTo: '{currentPerson}',
        deep: true
      },
      get: function(data){
        return data ? data.dirty : false;
      }
    },
    storeDirty: {
      bind: {
        bindTo: '{currentPerson}',
        deep: true
      },
      get: function() {
        return this.getStore('persons').isDirty()
      }
    }
  }, //eo formulas
  stores: {
    persons: {
      model: 'Person',
      data: [
        {id: 1, fname: 'John', lname: 'Lennon', age: 74},
        {id: 2, fname: 'Paul', lname: 'McCartney', age: 72},
        {id: 3, fname: 'George', lname: 'Harrison', age: 71},
        {id: 4, fname: 'Ringo', lname: 'Starr', age: 74}
      ],
      isDirty: function() {
        var dirty = this.getModifiedRecords().length;
        dirty = dirty || this.getNewRecords().length;
        dirty = dirty || this.getRemovedRecords().length;
        return !!dirty;
      }
    },
    personsChained: {
      source: '{persons}'
    }
  }
});
// Ext.define('App.view.main.MainModel', {
//   extend: 'Ext.app.ViewModel',
//
//   alias: 'viewmodel.main',
//   data: {
//     currentPerson: null
//   },
//   formulas: {
//     dirty: {
//       bind: {
//         bindTo: '{currentPerson}',
//         deep: true
//       },
//       get: function(data){
//         return data ? data.dirty : false;
//       }
//     },
//     storeDirty: {
//       bind: {
//         bindTo: '{currentPerson}',
//         deep: true
//       },
//       get: function() {
//         return this.getStore('persons').isDirty()
//       }
//     }
//   }, //eo formulas
//   stores: {
//     persons: {
//       model: 'SmartCity.model.Person',
//       // proxy: {
//       //   type: 'memory',
//       //   reader: {
//       //     type: 'json'
//       //   }
//       // },
//       data: [
//         {id: 1, fname: 'John', lname: 'Lennon', age: 74},
//         {id: 2, fname: 'Paul', lname: 'McCartney', age: 72},
//         {id: 3, fname: 'George', lname: 'Harrison', age: 71},
//         {id: 4, fname: 'Ringo', lname: 'Starr', age: 74}
//       ],
//       isDirty: function() {
//         var dirty = this.getModifiedRecords().length;
//         dirty = dirty || this.getNewRecords().length;
//         dirty = dirty || this.getRemovedRecords().length;
//         return !!dirty;
//       }
//     },
//     personsChained: {
//       sources: '{persons}'
//     }
//   }
// });
