const nextRoutes = require('next-routes');

const routes = nextRoutes();

const APP_ROUTES = [{
  page: 'index',
  pattern: '/',
}, {
  page: 'profile',
  pattern: '/profile',
}];

APP_ROUTES.forEach((route) => routes.add(route));

module.exports = routes;
