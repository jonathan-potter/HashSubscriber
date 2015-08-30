var path = require('path');

module.exports = {
  entry: "./javascript/init",
  output: {
    path: __dirname,
    filename: "bundle.js",
    sourceMapFilename: "sourcemap"
  },
  resolve: {
    // Allow to omit extensions when requiring these files
    extensions: ['', '.js', '.jsx', '.js.jsx'],
    alias: {
      assets: path.resolve(__dirname, 'assets'),
      css: path.resolve(__dirname, 'css'),
      dependencies: path.resolve(__dirname, 'dependencies'),
      javascript: path.resolve(__dirname, 'javascript'),
    }
  },
  module: {
    loaders: [
      {
        test: /\.js$/, exclude: /node_modules/,
        loader: "babel-loader"
      }
    ]
  },
  plugins: []
};
