import App from './App';
import './index.css';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { SocketProvider } from '~/shared/providers/socketProvider';
import { store } from '~/store';
import '~/i18nInit';
import { AppThemeProvider } from '~/features/ui/components/AppThemeProvider';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <Provider store={store}>
    <BrowserRouter>
      <AppThemeProvider>
        <SocketProvider>
          <App />
        </SocketProvider>
      </AppThemeProvider>
    </BrowserRouter>
  </Provider>,
);
