module.exports = {
    entry: "./lib/main.js",
    output: {
        path: __dirname,
        filename: "./lib/johnQuery.js"
    },
    module: {
      loaders: [
        {
          loader: 'babel-loader'
        }
      ]
    }
};
