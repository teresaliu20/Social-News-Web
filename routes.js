const nextRoutes = require('next-routes');

const routes = nextRoutes();

const APP_ROUTES = [{
  page: 'index',
  pattern: '/',
}, {
  page: 'profile',
  pattern: '/profile',
}, {
  page: 'collection',
  pattern: '/collection/:slug',
}];

APP_ROUTES.forEach((route) => routes.add(route));

module.exports = routes;
