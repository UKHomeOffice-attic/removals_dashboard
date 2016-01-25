import Ember from 'ember';

export default Ember.Route.extend({
  model() {
    return this.store.findAll('centre');
  },
  activate() {
    this.io.socket.get('/centres', function serverResponded(body, JWR) {
      console.log('Sails responded with: ', body);
      console.log('with headers: ', JWR.headers);
      console.log('and with status code: ', JWR.statusCode);
    });
  }
});
