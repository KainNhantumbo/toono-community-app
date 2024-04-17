import '@/styles/index.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { AppRouter } from './app.tsx';
import { AppContext } from './context/app-context.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AppContext>
      <AppRouter />
    </AppContext>
  </React.StrictMode>
);
