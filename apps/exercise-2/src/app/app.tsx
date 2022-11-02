import { css } from '@emotion/react';
import { useMantineTheme } from '@mantine/core';
import { Route, Routes } from 'react-router-dom';
import { Login, PrivateView, Signup } from 'routes';

import { PrivateRoute } from '@fb/shared-components';

export function App() {
  const theme = useMantineTheme();
  const styles = css`
    background: ${theme.colors.dark[7]};
  `;
  return (
    <div css={styles}>
      <Routes>
        <Route
          path="/"
          element={
            <PrivateRoute>
              <PrivateView />
            </PrivateRoute>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </div>
  );
}

export default App;
