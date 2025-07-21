---
title: Maven
published: 2024-12-22 17:24:27
category: 开发工具
tags:
  - Maven
  - Java
cover: https://img.promefire.top/blog-img/2024/12/ec00ba607bd8bcdba50ea57906219818.png
description: 操作不多，但必不可少
---

## 资源

1、[黑马程序员Maven全套教程](https://www.bilibili.com/video/BV1Ah411S7ZE/?spm_id_from=333.788.comment.all.click&vd_source=2dd1d65546cb5ff3a546b588d0f60270)

2、[maven仓库](https://mvnrepository.com/)



![img](https://img.promefire.top/blog-img/2024/12/0b37e593ec1f33a53c65378f9ff29a1c.png)

## 命令

```markdown
mvn complie  #编译
mvn	clean	#清理
mvn test	#测试
mvn package #打包
mvn install #安装到本地仓库
```



## 依赖

```markdown
<dependency>
    <groupId>org.mybatis</groupId>
    <artifactId>mybatis</artifactId>
    <version>3.5.16</version>
</dependency>
```

- groupId : 组织名称
- artifactId：依赖名
- version: 版本号

依赖传递：项目A引用项目B，会引用项目B的所有依赖。（A、B引用相同依赖不同版本会产生冲突）

### 依赖传递冲突问题：

路径优先：当依赖出现相同资源时，层级越深，优先级越低 。

声明优先：当资源在相同层级倍依赖时，配置顺序靠前的覆盖顺序靠后的

### 可选依赖

对外隐藏当前依赖（B对A隐藏自己的一些依赖）

```diff
<dependency>
    <groupId>org.mybatis</groupId>
    <artifactId>mybatis</artifactId>
    <version>3.5.16</version>
+    <optional>true<optional>
</dependency>
```

### 排除依赖

主动断开，A屏蔽B中引用的一些依赖

```diff
<dependency>
    <groupId>com.learn</groupId>
    <artifactId>project02</artifactId>
+    <exclusions>
+        <exclusion>
+            <groupId>xx</groupId>
+            <artifactId>xx</artifactId>
+        <exclusion>
+     </exclusions>
</dependency>
```

### 依赖范围 

依赖的jar默认情况可以在任何地方使用，可以通过scope标签设定其作用范围

<img src="https://img.promefire.top/blog-img/2024/12/bd99c0bb2039eabc6623345321f26b44.png" alt="scope作用范围" style="zoom: 80%;" />



## 生命周期

### 1、默认生命周期（Default Lifecycle）

默认生命周期用于构建和发布项目。它包含了多个阶段，从清理、编译、测试，到打包、安装和部署等。默认生命周期的主要阶段包括：

- **validate**：验证项目是否正确，且所有必要的信息是否存在。
- **compile**：编译项目的源代码。
- **test**：运行测试代码（使用测试框架，如 JUnit）。
- **package**：将编译后的代码打包成可执行的 JAR 或 WAR 文件。
- **verify**：验证打包后的文件是否符合质量标准。
- **install**：将项目打包后的文件安装到本地 Maven 仓库。
- **deploy**：将项目的打包文件发布到远程 Maven 仓库，供其他项目使用。

### 2、清理生命周期（Clean Lifecycle）

清理生命周期用于清理项目，删除以前构建时生成的文件。其阶段包括：

- **pre-clean**：在清理之前进行的一些准备工作。
- **clean**：删除以前构建生成的文件。
- **post-clean**：在清理完成后进行的后处理。

### 3、站点生命周期（Site Lifecycle）

站点生命周期用于生成项目的文档和站点。其阶段包括：

- **pre-site**：在生成站点之前的一些准备工作。
- **site**：生成项目的站点。
- **post-site**：生成站点之后的一些处理。
- **site-deploy**：将生成的站点部署到服务器上。



## 聚合

作用：聚合用于快速构建maven工程，一次性构建多个项目/模块

- 创建一个空模块，打包类型定义为pom,`<packaging>pom</packaging>`
- 定义当前模块进行构建操作时关联的其他模块

```diff
<modules>
  <module>xx</module>
  <module>xx</module>
  <module>xx</module>
<moudules>
```

也就是根模块，配置文件中包含其他下级模块，模块配置先后顺序对执行顺序没影响



## 版本管理

名称规范：

- SNAPSHOT（快照版本）：项目开发过程中，输出的临时性版本
- RELEASE(发布版本)：发布的较为稳定的版本

<主版本>.<次版本>.<增量版本>.<里程碑版本>:5.1.9.RELEASE

- 主版本：重大变更
- 次版本：较大的功能增加和变化
- 增量版本：重大漏洞的修复