import { css } from '@emotion/react';
import { useAuth } from '@fb/shared-auth';
import { Button, Title } from '@mantine/core';
import Confetti from 'react-confetti';
import { useWindowSize } from 'react-use';

const styles = css`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  width: 100vw;

  .container {
    background: white;
    border-radius: 2px;
    box-shadow: 0 5px 10px -5px rgba(0, 0, 0, 0.1);
    padding: 24px;
    z-index: 2;

    > *:not(:last-child) {
      margin-bottom: 16px;
    }
  }

  img {
    display: block;
    border-radius: 4px;
    overflow: hidden;
    z-index: 1;
  }
`;

export const PrivateView = () => {
  const { logout } = useAuth();

  const { width, height } = useWindowSize();

  return (
    <div css={styles}>
      <Confetti width={width} height={height} />
      <div className="container">
        <Title variant="gradient" order={3} align="center">
          You made it! Now for the next exercise.
        </Title>
        <img
          src="https://media0.giphy.com/media/sQJmucKsaexZ17W6k4/giphy.gif?cid=ecf05e477p9ydp07z7o2amlf1g4co84lv6evj6ww5a6it0lb&rid=giphy.gif&ct=g"
          alt=""
        />
        <Button size="md" variant="gradient" fullWidth onClick={() => logout()}>
          Log out, triumphantly.
        </Button>
      </div>
    </div>
  );
};
