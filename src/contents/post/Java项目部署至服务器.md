---
title: Java项目部署至服务器
published: 2021-03-06 18:12:40
category: 后端学习
tags:
  - Java
description: 环境配置 项目打包 项目部署 
---



### 部署流程：

1、服务器配置好Java web项目运行环境

2、本地将java web项目打包成`.jar`或`.war`文件

3、将打包好的文件上传至服务器并移动至tomcat安装目录下`webapps`路径下



### 环境配置

1、服务器安装Java环境，即下载jdk

```sh
yum -y install java-1.8.0-openjdk
```

2、服务器安装tomcat

[Tomcat官网](http://tomcat.apache.org/)下载`tar.gz`安装包并上传至服务器解压，在bin目录下输入

```sh
./startup.sh
```

启动服务器



### 项目打包

1、点击`Project Structure` -> 点上边绿色加号 -> 点击 `Web Application: Archive` -> 选择`For'XXX'`—> 上面`Include in project`勾选 -> 点击Apply 、ok

![image-20210306175841970](https://img.promefire.top/blog-img/20240110-7b30539b4855e472bb5932cfa9cc88a5.png)

2、点击菜单栏的`build` ，选择`build Artifacts`

![image-20210306180229527](https://img.promefire.top/blog-img/20240110-0b4c042ca25edd73082ba0b0c656343c.png)

3、最后在`out`文件夹找到生成的`war`包



### 项目部署

把打包好的`war`包放到`tomcat`的**`webapps`**文件夹下，然后重启`tomcat`就可以了，**`tomcat`会自动解压**。
 注意项目启动后访问路径会发生变化，如之前的访问路径是`/hello`,那么此时就得加上`webapps`下解压的那个项目文件夹的名字，即`/项目文件名/hello`。





### 附：

### Linux开启Mysql远程连接

1、开启用户的远程访问权限

```mysql
mysql -uroot -p
grant all privileges on *.* to 'root'@'%' identified by '123456' with grant option;
flush privileges;
```

> % 代表任意主机，可替换为ip地址。root是用户名，‘123456’指定登录密码，与root用户密码无关，不影响

2、开启防火墙端口

```sh
firewall-cmd --zone=public --add-port=80/tcp --permanent
```

3、重启防火墙

使用idea测试，连接成功

![image-20210306181017759](https://img.promefire.top/blog-img/20240110-dde0659de968aed00aae6a1e2708e9d7.png)







