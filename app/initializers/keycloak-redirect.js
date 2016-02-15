export default {
  name: 'keycloak-redirect',
  before: 'sails-io',
  initialize: function(){
    window.keycloakRedirect.authenticate(window.config, new XMLHttpRequest());
  }
};
