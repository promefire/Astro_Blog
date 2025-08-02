---
title: 博客相关
published: 2020-03-01 22:16:38
category: 博客优化
tags:
  - Hexo
description: 记录一些hexo / git 操作记录
cover: https://img.promefire.top/blog-img/20240110-37a1322538be2a451be51ebf62118dc5.png
---

* 还行吧，空有博客没有内容是不行滴，要多记录哦
* 贴上参考教程:https://www.cnblogs.com/visugar/p/6821777.html

***

0、使用的插件



寒假期间入手一台阿里云ECS服务器，现将hexo博客由GithubPage迁到阿里云上

现记录如下：

1、本地有git和npm但是hexo命令无效

解决：检查后是环境变量的问题，应把hexo根目录下`~\node_modules\.bin`添加至系统变量.

2、修改完文章部署命令

```sh
hexo clean && hexo d -g
```

等于

```sh
hexo clean    --清除缓存，每次部署前建议执行这一步
hexo generate --生成静态文件
hexo deploy   --部署至服务器
```

将环境文件推送至github

`````sh
git add . & git commit -m "save" & git push origin source
`````

3、一些命令

```
hexo new "文章题目"         --新建文章
hexo new page "pagename"   --新建页面
```

4、hexo同步管理

> 将本地的一些环境文件存放至github，防止误删或使用新电脑

* 在`promefire.github.io`仓库中新建一个`source`分支
* github切换到source分支，`git clone`到本地
* 进入`promefire.github.io`文件夹，只保留`	.git`文件夹，其他全部删除
* `git add -A`  `git commit -m "some description"` `git push origin`推送至github，此时`source`分支下为空白
* 将`promefire.github.io`目录下的`.git`文件夹复制到hexo根目录下，此时，hexo项目已经变成了和远程hexo分支关联的本地仓库了
* 每次发布新文章或修改时，`git add . & git commit -m "save" & git push origin source`即可把环境文件推送到source分支，然后再使用`hexo d -g`发布网站。

5、更改后每次都要执行hexo三件套+备份实在太麻烦了，新建一个`deploy.sh`脚本放在博客目录下，需要部署和备份时运行即可

```sh
hexo clean
hexo generate
hexo deploy

git add .
git commit -m "save"
git push
```

`git add xx` 后悔了，使用 `git reset <file>` 或`git reset` 撤销





6、博客中插入哔哩哔哩视频,视频要点分享-->嵌入代码

```html
<div style="position: relative; width: 100%; height: 0; padding-bottom: 75%;"><iframe src="//player.bilibili.com/player.html?aid=529707372&bvid=BV1Du411Y7tB&cid=1161446244&page=1"scrolling="no" border="0" frameborder="no" framespacing="0" allowfullscreen="true" style="position: absolute; width: 100%; height: 100%; Left: 0; top: 0;"> </iframe></div>
```

7、空格消失

把tab替换成这个

`<html> &nbsp; &nbsp; &nbsp; &nbsp; </html> `

参考：https://www.jianshu.com/p/fceaf373d797

8、草稿

有些时候某篇文章还没写完，发布其他文章的时候会把未完成的也发布，hexo自带了草稿功能，我竟然一直不知道，都是在其他地方写完再拉到post文件夹下

* 新建草稿

```sh
hexo new draft <title>
```

Hexo 另外提供 `draft` 机制，它的原理是新文章将建立在 `source/_drafts` 目录下，因此 `hexo generate` 并不会将其编译到 `public` 目录下，所以 `hexo deploy` 也不会将其部署到 GitHub。

* 本机预览草稿

```sh
hexo S --draft
```

* 将草稿发布为正式文章

```sh
hexo P <filename>
```

其中 `<filename>` 为不包含 `md` 后缀的文章名称。它的原理只是将文章从 `source/_drafts` 移动到 `source/_posts` 而已。

9、

报错

>  Updates were rejected because the remote contains work that you do
>  not have locally. This is usually caused by another repository pushing
> to the same ref. You may want to first integrate the remote changes
> (e.g., 'git pull ...') before pushing again.
> See the 'Note about fast-forwards' in 'git push --help' for details.

解决

```git
git pull origin master //run this first, then
git push origin master
```

10、git push后代码回滚

今天莫名奇妙，博客首页404了，我寻思也没改什么东西，最后选择回滚代码解决。

* `git log` 查看push日志
* `git reset --hard 回退到的版本号`
* `git push -f origin` 强制同步

11、hexo永久链接设置英文

> Markdown `Front-matter` 区域可以看到，我这里除了 `title`， `date` 以及 `tags` 外，自己添加了一个新的变量 `urlname` ，这个新的变量用来保存每个文章的英文名字，这样一来可以有利于 SEO，二来可以缩短博客文章 URL 的层数。

那么，`Front-matter` 区域新增一个变量 `urlname` ，值为前面说的英文字母格式

再在 Hexo 配置文件 `_config.yml` 中，把 `permalink:` 的值设为 `urlname.html` 

```yaml
permalink: :urlname.html
```

12、修改创建文章时`Front-matter` 区域模板

修改`/scaffolds/post.md`文件即可,修改如下

```yaml
title: {{ title }}
date: {{ date }}
tags:
	-
categories:
	-
cover:
description: 

```

13、文章置顶

`sticky` 数字越大，越靠前

```yaml
--- 
title: Hello World
date: 2013/7/13 20:46:25
sticky: 100
---
```

14、文章永久链接

原先使用title会在链接中存在中文，复制粘贴打开不方便，使用日期时间作为url

```yaml
# URL
## Set your site url here. For example, if you use GitHub Page, set url as 'https://username.github.io/project'
url: http://example.com
permalink: /post/:year:month:day:hour:minute:second.html
#permalink: /post/:title.html
permalink_defaults:
pretty_urls:
  trailing_index: true # Set to false to remove trailing 'index.html' from permalinks
  trailing_html: true # Set to false to remove trailing '.html' from permalinks
```



15、导入外部CSS

在`[BlogRoot]`的`source`文件夹下新建CSS文件夹，存放`.css`文件

在主题`_config.butterfly.yml` 的`inject`下导入

![image-20240116155059633](https://img.promefire.top/blog-img/20240116-59304e7eefe2627c7c927e4dc667d4dc.png)



16、Git设置代理

```sh
git config --global http.proxy 'socks5://127.0.0.1:10808' 
git config --global https.proxy 'socks5://127.0.0.1:10808'
```





