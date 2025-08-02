---
title: Spring(二)  AOP
published: 2021-02-12 20:25:15
comments: true
category: 后端学习
tags:
  - Spring
  - Java
---

# Spring(二)  AOP

AOP的底层机制就是动态代理！

## 一、静态/动态代理

Spring AOP中的动态代理主要有两种方式，JDK动态代理和CGLIB动态代理。

JDK动态代理通过反射来接收被代理的类，并且**要求被代理的类必须实现一个接口**。JDK动态代理的核心是InvocationHandler接口和Proxy类。

如果目标类没有实现接口，那么Spring AOP会选择使用CGLIB来动态代理目标类。

CGLIB（Code Generation Library），是一个代码生成的类库，可以在运行时动态的生成某个类的子类，注意，CGLIB是通过继承的方式做的动态代理，因此如果某个类被标记为final，那么它是无法使用CGLIB做动态代理的。


```
基于接口的代理
两个类
InvocationHandler
调用处理程序返回结果

proxy
提供生成动态代理类和实例的静态方法
```

## 二、一些名词

- 横切关注点：跨越应用程序多个模块的方法或功能。即是，与我们业务逻辑无关的，但是我们需要关注的部分，就是横切关注点。如日志 , 安全 , 缓存 , 事务等等 ....
- 切面（ASPECT）：横切关注点 被模块化 的特殊对象。即，它是一个类。
- 通知（Advice）：切面必须要完成的工作。即，它是类中的一个方法。
- 目标（Target）：被通知对象。
- 代理（Proxy）：向目标对象应用通知之后创建的对象。
- 切入点（PointCut）：切面通知 执行的 “地点”的定义。
- 连接点（JointPoint）：与切入点匹配的执行点。

## 三、实现方法：

### 方法一

使用spring的API接口（xml配置）主要是Spring接口实现

```xml
  <bean id="userservice" class="com.aop.user.UserServiceImpl"/>
    <bean id="log" class="com.aop.promefire.Log"/>
    <bean id="afterLog" class="com.aop.promefire.AfterLog"/>
    <aop:config>
        <!--切入点-->
        <!--excution表达式   UserServiceImpl.* 表示类中所有方法 -->
        <!--UserServiceImpl.*(..) 两个点表示可以有任意个参数-->
        <aop:pointcut id="pointcut" expression="execution(* com.aop.user.UserServiceImpl.*(..))"/>
        <aop:advisor advice-ref="log" pointcut-ref="pointcut"/>
        <aop:advisor advice-ref="afterLog" pointcut-ref="pointcut"/>
    </aop:config>
```

### 方法二

自定义类实现AOP（主要是切面定义）

定义一个增强类：

```java
public class DiyPointCut {
    public void before(){
        System.out.println("======方法前======");
    }
    public void after(){
        System.out.println("======方法后======");
    }
}

```



```java
 <bean id ="diy" class="com.aop.diy.DiyPointCut"/>
    <aop:config>
        <aop:aspect ref="diy">
            <!--切入点-->
            <aop:pointcut id="pointcut" expression="execution(* com.aop.user.UserServiceImpl.*(..))"/>
            <aop:before method="before" pointcut-ref="pointcut"/>
            <aop:after method="after" pointcut-ref="pointcut"/>
        </aop:aspect>
    </aop:config>
```

## 附：execution表达式

语法格式：

```xml
execution(<修饰符模式>？<返回类型模式><方法名模式>(<参数模式>)<异常模式>?)
```

示例：

```xml
execution(* com.sample.service.impl..*.*(..))
```

解释：

- execution()，表达式的主体
- 第一个“*”符号，表示返回值类型任意；
- com.sample.service.impl，AOP所切的服务的包名，即我们的业务部分
- 包名后面的“..”，表示当前包及子包
- 第二个“*”，表示类名，即所有类
- .*(..)，表示任何方法名，括号表示参数，两个点表示任何参数类型