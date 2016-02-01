import Ember from 'ember';

export default Ember.Controller.extend(Ember.SortableMixin, {
  sortAscending: true,
  sortProperties: ['name']
});
