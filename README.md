# reactjs-demo-7plus
这个是新开的学习reactJS的工程，专注学习reactjs基础。并学会在微信公众号页面使用微信支付，支付宝支付。

> 学习react-native时，完全进行不下去了，完全没有reactjs基础不行呀

>推荐一个学习[视频网站](http://www.ejiakt.com/album/show/211)

# 如何运行

安装

```npm intall ```

运行开发模式

```npm run dev ```

生产环境打包

```npm run dev ```

打开http://localhost:7777进行预览

# lesson one  搭建reactjs+webpack开发环境

# lesson two  使用material-ui作为项目的ui

# lesson three 重构项目分配开发生产环境

由于在开发过程中配置文件使用了动态加载，在生产环境配置文件要做相应的修改，具体教程参见blog[react基础：react0.14.7+webpack开发生产环境的区别](http://hammercui.github.io/post/react%E5%9F%BA%E7%A1%80%EF%BC%9Areact-webpack%E5%BF%AB%E9%80%9F%E6%90%AD%E5%BB%BA2%EF%BC%9A%E5%BC%80%E5%8F%91%E7%94%9F%E4%BA%A7%E7%8E%AF%E5%A2%83%E7%9A%84%E6%90%AD%E5%BB%BA/);

# webpagck打包后压缩js文件

经过测试发现，在使用了压缩技术后，编译后体积重`662kb`缩减到了
`590k`,压缩技巧如下

生产环境config文件新增

```
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
```

结论：
体积还是太大了，经过反复测试发现时使用`material-ui`这个组件库的原因。
所以在app环境放弃`material-ui`，使用[react-weui](https://github.com/weui/react-weui)。
当然在pc环境还可以继续使用，毕竟还是挺快的。