---
title: selenium多线程简单应用
published: 2024-01-10 18:12:40
category: 后端学习
tags:
  - Python
  - 爬虫
  - 自动化
cover: https://img.promefire.top/blog-img/20240110-de3a1e1a60cd64c6869415338a65a6e7.png
description: selenium多线程操作浏览器
---

## 前言

​		[关哥](https://gz-metal-cell.github.io/)博客新增了浏览量，个位数的浏览量怎么配得上关哥身份，给Metal-Cell刷点浏览量。

## 初始代码

发现只要刷新就会计入访问量，所以只需调用`selenium` 刷新网页的功能就行

```python

from selenium import webdriver

import threading

#浏览器请求头
headers = {
    "Cookie" : "XXXXXX",
    "user-agent": "xxxxx"
    }

# 浏览器相关设置
chrome_path = r'path\to\chromedriver.exe'
chrome_options = webdriver.ChromeOptions()
#忽略ssl验证
chrome_options.add_argument('--ignore-certificate-errors')
# 无窗口运行
# chrome_options.add_argument("--headless")

driver = webdriver.Chrome(executable_path=chrome_path, options=chrome_options)

# 博客链接
url = "xxxxxx"
driver.get(url)
#刷新网页
driver.refresh()
```



### 设置代理

```python
# 创建 webdriver 并设置代理IP
proxy = '127.0.0.1:10808'
chrome_options.add_argument('--proxy-server=http://' + proxy)
driver = webdriver.Chrome(executable_path=chrome_path, options=chrome_options)
```

### 加入多线程

```python
import threading

def start_brower():
    headers = {
        "Cookie" : "xxx",
        "user-agent" : "xxx"
    }
    chrome_path = r'path\to\chromedriver.exe'
    chrome_options = webdriver.ChromeOptions()
    chrome_options.add_argument('--ignore-certificate-errors')

    driver = webdriver.Chrome(executable_path=chrome_path, options=chrome_options)
    return driver

def brower_thread(driver: webdriver.Chrome, idx: int:):
    url_list = ['https://www.baidu.com','https://music.163.com/', 'https://y.qq.com/']
    try:
        #lock.acquire()
        
        #driver.execute_script(f"window.open('{url_list[idx]}')") # 打开浏览器标签页
		driver.get(url_list[idx])
        return True
    except Exception:
        return False
    #finally:
    #   lock.release()
    
def main():
     # 多线程与多浏览器
    #driver = start_browser()
    for idx in range(5):
        driver = start_browser()
        threading.Thread(target=browser_thread, args=(driver, idx)).start()

    # 等待所有线程执行完毕
    for thread in threading.enumerate():
        if thread is not threading.current_thread():
            thread.join()
    
```

* 如果是 **多线程** 和 **多浏览器** ,则不需要线程锁，每一个线程都有一个webdriver

* 如果是 **多线程** 和 **多标签页** ，共用一个浏览器，会出现资源争夺的情况，需要在线程的首位加上`lock.acquire()` 和 `lock.release()`  ，确保线程安全

### 线程池

```python
from concurrent.futures import ThreadPoolExecutor, as_completed
max_workers=MAX_WORKERS = 5

def main():
    #创建线程池
    executor = ThreadPoolExecutor(max_workers=MAX_WORKERS)
    ths = list()
    driver = start_browser()
    for idx in range(5):
        # driver = start_browser()
        #启动
        th = executor.submit(browser_thread, driver, idx=idx)
        ths.append(th)

    # 获取线程执行结果
    for future in as_completed(ths):
        print(future.result())
```

### 区别

1. **创建和维护线程的方式**:
   - **多线程**：在需要并发执行任务时，直接创建并启动多个线程。你手动管理线程的创建、启动、终止和资源释放。
   - **线程池**：创建一个线程池，它会在程序启动时预先创建一组线程，并在需要时重用这些线程。线程池负责管理线程的生命周期，包括创建、启动、终止和回收。
2. **资源管理**:
   - **多线程**：需要手动管理线程的数量和资源，可能会导致系统资源的浪费或线程过多的问题。
   - **线程池**：通过线程池管理，可以更有效地控制线程的数量，避免资源过度占用。
3. **任务调度**:
   - **多线程**：需要手动分配任务给不同的线程，可能需要考虑同步和互斥机制来避免竞争条件。
   - **线程池**：线程池会自动分配任务给可用线程，并处理任务队列，简化了任务调度的工作。
4. **性能和效率**:
   - **多线程**：如果线程的创建和销毁频繁，可能会导致性能开销增加。
   - **线程池**：通过线程的重用，可以减少线程的创建和销毁开销，提高性能和效率。



## 更新：

在4.10.0的`selenium` 中，设置浏览器需要这样[写](https://stackoverflow.com/questions/76550506/typeerror-webdriver-init-got-an-unexpected-keyword-argument-executable-p):

删除了`exectable_path` 改用`service` 传参

```python
from selenium import webdriver
from selenium.webdriver.chrome.service import Service

service = Service(executable_path='./chromedriver.exe')
options = webdriver.ChromeOptions()
driver = webdriver.Chrome(service=service, options=options)
# ...
driver.quit()
```





参考：[设置ip池](https://blog.suysker.xyz/archives/365)

​			[selenium操纵浏览器](https://juejin.cn/post/7122095457752481828)

​			



