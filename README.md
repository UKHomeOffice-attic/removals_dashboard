# Removals Dashboard

## Quick start

- Clone repo
- `npm install`
- `gulp watch`
- `npm start` (will use Python SimpleHTTPServer to serve `./dist` on port 8000)

## Data endpoint

By default the Javascript polls `centres.json` for data every 1000ms. To over-ride the URL and hook up to an active API pass an endpoint parameter.

e.g. `http://localhost:8000/?endpoint=http://localhost:8080/dashboard/`
