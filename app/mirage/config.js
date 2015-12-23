/**
 * @file Specify API end-points.
 * Mirage wraps Pretender, which intercepts requests that would normally hit your API, and allows you to specify
 * the response that should be sent back.
 */
export default function () {
  /**
   * As Sails.js API is on a different server
   */
  this.urlPrefix = 'http://localhost:8080';

  /**
   * If API is namespaced is set:
   * this.namespace = 'api';
   */

  /**
   * Timing parameter of the response.
   *  Default is a 400ms delay during development and 0 delay in testing (so your tests run fast).
   */
  this.timing = 400;

  /**
   * Setup endpoints for retrieving fake models
   *  Route is made dynamic by responding with all the centres in Mirage's in-memory database.
   */

  /**
   * Route will handle the URL '/api/centres'
   */
  this.get('/centres', function (db) {
    return {
      data: db.centres.map(attrs => (
      {type: 'centres', id: attrs.id, attributes: attrs}
      ))
    };
  });

  /**
   * Route will handle the URL '/api/centre/{id}'
   */
  this.get('/centres/:id', function (db, request) {
    let id = request.params.id;

    return {
      data: {
        type: 'centres',
        id: id,
        attributes: db.centres.find(id)
      }
    };
  });
}
