---
title: hexo + Github Action自动部署
published: 2023-12-17 16:10:24
category: 博客优化
tags:
  - Hexo
---

## 写在前面

​		为什么要用github action实现全自动部署呢，每次`hexo d`在本机编译太麻烦了。而使用Github Action，我们只需要完成博客得遍写和修改后，将改动推送到远程仓库，之后得工作交给CI完成即可。

>  Github Action是一种CI\CD服务
>
> CI\CD 其实说的是三件事情：「持续集成（Continuous Integration）」、「持续交付（Continuous Delivery）」、「持续部署（Continuous Deployment）」。
>
> 因为「持续交付」和「持续部署」的英文缩写是一样的，所以这三件事情缩写成了 CI\CD 。



## 安装

参考教程：[使用Github Action实现全自动部署](https://akilar.top/posts/f752c86d/) 已经很详细了，跟着操作就能成功。有两点需要注意



- 2020年10月后github新建仓库默认分支改为main。在`autodeploy.yml` 最后一行要写成master:main表示从本地的master分支推送到远程的main

* 主题 themes/butterfly 文件夹下有`.git` 文件夹存在，推送至github会识别成子文件夹，导致生成静态文件时缺少主题文件，博客白屏。先将`.git` 文件删除后再上传

### 查看部署情况

1、打开GIthub存放源码的私有仓库，找到action。

2、根据刚刚的Commit记录找到相应的任务

3、点击Deploy查看部署情况

![Action](https://raw.githubusercontent.com/promefire/Myblog/main/image-20231224123219614.png)

在博客根目录下添加一个`back.sh`文件

```sh
git add .
git commit -m "$1" 
git push origin master
```

写完博客后运行`sh back.sh xxxx` 交给Github Action部署。"xxxx" 记录一下commit内容,方便出问题回滚代码版本



参考：[使用Github Action实现全自动部署](https://akilar.top/posts/f752c86d/)

​			[Github Action 文档](https://docs.github.com/en/actions/using-workflows/events-that-trigger-workflows#schedule)