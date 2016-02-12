import Ember from 'ember';

export default Ember.Route.extend({
  activate() {
    var self = this;

    self.io.socket.get('/centres', () =>
      self.io.socket.on('centres', message => {
        let modelClass = self.store.modelFor(message.data.type);
        let serializer = self.store.serializerFor(message.data.type);
        var json = serializer.extractSingle(self.store, modelClass, message.data, message.data.id);

        self.store.push(json);
      })
    );
  },
  model() {
    // findAll would lead to the adapter making an http request (in addition to the socket connection above).
    // peakAll only looks at the data currently in ember's store.
    return this.store.peekAll('centre');
  }
});
