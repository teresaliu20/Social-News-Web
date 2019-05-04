const nextRoutes = require('next-routes');

const routes = nextRoutes();

const APP_ROUTES = [{
  page: 'index',
  pattern: '/',
}, {
  page: 'profile',
  pattern: '/profile/:id',
}, {
  page: 'my-profile',
  pattern: '/my-profile',
}, {
  page: 'collection',
  pattern: '/collection/:id',
}, {
  page: 'topic',
  pattern: '/topic/:name',
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
}, {
  page: 'reading-list',
  pattern: '/reading-list',
}, {
  page: '404-not-found',
  pattern: '/404-not-found',
}];

APP_ROUTES.forEach((route) => routes.add(route));

module.exports = routes;
