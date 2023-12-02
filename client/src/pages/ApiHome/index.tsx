import React, { useEffect, useState } from 'react';
import ApiList from './ApiList';
import AuthorizedApiList from './AuthorizedApiList';
import AuthorizedInfo from './AuthorizedInfo';
import { Tabs, Button } from 'antd';
import { SiteUser } from '../../typings';

import './index.scss';

interface IProps {
}

type TabPosition = 'left' | 'right' | 'top' | 'bottom';

const ApiHome: React.FC<IProps> = () => {

  /** checking login status */
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<SiteUser>();
  const [tabPosition] = useState<TabPosition>('left');

  const querySiteUser = async () => {
    const sessionId = sessionStorage.getItem('sessionId');
    if (!sessionId) return;
    const res = await fetch(`/user/isLogin?sessionId=${sessionId}`, { method: 'GET' });
    const result = await res.json();
    return result;
  };

  useEffect(() => {
    const checkLogin = async () => {
      setLoading(true);
      const result = await querySiteUser();
      if (!result?.success) window.open('/login', '_self');
      else setUser(result?.data);
      setLoading(false);
    };
    checkLogin();
  }, []);

  // const onUnregister = async () => {
  //   sessionStorage.removeItem('sessionId');
  //   if (user?.sessionId) {
  //     const res = await fetch(`/user/unregister?sessionId=${user?.sessionId}`, { method: 'POST' });
  //     const result = await res.json();
  //     if (result?.success) {
  //       setUser(undefined);
  //       window.open('/login', '_self');
  //     }
  //   } else {
  //     window.open('/login', '_self');
  //   }
  // };

  const onLogout = async () => {
    sessionStorage.removeItem('sessionId');
    if (user?.sessionId) {
      const res = await fetch(`/user/logout?sessionId=${user?.sessionId}`, { method: 'POST' });
      const result = await res.json();
      if (result?.success) {
        setUser(undefined);
        window.open('/login', '_self');
      }
    } else {
      window.open('/login', '_self');
    }
  };

  const tabItems = [
    {
      label: 'API Market',
      key: 'apiList',
      children: user ? <ApiList siteUser={user} /> : <div />,
    },
    {
      label: 'Authorized APIs',
      key: 'authorizedApis',
      children: user ? <AuthorizedApiList siteUser={user} /> : <div />,
    },
    {
      label: 'Authorized Info',
      key: 'authorizedInfo',
      children: user ? <AuthorizedInfo siteUser={user} /> : <div />,
    },
  ];

  return loading ? <div className="loading" >Loading...</div> : (
    <div className="api-home">
      <div className="home-header">
        <div className="welcome">{`Hi, ${user?.appName || 'user'}`}</div>
        <div className="operator">
          <Button onClick={() => onLogout()}>Logout</Button>
          {/* 
            <Popconfirm
              title="Unregister"
              description="Are you sure to unregister this account?"
              onConfirm={() => onUnregister()}
              okText="Yes"
              cancelText="No"
            >
              <Button danger>Unregister</Button>
            </Popconfirm> 
          */}
        </div>
      </div>
      <Tabs
        className="api-tabs"
        tabPosition={tabPosition}
        items={tabItems}
      />
    </div>
  );
}

export default ApiHome

