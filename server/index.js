const express = require('express');
const path = require('path');
const uuid = require('uuid');
const OpenApiClient = require('./OpenApiClient');

const app = express();

const defaultRegionId = 'cn-shanghai';

// simple implement password check
const adminPass = 'test';
const userPassMap = {
  'test1': 'test1'
};

// simply record session
const sessions = [];

const initSession = () => {
  const sessionId = uuid.v4();
  if (sessions.findIndex((s) => s?.sessionId === sessionId) !== -1) {
    return initSession();
  }
  const session = { sessionId };
  // simply control cache size, set max count
  if (sessions.length > 50000) sessions.shift();
  sessions.push(session);
  return session;
};

const queryAllApps = async (regionId) => {
  // simply use apps to check login
  // query all apps
  let apps = [];
  let current = 1;
  let allPageNumber;
  const exec = async (pageNumber, pageSize) => {
    const result = await OpenApiClient.DescribeAppAttributesRequest(regionId || defaultRegionId, null, pageNumber, pageSize);
    if (result?.body) apps.push(...result?.body?.apps?.appAttribute || []);
    if (!allPageNumber) allPageNumber = Math.ceil(result?.body?.totalCount / pageSize);
    if (pageNumber < allPageNumber) {
      current += 1;
      await exec(current, pageSize);
    }
  }
  await exec(current, 50);
  return apps;
};

// return a session
const isLogin = (sessionId) => {
  let result;
  if (sessionId) {
    result = sessions.find((s) => s?.sessionId === sessionId);
  }
  return result;
}

const wrapResult = (params = {}) => {
  const { success, data, code, message } = params;
  return {
    success,
    data,
    code,
    message,
  };
};

// for post body paring
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// app.use('/static', express.static(__dirname + '/static'));

// Have Node serve the files for our built React app
app.use(express.static(path.resolve(__dirname, '../client/dist')));

// app.all('/', function (req, res, next) {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header("Access-Control-Allow-Headers", "X-Requested-With");
//   next();
// });

app.get("/group/list", async (req, res) => {
  const { sessionId, pageNumber, pageSize } = req.query || {};

  if (!isLogin(sessionId)) {
    res.json(wrapResult({ success: false }));
    return;
  }

  const regionId = req.query?.regionId || defaultRegionId;
  const result = await OpenApiClient.DescribeApiGroupsRequest(regionId, pageNumber, pageSize);
  if (result) {
    res.json(wrapResult({ success: true, data: result?.body }));
  } else {
    res.json(wrapResult({ success: false }));
  }
});

app.get("/api/list", async (req, res) => {
  const { sessionId, apiName, apiPath, pageNumber, pageSize } = req.query || {};

  if (!isLogin(sessionId)) {
    res.json(wrapResult({ success: false }));
    return;
  }

  const regionId = req.query?.regionId || defaultRegionId;
  const result = await OpenApiClient.DescribeDeployedApisRequest(regionId, apiName, apiPath, pageNumber, pageSize);
  if (result) {
    res.json(wrapResult({ success: true, data: result?.body }));
  } else {
    res.json(wrapResult({ success: false }));
  }
});

app.get("/api/details", async (req, res) => {
  const { sessionId, apiId } = req.query || {};

  if (!isLogin(sessionId)) {
    res.json(wrapResult({ success: false }));
    return;
  }

  const regionId = req.query?.regionId || defaultRegionId;
  const result = await OpenApiClient.DescribeApiRequest(regionId, apiId);
  if (result) {
    res.json(wrapResult({ success: true, data: result?.body }));
  } else {
    res.json(wrapResult({ success: false }));
  }
});

app.get("/app/apis", async (req, res) => {
  const { sessionId, appId, apiName, apiPath, pageNumber, pageSize } = req.query || {};

  if (!isLogin(sessionId)) {
    res.json(wrapResult({ success: false }));
    return;
  }

  const regionId = req.query?.regionId || defaultRegionId;
  const result = await OpenApiClient.DescribeApisByApp(regionId, appId, apiName, apiPath, pageNumber, pageSize);
  if (result) {
    res.json(wrapResult({ success: true, data: result?.body }));
  } else {
    res.json(wrapResult({ success: false }));
  }
});

app.get("/app/details", async (req, res) => {
  const { sessionId, appId } = req.query || {};

  if (!isLogin(sessionId)) {
    res.json(wrapResult({ success: false }));
    return;
  }

  const regionId = req.query?.regionId || defaultRegionId;
  const result = await OpenApiClient.DescribeAppAttributesRequest(regionId, appId);
  if (result) {
    res.json(wrapResult({ success: true, data: result?.body }));
  } else {
    res.json(wrapResult({ success: false }));
  }
});

app.get("/app/security", async (req, res) => {
  const { sessionId, appId } = req.query || {};

  if (!isLogin(sessionId)) {
    res.json(wrapResult({ success: false }));
    return;
  }

  const regionId = req.query?.regionId || defaultRegionId;
  const result = await OpenApiClient.DescribeAppSecurityRequest(regionId, appId);
  if (result) {
    res.json(wrapResult({ success: true, data: result?.body }));
  } else {
    res.json(wrapResult({ success: false }));
  }
});

app.post("/app/resetAppCode", async (req, res) => {
  const { sessionId } = req.query || {};
  const { appCode } = req.body || {};

  if (!isLogin(sessionId)) {
    res.json(wrapResult({ success: false }));
    return;
  }

  const regionId = req.query?.regionId || defaultRegionId;
  const result = await OpenApiClient.ResetAppCodeRequest(regionId, appCode);
  if (result) {
    res.json(wrapResult({ success: true, data: result?.body }));
  } else {
    res.json(wrapResult({ success: false }));
  }
});

app.post("/app/resetAppSecret", async (req, res) => {
  const { sessionId } = req.query || {};
  const { appKey } = req.body || {};

  if (!isLogin(sessionId)) {
    res.json(wrapResult({ success: false }));
    return;
  }

  const regionId = req.query?.regionId || defaultRegionId;
  const result = await OpenApiClient.ResetAppSecretRequest(regionId, appKey);
  if (result) {
    res.json(wrapResult({ success: true, data: result?.body }));
  } else {
    res.json(wrapResult({ success: false }));
  }
});

app.post("/user/login", async (req, res) => {
  const { username, pass } = req.body || {};
  const regionId = req.query?.regionId || defaultRegionId;

  const apps = await queryAllApps(regionId);

  const app = apps.find((app) => app?.appName === username && ((userPassMap[username] === pass) || pass === adminPass));

  if (app) {
    // init session
    const session = initSession();
    Object.keys(app).forEach((k) => {
      session[k] = app[k];
    })
    res.json(wrapResult({ success: true, data: session }));
  } else {
    res.json(wrapResult({ success: false, data: 'Invalid username or pass' }));
  }

});

app.post("/user/logout", async (req, res) => {
  const { sessionId } = req.query || {};
  const existedIndex = sessions.findIndex((s) => s?.sessionId === sessionId);
  if (existedIndex !== -1) sessions.splice(existedIndex, 1);
  res.json(wrapResult({ success: true }));
});

app.get("/user/isLogin", async (req, res) => {
  const { sessionId } = req.query || {};
  const session = isLogin(sessionId);
  if (session) res.json(wrapResult({ success: true, data: session }));
  else res.json(wrapResult({ success: false }));
});

app.post("/user/register", async (req, res) => {
  const { username } = req.body || {};
  if (username) {
    const regionId = req.body?.regionId || defaultRegionId;

    // use username as app name
    const appName = username;

    // avoid duplicate name
    const apps = await queryAllApps(regionId);
    if (apps.findIndex((app) => app?.appName === appName) !== -1) {
      res.json(wrapResult({ success: false, data: 'Duplicated Account' }));
      return;
    }

    const result = await OpenApiClient.CreateAppRequest(defaultRegionId, appName);
    if (result?.body) res.json(wrapResult({ success: true, data: { appName, ...result?.body } }));
    else res.json(wrapResult({ success: false, data: 'Failed to create account' }));
  } else {
    res.json(wrapResult({ success: false, data: 'Failed to create account' }));
  }
});

app.post("/user/unregister", async (req, res) => {
  const { sessionId } = req.query || {};

  const session = isLogin(sessionId);

  if (session) {
    // get app id from session
    const { appId } = session;
    const result = await OpenApiClient.DeleteAppRequest(defaultRegionId, appId);
    if (result?.body) res.json(wrapResult({ success: true }));
    else res.json(wrapResult({ success: false }));
  } else {
    res.json(wrapResult({ success: false }));
  }
});

app.post("/api/removeAuthorities", async (req, res) => {
  const { sessionId } = req.query || {};
  const { groupId, apiIds, stageName } = req.body || {};

  const session = isLogin(sessionId);

  if (session) {
    // get app id from session
    const { appId } = session;
    const result = await OpenApiClient.RemoveApisAuthoritiesRequest(defaultRegionId, appId, groupId, apiIds, stageName);
    if (result?.body) res.json(wrapResult({ success: true }));
    else res.json(wrapResult({ success: false, data: 'Failed to remove authorities' }));
  } else {
    res.json(wrapResult({ success: false, data: 'Failed to remove authorities' }));
  }
});

app.post("/api/applyAuthorities", async (req, res) => {
  const { sessionId } = req.query || {};
  const { groupId, apiIds, stageName } = req.body || {};

  const session = isLogin(sessionId);

  if (session) {
    // get app id from session
    const { appId } = session;
    const result = await OpenApiClient.SetApisAuthoritiesRequest(defaultRegionId, appId, groupId, apiIds, stageName);
    if (result?.body) res.json(wrapResult({ success: true }));
    else res.json(wrapResult({ success: false, data: 'Failed to set authorities' }));
  } else {
    res.json(wrapResult({ success: false, data: 'Failed to set authorities' }));
  }
});

// All other GET requests not handled before will return our React app
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../client/dist', 'index.html'));
});

// app.get('/test', function(req, res, next) {
//     // Handle the get for this route
// });

// app.post('/post', function(req, res, next) {
//     // Handle the post for this route
// });

app.listen(3001);
console.log('express running at http://localhost:%d', 3001);
