/* jshint node: true */

module.exports = function (environment) {
  var ENV = {
    modulePrefix: 'ember-bedspacemanagement',
    environment: environment,
    baseURL: '/',
    locationType: 'auto',
    EmberENV: {
      FEATURES: {
        // Here you can enable experimental features on an ember canary build
        // e.g. 'with-controller': true
      }
    },

    APP: {
      // Here you can pass flags/options to your application instance
      // when it is created
    },
    contentSecurityPolicy: {
      'default-src': "'none'",
      'script-src': "'self' 'unsafe-inline' 'unsafe-eval' https://rawgit.com ws://localhost:8080 http://localhost:8080 https://api.ircbd.homeoffice.gov.uk",
      'font-src': "'self'",
      'connect-src': "'self' http://localhost:8080 ws://localhost:8080 https://api.ircbd.homeoffice.gov.uk",
      'img-src': "'self'",
      'report-uri': "'localhost'",
      'style-src': "'self' 'unsafe-inline'",
      'frame-src': "'none'"
    }
  };

  if (environment === 'development') {
    ENV['apiURL'] = 'http://localhost:8080';
    // ENV.APP.LOG_RESOLVER = true;
    // ENV.APP.LOG_ACTIVE_GENERATION = true;
    // ENV.APP.LOG_TRANSITIONS = true;
    // ENV.APP.LOG_TRANSITIONS_INTERNAL = true;
    // ENV.APP.LOG_VIEW_LOOKUPS = true;

    /**
     * Ember CLI Mirage in development
     *  Enable: To share a working prototype
     *  Disable: To share Sails.js server prototype
     */
    ENV['ember-cli-mirage'] = {
      enabled: false
    }
  }

  if (environment === 'test') {
    // Testem prefers this...
    ENV['apiURL'] = 'http://localhost:8080';
    ENV.baseURL = '/';
    ENV.locationType = 'none';

    // keep test console output quieter
    ENV.APP.LOG_ACTIVE_GENERATION = false;
    ENV.APP.LOG_VIEW_LOOKUPS = false;

    ENV.APP.rootElement = '#ember-testing';

    /**
     * Enable Ember CLI Mirage in testing
     */
    ENV['ember-cli-mirage'] = {
      enabled: true
    }
  }

  if (environment === 'production') {
    ENV['apiURL'] = 'https://api.ircbd.homeoffice.gov.uk:443';
    /**
     * Disable Ember CLI Mirage in production
     */
    ENV['ember-cli-mirage'] = {
      enabled: false
    }
  }

  return ENV;
};
