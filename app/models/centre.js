import DS from 'ember-data';

export default DS.Model.extend({
  name: DS.attr(),
  updated: DS.attr(),
  beds: DS.attr()
});
