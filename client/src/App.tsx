
import React, { Suspense } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";

import './App.scss';

const LoginPage = React.lazy(() => import('./pages/Login' /* webpackChunkName:"login-page" */));
const RegisterPage = React.lazy(() => import('./pages/Register' /* webpackChunkName:"register-page" */));
const ApiHome = React.lazy(() => import('./pages/ApiHome' /* webpackChunkName:"api-home" */));
const NoPage = React.lazy(() => import('./pages/NoPage' /* webpackChunkName:"no-page" */));

const App = () => {
  return (
    <Suspense fallback={<div />}>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/home" element={<ApiHome />} />
          <Route path="/" element={<ApiHome />}>
            <Route index element={<ApiHome />} />
          </Route>
          <Route path="*" element={<NoPage />} />
        </Routes>
      </BrowserRouter>
    </Suspense>
  );
}

export default App;
