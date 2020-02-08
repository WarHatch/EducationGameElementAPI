/** Used for generating static resources/script from ReactGenerators folder */

const path = require('path');
const webpack = require('webpack');

let outputPath = path.resolve(__dirname, 'src/ReactGenerators/dist');
if (process !== undefined && process.env.NODE_ENV === "production")
 outputPath = path.resolve(__dirname, 'dist/ReactGenerators/dist')

module.exports = {
  entry: './src/ReactGenerators/public/SSRScript.ts',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader'
        ],
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        loader: 'file-loader',
        options: {
          name: '[name].[ext]',
        }
      },
    ]
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js']
  },
  output: {
    filename: 'bundle.js',
    path: outputPath,
  },
  plugins: [
    new webpack.DefinePlugin({
      // TODO: specify only required env values
      'process.env': JSON.stringify(process.env)
    })
  ],
  mode: 'development'
};