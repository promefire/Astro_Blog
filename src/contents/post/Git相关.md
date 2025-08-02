---
title: Git相关
published: 2024-06-06 10:57:22
category: 开发工具
tags:
  - Git
  - 版本控制
cover: https://img.promefire.top/blog-img/20240621-f075f52abba3010085b88a24969d23e4.png
description: git常用命令
---

## 前言

近期有工作的朋友问我git有关的问题，于是顺便系统地学了一下Git。记录一下常用的一些命令。



## 配置ssh

### github添加密钥

```
git config --global user.name "xxxxxxx"
git config --global user.email "xxxxxx@qq.com"
ssh-keygen -t rsa -C "xxxxxxx@qq.com"
```

完成后会在提示的路径下生成两个文件`id_rsa`和`id_rsa.pub`前者是私钥，后者公钥，

查看公钥内容

```shell
cat /root/.ssh/id_rsa.pub
```

复制内容，在github中点击右上角头像，依次打开"Setting"--“SSH and GPG keys”--"New SSH Key" 粘贴

如果还不行，配置本地`~/.ssh/config` 文件，添加如下内容：

```
Host github.com
    Hostname ssh.github.com
    Port 443
    User git
    IdentityFile ~/.ssh/id_ed25519  # 替换为你的密钥路径
```

保存后尝试`ssh -T git@github.com` 

## 工作流程



![img](https://img.promefire.top/blog-img/20240621-d6b4917de1e088c9212debb0196a6939.png)





1. clone（克隆）: 从远程仓库中克隆代码到本地仓库

2. checkout （检出）:从本地仓库中检出一个仓库分支然后进行修订

3. add（添加）: 在提交前先将代码提交到暂存区

4. commit（提交）: 提交到本地仓库。本地仓库中保存修改的各个历史版本

5. fetch (抓取) ： 从远程库，抓取到本地仓库，**不**进行任何的**合并**动作，一般操作比较少。

6. pull (拉取) ： 从远程库拉到本地库，自动进行**合并**(merge)，然后放到到工作区，相当于**fetch+merge**

7. push（推送） : 修改完成后，需要和团队成员共享代码时，将代码推送到远程仓库

![img](https://img.promefire.top/blog-img/20240621-f3cf4e10adf091b00a0a54acf20838e9.png)



git status : 查看修改的状态

### 基本配置

```shell
git config --global user.name "xxxx"
git config --global user.email "xxxx"
```



### 版本回退

通过`git log `查看**commitID**

```shell
git reset --hard commitID
```

--hard 表示强制将当前分支重置到指定的"commitID",工作目录和暂存区的所有更改都会背覆盖

### push指定commit

有时候使用`git commit` 提交了多个版本，选择某一个版本提交，而且会把该版本之前未push的commit都提交。

```
git push origin commitId:分支名
```

## 远程仓库

```shell
#添加远程仓库
git remote add origin xxxxxxxxx

#查看
git remote
# 推送
git push origin master
# 拉取远程并合并
git pull origin master
```



## 分支

`git checkout -b xxx`:创建并切换分支

`git merge xxx`:将xxx分支内容合并到当先分支

`git branch --list`查看分支

`git log --all --graph`图形化查看分支

### 删除分支

-  git branch -d b1 删除分支时，需要做各种检查 
-  git branch -D b1 不做任何检查，强制删除 





## 存储代码

> 当前环境下有修改的文件，未进行commit，此时无法切换分支。如有需要，先存储当前分支的更改，然后切换分支

`git stash` ：存储

`git stash apply`恢复

`git stash list`查看多次存储

`git stash apply stash@{2}`h恢复第二次存储的





## 撤销提交

```shell
使用 git commit --amend 修改最后一次提交。
使用 git reset --soft HEAD~1 撤销最后一次提交但保留更改。
使用 git revert <commit-hash> 逆转一个特定的提交。
使用 git rebase -i HEAD~n 交互式修改提交历史。一般不用
```

* `git revert`  逆转一个提交,

例如提交历史`A -> B -> C -> D` ,,其中b提交了一些更改,使用

```git
git revert <commit-hash-of-B>
```

会新生成一个提交,作用是撤销B的所有更改

```
A -> B -> C -> D -> E
```

> 感觉工作里用这个冲突会不少



* git reset
  *  --soft  只重置HEAD指针，不影响**暂存区**和**工作目录**
  * -- mixed  重置HEAD指针和暂存区 ，不影响**工作目录**
  * --hard   重置HEAD指针、暂存区和工作目录

> HEAD指针：1、指向当前的分支。2、如果使用了`git fetch` 只获取远程而不合并，HEAD指向当前的提交

| `git reset -- .`        | 取消所有暂存，保留工作区修改   | 需要重新选择部分文件提交 |
| ----------------------- | ------------------------------ | ------------------------ |
| `git reset --hard HEAD` | 彻底删除所有暂存区和工作区修改 | 确定要放弃所有修改       |

案例：服务器上的博客拉去`promefire。github.io`的更新展示html页面，因为某次服务器重启导致[webhook](https://blog.promefire.top/post/hexo_transfer_aliyun.html)

的监听失效，导致服务器端的博客落后一次更新，自动部署会报错，需要解决冲突，由于并不会在服务器端修改文件，所以直接`git fetch origin` 拉去最新更新后，使用` git reset --hard origin/main` 强制与远程分支同步.

