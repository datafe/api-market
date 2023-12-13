import React, { useState } from 'react';
import intl from 'react-intl-universal';
import { Input, Button, message } from 'antd';

import './index.scss';

interface IProps {

}

const Register: React.FC<IProps> = () => {

  const [username, setUsername] = useState<string>('');
  const [registering, setRegistering] = useState(false);

  const handleUsernameChange = (e: { target: { value: string } }) => {
    setUsername(e.target.value);
  };

  const handleSubmit = async () => {

    if (!username) {
      message.warning(intl.get('pls_input_username').d('Please input username'));
      return;
    }

    setRegistering(true);
    const res = await fetch('/user/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username,
      }),
    });

    const result = await res.json();

    if (result?.success) {
      message.success(intl.get('register_success').d('Register Success'));
      setTimeout(() => {
        window.open('/login', '_self');
      }, 2000);
    } else {
      message.error(result?.data);
      setRegistering(false);
    }
  };

  const gotoLogin = () => {
    window.open('/login', '_self');
  };

  return (
    <div className="register-page">
      <div className="header">
        <div className="logo" />
        <div className="title">{intl.get('register').d('Register')}</div>
      </div>
      <div className="form">
        <div className="kv">
          <div className="label">{intl.get('username').d('Username')}</div>
          <Input
            type="text"
            placeholder={intl.get('username').d('Username')}
            value={username}
            disabled={registering}
            onChange={handleUsernameChange}
            onPressEnter={() => handleSubmit()}
          />
        </div>
        <div className="operation">
          <Button onClick={() => handleSubmit()} loading={registering}>{intl.get('register').d('Register')}</Button>
          <Button onClick={() => gotoLogin()} disabled={registering}>{intl.get('go_login').d('Go Login')}</Button>
        </div>
      </div>
    </div>
  );
}

export default Register;