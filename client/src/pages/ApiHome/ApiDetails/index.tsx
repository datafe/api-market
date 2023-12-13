import React, { useEffect, useState } from 'react';
import ReactJson from 'react-json-view';
import intl from 'react-intl-universal';
import { getSessionId } from '../../../utils/utils';
import { Api, Group, ApiDetails } from '../../../typings';

import './index.scss';


interface IProps {
  group?: Group;
  api?: Api;
}

const Details: React.FC<IProps> = (props) => {
  const { api, group } = props;

  const [apiDetails, setApiDetails] = useState<ApiDetails>();

  const queryApi = async () => {
    if (!api?.apiId) return;
    const sessionId = getSessionId();
    if (!sessionId) return;
    const res = await fetch(`/api/details?sessionId=${sessionId}&regionId=${api?.regionId}&apiId=${api?.apiId}`, { method: 'GET' });
    const result = await res.json();
    setApiDetails(result?.data);
  };

  const getFullPath = (api?: Api, group?: Group) => {
    if (group?.subDomain && (api?.apiPath || api?.path)) {
      const basePath = group?.basePath === '/' ? '' : group?.basePath;
      return `${group?.subDomain}${basePath}${api?.apiPath || api?.path}`;
    }
  }

  useEffect(() => {
    if (api) queryApi();
  }, [api]);

  return (
    <div className="api-details">
      <div className="kv">
        <div className="label">{intl.get('id').d('ID')}</div>
        <div className="value">{apiDetails?.apiId}</div>
      </div>
      <div className="kv">
        <div className="label">{intl.get('name').d('Name')}</div>
        <div className="value">{apiDetails?.apiName}</div>
      </div>
      <div className="kv">
        <div className="label">{intl.get('description').d('Description')}</div>
        <div className="value">{apiDetails?.description}</div>
      </div>
      <div className="kv">
        <div className="label">{intl.get('created_time').d('Created Time')}</div>
        <div className="value">{apiDetails?.createdTime}</div>
      </div>
      <div className="kv">
        <div className="label">{intl.get('modified_time').d('Modified Time')}</div>
        <div className="value">{apiDetails?.modifiedTime}</div>
      </div>
      <div className="kv">
        <div className="label">{intl.get('auth_type').d('Auth Type')}</div>
        <div className="value">{apiDetails?.authType}</div>
      </div>
      <div className="kv">
        <div className="label">{intl.get('app_code_auth_type').d('App Code Auth Type')}</div>
        <div className="value">{apiDetails?.appCodeAuthType}</div>
      </div>
      <div className="kv">
        <div className="label">{intl.get('result_type').d('Result Type')}</div>
        <div className="value">{apiDetails?.resultType}</div>
      </div>
      <div className="kv">
        <div className="label">{intl.get('visibility').d('Visibility')}</div>
        <div className="value">{apiDetails?.visibility}</div>
      </div>
      <div className="kv">
        <div className="label">{intl.get('allow_signature_method').d('Allow Signature Method')}</div>
        <div className="value">{apiDetails?.allowSignatureMethod}</div>
      </div>
      <div className="kv">
        <div className="label">{intl.get('request_body_format').d('Request Body Format')}</div>
        <div className="value">{apiDetails?.requestConfig.bodyFormat}</div>
      </div>
      <div className="kv">
        <div className="label">{intl.get('request_post_body_desc').d('Request Post Body Desc')}</div>
        <div className="value">{apiDetails?.requestConfig.postBodyDescription}</div>
      </div>
      <div className="kv">
        <div className="label">{intl.get('request_http_method').d('Request HTTP Method')}</div>
        <div className="value">{apiDetails?.requestConfig.requestHttpMethod}</div>
      </div>
      <div className="kv">
        <div className="label">{intl.get('request_mode').d('Request Mode')}</div>
        <div className="value">{apiDetails?.requestConfig.requestMode}</div>
      </div>
      <div className="kv">
        <div className="label">{intl.get('request_path').d('Request Path')}</div>
        <div className="value">{apiDetails?.requestConfig.requestPath}</div>
      </div>
      <div className="kv">
        <div className="label">{intl.get('full_path').d('Full Path')}</div>
        <div className="value no-new-line">{getFullPath(api, group)}</div>
      </div>
      <div className="kv">
        <div className="label">{intl.get('request_protocol').d('Request Protocol')}</div>
        <div className="value">{apiDetails?.requestConfig.requestProtocol}</div>
      </div>
      <div className="kv">
        <div className="label">{intl.get('request_parameters').d('Request Parameters')}</div>
        <div className="value">
          <ReactJson collapsed src={apiDetails?.requestParameters} />
        </div>
      </div>
    </div>
  );
};

export default Details;