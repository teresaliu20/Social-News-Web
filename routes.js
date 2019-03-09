const nextRoutes = require('next-routes');

const routes = nextRoutes();

const APP_ROUTES = [{
  page: 'index',
  pattern: '/',
}, {
  page: 'profile',
  pattern: '/profile/:id',
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
  page: 'search',
  pattern: '/search',
}, {
  page: 'create-collection',
  pattern: '/create-collection',
}, {
  page: 'edit-collection',
  pattern: '/edit-collection/:id',
}, {
  page: 'edit-profile',
  pattern: '/edit-profile',
}];

APP_ROUTES.forEach((route) => routes.add(route));

module.exports = routes;
