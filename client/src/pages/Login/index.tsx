import React, { useState } from 'react';
import intl from 'react-intl-universal';
import { message, Input, Button } from 'antd';

import './index.scss';

interface IProps {

}

const LoginPage: React.FC<IProps> = () => {

  const [username, setUsername] = useState<string>('');
  const [pass, setPass] = useState<string>('');
  const [logging, setLogging] = useState(false);

  const handleUsernameChange = (e: { target: { value: string } }) => {
    setUsername(e.target.value);
  };

  const handlePassChange = (e: { target: { value: string } }) => {
    setPass(e.target.value);
  };

  const gotoRegister = () => {
    window.open('/register', '_self');
  };

  const handleSubmit = async () => {

    if (!username || !pass) {
      message.warning(intl.get('pls_input_username_and_pass').d('Please input username and pass'));
      return;
    }

    setLogging(true);
    const res = await fetch('/user/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username,
        pass,
      }),
    });

    const result = await res.json();

    if (result?.success) {
      sessionStorage.setItem('sessionId', result?.data?.sessionId);
      window.open('/home', '_self');
      // goto api list home, and don't need to set logging state
    } else {
      message.error(result?.data);
      setLogging(false);
    }

  };

  return (
    <div className="login-page">
      <div className="header">
        <div className="logo" />
        <div className="title">{intl.get('product_name').d('API Market')}</div>
      </div>
      <div className="form">
        <div className="kv">
          <div className="label">{intl.get('username').d('Username')}</div>
          <Input
            type="text"
            placeholder={intl.get('username').d('Username')}
            value={username}
            disabled={logging}
            onChange={handleUsernameChange}
            onPressEnter={() => handleSubmit()}
          />
        </div>
        <div className="kv">
          <div className="label">{intl.get('pass').d('Pass')}</div>
          <Input
            type="password"
            placeholder={intl.get('pass').d('Pass')}
            value={pass}
            disabled={logging}
            onChange={handlePassChange}
            onPressEnter={() => handleSubmit()}
          />
        </div>
        <div className="operation">
          <Button onClick={() => handleSubmit()} loading={logging}>{intl.get('log_in').d('Log In')}</Button>
          <Button onClick={() => gotoRegister()} disabled={logging}>{intl.get('go_register').d('Go Register')}</Button>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
