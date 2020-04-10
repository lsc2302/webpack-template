const { resolve } = require('path');
const webpack = require('webpack');

module.exports = {
    context: process.cwd(),
    entry:{
        vendorPackages: [
            'react',
            'react-dom',
            // 'react-router'            
        ]
    },
    output:{
        filename:'[name].js',
        path:resolve(__dirname, 'dll'),
        library:'[name]_[hash]'
    },
    plugins:[
        //generate manifest.json (mapping)
        new webpack.DllPlugin({
            name:'[name]_[hash]',
            path:resolve(__dirname, 'dll/manifest.json'),
        })
    ],
    mode:'production'
}