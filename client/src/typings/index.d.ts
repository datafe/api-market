/* eslint-disable @typescript-eslint/no-explicit-any */

interface SiteUser {
  sessionId: string;
  appId: string;
  appName: string;
  createdTime: string;
  description: string;
  modifiedTime: string;
}

interface Group {
  basePath: string;
  billingStatus: string;
  createdTime: string;
  description: string;
  groupId: string;
  groupName: string;
  httpsPolicy: string;
  illegalStatus: string;
  instanceId: string;
  instanceType: string;
  modifiedTime: string;
  regionId: string;
  subDomain: string;
  trafficLimit: string;
}

interface Api {
  apiId: string;
  apiMethod: 'GET' | 'POST';
  apiName: string;
  apiPath: string;
  path: string;
  deployedTime: string;
  description: string;
  groupId: string;
  groupName: string;
  regionId: string;
  stageName: string;
  visibility: string;
}

interface ApiDetails extends Api {
  createdTime: string;
  modifiedTime: string;
  resultType: string;
  visibility: string;
  allowSignatureMethod: string;
  authType: string;
  appCodeAuthType: string;
  requestConfig: {
    bodyFormat: string;
    postBodyDescription: string;
    requestHttpMethod: string;
    requestMode: string;
    requestPath: string;
    requestProtocol: string;
  };
  requestParameters: any;
}

interface AppSecurity {
  appCode: string;
  appKey: string;
  appSecret: string;
  createdTime: string;
  modifiedTime: string;
  requestId: string;
}

export {
  SiteUser,
  Group,
  Api,
  ApiDetails,
  AppSecurity,
};
