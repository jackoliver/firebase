import { css } from '@emotion/react';
import { Title } from '@mantine/core';
export const ZeroMessages = () => {
  const styles = css`
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  `;

  return (
    <div css={styles}>
      <div>
        <Title variant="gradient" order={3} align="center" mb={12}>
          No messages yet.
        </Title>
        <img
          src="https://media.giphy.com/media/l3E6BG56dhjuawAX6/giphy.gif"
          alt="Animated depiction of a man at a computer"
          style={{
            borderRadius: '300px',
            width: '280px',
            height: '280px',
            objectFit: 'cover',
          }}
        />
      </div>
    </div>
  );
};
