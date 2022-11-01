import { css } from '@emotion/react';
import { Button, Input } from '@mantine/core';

import { Header } from 'components';

const styles = css`
  background: #f3f3f3;
  display: flex;
  flex-direction: column;
  min-height: calc(100vh - 64px);
  width: 100vw;

  .chat-input {
    margin-top: auto;
    display: flex;
    gap: 8px;
    padding: 16px;

    .mantine-Input-wrapper {
      flex: 1 0 auto;
    }
  }

  img {
    display: block;
  }
`;

export const PrivateView = () => {
  return (
    <>
      <Header />
      <div css={styles}>
        <div className="chat-input">
          <Input
            size="lg"
            width="100%"
            placeholder="Type your message and press enter..."
            autoFocus
          />
          <Button size="lg">Send</Button>
        </div>
      </div>
    </>
  );
};
