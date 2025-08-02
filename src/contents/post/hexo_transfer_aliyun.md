---
title: hexo部署到服务器
published: 2024-04-17 16:10:24
category: 博客优化
tags:
  - Hexo
description: 服务器端同步更新
---



​		偶然发现租的阿里云服务器还可以低价续费一年，既然这样，还是把hexo博客迁移到服务器上吧。几年前迁移到服务器一次，当时是本机直接推送Github Page与服务器。但现在我用的是Github Action ，推送到Github Page无需在本机进行编译，如果用原来的方法推送服务器还得多一步本机编译过程。于是想能不能服务器监听Github仓库更新来自动部署hexo，整起！

## 服务器端

前置工作：1、git环境 2、Nginx

新建目录`/www/hexo/public` ,将github仓库中的**main**分支pull到该目录

> 后面宝塔建站不能放在其他敏感目录...

```sh
mkdir /www/hexo
mkdir public
cd public
git init
git remote add origin https://github.com/xxx/xxx.github.io.git
git pull origin main
```

安装`github-webhook-handler`

```sh
cd /www/hexo
npm install github-webhook-handler
```



### 创建hook

创建一个hook，作用是监听 `GitHub Webhook ` 事件并在收到 push 事件时执行一个 Shell 脚本进行部署

#### 监听脚本

新建`webhook.js`文件，如下

```js
var http = require('http')
var createHandler = require('github-webhook-handler')
var handler = createHandler({ path: '/', secret: 'yoursecret' })

function run_cmd(cmd, args, callback) {
  var spawn = require('child_process').spawn;
  var child = spawn(cmd, args);
  var resp = "";

  child.stdout.on('data', function(buffer) { resp += buffer.toString(); });
  child.stdout.on('end', function() { callback (resp) });
}

http.createServer(function (req, res) {
  handler(req, res, function (err) {
    res.statusCode = 404
    res.end('no such location')
  })
}).listen(7777)

handler.on('error', function (err) {
  console.error('Error:', err.message)
})

handler.on('push', function (event) {
  console.log('Received a push event for %s to %s',
    event.payload.repository.name,
    event.payload.ref);
    run_cmd('sh', ['./deploy.sh',event.payload.repository.name], function(text){ console.log(text) });
})

```

* `var handler = createHandler({ path: '/', secret: 'yoursecret' })` 中screct自己设置，后面在Github配置webhook会用到
* listen(7777)   监听端口要在安全组中打开

#### 执行脚本

新建脚本文件`deploy.sh` ,运行是执行pull操作，拉取main分支

```sh
#!/bin/bash

WEB_PATH='/www/hexo/public'

echo "Start deployment"
cd $WEB_PATH
echo "pulling source code..."
git reset --hard origin/main
git clean -f
git pull
git checkout main
echo "Finished."
```

* 要注意分支是`master`还是`main`

#### 后台运行

1、使用`nohup`命令后台执行`webhook.js`,输出日志到当前目录下`deploy.log` 

> **nohup** 英文全称 no hang up（不挂起），用于在系统后台不挂断地运行命令，退出终端不会影响程序的运行。

```sh
nohup node webhook.js > deploy.log &
```

2、使用screen

启动一个新的`screen`会话

```sh
screen -S webhook  #webhook是会话名称
```

执行

```sh
node webhook.js > deploy.log &
```



### Web显示

使用宝塔添加站点，网站根目录为`/www/hexo/public`,与上面保持一致，没有域名使用`IP:port` 

<img src="https://img.promefire.top/blog-img/20240417-222381e5aecc3b06365c99d2fe89641a.png" alt="image-20240417165820866" style="zoom:50%;" />



## Github配置webhook

​	在仓库`xxx.github.io` ---->setting------>Webhooks----->Add webhook

<img src="https://img.promefire.top/blog-img/20240417-b9d11ae064dfed4cb4f154f6e8c966cf.png" alt="image-20240417170516949" style="zoom:50%;" />



* Url 填`http://域名：监听端口` 或`http://IP:监听端口`
* 第二行选Json
* Secret在`webhook` 设置

## 结果

​	配置结束后，本机Git三件套推送至hexo_source(源码仓库)，Github Action编译更新静态文件仓库`xxxx.github.io`，静态文件仓库更新后使用webhook 配合nodejs自动进行服务器端页面更新。

Github Action：

<img src="https://img.promefire.top/blog-img/20240417-8b72a72c467e2acfed2087e24360f966.png" alt="image-20240417172520348" style="zoom:50%;" />

Webhook执行结果

![image-20240417181230749](https://img.promefire.top/blog-img/20240417-f852239f41cecb25789e7f7d9cf53067.png)



服务器端日志

<img src="https://img.promefire.top/blog-img/20240417-463ef7007f2de935326283ddaaa8eaf7.png" alt="image-20240417172622858" style="zoom:50%;" />

参考：

https://blog.mutoe.com/2017/deploy-hexo-website-to-self-server

https://www.jianshu.com/p/e4cacd775e5b















