## Intro (Chinese)
看了一些API的管理平台如API Layer、boomi、Odoo等平台，思考如果自己动手搭建一个API授权平台是否困难，结果透过网上的资源就能搭建起一个简易且可扩展API授权平台，且大部份依赖的功能都可免费体验，分享这次搭建的代码跟使用到的工具，希望想要在公司内部建立自用的API授权平台能很快地实现。

## Intro
Building an API market, like API Layer,boomi, Odoo etc, is easy by using available cloud resources and tools. This project is a simple and extensible API authorization platform, which can be used by any company to build their own API authorization platform.

## Guideline

Using guideline and code structure information 
https://developer.aliyun.com/article/1385779

## Preparation

1. Register an Alibaba cloud account [link](https://account.aliyun.com/register/qr_register.htm)
2. Applying an current unlimited-free-trial version of DataWorks [link](https://www.aliyun.com/product/bigdata/ide)
3. Goto develope an API in DataWorks DataService (registering APIs is free) [link](https://ds-cn-shanghai.data.aliyun.com/)
4. Preparing a linux server or subscribing an Linux server in Alibaba cloud [link](https://help.aliyun.com/zh/ecs/use-cases/deploy-a-node-js-environment-on-a-centos-7-instance)


## Init Server

Initiate server dependencies

```bash
# needs to install Node.js first
npm install --global yarn
yarn install-server
```

## Run Server

Please change AK info in ./server/OpenApiClient.js line 20-23 ([AK Info](https://ram.console.aliyun.com/manage/ak))

web resources locate in ./client/dist

```bash
yarn start
```

open http://localhost:3001


### Register Page

Register a new account and can see in API gateway management page ([link](https://apigateway.console.aliyun.com/#/cn-shanghai/apps/list)).

![image](https://ucc.alicdn.com/pic/developer-ecology/ahad7yzn7h66m_4cf82f77822744aaa6c982580a3ab32e.png)

![image](https://ucc.alicdn.com/pic/developer-ecology/ahad7yzn7h66m_24d67fd835bb4f308f5390f38f083b41.png)

### Login Page

Using a account login and management.

![image](https://ucc.alicdn.com/pic/developer-ecology/ahad7yzn7h66m_277e8cd3051e40cd931a7c0065f8fe40.png)


### API Market

Display available APIs in a market.

![image](https://ucc.alicdn.com/pic/developer-ecology/ahad7yzn7h66m_b3707135b43c418aa4a50f4d18da18ff.png)

![image](https://ucc.alicdn.com/pic/developer-ecology/ahad7yzn7h66m_d89ead56ca724d6dbb4757e9ca18a926.png)

### Authorized APIs

Users can see their APIs and remove subscriptions.

![image](https://ucc.alicdn.com/pic/developer-ecology/ahad7yzn7h66m_a3a7e91dfbf84420a0ae25ede2d7db8d.png)


![image](https://ucc.alicdn.com/pic/developer-ecology/ahad7yzn7h66m_2a109a921dcd4320a1c58823bc970e1b.png)

### API Details

Display an API details including request parameters.

![image](https://ucc.alicdn.com/pic/developer-ecology/ahad7yzn7h66m_cf5e3db60cbf418e8d7622a6c64b45ed.png)

### Authorized Information

Display login user's authorized information.

![image](https://ucc.alicdn.com/pic/developer-ecology/ahad7yzn7h66m_35566d8989474441ae96c56a90070107.png)

### Use API

Using curl or postman to request APIs.

![image](https://ucc.alicdn.com/pic/developer-ecology/ahad7yzn7h66m_5bf3c1fc689d423ca87e4ca1981e02c8.png)

## Deployment Server

Using self-built linux server and install [Node.js](https://nodejs.org/en/download/package-manager) and deploying above codes and run service.
Or subscribing a linux server in Alibaba cloud [link](https://help.aliyun.com/zh/ecs/use-cases/deploy-a-node-js-environment-on-a-centos-7-instance) and deploying above codes and run service.



