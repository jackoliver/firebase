import { css } from '@emotion/react';
import { useAuth } from '@fb/shared-auth';
import { Button } from '@mantine/core';
import Confetti from 'react-confetti';
import { useWindowSize } from 'react-use';

const styles = css`
  background: #f3f3f3;
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

    h3 {
      line-height: 1;
    }
    > * {
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
        <h3>You made it! Now for the next exercise.</h3>
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
