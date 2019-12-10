const path = require('path');

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
      }
      // {
      //   test: /\.(png|svg|jpg|gif)$/,
      //   loader: 'file-loader',
      //   options: {
      //     name: '[name].[ext]',
      //   }
      // },
    ]
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js']
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'src/ReactGenerators/dist')
  },
  mode: 'development'
};