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

  div {
    display: flex;
    align-items: center;
    gap: 12px;
  }
`;
export const Header = () => {
  const { logout, user } = useAuth();

  return (
    <header css={STYLES}>
      <h3>Exercise 2: Firestore</h3>
      <div>
        {user && <p>Welcome, {user.displayName}</p>}
        <Button onClick={() => logout()}>Log out</Button>
      </div>
    </header>
  );
};
