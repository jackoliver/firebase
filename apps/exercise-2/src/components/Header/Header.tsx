import { css } from '@emotion/react';
import { Button } from '@mantine/core';
import { useAuth } from '@fb/shared-auth';

const STYLES = css`
  height: 64px;
  align-items: center;
  display: flex;
  justify-content: space-between;
  padding: 0 16px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
`;
export const Header = () => {
  const { logout } = useAuth();
  return (
    <header css={STYLES}>
      <h3>Exercise 2: Firestore</h3>
      <Button onClick={() => logout()}>Log out</Button>
    </header>
  );
};
