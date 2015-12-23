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
      'script-src': "'self' 'unsafe-inline' 'unsafe-eval'",
      'font-src': "'self'",
      'connect-src': "'self' http://localhost:8080",
      'img-src': "'self'",
      'report-uri': "'localhost'",
      'style-src': "'self' 'unsafe-inline'",
      'frame-src': "'none'"
    }
  };

  if (environment === 'development') {
    // ENV.APP.LOG_RESOLVER = true;
    // ENV.APP.LOG_ACTIVE_GENERATION = true;
    // ENV.APP.LOG_TRANSITIONS = true;
    // ENV.APP.LOG_TRANSITIONS_INTERNAL = true;
    // ENV.APP.LOG_VIEW_LOOKUPS = true;

    /**
     * Enable Ember CLI Mirage in development
     *  To share a working prototype before Sails.js server is ready
     */
    ENV['ember-cli-mirage'] = {
      enabled: true
    }
  }

  if (environment === 'test') {
    // Testem prefers this...
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
    /**
     * Disable Ember CLI Mirage in production
     */
    ENV['ember-cli-mirage'] = {
      enabled: false
    }
  }

  return ENV;
};
