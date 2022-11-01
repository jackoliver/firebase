import { Fragment, FC } from 'react';
import { Global, css } from '@emotion/react';
import emotionReset from 'emotion-reset';

interface IAppWrapperProps {
  children: React.ReactNode;
}

export const AppWrapper: FC<IAppWrapperProps> = ({ children }) => (
  <Fragment>
    <Global
      styles={css`
        @import url('https://fonts.googleapis.com/css2?family=Inter&display=swap');
        ${emotionReset}

        html {
          font-family: 'Inter', sans-serif;
        }

        *,
        *::before,
        *::after {
          box-sizing: border-box;
        }
      `}
    />
    {children}
  </Fragment>
);
