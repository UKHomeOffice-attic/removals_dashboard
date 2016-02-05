import Ember from 'ember';

export default Ember.Route.extend({
  activate() {
    var self = this;

    self.io.socket.get('/centres', () =>
      self.io.socket.on('centres', message => {
        let modelClass = self.store.modelFor(message.data.type);
        let serializer = self.store.serializerFor('application');
        var json = serializer.extractSingle(self.store, modelClass, message.data, message.data.id);

        self.store.push(json);
      })
    );
  },
  model() {
    return this.store.findAll('centre');
  }
});
