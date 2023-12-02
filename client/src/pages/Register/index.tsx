import React, { useState } from 'react';
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
      message.warning('Please input username');
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
      message.success('Register Success');
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
        <div className="title">Register</div>
      </div>
      <div className="form">
        <div className="kv">
          <div className="label">Username</div>
          <Input
            type="text"
            placeholder="Username"
            value={username}
            disabled={registering}
            onChange={handleUsernameChange}
            onPressEnter={() => handleSubmit()}
          />
        </div>
        <div className="operator">
          <Button onClick={() => handleSubmit()} loading={registering}>Register</Button>
          <Button onClick={() => gotoLogin()} disabled={registering}>Go to Login</Button>
        </div>
      </div>
    </div>
  );
}

export default Register;