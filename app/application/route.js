import Ember from 'ember';
import DS from 'ember-data';

export default Ember.Route.extend({
  beforeModel() {
    var self = this;
    self.io.socket.on('centres', function(message) {
      var data = message.data;
      var modelClass = self.store.modelFor(data.type);
      var serializer = self.store.serializerFor('application');
      var json = serializer.normalizeSingleResponse(self.store, modelClass, data, data.id);

      self.store.push(json);
    });
  },
  model() {
    return this.store.findAll('centre');
  },
  activate() {
    this.io.socket.get('/centres', function serverResponded(body, JWR) {
    });
  },
  deactivate() {
    this.self.io.socket.disconnect();
  }
});
