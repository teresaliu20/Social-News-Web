export default {
  env: process.env.NODE_ENV,
  mode: process.env.MODE,
  // backend api host
  development: {
    basename: '/',
    hostname: 'http://127.0.0.1:8000',
  },
  production: {
    basename: '/',
    hostname: 'https://paper-puzzle.herokuapp.com',
  },
};
