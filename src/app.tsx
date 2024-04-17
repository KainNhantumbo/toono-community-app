import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Loader } from './components/loader';
import NotFoundPage from './router/404';

type RouteType = { path: string; element: React.JSX.ElementType };

const routes: RouteType[] = [{ element: NotFoundPage, path: '*' }];

export default function AppRouter() {
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
}
