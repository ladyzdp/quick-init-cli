# quick-init-cli

一个基于vue-cli创建的vue2.0项目，该项目包含一些基本的初始化配置


## 特点

- mock.js 内置mock.js假数据模拟
- webpack-bundle-analyzer 打包分析工具
- compression-webpack-plugin 打包生成Gzip配置
- uglifyjs-webpack-plugin 混淆压缩的代码
- filemanager-webpack-plugin 打包生成zip文件

## 使用

全局安装

node >=12

```bash

npm install quick-init-cli -g

```

## 查看版本号

```bash

quick-init-cli -V

```

## 快速创建项目

```bash

quick-init-cli  create <项目名称>

```