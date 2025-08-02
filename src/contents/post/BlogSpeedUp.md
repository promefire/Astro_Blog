---
title: 给博客提提速！
description: 加速墙内访问
published: 2024-01-16 15:11:22
category: 博客优化
tags:
  - Hexo
cover: https://img.promefire.top/blog-img/20240116-65c9d911d479e3ee19493fb524b9493f.png
---

## 前言

​	部署在Github 的博客墙内访问很糟糕，博客提速刻不容缓！



## 使用cloudflare加速Github pages

### 设置域名解析

首先要有一个域名，添加解析记录 ,记录类型选择`CNAME` ,记录值写`username.github.io` ,如图

![image-20240109191314520](https://img.promefire.top/blog-img/20240115-f9f3f702a64c4980d943f5d8f13b7f17.png)

### 设置Github Page

Github Page 提供了`Custom domain` 服务，

在`username.github.io` 仓库下 `setting` ->  `Pages` ->`Custom domain`  填入域名`blog.promefire.top` 。保存后会在根目录生成`CNAME` 文件，里面保存域名配置信息

![](https://img.promefire.top/blog-img/20240110-1aa5949d2b207f4e00efe905bb1789ee.png)

## 使用 Clouddlare CDN

1、点击[这里](https://dash.cloudflare.com/sign-up)注册，选择免费套餐

2、添加站点

这要要填二级域名，不是前加`blog` 的子域名

![image-20240109193609504](https://img.promefire.top/blog-img/20240115-2f50787d20441ebb0c8059fa1952492e.png)

3、提交之后会自动扫描域名的解析,

4、在域名注册机构（我的是阿里云）处添加DNS解析

![image-20240109194118591](https://img.promefire.top/blog-img/20240116-5d6393328a89c2ab8f95bc961af73ac0.png)

在域名控制台选择 DNS修改--->修改DNS服务器，将上图**已分配的Cloudflare名称服务器** 的两行输入。需要等待一段时间才会更改

![image-20240109194308296](https://img.promefire.top/blog-img/20240116-a1205f96b6a8fe94e81b9fd833be45a1.png)



浏览器输入`chrome://net-internals/?#dns` 清空DNS缓存，再次访问`blog.promefire.top` 。F12查看`Sever` 是 `cloudflare` 了

![image-20240109195046681](https://img.promefire.top/blog-img/20240115-d36689dff2d5c7bb12df2440ef494507.png)

### 原理

!!! note 什么是CDN？
     CDN（Content Delivery Network, 内容分发网络）是为加快网络访问速度而建立在现有网络之上的分布式网络，它依靠部署在全球各地边缘节点的服务器群，通过负载均衡，内容发布，内容管理和内容存储的功能，由CDN服务器集群分担源站点服务器集群的压力，使用户可以就近获取已缓存的访问资源，避免网络拥堵，加快访问速度。与此同时，CDN是基于DNS解析进行管理的，其利用DNS技术和HTTPS协议确保了传输内容的安全性，保障用户的访问内容的安全性。



​		CDN的基本原理是依靠部署在各个区域大量缓存服务器的响应。当用户访问网站时，不需要访问站点的DNS服务器，而是利用全局负载技术将用户的请求直接指向最近的缓存服务器上，且保证服务器是正常工作的，访问的路径和内容是传输安全的，由此缓存服务器直接响应客户的请求。访问缓存服务器可以尽可能地避免网络拥堵状况，使传输的内容更加迅速和稳定。

​		

### 问题1、重定向次数太多无法访问

解决：将Cloudflare中的**SSL/TLS加密模式**  修改为**完全(严格)**

原因：当网站开启了 CloudFlare 服务，用户访问我们的网站时，其实访问的离用户比较近的 Cloudflare 服务器，Cloudflare 再代理用户请求我们的源服务器，以达到加速和保护源服务器的目的。Cloudflare 代理用户请求我们源服务器获取网页资源的过程叫回源。

Cloudflare 造成循环重定向的错误就出在了回源的过程中，造成这种错误的原因就是 http 和 https 之间的重定向。

### 问题2、部署一次后`custom domain` 失效

在`source` 目录下新建文件`CNAME` ，写入解析的域名`blog.promfire.top` 

### 参考：

网站性能分析工具：[PageSpeed Insights](https://pagespeed.web.dev/)

[fast-github-page-with-cloudflare](https://monkeywie.cn/2020/08/20/fast-github-page-with-cloudflare/)

[use-cloudflare-speed-up-github-pages](https://sumygg.com/2023/11/13/use-cloudflare-speed-up-github-pages/index.html)

[CDN的好处](https://www.cloudflare.com/zh-cn/learning/cdn/cdn-benefits/)



## 使用cloudflare R2做博客图床

之前地Github 图床因为墙内访问不友好，弃之。

为什么选择R2图床? {% hideInline 免费！且墙内可访问,查看答案,#FF7242,#fff %}

跟着[参考教程](https://blog.huacai.one/post/3) 走没什么问题。



## 图片懒加载

butterfly自带图片懒加载 。 比`hexo-lazy-image` 好用多了  :sob:  感谢 [Metal-Cell](https://blog.gz-metal-cell.top/)

```yaml
# Lazyload (圖片懶加載)
# https://github.com/verlok/vanilla-lazyload
lazyload:
  enable: true
  field: site # site/post
  placeholder:
  blur: false  #使用模糊效果作为占位符
```



## 图片压缩

调整分辨率并转格式

* 将图像调整为原图的70%，直到图像分辨率小于 `1280 × 1280`。
* 使用`webp`格式保存图像

```python
# -*- coding: utf-8 -
import cv2
from PIL import Image
import sys
import os
import numpy as np

def GetArgs():
    args = sys.argv
    if(len(args) > 1):
        arg1 = args[1]  # 文件加路径

    return arg1.replace('\\','\\\\')

def list_files_in_folder(folder_path):
    # 获取文件夹中的所有文件和子文件夹
    files_and_folders = os.listdir(folder_path)

    # 遍历文件和子文件夹
    for item in files_and_folders:
        # 获取完整路径
        img_path = os.path.join(folder_path, item)
        CompressImg(img_path, img_path, 70)
    print(f"Image resized and saved")


def CompressImg(inImg, outImg, scale_percent):
    min_width = 1280
    min_height = 1280

    # img = cv2.imread(inImg)
    img = cv2.imdecode(np.fromfile(inImg,dtype=np.uint8),-1)
    if img is None:
        print(f"无法读取图像: {inImg}")
        return

    # 检查图像大小是否为空
    if img.size == 0:
        print(f"图像大小为空: {inImg}")
        return

    # 等比例缩小图像直到图像宽/高小于设定的值
    while img.shape[1] > min_width and img.shape[0] > min_height:
        # 计算调整后的大小 等比例缩小
        new_width = int(img.shape[1] * scale_percent / 100)
        new_height = int(img.shape[0] * scale_percent / 100)

        # 调整图像大小
        resized_img = cv2.resize(img, (new_width, new_height))

        pil_img = Image.fromarray(cv2.cvtColor(resized_img, cv2.COLOR_BGR2RGB))
        pil_img.save(outImg, 'webp')
        print(outImg)

        img = resized_img


if __name__ == "__main__":
    dir_path = GetArgs()
    print("dir_path = " + str(dir_path))
    list_files_in_folder(dir_path)
```

* 终端运行` python CompressImg.py xxx` ,`xxx`为文件夹路径，用`“\\”`隔开 
* 最后格式还是jpg是因为中途失误使用`  pil_img.save(outImg, 'webp')`  转换为`webp`格式但后缀没改，发现好像没什么影响，图片还是压缩了,就不改了
* `cv2.imread` 无法读取中文路径问题：将` img = cv2.imread(inImg)` 修改为`img = cv2.imdecode(np.fromfile(inImg,dtype=np.uint8),-1)`

效果很显著！

> 在线[视频转Gif](https://www.adobe.com/cn/express/feature/video/convert/video-to-gif)

![compressImg](https://img.promefire.top/blog-img/20240116-39b24fa18e875075e70a01120dd915ec.gif)

