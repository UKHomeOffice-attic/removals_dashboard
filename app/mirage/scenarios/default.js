/**
 * @file Seeds development database using factories defined.
 * This data will not be loaded in tests.
 */
export default function(server) {
  server.createList('centre', 5);
}
