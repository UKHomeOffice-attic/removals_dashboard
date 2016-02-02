import Ember from 'ember';

export default Ember.Route.extend({
  activate() {
    var self = this;

    self.io.socket.get('/centres', () =>
      self.io.socket.on('centres', message => {
        let data = message.data;
        let modelClass = self.store.modelFor(data.type);
        let serializer = self.store.serializerFor('application');
        let json = serializer.normalizeSingleResponse(self.store, modelClass, data, data.id);

        self.store.push(json);
      })
    );
  },
  model() {
    return this.store.findAll('centre');
  }
});
