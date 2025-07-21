---
title: Kubernetes
published: 2025-07-4 16:00:00
category: 后端学习
tags:
  - 容器
cover: https://img.promefire.top/blog-img/2025/07/0848d25fd97ab38bc3a54fbc168b17b2.png
description: 比Docker更高一级
---

1、k8s中文文档：[http://docs.kubernetes.org.cn/](http://docs.kubernetes.org.cn/)

2、minikube官方文档：[https://minikube.sigs.k8s.io/docs/start/?arch=%2Flinux%2Fx86-64%2Fstable%2Fbinary+download](https://minikube.sigs.k8s.io/docs/start/?arch=%2Flinux%2Fx86-64%2Fstable%2Fbinary+download)

3、在线学习文档：[https://kubernetes.io/zh-cn/docs/tutorials/kubernetes-basics/](https://kubernetes.io/zh-cn/docs/tutorials/kubernetes-basics/)

4、云原生minikube文档（！）：[https://www.zhaowenyu.com/minikube-doc/ops/minikube.html](https://www.zhaowenyu.com/minikube-doc/ops/minikube.html)

5、参考：[https://blog.csdn.net/haohaifeng002/article/details/116788698](https://blog.csdn.net/haohaifeng002/article/details/116788698)

6、k8s在线环境：[https://killercoda.com/playgrounds/scenario/kubernetes](https://killercoda.com/playgrounds/scenario/kubernetes)

## 是什么？
<font style="color:rgb(51, 51, 51);">Kubernetes是容器集群管理系统，是一个开源的平台，可以实现容器集群的自动化部署、自动扩缩容、维护等功能。</font>

## <font style="color:rgb(51, 51, 51);">与Docker区别</font>
| <font style="color:rgb(51, 51, 51);">特性</font> | <font style="color:rgb(51, 51, 51);">Docker</font>           | <font style="color:rgb(51, 51, 51);">Kubernetes</font>       |
| ------------------------------------------------ | ------------------------------------------------------------ | ------------------------------------------------------------ |
| **核心功能**                                     | <font style="color:rgb(51, 51, 51);">创建和运行单个容器（容器化）</font> | <font style="color:rgb(51, 51, 51);">在集群中管理和调度大量容器（容器编排）</font> |
| **范围**                                         | <font style="color:rgb(51, 51, 51);">单个节点/主机</font>    | <font style="color:rgb(51, 51, 51);">跨越多个节点的集群</font> |
| **规模**                                         | <font style="color:rgb(51, 51, 51);">适合开发、测试和简单的单机应用</font> | <font style="color:rgb(51, 51, 51);">专为大规模、高可用的生产环境设计</font> |
| **主要工具**                                     | `Dockerfile`<font style="color:rgb(51, 51, 51);">, </font>`docker-compose.yml` | `kubectl`<font style="color:rgb(51, 51, 51);">, YAML 清单文件 (Deployment, Service 等)</font> |
| **核心单元**                                     | <font style="color:rgb(51, 51, 51);">容器 (Container)</font> | <font style="color:rgb(51, 51, 51);">Pod (可以包含一个或多个紧密关联的容器)</font> |
| **网络**                                         | <font style="color:rgb(51, 51, 51);">提供基础的单机网络（桥接、主机模式等）</font> | <font style="color:rgb(51, 51, 51);">提供复杂的跨节点集群网络模型、服务发现和负载均衡</font> |
| **自我修复**                                     | <font style="color:rgb(51, 51, 51);">不具备。容器挂了就挂了，需要手动重启。</font> | <font style="color:rgb(51, 51, 51);">核心特性。自动重启、替换失败的容器。</font> |
| **自带的编排工具**                               | <font style="color:rgb(51, 51, 51);">Docker Swarm (功能相对简单)</font> | <font style="color:rgb(51, 51, 51);">Kubernetes 本身就是最主流的编排工具</font> |


## 组件
+ Pod：在容器上加了一层抽象，可以将一个或多个容器组合在一起。一般一个pod只运行一个容器
+ Deployment：部署无状态应用程序，在pod上加一层抽象，可以将一个或多个pod组合在一起，具有副本控制，滚动更新，自动扩容。
+ node:节点，一个服务器或一个虚拟机就是一个节点
+ service：将一组pod封装成一个服务，提供一个统一的入口来访问这个服务。主要集群内部或外部暴露**单个服务**
+ ingress：将外部的请求路由转发到集群内部Service上，是集群外部访问**多个服务**的统一入口
+ Config Map:封装配置信息
+ Secret:封装敏感信息
+ Volumes:将集群中的数据挂载到本地磁盘或远程存储上，实现持久化
+ StatefulSet:部署有状态应用程序

## <font style="color:rgb(51, 51, 51);">安装</font>
### 安装[minikube](https://minikube.sigs.k8s.io/docs/start/?arch=%2Flinux%2Farm64%2Fstable%2Fbinary+download)
> `Minikube`<font style="color:rgb(51, 51, 51);">是一个工具，用于在单个节点上部署一个本地的Kubernetes集群。这对于开发者在本地开发环境进行Kubernetes应用测试和调试非常有用。它能够在个人计算机上启动一个轻量级的虚拟机或容器，并在这个环境中部署一个完整的Kubernetes集群，包括API服务器、etcd、kubelet等核心组件。</font>

<div style="text-align: center;">
  <img 
    src="https://img.promefire.top/blog-img/2025/07/913e88d22cd160a600f252651f9b64ed.png" 
    style="
      width: 90%; 
      max-width: 1200px;
      height: auto; 
      display: block;
      margin: 0 auto 10px;  /* 底部留出图注空间 */
      object-fit: cover;
  ">
  <p style="
      font-size: 0.9em; 
      color: #666; 
      margin-top: 0; 
      font-family: sans-serif;
  ">
    下载MiniKube
  </p>
</div>

选择正确版本的MiniKube进行下载

```bash
curl -LO https://github.com/kubernetes/minikube/releases/latest/download/minikube-linux-arm64
sudo install minikube-linux-arm64 /usr/local/bin/minikube && rm minikube-linux-arm64
```

查看版本

```bash
minikube version
```

<div style="text-align: center;">
  <img 
    src="https://img.promefire.top/blog-img/2025/07/1bfa93726bbc8b8a95a308eca4d8dd62.png" 
    style="
      width: 90%; 
      max-width: 1200px;
      height: auto; 
      display: block;
      margin: 0 auto 10px;  /* 底部留出图注空间 */
      object-fit: cover;
  ">
  <p style="
      font-size: 0.9em; 
      color: #666; 
      margin-top: 0; 
      font-family: sans-serif;
  ">
    验证安装
  </p>
</div>

## Kubernetes 启动
此处要先**创建用户赋予权限**，和**docker通信的权限**，参考文末问题2，3

```bash
minikube start \
--vm-driver=docker \
--registry-mirror=https://registry.docker-cn.com \
--image-mirror-country=cn \
--cni=flannel \
--kubernetes-version=v1.32.2
```

<font style="color:rgb(51, 51, 51);">该命令能够自动启动一套 Kubernetes 集群（启动一个虚拟机，称为节点），其中的参数是可选的，示例中的参数含义：</font>

+ `--kubernetes-version`<font style="color:rgb(51, 51, 51);">： 指定 Kubernetes 的版本</font>
+ `--vm-driver`<font style="color:rgb(51, 51, 51);">: 指定 VM 驱动类型</font>
+ `--registry-mirror`<font style="color:rgb(51, 51, 51);">: 镜像下载加速的镜像仓库地址</font>
+ `--image-mirror-country`<font style="color:rgb(51, 51, 51);">: 镜像加速的国家，cn 表示中国</font>
+ `--cni`<font style="color:rgb(51, 51, 51);">： 指定集群的网络插件，支持：auto, bridge, calico, cilium, flannel, kindnet, or path to a CNI manifest (default: auto)</font>

<div style="text-align: center;">
  <img 
    src="https://img.promefire.top/blog-img/2025/07/88adb6caf03441a2caa498f108318c58.png" 
    style="
      width: 90%; 
      max-width: 1200px;
      height: auto; 
      display: block;
      margin: 0 auto 10px;  /* 底部留出图注空间 */
      object-fit: cover;
  ">
  <p style="
      font-size: 0.9em; 
      color: #666; 
      margin-top: 0; 
      font-family: sans-serif;
  ">
    安装成功
  </p>
</div>

<font style="color:rgb(51, 51, 51);">查看节点ip</font>

```bash
zj@linux:~/k8sLearn$  minikube ip
192.168.49.2
```

<font style="color:rgb(51, 51, 51);">查看安装状态</font>

```bash
zj@linux:~$  minikube status
minikube
type: Control Plane
host: Running
kubelet: Running
apiserver: Running
kubeconfig: Configured
```

<font style="color:rgb(51, 51, 51);">清理失败的环境</font>

```plain
minikube delete --all
```

<font style="color:rgb(51, 51, 51);">查看安装的插件</font>

```plain
minikube addons list
```

<font style="color:rgb(51, 51, 51);">根据需要选择对应的 addon 组件</font>

```bash
minikube addons enable xxxx
```

### <font style="color:rgb(51, 51, 51);">Dashboard图形界面</font>
> <font style="color:rgb(51, 51, 51);">Dashboard 是一个基 于web 的 Kubernetes 用户界面。你可以用它来:</font>
>
> + <font style="color:rgb(51, 51, 51);">将容器化的应用程序部署到 Kubernetes 集群</font>
> + <font style="color:rgb(51, 51, 51);">定位排除容器化应用程序的故障</font>
> + <font style="color:rgb(51, 51, 51);">管理集群资源</font>
> + <font style="color:rgb(51, 51, 51);">了解集群中运行的应用程序的概况</font>
> + <font style="color:rgb(51, 51, 51);">创建或修改指定 Kubernetes 资源(如 Deployments, Jobs, DaemonSets 集等)</font>
>

启动服务,得到一个本服务器查看的url

```bash
minikube dashboard --url
```

直接暴露服务（需配置防火墙）

1. 在服务器上修改代理绑定地址

```bash
kubectl proxy --port=38775 --address='0.0.0.0' --accept-hosts='.*' &
```

+ --address='0.0.0.0'：允许所有 IP 访问
+ --accept-hosts='.*'：接受所有主机头
2. 配置服务器防火墙

```bash
sudo ufw allow 38775
```

3. 在本地浏览器访问：

```bash
http://服务器公网IP:38775/api/v1/namespaces/kubernetes-dashboard/services/http:kubernetes-dashboard:/proxy/
```

## <font style="color:rgb(51, 51, 51);">基础使用</font>
> kubectl是minikube的一个命令行工具，与集群进行交互
>

<font style="color:rgb(77, 77, 77);">有时镜像会拉取失败，利用</font>`Minikube能将本地docker镜像推送到minikube自带的docker容器并离线缓存`<font style="color:rgb(77, 77, 77);">这个特性迂回处理这个问题</font>

+ 下载hello-minikube docker镜像，并打个tag

```bash
#找个叫hello-minikube的docker镜像
 docker search hello-minikube
#随便找一个别人做好的docker镜像，如bienbenigno/hello-minikube
docker pull computer99/hello-minikube
#打个叫k8s.gcr.io/echoserver:1.4的tag
 docker tag computer99/hello-minikube:4.0 k8s.gcr.io/echoserver:1.4
```

+ 生成minikube离线镜像

```bash
#将镜像添加到本地镜像
minikube image load  k8s.gcr.io/echoserver:1.4
#查看镜像添加情况
minikube image list
```

<div style="text-align: center;">
  <img 
    src="https://img.promefire.top/blog-img/2025/07/6f074487bbedff6012f0ed6f95c389ca.png" 
    style="
      width: 90%; 
      max-width: 1200px;
      height: auto; 
      display: block;
      margin: 0 auto 10px;  /* 底部留出图注空间 */
      object-fit: cover;
  ">
  <p style="
      font-size: 0.9em; 
      color: #666; 
      margin-top: 0; 
      font-family: sans-serif;
  ">
    查看镜像列表
  </p>
</div>

### 创建一个pod
```bash
kubectl run hello4 --image=k8s.gcr.io/echoserver:1.4
```

通常情况下，我们不会自己创建一个pod，而是创建上层资源对象（例如deployment），会自动创建pod。

### <font style="color:rgb(51, 51, 51);">创建一个deployment:</font>
```bash
kubectl create deployment hello-minikube --image=k8s.gcr.io/echoserver:1.4
```

### <font style="color:rgb(51, 51, 51);">查看节点/服务/deployment/pod</font>
```bash
kubectl get node
kubectl get svc
kubectl get deployment
kubectl get pod
#查看各pod的ip
kubectl get pod -o wide 
kubectl describe pod xxxxxxx


#在deployment与pod之间还有一个中间层对象replicaset，用来管理pod的副本数量
kubectl get replicaset

# 查看所有资源对象
kubectl get all
```

### 编辑配置文件
```bash
 kubectl edit deployment.apps/helloworld
```

### 调试命令
```bash
#查看pod日志
kubectl logs pod名 
#进入容器
kubectl exec  -it pod名  -- /bin/bash
```

### <font style="color:rgb(51, 51, 51);">删除</font>
```bash
kubectl delete deployment hello-minikube
```

+ 需要注意的是使用`kubectl delete pod xxx`直接删除一个pod,如果该pod被上层deployment管理，deployment会立即创建一个新的pod，确保pod数量与配置文件中副本数量`replicas`保持一致.

### <font style="color:rgb(51, 51, 51);">暴露一个服务</font>
> 创建集群有minikube和k3s两种方式，k3s是登录到节点执行命令，节点属于集群的一部分，所以可以访问到service的ip，而minikube实在宿主机执行命令，要使用<font style="color:rgb(80, 161, 79);">NodePort</font>暴露节点端口给宿主机访问
>

```bash
kubectl expose deployment hello2 --type=NodePort --port=8080
```

+ NodePort:在节点上开一个端口用于外部访问service

<font style="color:rgb(51, 51, 51);">查看部署的service</font>

```bash
zj@linux:~/k8sLearn$ kubectl get services hello2
NAME     TYPE       CLUSTER-IP       EXTERNAL-IP   PORT(S)        AGE
hello2   NodePort   10.110.233.228   <none>        81:30310/TCP   5m11s
```

+ service服务监听的端口是81，pod暴露的端口是30310

```bash
zj@linux:~/k8sLearn$ minikube service hello2 --url
http://192.168.49.2:30310

zj@linux:~/k8sLearn$ curl http://192.168.49.2:30310/
curl: (7) Failed to connect to 192.168.49.2 port 30310 after 0 ms: Connection refused
```

宿主机访问节点服务url失败，<font style="color:rgba(0, 0, 0, 0.9);background-color:rgb(252, 252, 252);">问题核心在于 </font>**<font style="color:rgba(0, 0, 0, 0.9);background-color:rgb(252, 252, 252);">应用监听端口与服务暴露端口不匹配。见下面问题6。</font>**



**<font style="color:rgba(0, 0, 0, 0.9);background-color:rgb(252, 252, 252);">操作总流程如下：</font>**

<div style="text-align: center;">
  <img 
    src="https://img.promefire.top/blog-img/2025/07/440b036bdaeeb461128611e772848d58.png" 
    style="
      width: 90%; 
      max-width: 1200px;
      height: auto; 
      display: block;
      margin: 0 auto 10px;  /* 底部留出图注空间 */
      object-fit: cover;
  ">
  <p style="
      font-size: 0.9em; 
      color: #666; 
      margin-top: 0; 
      font-family: sans-serif;
  ">
    图示命令
  </p>
</div>

## <font style="color:rgb(51, 51, 51);">遇到的问题：</font>

<font style="color:rgb(51, 51, 51);">2、root用户不能使用</font>`minikube start`<font style="color:rgb(51, 51, 51);">启动，要新建一个用户名并赋予sudo权限</font>

<font style="color:rgb(51, 51, 51);">创建用户 </font>`adduser promefire`

<font style="color:rgb(51, 51, 51);">授权   centos:</font>`usermod -aG wheel promefire`

<font style="color:rgb(51, 51, 51);"> 	  Debian/Ubuntu  :</font>`usermod -aG sudo promefire`

<font style="color:rgb(51, 51, 51);">3、赋予新建用户与docker通信权限</font>

```bash
sudo usermod -aG docker promefire
newgrp docker  # 刷新用户组

# 验证权限
docker ps  # 应无报错
```

4、Docker配置代理

+ 创建 `/etc/systemd/system/docker.service.d/http-proxy.conf` 文件。
+ 在文件中填入正确的 Environment 代理配置（HTTP_PROXY, HTTPS_PROXY, NO_PROXY）。
+ 执行 `sudo systemctl daemon-reload `刷新配置
+ 执行` sudo systemctl restart docker` 重启docker

5、报错

```plain
-- /stdout --

* Suggestion: Using Kubernetes v1.24+ with the Docker runtime requires cri-docker to be installed
```

 Kubernetes v1.24+ 的版本与docker通信需要 `cri-docker`,移除了原来直接与Docker通信的功能，

+ 安装

```bash
# 下载最新的 cri-dockerd deb 包 (适用于 amd64 架构)
curl -Lo cri-dockerd.deb https://github.com/Mirantis/cri-dockerd/releases/download/v0.3.15/cri-dockerd_0.3.15.3-0.ubuntu-jammy_amd64.deb
# 安装
sudo dpkg -i cri-dockerd.deb
#启动服务
sudo systemctl daemon-reload
sudo systemctl enable --now cri-docker.service
sudo systemctl enable --now cri-docker.socket
#验证
systemctl status cri-docker.socket
```

5、一直下载中断，查看本机v2ray日志，发现因为vpn开了**绕过大陆**而不是**全局**，在访问阿里云镜像站走的是直连，因此下载失败。错误信息[socks -> direct]表示直连。修改成全局解决。

```plain
from 192.168.1.xxx:39014 accepted //registry.cn-hangzhou.aliyuncs.com:443 [socks -> direct]
from 192.168.1.xxx:39888 accepted //kubernetes.oss-cn-hangzhou.aliyuncs.com:443 [socks -> direct]
```

6、宿主机无法通过节点ip+NodePort访问service

通过`kubectl logs hello2-788ffdfd55-p65qz`查看日志可以发现，这个pod容器运行在8080端口。

```bash
zj@linux:~$ kubectl logs hello2-788ffdfd55-p65qz

  .   ____          _            __ _ _
 /\\ / ___'_ __ _ _(_)_ __  __ _ \ \ \ \
( ( )\___ | '_ | '_| | '_ \/ _` | \ \ \ \
 \\/  ___)| |_)| | | | | || (_| |  ) ) ) )
  '  |____| .__|_| |_|_| |_\__, | / / / /
 =========|_|==============|___/=/_/_/_/

 :: Spring Boot ::       (v3.4.0-SNAPSHOT)

2025-07-04T06:56:31.816Z  INFO 1 --- [hello-minikube] [           main] c.e.h.HelloMinikubeApplicationKt         : Starting HelloMinikubeApplicationK t v0.0.4-SNAPSHOT using Java 17.0.2 with PID 1 (/app.jar started by root in /)
2025-07-04T06:56:31.820Z  INFO 1 --- [hello-minikube] [           main] c.e.h.HelloMinikubeApplicationKt         : No active profile set, falling bac k to 1 default profile: "default"
2025-07-04T06:56:33.115Z  INFO 1 --- [hello-minikube] [           main] o.s.b.w.embedded.tomcat.TomcatWebServer  : Tomcat initialized with port 8080  (http)
2025-07-04T06:56:33.135Z  INFO 1 --- [hello-minikube] [           main] o.apache.catalina.core.StandardService   : Starting service [Tomcat]
2025-07-04T06:56:33.136Z  INFO 1 --- [hello-minikube] [           main] o.apache.catalina.core.StandardEngine    : Starting Servlet engine: [Apache T omcat/10.1.28]
2025-07-04T06:56:33.321Z  INFO 1 --- [hello-minikube] [           main] o.a.c.c.C.[Tomcat].[localhost].[/]       : Initializing Spring embedded WebAp plicationContext
2025-07-04T06:56:33.322Z  INFO 1 --- [hello-minikube] [           main] w.s.c.ServletWebServerApplicationContext : Root WebApplicationContext: initia lization completed in 1421 ms
2025-07-04T06:56:34.515Z  INFO 1 --- [hello-minikube] [           main] o.s.b.w.embedded.tomcat.TomcatWebServer  : Tomcat started on port 8080 (http)  with context path '/'
2025-07-04T06:56:34.541Z  INFO 1 --- [hello-minikube] [           main] c.e.h.HelloMinikubeApplicationKt         : Started HelloMinikubeApplicationKt  in 3.306 seconds (process running for 4.08)

```

重建服务

```bash
kubectl delete svc hello2
kubectl expose deployment hello2 --type=NodePort --port=80  --target-port=8080
```

查看服务信息

```bash
zj@linux:~$ kubectl describe service hello2
Warning: v1 Endpoints is deprecated in v1.33+; use discovery.k8s.io/v1 EndpointSlice
Name:                     hello2
Namespace:                default
Labels:                   app=hello2
Annotations:              <none>
Selector:                 app=hello2
Type:                     NodePort
IP Family Policy:         SingleStack
IP Families:              IPv4
IP:                       10.99.54.223
IPs:                      10.99.54.223
Port:                     <unset>  80/TCP
TargetPort:               8080/TCP
NodePort:                 <unset>  30367/TCP
Endpoints:                10.244.0.6:8080
Session Affinity:         None
External Traffic Policy:  Cluster
Events:                   <none>

```

查看service hello2暴露的url,成功访问

```bash
zj@linux:~$ minikube service hello2 --url
http://192.168.49.2:30367
zj@linux:~$ curl http://192.168.49.2:30367
{healthy: true}
```

此处涉及三个端口80,8080和30367。

| **<font style="color:rgba(0, 0, 0, 0.9);">端口类型</font>**  | **<font style="color:rgba(0, 0, 0, 0.9);">示例值</font>** |  **<font style="color:rgba(0, 0, 0, 0.9);">作用域</font>**  |   **<font style="color:rgba(0, 0, 0, 0.9);">功能</font>**    |  **<font style="color:rgba(0, 0, 0, 0.9);">使用者</font>**   |
| :----------------------------------------------------------: | :-------------------------------------------------------: | :---------------------------------------------------------: | :----------------------------------------------------------: | :----------------------------------------------------------: |
| **<font style="color:rgba(0, 0, 0, 0.9);">NodePort</font>**  |                        `30367/TCP`                        | <font style="color:rgba(0, 0, 0, 0.9);">集群外部访问</font> | <font style="color:rgba(0, 0, 0, 0.9);">节点上开放的端口，允许外部用户通过</font><font style="color:rgba(0, 0, 0, 0.9);"> </font>`节点IP:NodePort`<br/><font style="color:rgba(0, 0, 0, 0.9);"> </font><font style="color:rgba(0, 0, 0, 0.9);">访问服务</font> | <font style="color:rgba(0, 0, 0, 0.9);">外部用户（如浏览器、curl）</font> |
| **<font style="color:rgba(0, 0, 0, 0.9);">Port (Service Port)</font>** |                         `80/TCP`                          | <font style="color:rgba(0, 0, 0, 0.9);">集群内部访问</font> | <font style="color:rgba(0, 0, 0, 0.9);">Service 的虚拟端口，集群内其他组件通过</font><font style="color:rgba(0, 0, 0, 0.9);"> </font>`ClusterIP:Port`<br/><font style="color:rgba(0, 0, 0, 0.9);"> 访问服务</font> | <font style="color:rgba(0, 0, 0, 0.9);">集群内 Pod、Service 间通信</font> |
| **<font style="color:rgba(0, 0, 0, 0.9);">TargetPort</font>** |                        `8080/TCP`                         |  <font style="color:rgba(0, 0, 0, 0.9);">Pod 内容器</font>  | <font style="color:rgba(0, 0, 0, 0.9);">容器实际监听的端口，Service 将流量转发到此端口</font> | <font style="color:rgba(0, 0, 0, 0.9);">容器内应用（如 Spring Boot）</font> |

<div style="text-align: center;">
  <img 
    src="https://img.promefire.top/blog-img/2025/07/afacb75c4b2e87a77811fe6cec13c851.png" 
    style="
      width: 90%; 
      max-width: 1200px;
      height: auto; 
      display: block;
      margin: 0 auto 10px;  /* 底部留出图注空间 */
      object-fit: cover;
  ">
  <p style="
      font-size: 0.9em; 
      color: #666; 
      margin-top: 0; 
      font-family: sans-serif;
  ">
    端口关系
  </p>
</div>

