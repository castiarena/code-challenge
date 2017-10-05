import webpack from 'webpack';
import WebpackDevServer from 'webpack-dev-server';
import open from 'open';
import express from 'express';
import routes from './routes';
import config from './webpack.config.babel';

const port = 9000;


Object.keys(config.entry).forEach( bundle =>
    config.entry[bundle] = [
        config.entry[bundle],
        'webpack/hot/dev-server',
        `webpack-dev-server/client?http://localhost:${port}/`
    ]);

config.plugins = config.plugins || [];
config.plugins.push(new webpack.HotModuleReplacementPlugin());
const compiler = webpack(config);

const devServer = new WebpackDevServer(compiler, {
    hot: true,
    inline: true,
    stats: { colors: true },
    port
});

devServer.app.use(routes);
devServer.app.use(express.static('build'));
devServer.app.set('views', __dirname + '/src/views');
devServer.listen(port, 'localhost', () =>
    open(`http://localhost:${port}/`)
);