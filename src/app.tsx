import React from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import { Loader } from './components/loader';

type RouteType = { path: string; element: React.JSX.ElementType };

const routes: RouteType[] = [];

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
