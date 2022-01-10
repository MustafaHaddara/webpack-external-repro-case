const path = require('path');
// const PeerDepsExternalsPlugin = require('./external-plugin');

module.exports = {
  entry: './index.js', // Entry point for each component, each component must have an index.js file
  mode: 'production',
  output: {
    filename: 'index.js',
    path: path.resolve('es'),
    library: {
      type: 'module'
    },
    environment: {
      module: true
    },
    clean: true
  },
  externals: {
    'react': 'react',
    'react-dom': 'react-dom',
  },
  optimization: {
    minimize: false,
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /(node_modules)/,
        loader: 'babel-loader',
        options: {
          presets: [[
            '@babel/preset-env',
            {
              targets: {
                esmodules: true
              }
            }
          ], [
            '@babel/preset-react',
            {
              runtime: 'automatic' // This helps us take advantage of React 17 so we no longer need to "import React from 'react' in every file"
            }
          ]]
        }
      },
      {
        test: /\.css$/,
        exclude: /\.module\.css$/,
        use: ['style-loader', 'css-loader']
      }
    ]
  },
  // plugins: [
  //   // This plugin reads peerDepencies in package.json and marks them as externals to webpack
  //   new PeerDepsExternalsPlugin(),
  // ],
  resolve: {
    extensions: ['.js', '.jsx']
  },
  experiments: {
    outputModule: true,
  },
};
