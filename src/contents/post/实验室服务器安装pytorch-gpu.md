---
title: 实验室服务器安装pytorch-gpu
published: 2023-03-29 23:22:33
category: 深度学习
tags:
  - Linux
comments: true
feature: true
cover: https://img.promefire.top/blog-img/20240110-e8ae7c031c2726aa6dd30afe5aa11e67.png
---



## 前言

​	实验室给分配了服务器账号，可以跑自己的深度学习代码，但是在配置的过程中出现了种种问题，记录如下

---

#### 0、解决服务器联网问题

> 首先你得有个vpn，点击[这里](https://ikuuu.eu/auth/login)注册下载

* 本机按 win + R输入cmd，在小黑框中输入ipconfig，记下本机ip地址
* 在**服务器**上输入以下指令

```sh
export http_proxy=http://172.xx.xx.xx:7890
export https_proxy=http://172.xx.xx.xx:7890
```

> 172.xx.xx.xx替换为第一步记下的本机IP地址，端口号7890替换成本机VPN的端口号

* 使用wget测试

```sh
wget www.baidu.com
```

![img](https://img.promefire.top/blog-img/20240110-a2ff1256ceb498b4eedcbbb59c021f76.png)



#### 1、使用WinScp将`Anaconda3-2021.11-Linux-x86_64.sh`上传至自己服务器

给权限

```sh
chmod +x Anaconda3-2021.11-Linux-x86_64.sh
```

安装

```sh
./Anaconda3-2021.11-Linux-x86_64.sh
```

一路回车，有的地方需要输入yes

安装完成后

输入`conda -V`测试是否安装成功

* 中间如果遇到问题，试试断开putty重新连接

#### 2、创建虚拟环境

```sh
#创建虚拟环境
conda create -n py3.9 python=3.9
#激活虚拟环境
conda activate py3.9
```

3、安装pytorch-gpu

在激活的虚拟环境下输入以下命令

```
conda install pytorch==1.13.1 torchvision==0.14.1 torchaudio==0.13.1 pytorch-cuda=11.6 -c pytorch -c nvidia
```

* 如果出现Solving environment: failed with initial frozen solve. Retrying with flexible solve

conda config --set channel_priority false

再次出现这个错误时不必理会，耐心等待即可



附：

pytorch-gpu测试代码

```python
import torch
flag = torch.cuda.is_available()
print(flag)
ngpu= 1
# Decide which device we want to run on
device = torch.device("cuda:0" if (torch.cuda.is_available() and ngpu > 0) else "cpu")
print(device)
print(torch.cuda.get_device_name(0))
print(torch.rand(3,3).cuda()) 

```

结果：

![img](https://img.promefire.top/blog-img/20240110-47ad2859c9673164f7503b3891a342f4.png)

指定GPU0来跑代码

```python
import os
os.environ["CUDA_VISIBLE_DEVICES"] = "0"

```



--------------------------------------------------------------------------------------------------------------------------------------------------

更简单的方法：安装打包好的带pytorch-gpu的虚拟环境（只需要看第二步） 

#### 打包anaconda虚拟环境：

##### 1、将要迁移的环境打包

```sh
conda pack -n 虚拟环境名称 -o output.tar.gz
```

- 如果报错：No command 'conda pack'
  尝试使用：`conda install -c conda-forge conda-pack`



##### 2、迁移

- 进到conda的安装目录：/anaconda3/envs/
- 在该目录下新建文件夹py3.9
- 复制output.tar.gz压缩文件到/anaconda3/envs/py3.9/下，在该目录下解压 `tar -xzvf output.tar.gz`

---

1、查看服务器GPU

```sh
nvidia-smi
```

![](https://img.promefire.top/blog-img/20240110-0f456eaf404cc1bae0daa51f35492404.png)

[Anaconda3-2021.11-Linux-x86_64.sh](https://pan.baidu.com/s/1r_DfpurqY15AJy3fe0B4Wg?pwd=1r03)

[output.tar.gz](https://pan.baidu.com/s/1fCvn_0xDnb-HuOrjCkC00Q?pwd=7fqg)