# grunt-imweb

> 基于Grunt的构建任务集合。将团队项目开发中常用的任务打包封装，满足从开发到发布的一系列需求。

## 项目依赖
* node > 0.8.0
* grunt-cli > 0.1.8
* yo >= 1.0.0-rc.1.4
* compass >= 0.12.2

## 入门
这个插件依赖 Grunt `~0.4.1`

如果对Grunt还不是很熟悉 [Grunt](http://gruntjs.com/) , 可以看下官方的入门教程 [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile)， 或者俺之前写的一篇小总结[《grunt从入门到自定义项目模板》](http://www.cnblogs.com/chyingp/archive/2013/05/11/grunt_getting_started.html)
然后嘛，就是安装 grunt-imweb 了

```shell
npm install grunt-imweb --save-dev
```

插件安装完成后，可以在Gruntfile里通过如下代码引用它

```js
grunt.loadNpmTasks('grunt-imweb');
```

## 插件详解

### Overview
在Gruntfile.js里，通过`grunt.initConfig()`添加如下配置即可。目前`grunt-imweb`插件支持两个任务，分别是`dev`、`dist`，由于目前尚为开放任何配置项，所以，把下面这段代码copy过去就完成了配置。
注意，由于当前未开放任何配置，所以会有几个小小的约定：

1. 源码需放在根目录下的`src`目录
2. 其他

```js
grunt.initConfig({
  dev: {
    options: {
      // Task-specific options go here.
    },
    your_target: {
      // Target-specific file lists and/or options go here.
    }
  },
  dist: {
    options: {
      // Task-specific options go here.
    },
    your_target: {
      // Target-specific file lists and/or options go here.
    }
  }
})
```

### Options
当前还没开放任何配置项，很快会补齐的！

### 使用例子

#### dev任务
在根目录下运行如下命令，`src`目录的文件就会生成到`dev`目录，目前主要作用是编译`.scss`文件，后续还会加入其他类型的预编译任务 @todo
	
	grunt dev

#### dist
在根目录下运行如下命令，`src`目录下的文件就会被发布到`dist`目录，目前完成的任务主要有`.scss`文件编译、文件文件打包合并、cdn路径替换等。此处的配置项很快就会打开 @todo
	
	grunt dist

## 代码贡献
注意代码风格、单元测试等。话说这个项目的单元测试也还没做阿喂~@todo 单元测试

## Release History
2013.10.24 Initialize the project with some necessary files.
