/**
 * Temporary solution
 * Ember Browserfy 1.1.4 : npm-installed dependencies are not available during tests
 * @link https://github.com/ef4/ember-browserify/issues/14
 */
import mockSocket from 'npm:mock-socket';
export default mockSocket;
