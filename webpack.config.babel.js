import webpack from 'webpack';
import autoprefixer from 'autoprefixer'
import path from 'path';
import CleanWebpackPlugin from 'clean-webpack-plugin';
import ExtractTextPlugin from  'extract-text-webpack-plugin';

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
            },
            {
                test: /\.scss$/,
                include: /(node_modules|src)/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [
                        {
                            loader: 'css-loader'
                        }, {
                            loader: 'postcss-loader',
                            options: {
                                plugins: (loader) => [ autoprefixer({ browsers: ['last 2 versions'] }) ]
                            }
                        }, {
                            loader: 'sass-loader',
                            options: {
                                data: '@import "helpers/helpers";',
                                indentedSyntax: false,
                                compressed: true,
                                includePaths: [
                                    path.resolve('./node_modules'),
                                    path.resolve('./src'),
                                ]
                            }
                    }]
                })
            },
        ]
    },

    plugins: [
        new ExtractTextPlugin("styles.css"),
        new webpack.SourceMapDevToolPlugin(),
        new CleanWebpackPlugin(['build', 'dist'])
    ]
}