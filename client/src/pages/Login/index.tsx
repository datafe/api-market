import React, { useState } from 'react';
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
      message.warning('Please input username and pass');
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
        <div className="title">API Market</div>
      </div>
      <div className="form">
        <div className="kv">
          <div className="label">Username</div>
          <Input
            type="text"
            placeholder="Username"
            value={username}
            disabled={logging}
            onChange={handleUsernameChange}
            onPressEnter={() => handleSubmit()}
          />
        </div>
        <div className="kv">
          <div className="label">Pass</div>
          <Input
            type="password"
            placeholder="Pass"
            value={pass}
            disabled={logging}
            onChange={handlePassChange}
            onPressEnter={() => handleSubmit()}
          />
        </div>
        <div className="operator">
          <Button onClick={() => handleSubmit()} loading={logging}>Log In</Button>
          <Button onClick={() => gotoRegister()} disabled={logging}>Go to Register</Button>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
