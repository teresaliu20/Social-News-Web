const { ANALYZE, ASSET_HOST } = process.env;

// for those who using CDN
const assetPrefix = ASSET_HOST || '';

module.exports = {
  target: 'serverless',
  assetPrefix,
  webpack: (config, { dev }) => {
    config.output.publicPath = `${assetPrefix}${config.output.publicPath}`;

    if (ANALYZE) {
      /* eslint-disable global-require */
      const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
      config.plugins.push(new BundleAnalyzerPlugin({
        analyzerMode: 'server',
        analyzerPort: 8888,
        openAnalyzer: true,
      }));
    }

    config.module.rules.push({
      test: /\.scss/,
      use: [{
        loader: 'emit-file-loader',
        options: {
          name: 'dist/[path][name].[ext]',
        },
      },
      'babel-loader',
      'styled-jsx-css-loader', {
        loader: 'sass-loader',
        options: { sourceMap: dev },
      }],
    },
    {
      test: /\.(png|jpg)$/,
      loader: 'url-loader?limit=8192',
    });

    return config;
  },
};
