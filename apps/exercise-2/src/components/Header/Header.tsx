import { css } from '@emotion/react';
import { Box, Button, Text } from '@mantine/core';
import { useAuth } from '@fb/shared-auth';

const STYLES = css`
  height: 64px;
  align-items: center;
  display: flex;
  justify-content: space-between;
  padding: 0 16px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  color: white;

  div {
    display: flex;
    align-items: center;
    gap: 16px;
  }
`;
export const Header = () => {
  const { logout, user } = useAuth();

  return (
    <header css={STYLES}>
      <h3>Exercise 2: Firestore</h3>
      <Box>
        {user && (
          <Text size="sm" weight="bold">
            Welcome, {user.displayName}
          </Text>
        )}
        <Button variant="gradient" onClick={() => logout()}>
          Log out
        </Button>
      </Box>
    </header>
  );
};
