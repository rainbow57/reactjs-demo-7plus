/**
 * Created by hammer on 2016/4/4.
 * 生产环境配置文件
 */
var webpack = require('webpack');
/*
 //公共部分单独打包
* @param 1  将公共模块提取，生成名为 common 的chunk
* @param 2  最终生成的公共模块的 js 文件名
* @param 3  公共模块提取的资源列表
*/

var commonsPlugin = new webpack.optimize.CommonsChunkPlugin('common','common.js');
var path = require('path');

var node_modules = path.resolve(__dirname, 'node_modules');
var pathToReact = path.resolve(node_modules, 'react/dist/react.min.js');

module.exports = {
    devtool: false,
    //插件项
    plugins: [
        commonsPlugin,  //公共部分单独打包
        new webpack.NoErrorsPlugin(),//跳过error
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false,
            }
        }),
        //开启production模式
        new webpack.DefinePlugin({
            'process.env': {NODE_ENV:  JSON.stringify("production")}
        })
        
    ],
    //页面入口文件配置
    entry: {
        main : path.resolve(__dirname,'app/main.js'),
        //material_ui:['material-ui']
    },
    
    //入口文件输出配置
    output:{
        path: path.resolve(__dirname,'build'),
        filename: "[name].min.js",   //// 输出文件名
        chunkFilename: "[name].chunk.min.js"          // 异步加载时需要被打包的文件名
    },

    module: {
        //加载器配置
        loaders: [
            //LESS文件先通过less-load处理成css，然后再通过css-loader加载成css模块，最后由style-loader加载器对其做最后的处理，
            // 从而运行时可以通过style标签将其应用到最终的浏览器环境
            {test: /\.less/, loader: 'style-loader!css-loader!less-loader'},
            //.css 文件使用 style-loader 和 css-loader 来处理
            { test: /\.css$/, loader: 'style-loader!css-loader' },
            //.js 文件使用 jsx-loader 来编译处理 jsx-loader可以添加?harmony参数使其支持ES6语法
            { test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel',
                query:{
                    presets:['es2015','react']
                } //备注：es2015用于支持ES6语法，react用于解决render()报错的问题
            },
            //.scss 文件使用 style-loader、css-loader 和 sass-loader 来编译处理
            { test: /\.scss$/, loader: 'style!css!sass?sourceMap'},
            //图片文件使用 url-loader 来处理，小于8kb的直接转为base64
            { test: /\.(png|jpg)$/, loader: 'url-loader?limit=8192'}
        ],
        noParse: [pathToReact]
    },
    //其它解决方案配置
    resolve: {
        //查找module的话从这里开始查找
        //root: 'E:/github/flux-example/app', //绝对路径
        //自动扩展文件后缀名，意味着我们require模块可以省略不写后缀名
        extensions: ['', '.js', '.json', '.scss'],
        //模块别名定义，方便后续直接引用别名，无须多写长长的地址
        alias: {
            AppStore : 'js/stores/AppStores.js',
            ActionType : 'js/actions/ActionType.js',
            AppAction : 'js/actions/AppAction.js',
            //'react': pathToReact,
            // 'react-dom':pathToReactDom,
        }

    },
    //外部方式引入第三方库
    externals: {
        'amazeui-react':"amazeui-react",
    }
};