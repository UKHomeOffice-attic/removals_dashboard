# Removals Dashboard

## Quick start

This will install dependencies and build the application for deployment in the `dist` folder.

- Clone repo
- `npm install`

## Build / serve for development

Both steps are ongoing processes so two terminal windows are needed:

- `gulp watch`
- `npm start` (will use Python SimpleHTTPServer to serve `./dist` on port 8000)

## Data endpoint

By default the Javascript polls `centres.json` for data every 1000ms. To over-ride the URL and hook up to an active API pass an endpoint parameter.

e.g. `http://localhost:8000/?endpoint=http://localhost:8080/dashboard/`
