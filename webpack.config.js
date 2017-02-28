module.exports = {
    entry: "./lib/main.js",
    output: {
        path: __dirname,
        filename: "./lib/jquery_lite.js"
    },
    module: {
      loaders: [
        {
          loader: 'babel-loader'
        }
      ]
    }
};
