const path = require("path");
const ExtractTextPlugin = require('extract-text-webpack-plugin');
// 引入HappyPack
const HappyPack = require('happypack');
// size为happypack处理时共享进程池的个数
const happyThreadPool = HappyPack.ThreadPool({ size: 3 });
//使用happypack
// module.exports = {
//     mode: 'development',
//     //入口
//     entry: {
//         main: './src/main.js',
//         main1: './src/main1.js',
//         main2: './src/main2.js',
//         main3: './src/main3.js',
//     },
//     output: {
//         // 打包的路径
//         path: path.resolve(__dirname, '../dist'),
//         // 打包的文件名
//         filename: '[name].js',
//     },
//     module:{
//         rules: [
//             {
//                 // 把对 .js 文件的处理转交给 id 为 babel 的 HappyPack 实例
//                 test: /\.(jsx|js)$/,
//                 loader: 'happypack/loader?id=happyBabel',
//                 exclude: /node_modules/
//             },
//             {
//                 // 把对 .css 文件的处理转交给 id 为 css 的 HappyPack 实例
//                 test: /\.css$/,
//                 use: ExtractTextPlugin.extract({
//                     use: ['happypack/loader?id=happyCss'],
//                 }),
//             },
//         ]
//     },
//     plugins:[
//         new HappyPack({
//             // 唯一标识符 id 代表处理特定的文件
//             id: 'happyBabel',
//             // 如何处理 .js 文件，用法和 Loader 配置中一样
//             loaders: ['babel-loader?cacheDirectory=true'],
//             //使用共享进程池中的子进程去处理任务
//             threadPool: happyThreadPool,
//         }),
//         new HappyPack({
//             // 唯一标识符 id 代表处理特定的文件
//             id: 'happyCss',
//             // 如何处理 .js 文件，用法和 Loader 配置中一样
//             loaders: ['css-loader'],
//             //使用共享进程池中的子进程去处理任务
//             threadPool: happyThreadPool,
//         }),
//         new ExtractTextPlugin({
//             filename: `[name].css`,
//         })
//     ]
// }
//不使用happypack
module.exports = {
    mode: 'development',
    //入口
    entry: {
        main: './src/main.js',
        main1: './src/main1.js',
        main2: './src/main2.js',
        main3: './src/main3.js',
    },
    output: {
        // 打包的路径
        path: path.resolve(__dirname, '../dist'),
        // 打包的文件名
        filename: '[name].js',
    },
    module:{
        rules: [
            {
                test: /\.(jsx|js)$/,
                use: {
                    loader: 'babel-loader',
                },
                exclude: /node_modules/
            },
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: [{
                        loader: "css-loader"
                    }]
                })
            },
        ]
    },
    plugins:[
        // 样式分离
        new ExtractTextPlugin({
            filename: '[name].css',
            // 是否全部都打到一个里
            allChunks: false,
        })
    ],
}