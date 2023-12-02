const CloudAPI20160714 = require('@alicloud/cloudapi20160714');
const $OpenApi = require('@alicloud/openapi-client');
const $Util = require('@alicloud/tea-util');
const tea = require('@alicloud/tea-typescript');

class OpenApiClient {

  /** Endpoint https://api.aliyun.com/product/CloudAPI */
  static getEndpoint(regionId = 'cn-shanghai') {
    return `apigateway.${regionId}.aliyuncs.com`;
  }

  /**
   * use ak and sk to init a client
   * @param regionId
   */
  static createClient(regionId) {
    // please use security sts way to auth: https://help.aliyun.com/document_detail/378664.html
    let config = new $OpenApi.Config({
      // AccessKey ID
      accessKeyId: process.env['ALIBABA_CLOUD_ACCESS_KEY_ID'],
      // AccessKey Secret
      accessKeySecret: process.env['ALIBABA_CLOUD_ACCESS_KEY_SECRET'],
    });
    config.endpoint = OpenApiClient.getEndpoint(regionId);
    return new CloudAPI20160714.default(config);
  }

  static async DescribeApiGroupsRequest(regionId = 'cn-shanghai', pageNumber = 1, pageSize = 50) {
    const client = OpenApiClient.createClient(regionId);
    const describeApiGroupsRequest = new CloudAPI20160714.DescribeApiGroupsRequest({ pageNumber, pageSize });
    const runtime = new $Util.RuntimeOptions({});
    try {
      return await client.describeApiGroupsWithOptions(describeApiGroupsRequest, runtime);
    } catch (error) {
      // print error
      $Util.default.assertAsString(error.message);
    }
  }

  static async DescribeDeployedApisRequest(regionId = 'cn-shanghai', apiName, apiPath, pageNumber = 1, pageSize = 10) {
    const client = OpenApiClient.createClient(regionId);
    const describeDeployedApisRequest = new CloudAPI20160714.DescribeDeployedApisRequest({ apiName, apiPath, pageNumber, pageSize });
    const runtime = new $Util.RuntimeOptions({});
    try {
      return await client.describeDeployedApisWithOptions(describeDeployedApisRequest, runtime);
    } catch (error) {
      // print error
      $Util.default.assertAsString(error.message);
    }
  }

  static async DescribeApiRequest(regionId = 'cn-shanghai', apiId) {
    const client = OpenApiClient.createClient(regionId);
    const describeApiRequest = new CloudAPI20160714.DescribeApiRequest({ apiId });
    const runtime = new $Util.RuntimeOptions({});
    try {
      return await client.describeApiWithOptions(describeApiRequest, runtime);
    } catch (error) {
      // print error
      $Util.default.assertAsString(error.message);
    }
  }

  static async DescribeApisByApp(regionId = 'cn-shanghai', appId, apiName, apiPath, pageNumber = 1, pageSize = 10) {
    const client = OpenApiClient.createClient(regionId);
    const describeApisByAppRequest = new CloudAPI20160714.DescribeApisByAppRequest({ appId, apiName, apiPath, pageNumber, pageSize });
    const runtime = new $Util.RuntimeOptions({});
    try {
      return await client.describeApisByAppWithOptions(describeApisByAppRequest, runtime);
    } catch (error) {
      // print error
      $Util.default.assertAsString(error.message);
    }
  }

  /** app is cross-site, if appId is empty, return all apps. */
  static async DescribeAppAttributesRequest(regionId = 'cn-shanghai', appId, pageNumber = 1, pageSize = 10) {
    const client = OpenApiClient.createClient(regionId);
    const describeAppAttributesRequest = new CloudAPI20160714.DescribeAppAttributesRequest({ appId, pageNumber, pageSize });
    const runtime = new $Util.RuntimeOptions({});
    try {
      return await client.describeAppAttributesWithOptions(describeAppAttributesRequest, runtime);
    } catch (error) {
      // print error
      $Util.default.assertAsString(error.message);
    }
  }

  static async DescribeAppSecurityRequest(regionId = 'cn-shanghai', appId) {
    const client = OpenApiClient.createClient(regionId);
    const describeAppSecurityRequest = new CloudAPI20160714.DescribeAppSecurityRequest({ appId });
    const runtime = new $Util.RuntimeOptions({});
    try {
      return await client.describeAppSecurityWithOptions(describeAppSecurityRequest, runtime);
    } catch (error) {
      // print error
      $Util.default.assertAsString(error.message);
    }
  }

  static async ResetAppCodeRequest(regionId = 'cn-shanghai', appCode) {
    const client = OpenApiClient.createClient(regionId);
    const resetAppCodeRequest = new CloudAPI20160714.ResetAppCodeRequest({ appCode });
    const runtime = new $Util.RuntimeOptions({});
    try {
      return await client.resetAppCodeWithOptions(resetAppCodeRequest, runtime);
    } catch (error) {
      // print error
      $Util.default.assertAsString(error.message);
    }
  }

  static async ResetAppSecretRequest(regionId = 'cn-shanghai', appKey) {
    const client = OpenApiClient.createClient(regionId);
    const resetAppSecretRequest = new CloudAPI20160714.ResetAppSecretRequest({ appKey });
    const runtime = new $Util.RuntimeOptions({});
    try {
      return await client.resetAppSecretWithOptions(resetAppSecretRequest, runtime);
    } catch (error) {
      // print error
      $Util.default.assertAsString(error.message);
    }
  }

  static async CreateAppRequest(regionId = 'cn-shanghai', appName) {
    const client = OpenApiClient.createClient(regionId);
    const createAppRequest = new CloudAPI20160714.CreateAppRequest({ appName });
    const runtime = new $Util.RuntimeOptions({});
    try {
      return await client.createAppWithOptions(createAppRequest, runtime);
    } catch (error) {
      // print error
      $Util.default.assertAsString(error.message);
    }
  }

  static async DeleteAppRequest(regionId = 'cn-shanghai', appId) {
    const client = OpenApiClient.createClient(regionId);
    const deleteAppRequest = new CloudAPI20160714.DeleteAppRequest({ appId: Number(appId) });
    const runtime = new $Util.RuntimeOptions({});
    try {
      return await client.deleteAppWithOptions(deleteAppRequest, runtime);
    } catch (error) {
      // print error
      $Util.default.assertAsString(error.message);
    }
  }

  static async SetApisAuthoritiesRequest(regionId = 'cn-shanghai', appId, groupId, apiIds, stageName = 'RELEASE') {
    const client = OpenApiClient.createClient(regionId);
    const setApisAuthoritiesRequest = new CloudAPI20160714.SetApisAuthoritiesRequest({ appId: Number(appId), groupId, apiIds: apiIds?.join?.(','), stageName });
    const runtime = new $Util.RuntimeOptions({});
    try {
      return await client.setApisAuthoritiesWithOptions(setApisAuthoritiesRequest, runtime);
    } catch (error) {
      // print error
      $Util.default.assertAsString(error.message);
    }
  }

  static async RemoveApisAuthoritiesRequest(regionId = 'cn-shanghai', appId, groupId, apiIds, stageName = 'RELEASE') {
    const client = OpenApiClient.createClient(regionId);
    const removeApisAuthoritiesRequest = new CloudAPI20160714.RemoveApisAuthoritiesRequest({ appId: Number(appId), groupId, apiIds: apiIds?.join?.(','), stageName });
    const runtime = new $Util.RuntimeOptions({});
    try {
      return await client.removeApisAuthoritiesWithOptions(removeApisAuthoritiesRequest, runtime);
    } catch (error) {
      // print error
      $Util.default.assertAsString(error.message);
    }
  }

}

module.exports = OpenApiClient;
