import React, { useEffect, useState } from 'react';
import delay from 'lodash/delay';
import { Button, message } from 'antd';
import { getSessionId } from '../../../utils/utils';
import { AppSecurity, SiteUser } from '../../../typings';

import './index.scss';

interface IProps {
  siteUser: SiteUser;
}


const AuthorizedInfo: React.FC<IProps> = (props) => {

  const { siteUser } = props;

  const [, setLoading] = useState(false);
  const [resettingAppCode, setResettingAppCode] = useState(false);
  const [resettingAppSecret, setResettingAppSecret] = useState(false);
  const [showAppSecret, setShowAppSecret] = useState(false);
  const [security, setSecurity] = useState<AppSecurity>();

  const querySecurity = async () => {
    const sessionId = getSessionId();
    if (!sessionId) return;
    setLoading(true);
    const res = await fetch(`/app/security?sessionId=${sessionId}&appId=${siteUser?.appId}`, { method: 'GET' });
    const result = await res.json();
    setSecurity(result?.data);
    setLoading(false);
  };

  useEffect(() => {
    querySecurity();
  }, []);

  const onResetAppCode = async () => {

    const sessionId = getSessionId();
    if (!sessionId) return;
    setResettingAppCode(true);

    const res = await fetch(`/app/resetAppCode?sessionId=${sessionId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        appCode: security?.appCode,
      }),
    });

    const result = await res.json();

    if (result?.success) message.success('Reset Success');
    else message.error('Reset Failed');

    setResettingAppCode(false);

    delay(() => querySecurity(), 1000);

  };

  const onResetAppSecret = async () => {

    const sessionId = getSessionId();
    if (!sessionId) return;
    setResettingAppSecret(true);

    const res = await fetch(`/app/resetAppSecret?sessionId=${sessionId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        appKey: security?.appKey,
      }),
    });

    const result = await res.json();

    if (result?.success) message.success('Reset Success');
    else message.error('Reset Failed');

    setResettingAppSecret(false);

    delay(() => querySecurity(), 1000);

  };

  return (
    <div className="authorized-info-page">
      <div className="kv">
        <div className="label">APP Code</div>
        <div className="value">
          <span className="text-wrapper">{security?.appCode}</span>
          <Button className="reset-btn" size="small" loading={resettingAppCode} onClick={() => onResetAppCode()}>Reset</Button>
        </div>
      </div>
      <div className="kv">
        <div className="label">APP Key</div>
        <div className="value">{security?.appKey}</div>
      </div>
      <div className="kv">
        <div className="label">APP Secret</div>
        <div className="value">
          {showAppSecret ?
            <span className="text-wrapper">
              <span>{security?.appSecret}</span>
              <Button className="hide-secret-btn" size="small" onClick={() => setShowAppSecret(false)}>Hide</Button>
            </span> :
            <span className="text-wrapper">
              <span className="show-secret-span" onClick={() => setShowAppSecret(true)}>Click to Show</span>
            </span>
          }
          <Button className="reset-btn" size="small" loading={resettingAppSecret} onClick={() => onResetAppSecret()}>Reset</Button>
        </div>
      </div>
      <div className="kv">
        <div className="label">Created Time</div>
        <div className="value">{security?.createdTime}</div>
      </div>
      <div className="kv">
        <div className="label">Modified Time</div>
        <div className="value">{security?.modifiedTime}</div>
      </div>
      <div className="toolbar">
        <Button shape="round" onClick={() => querySecurity()}>Refresh</Button>
      </div>
    </div>
  );
};

export default AuthorizedInfo;

