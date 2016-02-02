import ENV from '../config/environment';

export default {
  name: 'server-env-variables',
  before: 'sails-io',
  initialize: function initialize() {
    ENV.apiURL = window.config.backend;
    ENV.keycloakAccountService = window.config.keycloakAccountService;
    return ENV;

  }
};
