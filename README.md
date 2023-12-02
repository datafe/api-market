## Guideline

Using guideline and code structure information 
https://developer.aliyun.com/article/1385779


## Init Server

Initiate server dependencies

```bash
# needs to install Node.js first
npm install --global yarn
yarn install-server
```

## Run Server

Please change AK info in ./server/OpenApiClient.js line 20-23

web resources locate in ./client/dist

```bash
yarn start
```

open http://localhost:3001


### Register Page

Register a new account and can see in API gateway management page.

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



