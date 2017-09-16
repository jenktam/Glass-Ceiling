module.exports = {
  entry: "./browser/index.js",
  output: {
    path: __dirname + "/public",
    filename: "./bundle.js"
  },
  context: __dirname,
  devtool: "source-map",
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/,
        loader: "babel-loader",
        options: {
          presets: ["react", "es2015"]
        }
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2)$/,
        loader: "file?name=public/fonts/[name].[ext]"
      },
      //converts sass(.scss) files into css files
      {
        test: /\.scss$/,
        use: [
          "style-loader",
          "css-loader",
          "sass-loader"
        ]
      },
      //converts css files into js modules can import
      {
       test: /\.css/,
       loaders: ["style-loader", "css-loader"]
     }
    ]
  }
};
