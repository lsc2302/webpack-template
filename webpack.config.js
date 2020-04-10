const { resolve } = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin');
const WorkBoxWebpackPlugin = require('workbox-webpack-plugin');
const webpack = require('webpack');
const AssetHtmlWebpackPlugin = require('add-asset-html-webpack-plugin');

// mainly for post-css browserslist item in package.json
//ES6+'production' = auto tree shaking
process.env.NODE_ENV = 'production'

// style-loader has built-in HMR, MiniCssExtractPlugin doesn't 
const p = process.env.NODE_ENV==='production'
console.log(p)

module.exports = {
    //keep HTML HMR
    entry:{
        js:'./src/index.js',
        html:'./src/index.html'
    },
    output:{
        filename:'js/[name]-[hash:10].js',
        path:resolve(__dirname,'build')
    },
    module:{
        rules:[
            {
                test:/\.js$/,
                loader:'eslint-loader',
                enforce:'pre',
                exclude:/node_modules/,
                options:{
                    fix:true,
                }
            },
            {
                oneOf:
                [
                    {
                        test:/\.css$/,
                        exclude:/node_modules/,
                        use:[
                            // 'style-loader',
                            // MiniCssExtractPlugin.loader,
                            p? MiniCssExtractPlugin.loader:'style-loader',
                            {
                                loader:'css-loader',
                                options:{
                                    modules:true,
                                }
                            },
                            {
                                loader:'postcss-loader',
                                options:{  
                                    ident:'postcss',
                                    plugins:[()=>{
                                        require('postcss-preset-env')()
                                    }]
                                }
                            }
                        ]
                    },
                    {
                        test:/\.less$/,
                        exclude:/node_modules/,
                        use:[
                        // 'style-loader',
                        // MiniCssExtractPlugin.loader,
                        p? MiniCssExtractPlugin.loader:'style-loader',
                        {
                            loader:'css-loader',
                            options:{
                                modules:true,
                            }
                        },
                        'less-loader'
                        ]
                    },
                    {
                        test:/\.s(a|c)ss/,
                        exclude:/node_modules/,
                        use:[
                            // 'style-loader',
                            // MiniCssExtractPlugin.loader,
                            p? MiniCssExtractPlugin.loader:'style-loader',
                            {
                                loader:'css-loader',
                                options:{
                                    modules:true,
                                }
                            },
                            'sass-loader'
                        ]
                    },
                    {
                        test:/\.(png|jpg|gif)$/,
                        exclude:/node_modules/,
                        loader:'url-loader',
                        options:{
                            limit: 8 * 1024,
                            name:'[hash:10].[ext]',
                            esModule:false,
                            outputPath:'imgs'
                        }
                    },
                    {
                        test:/\.html$/,
                        exclude:/node_modules/,
                        loader:'html-loader',
                    },
                    {
                        exclude:/\.(html|js|css|less|s(a|c)ss)$/,
                        loader:'file-loader',
                        options:{
                            name:'[hash:10].[ext]',
                            outputPath:'imgs',
                        }
                    },
                    {
                        test:/\.js$/,
                        exclude:/node_modules/,
                        use:[
                            {
                                loader:'thread-loader',
                                options:{
                                    workers:2
                                }
                            },
                            {
                                loader:'babel-loader',
                                options:{
                                    //need hash file name
                                    //hash: bundle make all hash files expire
                                    //chunkhash: same chunk same hash
                                    //contenthash: same content, hash doesn't change
                                    // cacheDirectory:true
                                },
                            }
                        ]
                        
                    }
                ]
            }
        ]
    },
    plugins:[

        new HtmlWebpackPlugin({
            template:'./src/index.html',
            minify:{
                collapseWhitespace:true,
                removeComments:true
            }
        }),

        // extract css files into one file
        new MiniCssExtractPlugin({
            filename:'css/built-[hash:10].css'
        }),
        // minimize css
        new OptimizeCssAssetsWebpackPlugin(),

        //progressive web app (PWA) and service-worker
        new WorkBoxWebpackPlugin.GenerateSW({
            // fast boot
            // generate service-worker.js
            clientsClaim:true,
            skipWaiting:true
        }),
        // reference json, tell webpack not bundle these packages
        new webpack.DllReferencePlugin({
            manifest:resolve(__dirname, 'dll/manifest.json')
            }
        ),
        //auto import 
        new AssetHtmlWebpackPlugin({
            filepath:resolve(__dirname, 'dll/vendorPackages.js')
        })
    ],
    // mode:'development',
    mode:'production',
    devServer:{
        contentBase:resolve(__dirname,'build'),
        compress:true,
        host:'localhost',
        port:3000,
        open:true,
        hot:true,
        watchOptions: {
            ignored: /node_modules/
        }
    },

    //[inline-|hidden-|eval-][nosources-][cheap-[module-]]source-map

    //inline: faster outline: built files

    //source-map: outline, err info, err position
    //inline-source-map:inline, only 1 source-map, err info, err position
    //hidden-source-map:outline, error reason, no err position
    //eval-source-map:inline source-map for every file, err info, err position
    //nosources-source-map:outline, err info, no source code
    //cheap-source-map:outline, err info, err position(row)
    //cheap-module-source-map:outline, err info, err position(row)

    //development:eval-source-map(prefer)
    //speed(fast):eval>inline>cheap
    //debug-friendly: source-map

    //production: source-map(prefer)

    devtool:'source-map',

    //code-split 
    optimization:{
        splitChunks:{
            chunks:'all'
        }
    },

    externals:{
        //lib name npm-name
        jquery:'jQuery'
    },
    resolve:{
        alias:{
            '$css':resolve(__dirname, 'src/components/css')
        },
        extensions:['.js','.json','.jsx'],
        modules:[resolve(__dirname, './node_modules'),'node_modules']
    }
}