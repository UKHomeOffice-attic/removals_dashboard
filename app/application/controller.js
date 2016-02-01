import Ember from 'ember';

export default Ember.Controller.extend({
  centresSorted: ['name'],
  arrangedContent: Ember.computed.sort('model', 'centresSorted'),
});

