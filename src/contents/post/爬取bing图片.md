---
title: 实现博客每日换肤
published: 2021-2-22 14:11:26
category: 后端学习
tags:
  - Python
  - 爬虫
  - 自动化
description: 1、爬取bing图片 2、编写bat文件,实现图片爬取及博客部署 3、设置windows定时任务，设置为超过时间立即执行
---



# 实现博客每日换肤

## 1、爬取bing图片

使用requests库获取网页html，正则表达式获取图片链接，python'库`datetime`标注日期，crontab建立定时任务每天爬取



代码如下：

```python
import re
import requests
import datetime

url = 'https://www.bing.com/'
headers = {"user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/88.0.4324.182 Safari/537.36"}
response = requests.get(url,headers = headers).text
picUrl =re.findall(r'style="background-image: url(.*?);',response,re.S)
Url = 'https://www.bing.com/' + picUrl[0]
pic = requests.get(Url)
file1 = 'E:\Desktop\\screen\\' + str(datetime.datetime.now().year)+'-'+str(datetime.datetime.now().month)+'-'+str(datetime.datetime.now().day) + '.jpg'
file2 = 'E:\\blog\\myblog\\themes\\fluid\\source\\img\\' +  'default.jpg'
fp = open(file1,'wb')
fp.write(pic.content)
fp.close()

fp = open(file2,'wb')
fp.write(pic.content)
fp.close()
```



---

file1保存图片

file2直接将图片下载到hexo目录下fluid主题下的资源文件夹中，命名为default.jpg,自动覆盖上一天的图片。以实现自动更换博客顶部图片

![](https://img.promefire.top/blog-img/20240110-1181217953e025666193d123b555cc93.png)



##  2、编写bat文件,实现图片爬取及博客部署

```sh
e:
cd Desktop\screen
python download.py
cd E:\blog\myblog
start E:\Git\bin\sh.exe -c "hexo clean && hexo d -g"
exit
```

## 3、设置windows定时任务，设置为超过时间立即执行

![](https://img.promefire.top/blog-img/20240110-4a0bbb13fa8782f642dd64597e03f655.png)

![image-20210304195728504](https://raw.githubusercontent.com/promefire/Myblog/main/img202303292048218.png)