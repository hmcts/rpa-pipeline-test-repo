const appInsights = require('applicationinsights');
const CONF = require('config');

if (process.env.NODE_ENV === 'production') {
  appInsights.setup(CONF.applicationInsights.instrumentationKey).start();
}

const app = require('./app');

const { http } = app.init();

process.on('SIGTERM', () => {
  http.close(() => {
    process.exit(0); // eslint-disable-line no-process-exit
  });
});
