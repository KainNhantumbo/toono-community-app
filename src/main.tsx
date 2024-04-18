import '@/styles/index.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { AppRouter } from './app-router.tsx';
import { Provider as StoreProvider } from 'react-redux';
import { AppContext } from './context/app-context.tsx';
import { store } from './state/store.ts';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <StoreProvider store={store}>
      <AppContext>
        <AppRouter />
      </AppContext>
    </StoreProvider>
  </React.StrictMode>
);
