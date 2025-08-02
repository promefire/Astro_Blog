---
title: Web3-demo
published: 2025-3-4 16:00:00
category: 区块链
tags:
  - Web3
  - 区块链
description: 学习一下神奇的Web3
cover: https://img.promefire.top/blog-img/2025/03/c89a76a2ba40bed39a0e9e046f09694d.png
---



1、入门：[https://54web3.cc/blog/induction-tutorial/dapp-dev-learn-course](https://54web3.cc/blog/induction-tutorial/dapp-dev-learn-course)

2、ethers教程：[http://wtf.academy/zh/course/ethers101/HelloVitalik](http://wtf.academy/zh/course/ethers101/HelloVitalik)

3、web3学习路线：[https://54web3.cc/blog/roadmap/learning-path-web3](https://54web3.cc/blog/roadmap/learning-path-web3)

4、remix编译部署工具：[https://remix.ethereum.org/](https://remix.ethereum.org/#lang=zh&optimize=false&runs=200&evmVersion=null&version=soljson-v0.8.18+commit.87f61d96.js)

5、MetaMask钱包：[https://metamask.io](https://metamask.io)

6、Ganache个人区块链：[https://trufflesuite.com/ganache](https://trufflesuite.com/ganache)

7、vscode连接remix[https://blog.csdn.net/weixin_51254600/article/details/140351983](https://blog.csdn.net/weixin_51254600/article/details/140351983)



<h2 id="M0rBl">什么是Web3？</h2>
> <font style="color:rgb(51, 51, 51);">Web3 是区块链等技术的总称，这些技术可以分散互联网上的数据所有权和控制权。大多数互联网应用程序都由集中式实体控制，这些实体决定如何保存和使用最终用户数据。Web3（也称为 Web 3.0、去中心化 Web 或语义 Web）技术允许社区驱动的项目，而不是集中式管理结构。在这些项目中，最终用户控制数据、确定定价、直接为技术开发做出贡献，并在项目的方向上拥有更重要的发言权。这些技术具有自动调节用户相互交互方式的机制。因此，不需要集中式实体来管理这些交互。</font><font style="color:rgb(33, 33, 36);"> -----维基百科</font>



455



对于Web3的定义多种多样，最基本的共识就是可读、可写、可拥有的互联网。

web1.0就是可读的互联网。网站-->用户是单向的传播途径，用户只能阅读，不能参与

web2.0就是可读、可交互的互联网，用户可以上传文章、视频，如微博、贴吧。经营者提供平台，内容由用户制作。

web3.0可拥有的互联网，在web2网络平台上，用户创作的小说版权不属于作者，平台对于作品改变、周边的收益，只有一小部分流入作者的口袋。早期的网易云也拥有上传音乐的版权和大部分收益。web3的数据属于自己。

<img src="https://img.promefire.top/blog-img/2025/03/d5dcc626a660eac07d425b36cbd0c6a0.png" style=" width: 80%; /* 控制宽度比例（屏幕宽度的80%） */ max-width: 1200px; /* 最大宽度限制（避免过大拉伸模糊） */ height: auto; /* 高度自动适配 */ display: block; /* 转为块级元素 */ margin: 0 auto; /* 水平居中 */ object-fit: cover; /* 保持原始比例裁剪填充 */ ">





在数据所属权方面，web1用户数据保存在对应网站公司的服务器中；web2阶段存在一些行业巨头，一个账号可以登录多个平台，如微信。web3只需要一个钱包账号就能登录所有的DAPP，数据完全属于用户自己。

<img src="https://img.promefire.top/blog-img/2025/03/56bcc8ef6c07d51b2c6d85509de97dca.png" style=" width: 80%; /* 控制宽度比例（屏幕宽度的80%） */ max-width: 1200px; /* 最大宽度限制（避免过大拉伸模糊） */ height: auto; /* 高度自动适配 */ display: block; /* 转为块级元素 */ margin: 0 auto; /* 水平居中 */ object-fit: cover; /* 保持原始比例裁剪填充 */ ">

<img src="https://img.promefire.top/blog-img/2025/03/e260fe74be93d0fd6162d21a59033781.png" style=" width: 80%; /* 控制宽度比例（屏幕宽度的80%） */ max-width: 1200px; /* 最大宽度限制（避免过大拉伸模糊） */ height: auto; /* 高度自动适配 */ display: block; /* 转为块级元素 */ margin: 0 auto; /* 水平居中 */ object-fit: cover; /* 保持原始比例裁剪填充 */ ">







<h2 id="D8fks">DAPP是什么？</h2>
> <font style="color:rgb(33, 33, 36);">去中心化应用程序（</font>**<font style="color:rgb(33, 33, 36);">DApp）</font>**<font style="color:rgb(33, 33, 36);">是可以自主运行的应用程式，通常通过使用智能合约，在去中心化计算区块链系统上执行。与传统应用程式一样，DApp 为其用户提供一些功能或实用程式。但是，与传统应用程式不同，DApp 无需人工干预即可执行，也不属于任何一个实体，而是 DApp 分发代表所有权的代币。这些代币根据程式演算法分配给系统用户，稀释了 DApp 的所有权和控制权。在没有任何一个实体控制系统的情况下，应用程序变得去中心化。 																	-----维基百科</font>

<img src="https://img.promefire.top/blog-img/2025/03/2e428bf3be33c55d5b2a08c3847b883b.png" style=" width: 80%; /* 控制宽度比例（屏幕宽度的80%） */ max-width: 1200px; /* 最大宽度限制（避免过大拉伸模糊） */ height: auto; /* 高度自动适配 */ display: block; /* 转为块级元素 */ margin: 0 auto; /* 水平居中 */ object-fit: cover; /* 保持原始比例裁剪填充 */ ">





DAPP：相当于web前端

Server：相当于web后端

智能合约：DAPP相比于传统APP多的就是部分，感觉就是一个个函数，传递参数给部署于区块链上的智能合约，返回结果





<h2 id="fme2r">Ganache</h2>
是一个本机个人区块链，测试开发必不可少！

安装后创建新工作空间，填写name，点击start

<img src="https://img.promefire.top/blog-img/2025/03/12dbbf355508b927c6eeedfa07e82069.png" style=" width: 80%; /* 控制宽度比例（屏幕宽度的80%） */ max-width: 1200px; /* 最大宽度限制（避免过大拉伸模糊） */ height: auto; /* 高度自动适配 */ display: block; /* 转为块级元素 */ margin: 0 auto; /* 水平居中 */ object-fit: cover; /* 保持原始比例裁剪填充 */ ">

可以看到生成了10个账户，每个账户余额为100ETH，点击右侧钥匙按钮可以看到

<img src="https://img.promefire.top/blog-img/2025/03/f50fd80e715cf9ff0738c0e2fef55e06.png" style=" width: 80%; /* 控制宽度比例（屏幕宽度的80%） */ max-width: 1200px; /* 最大宽度限制（避免过大拉伸模糊） */ height: auto; /* 高度自动适配 */ display: block; /* 转为块级元素 */ margin: 0 auto; /* 水平居中 */ object-fit: cover; /* 保持原始比例裁剪填充 */ ">

+ url：[HTTP://127.0.0.1:7545](HTTP://127.0.0.1:7545)
+ network id：1337



<h2 id="neXKw">MetaMask</h2>
> 是用于与以太坊区块链加密货币钱包。它可以通过浏览器扩充程式或行动应用程式让使用者访问其以太坊钱包，与去中心化应用进行互动。

安装小狐狸插件后添加测试网络，即Ganache生成的本地区块链网络，这个地方链ID貌似只能使用1337，建议在Ganache将网络id改为1337





![](https://img.promefire.top/blog-img/2025/03/5be67eca6b6152c6d421fbe9ff3149a4.png)

在Ganache中选择一个账户，点击右侧的key，复制账号私钥，



<img 
  src="https://img.promefire.top/blog-img/2025/03/24a29b31deb168254653723a589e37ef.png" 
  style="
    width: 80%;       /* 控制宽度比例（屏幕宽度的80%） */
    max-width: 1200px; /* 最大宽度限制（避免过大拉伸模糊） */
    height: auto;      /* 高度自动适配 */
    display: block;    /* 转为块级元素 */
    margin: 0 auto;    /* 水平居中 */
    object-fit: cover; /* 保持原始比例裁剪填充 */
  ">





在小狐狸钱包中导入账号，输入私钥即可

![](https://img.promefire.top/blog-img/2025/03/1f82b1de11c24604e2ac21a7f7afd30a.png)





<h2 id="OSnCL">使用Remix创建和部署合约</h2>
创建一个`hello.sol`文件

```solidity
pragma solidity 0.8.18;
// SPDX-License-Identifier: MIT 
contract Hello {
    function greet() external pure returns(string memory) {
      return "Hello Web3";
    }
  }

```

+ `// SPDX-License-Identifier: MIT` 是一个协议，不加过不了

注意此处的编译器版本要和代码中的版本号保持一致

<img 
  src="https://img.promefire.top/blog-img/2025/03/259427f52a6c0a7c03b12e88c3b33c45.png" 
  style="
    width: 80%;       /* 控制宽度比例（屏幕宽度的80%） */
    max-width: 1200px; /* 最大宽度限制（避免过大拉伸模糊） */
    height: auto;      /* 高度自动适配 */
    display: block;    /* 转为块级元素 */
    margin: 0 auto;    /* 水平居中 */
    object-fit: cover; /* 保持原始比例裁剪填充 */
  ">





选择部署到我们之前使用Ganache创建的个人区块链上，部署成功后，点击greet可以返回"Hello Web3"，这不就是个函数方法嘛

<div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px;">
  <img 
    src="https://img.promefire.top/blog-img/2025/03/d4764a6669bbd9181e07b3c8aff25e0e.png" 
    style="width: 100%; height: 300px; object-fit: contain;"
  >
  <img 
    src="https://img.promefire.top/blog-img/2025/03/6ca21383682e2a9dccd7e316afc96bd5.png" 
    style="width: 100%; height: 300px; object-fit: contain;"
  >
</div>







<h2 id="zWJAF">DAPP前端</h2>


vscode创建一个`dapp.html`文件，代码如下：

```html
<html>
  <head>
    <meta charset="utf-8" />
    <title>Dapp Demo</title>
  </head>
  <body>
    <div style="text-align:center;margin-top:30px;">
      <div style="text-align:center">
        <button>连接钱包</button>
        <button>调用合约</button>
      </div>
      <div style="margin-top:10px" id="account">账户：</div>
      <div style="margin-top:10px;" id="contract">合约：</div>
    </div>
  </body>
</html>
```

为了直接在网页上观察，需要安装插件`live server`,完成后再在html页面右键`open with live server` 打开浏览器。接着在html代码中引入`ethers.js`库

> 从 Ethers.js 版本 6.x 开始，Ethers.js 不再直接支持在` <script>`  标签中引入的方式，而是需要通过 ES 模块或者构建工具来使用。会遇到 Unexpected token 'export' 的错误。这是因为 Ethers.js 6.x 使用了 ES 模块语法，而浏览器中不支持这种直接导入。 解决方法：可以使用 Ethers.js 版本 5.x，它仍然支持通过 `<script> ` 标签引入。


```diff
<html>
  <head>
    <meta charset="utf-8" />
    <title>Dapp Demo</title>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/ethers/6.6.2/ethers.min.js"></script>
  </head>
  <body>
    <div style="text-align:center;margin-top:30px;">
      <div style="text-align:center">
        <button>连接钱包</button>
        <button>调用合约</button>
      </div>
      <div style="margin-top:10px" id="account">账户：</div>
      <div style="margin-top:10px;" id="contract">合约：</div>
    </div>

  </body>
</html>

```



###  连接钱包

​	钱包这两个字总给不知情的人一种劝退感，其实一个钱包就是一个账号，就像各大APP注册账号后也能充钱进去一样，不一样的是除了自己没有平台知道密码，不提供找回密码服务。

小狐狸钱包NetaMask，是作为浏览器扩展注入到了当前浏览器窗口的window对象中，我们可以在控制台使用`window.ethereum`访问。

![](https://img.promefire.top/blog-img/2025/03/d553ee7a54d2df850213eeceb2f3fbe6.png)

连接钱包的方法如下，需要放在script标签内，且要为连接钱包按钮添加点击事件onclick()

```javascript
async function connectWallet() {
  if (typeof window.ethereum === 'undefined') {
    alert('请先安装小狐狸钱包')
    return
  }

  let accounts = await window.ethereum.request({ method: 'eth_requestAccounts' })
  if (accounts.length > 0) {
    document.getElementById('account').innerText = '账号：' + accounts[0]
  }
}
```







<h3 id="KbuFU">调用合约</h3>
首先定义的是provider变量，`ethers.js` 库中的provider是对以太坊网络的抽象，前端的JS通过provider与后面的以太坊网络进行交互。通过provider + 合约地址 contractAddress+ 合约ABI，就可以创建一个只能合约对象，调用其greet方法。

```javascript
async function runContract() {
        if (typeof window.ethereum === "undefined") {
          alert("请先安装小狐狸钱包");
          return;
        }

        let provider = new ethers.providers.Web3Provider(window.ethereum);
        let contract = new ethers.Contract(contractAddress, contractAbi, provider.getSigner());
        let result = await contract.greet();
        document.getElementById("contract").innerText = result;
      }
```

contractAddress我们在Redmix部署成功界面复制，ABI在编译界面最低部复制


<div style="display: flex; justify-content: space-between; gap: 10px;">
  <img src="https://img.promefire.top/blog-img/2025/03/6048edfc0e28cb0a9427222eace73357.png" style="width: 48%;"/>
  <img src="https://img.promefire.top/blog-img/2025/03/e92e38ae8a6b4ad47229f61bbb2df5f8.png" style="width: 48%;"/>
</div>



完整代码如下：

```html
<html>
  <head>
    <meta charset="utf-8" />
    <title>Dapp Demo</title>
    <script src="https://cdn.jsdelivr.net/npm/ethers@5.7.2/dist/ethers.umd.min.js"></script>
  </head>
  <body>
    <div style="text-align:center;margin-top:30px;">
      <div style="text-align:center">
        <button onclick="connectWallet()">连接钱包</button>
        <button onclick="runContract()">调用合约</button>
      </div>
      <div style="margin-top:10px" id="account">账户：</div>
      <div style="margin-top:10px;" id="contract">合约：</div>
    </div>
    <script>
        const contractAddress = "0xc58482bd1B61fE55aF8F50f75314E6eA5c99a55c"
        const contractAbi = [
            {
              "inputs": [],
              "name": "greet",
              "outputs": [
                {
                  "internalType": "string",
                  "name": "",
                  "type": "string"
                }
              ],
              "stateMutability": "pure",
              "type": "function"
            }
          ]
        async function connectWallet() {
          if (typeof window.ethereum === 'undefined') {
            alert('请先安装小狐狸钱包')
            return
          }
    
          let accounts = await window.ethereum.request({ method: 'eth_requestAccounts' })
          if (accounts.length > 0) {
            document.getElementById('account').innerText = '账号：' + accounts[0]
          }
        }
          // 调用合约
        async function runContract() {
        if (typeof window.ethereum === "undefined") {
          alert("请先安装小狐狸钱包");
          return;
        }

        let provider = new ethers.providers.Web3Provider(window.ethereum);
        let contract = new ethers.Contract(contractAddress, contractAbi, provider.getSigner());
        let result = await contract.greet();
        document.getElementById("contract").innerText = result;
      }


      </script>
  </body>
</html>

```

最后可以成功在前端连接钱包并调用合约greet方法。

![](https://img.promefire.top/blog-img/2025/03/af2e16787de4916d485f462b411e5218.png)



到目前为止，并没有发现和传统后端有什么区别。传统项目 + 区块链账号私钥登录就能等于DAPP吗？





