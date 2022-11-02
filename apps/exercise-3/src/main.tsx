import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';
import { Global } from '@emotion/react';
import emotionReset from 'emotion-reset';

import App from './app/app';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <StrictMode>
    <Global styles={emotionReset} />
    <App />
  </StrictMode>
);
