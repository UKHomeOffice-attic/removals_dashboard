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

The API endpoint is set per environment in an ```env.js``` file. To generate a sample file run ```gulp env``` which sets the endpoint to ```http://localhost:8080```.

To over-ride the URL and kick off a local websocket simulator pass a ```simulator``` query parameter.

e.g. `http://localhost:8000/?simulator`

To start a static simulator (e.g. will populate the data once only) also pass a ```static``` query parameter.

e.g. `http://localhost:8000/?simulator&static`

