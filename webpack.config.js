var path = require("path");
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var webpack = require("webpack");
var assetsPath = path.join(__dirname, "public", "assets");
var publicPath = "assets/";

var commonLoaders = [
  {
    /*
     * TC39 categorises proposals for babel in 4 stages
     * Read more http://babeljs.io/docs/usage/experimental/
     */
    test: /\.jsx$/, loader: "babel-loader?stage=0"
  },
  {
    test: /\.js$/,
    loader: "babel-loader?stage=0",
    include: path.join(__dirname, "app")
  },
  { test: /\.png$/, loader: "url-loader" },
  { test: /\.jpg$/, loader: "file-loader" },
  { test: /\.html$/, loader: "html-loader" }
];

module.exports = [
  {
    // The configuration for the client
    name: "browser",
    /* The entry point of the bundle
     * Entry points for multi page app could be more complex
     * A good example of entry points would be:
     * entry: {
     *   pageA: "./pageA",
     *   pageB: "./pageB",
     *   pageC: "./pageC",
     *   adminPageA: "./adminPageA",
     *   adminPageB: "./adminPageB",
     *   adminPageC: "./adminPageC"
     * }
     *
     * We can then proceed to optimize what are the common chunks
     * plugins: [
     *  new CommonsChunkPlugin("admin-commons.js", ["adminPageA", "adminPageB"]),
     *  new CommonsChunkPlugin("common.js", ["pageA", "pageB", "admin-commons.js"], 2),
     *  new CommonsChunkPlugin("c-commons.js", ["pageC", "adminPageC"]);
     * ]
     */
    context: path.join(__dirname, "app"),
    entry: {
      app: "./app"
    },
    output: {
      // The output directory as absolute path
      path: assetsPath,
      // The filename of the entry chunk as relative path inside the output.path directory
      filename: "[name].js",
      // The output path from the view of the Javascript
      publicPath: publicPath

    },
    module: {
      preLoaders: [{
        test: /\.js$|.jsx$/,
        exclude: /node_modules/,
        loaders: ["eslint"]
      }],
      loaders: commonLoaders.concat([
        { test: /\.css$/, loader: "style!css" },
        { test: /\.scss$/,
          loader: ExtractTextPlugin.extract("css?sourceMap!sass?sourceMap&outputStyle=expanded" +
            "&includePaths[]=" + (path.resolve(__dirname, "./bower_components")) +
            "&includePaths[]=" + (path.resolve(__dirname, "./node_modules")) +
            '&includePaths[]=' + (path.resolve(__dirname, './node_modules/alloy-editor/assets')))
        } 
      ])
    },
    resolve: {
      root: [path.join(__dirname, "bower_components")],
      extensions: ['', '.react.js', '.js', '.jsx', '.scss', '.css'],
      modulesDirectories: [
        "app", "node_modules", "bower_components"
      ],
      alias: {
      alloyeditor : '../../bower_components/alloyeditor/dist/alloy-editor/alloy-editor-core'
      }
    },
    plugins: [
        // extract inline css from modules into separate files
        new ExtractTextPlugin("styles/main.css"),
         new webpack.ResolverPlugin(
            new webpack.ResolverPlugin.DirectoryDescriptionFilePlugin("bower.json", ["main"])
        )
    ]
  }, {
    // The configuration for the server-side rendering
    name: "server-side rendering",
    context: path.join(__dirname, "app"),
    entry: {
      app: "./app",
      header: "./elements/Header.react"
    },
    target: "node",
    output: {
      // The output directory as absolute path
      path: assetsPath,
      // The filename of the entry chunk as relative path inside the output.path directory
      filename: "[name].server.js",
      // The output path from the view of the Javascript
      publicPath: publicPath,
      libraryTarget: "commonjs2"
    },
    externals: /^[a-z\-0-9]+$/,
    module: {
      loaders: commonLoaders
    },
    resolve: {
      extensions: ['', '.react.js', '.js', '.jsx', '.scss'],
      modulesDirectories: [
        "app", "node_modules"
      ]
    },
    plugins: [
      new webpack.NormalModuleReplacementPlugin(/\.(css|scss)$/, "node-noop")
    ]
  }
];
