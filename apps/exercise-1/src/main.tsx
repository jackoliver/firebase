import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';

import { AppWrapper } from '@fb/shared-components';
import { Auth } from '@fb/shared-auth';

import App from './app/app';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <StrictMode>
    <AppWrapper>
      <Auth>
        <App />
      </Auth>
    </AppWrapper>
  </StrictMode>
);
