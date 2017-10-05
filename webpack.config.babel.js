import webpack from 'webpack';
import path from 'path';
import CleanWebpackPlugin from 'clean-webpack-plugin';

export default {
    entry: {
        'code-challenge': './src/app.js',
        'code-challenge.min': './src/app.js'
    },

    output:{
        path: `${__dirname}/build`,
        filename: 'scripts/[name].js',
        publicPath: 'build'
    },

    module:{
        loaders:[
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                options:{
                    presets: ['env']
                }
            }
        ]
    }
}