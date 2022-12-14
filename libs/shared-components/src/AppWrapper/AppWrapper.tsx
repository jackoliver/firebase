import { FC } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { MantineProvider } from '@mantine/core';

interface IAppWrapperProps {
  children: React.ReactNode;
}

export const AppWrapper: FC<IAppWrapperProps> = ({ children }) => (
  <MantineProvider withGlobalStyles withNormalizeCSS>
    <BrowserRouter>{children}</BrowserRouter>
  </MantineProvider>
);
