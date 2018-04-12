const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CheckerPlugin = require('awesome-typescript-loader').CheckerPlugin;
const bundleOutputDir = './wwwroot/dist';

module.exports = (env) => {
    const isDevBuild = !(env && env.prod);
    const codeBanner = `// Auto-generated code. Don't modify.\n`;
    const cssModulesQuery = `typings-for-css-modules-loader?banner=${codeBanner}&modules&namedExport&camelCase&sourceMap&importLoaders=1&localIdentName=[name]__[local]__[hash:base64:5]`;
    const sassModulesQuery = `typings-for-css-modules-loader?banner=${codeBanner}&modules&sass&namedExport&camelCase&sourceMap&importLoaders=1&localIdentName=[name]__[local]__[hash:base64:5]!sass-loader`;

    return [{
        stats: { modules: false },
        entry: { 'main': './ClientApp/boot.tsx' },
        resolve: { extensions: ['.js', '.jsx', '.ts', '.tsx'] },
        output: {
            path: path.join(__dirname, bundleOutputDir),
            filename: '[name].js',
            publicPath: 'dist/'
        },
        module: {
            rules: [
                { test: /\.tsx?$/, include: /ClientApp/, use: 'awesome-typescript-loader?silent=true' },
                { test: /\.css$/, use: ExtractTextPlugin.extract({ use: isDevBuild ? cssModulesQuery : cssModulesQuery + "&minimize" }) },
                { test: /\.scss$/, use: ExtractTextPlugin.extract({ use: isDevBuild ? sassModulesQuery : sassModulesQuery + "&minimize" }) },
                { test: /\.(png|jpg|jpeg|gif|svg)$/, use: 'url-loader?limit=25000' }
            ]
        },
        plugins: [
            new CheckerPlugin(),
            new webpack.DllReferencePlugin({
                context: __dirname,
                manifest: require('./wwwroot/dist/vendor-manifest.json')
            }),
            new ExtractTextPlugin({
                filename: "[name].css"
            }),
            new webpack.WatchIgnorePlugin([
                /\.s?css\.d\.ts$/
            ])
        ].concat(isDevBuild ? [
            // Plugins that apply in development builds only
            new webpack.SourceMapDevToolPlugin({
                filename: '[file].map', // Remove this line if you prefer inline source maps
                moduleFilenameTemplate: path.relative(bundleOutputDir, '[resourcePath]') // Point sourcemap entries to the original file locations on disk
            })
        ] : [
            // Plugins that apply in production builds only
            new webpack.optimize.UglifyJsPlugin(),
        ])
    }];
};