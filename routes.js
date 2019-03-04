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
  pattern: '/collection/:id',
}, {
  page: 'login',
  pattern: '/login',
}, {
  page: 'signup',
  pattern: '/signup',
}, {
  page: 'create-collection',
  pattern: '/create-collection',
}];

APP_ROUTES.forEach((route) => routes.add(route));

module.exports = routes;
