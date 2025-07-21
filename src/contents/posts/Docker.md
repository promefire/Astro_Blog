---
title: Docker相关
published: 2024-01-16 15:08:14
category: 后端学习
tags:
  - Docker
  - 容器化
cover: https://img.promefire.top/blog-img/20240116-b4bbb869224799d59326ffa6f48b3949.png
description: Docker是个好东西
---




![img](https://img.promefire.top/blog-img/20240116-b4bbb869224799d59326ffa6f48b3949.png)

## CentOS下安装

1、下载docker-ce的yum源

```sh
sudo wget -O /etc/yum.repos.d/docker-ce.repo https://mirrors.aliyun.com/docker-ce/linux/centos/docker-ce.repo
```

2、安装Docker

```sh
sudo yum -y install docker-ce
```

3、检查是否安装成功

```
sudo docker -v
```

![image-20240105185232095](https://img.promefire.top/blog-img/20240116-262d8f65031ff1f77a30c1d11147f7ed.png)





---

4、启动Docker服务，并设置开机自启

```sh
sudo systemctl start docker
sudo systemctl enable docker
```

5、检查是否启动

```sh
sudo systemctl status docker
```

![image-20240105185408621](https://img.promefire.top/blog-img/20240116-5d742c3d284c9587400c349badca43f8.png)



## Docker是什么

> **Docker 属于 Linux 容器的一种封装，提供简单易用的容器使用接口**
>
> Docker 将应用程序与该程序的依赖，打包在一个文件里面。运行这个文件，就会生成一个虚拟容器。程序在这个虚拟容器里运行，就好像在真实的物理机上运行一样。有了 Docker，就不用担心环境问题。

简而言之就是 代码 + 环境 。可以方便地运行、迁移。



## image文件

**Docker 把应用程序及其依赖，打包在 image 文件里面。**只有通过这个文件，才能生成 Docker 容器。image 文件可以看作是容器的模板。Docker 根据 image 文件生成容器的实例。同一个 image 文件，可以生成多个同时运行的容器实例。

## 容器文件

**image 文件生成的容器实例，本身也是一个文件，称为容器文件。**也就是说，一旦容器生成，就会同时存在两个文件： image 文件和容器文件。而且关闭容器并不会删除容器文件，只是容器停止运行而已。





## 实例

从[镜像仓库](https://hub.docker.com/u/library)拉取镜像

```sh
docker image pull library/hello-world
```

`docker image pull`是抓取 image 文件的命令。`library/hello-world`是 image 文件在仓库里面的位置，其中`library`是 image 文件所在的组，`hello-world`是 image 文件的名字。



查看image文件

```sh
docker image ls
```



运行image文件

```
docker container run hello-world
```

`docker container run`命令会从 image 文件，生成一个正在运行的容器实例。

注意，`docker container run`命令具有自动抓取 image 文件的功能。如果发现本地没有指定的 image 文件，就会从仓库自动抓取。因此，前面的`docker image pull`命令并不是必需的步骤。





## 常用命令

![image-20240607102112516](https://img.promefire.top/blog-img/20240607-fe718107f6acdd72587af484303c4d96.png)



运行命令

```sh
docker run -v /root/redis/redis.conf:/etc/redis/redis.conf \
-v /root/redis/data:/data \
-d --name redis-server \
-p 6379:6379 \
redis:latest 
```

* -d :容器后台运行
* -p：宿主机端口映射到容器内端口
* --name 起名字
* -v： 数据卷挂载

> 数据卷：是一个虚拟目录，是容器内目录和宿主机目录之间映射的桥梁。双向映射

挂载不指定，会自动创建

![image-20240607105222350](https://img.promefire.top/blog-img/20240607-5b5242507a7a76410c8daf080633f71d.png)



进入容器内部

```sh
docker exec -it redis-server bash
```

* -it 添加一个可输入的终端
* bash 表示使用命令行交互





> 有个特别需要注意的点：开启多个docker容器会造成很大的性能消耗，我在阿里云学生机启动三个docker就会直接死机/(ㄒoㄒ)/~~







## 参考：

[Docker 入门教程](https://ruanyifeng.com/blog/2018/02/docker-tutorial.html)

