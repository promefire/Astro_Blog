---
title: k8s面板-Kuboard
published: 2025-08-1 15:08:14
category: 云原生
tags:
  - k8s
  - kuboard
cover: https://img.promefire.top/blog-img/2025/07/kuboard封面图.webp
description: 美观优雅的k8s面板

---

本来是在学flink，看视频发现这个好看的k8s管理面板，想着一会会时间部署一个，结果遇到了重重问题，单开一章来记录/(ㄒoㄒ)/~~

官方文档：https://kuboard.cn/

## 清理旧环境

最好是从一个干净的环境开始装

```bash
# 1. 停止并删除所有旧容器
docker stop kuboard && docker rm kuboard
pkill -f 'kubectl proxy'

# 2. 删除旧数据
sudo rm -rf /home/zhij/kuboard-data
mkdir -p /home/zhij/kuboard-data

# 3. 重启 minikube
minikube stop
minikube delete
minikube start --driver=docker
```

##  为 Kuboard 创建专用的 K8s 服务账号  

 我们需要在 Kubernetes 中创建一个账号（`ServiceAccount`），并授予它管理员权限，Kuboard 将使用这个账号来操作集群。  

```bash
cat <<EOF | kubectl apply -f -
apiVersion: v1
kind: ServiceAccount
metadata:
  name: kuboard-admin
  namespace: kube-system
---
apiVersion: rbac.authorization.k8s.io/v1
kind: ClusterRoleBinding
metadata:
  name: kuboard-admin
roleRef:
  apiGroup: rbac.authorization.k8s.io
  kind: ClusterRole
  name: cluster-admin
subjects:
- kind: ServiceAccount
  name: kuboard-admin
  namespace: kube-system
EOF
```



## 获取 **API Server 地址和Token**

**1、获取 API Server 地址（将导致** `**TLS handshake**` **错误的地方）** 我们必须获取 Minikube 容器在 Docker 网络内部的真实 IP 地址。

```plain
# 使用 minikube ip 命令获取地址
MINIKUBE_IP=$(minikube ip)

# 查看完整地址，包括端口
kubectl cluster-info
```

会得到类似`Kubernetes control plane is running at https://192.168.49.2:8443` 的输出

```
**API Server = https://192.168.49.2:8443**
```

**不要使用**`**kubectl proxy**`**启动！！！会报错**`**TLS handshake**` **，tmd还得是gemini找到了解决办法，deepkseek就是垃圾！**

- **错误做法**：使用 `kubectl proxy` 启动一个代理，然后用 `http://宿主机IP:8001` 作为 API Server 地址。
- **为什么错**：`kubectl proxy` 提供的是一个**非加密的 HTTP** 服务。而 Kuboard 默认会使用**加密的 HTTPS** 协议去连接，协议不匹配导致了 `tls: first record does not look like a TLS handshake` 错误。
- **正确做法**：始终直接连接 Minikube 暴露的、原生的、加密的 HTTPS API Server 地址。

2、获取 ServiceAccount 的 Token  

```bash
kubectl create token kuboard-admin -n kube-system --duration=8760h
```

## 启动Kuboard容器

```bash
# 获取宿主机IP (这部分不变)
HOST_IP=$(ip route get 1 | awk '{print $(NF-2);exit}')

# 重新运行 Kuboard 容器，注意新增的 --network 参数
docker run -d \
  --restart=unless-stopped \
  --name kuboard \
  --network=minikube \
  -p 8082:80/tcp \
  -p 10082:10081/tcp \
  -e KUBOARD_ENDPOINT="http://$HOST_IP:8082" \
  -e KUBOARD_AGENT_SERVER_TCP_PORT="10081" \
  -v /home/zhij/kuboard-data:/data \
  eipwork/kuboard:v3
```

- `-p 8082:80/tcp`: kubectl前端页面映射到宿主机的8082端口
- `-p 10082:10081/tcp`： Kuboard Agent Server 监听的**TCP端口**，用于集群 Agent 的反向连接  （还用不到）

 

!! 要添加` --network=minikube`参数。

我们的kuboard和minikube集群都是docker启动的，按照默认启动的话会分属于两个网络，导致kuboard无法连接到minikube的api Server地址。

查看docker网络列表,找到minikube创建的网络，一般都叫`minikube`,添加到`kuboard`的启动参数中

```bash
docker network ls
```

## 在Kuboard界面添加集群

 在浏览器中打开 Kuboard 界面：`http://<宿主机IP>:8082`，添加集群，填写上面获得的`API Server`和`Token`。成功！

![img](https://img.promefire.top/blog-img/2025/07/kuboard成功截图.webp)





总结一下出现的IP和端口：

1、宿主机IP`192.168.1.221`s

2、集群IP`192.168.49.2`：通过`minikube ip`获取，是集群的入口，启动的是一个运行在宿主机上的虚拟机。

端口：`8443` 是 Kubernetes API Server 默认监听的**安全 HTTPS 端口**。所有对集群的查询、创建、删除等管理操作，都必须发送到这个端口。  