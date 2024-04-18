import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Loader } from './components/loader';
import { NotFoundPage } from './router/404';
import { HomePage } from './router/public/home';
import { SignupPage } from './router/public/auth/sign-up';
import { SigninPage } from './router/public/auth/sign-in';

type RouteType = { path: string; element: React.JSX.ElementType };

const routes: RouteType[] = [
  { element: HomePage, path: '/' },
  { element: SigninPage, path: '/auth/sign-in' },
  { element: SignupPage, path: '/auth/sign-up' },
  { element: NotFoundPage, path: '*' }
];

export const AppRouter = () => {
  return (
    <BrowserRouter>
      <React.Suspense fallback={<Loader />}>
        <Routes>
          {routes.map((route, index) => (
            <Route
              key={index}
              path={route.path}
              element={
                <React.Suspense fallback={<Loader />}>
                  <route.element />
                </React.Suspense>
              }
            />
          ))}
        </Routes>
      </React.Suspense>
    </BrowserRouter>
  );
};
