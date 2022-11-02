import { css } from '@emotion/react';
import { Header, Chat } from 'components';

const styles = css`
  display: flex;
  flex-direction: column;
  min-height: calc(100vh - 64px);
  width: 100vw;
`;

export const PrivateView = () => (
  <>
    <Header />
    <div css={styles}>
      {/* We display messages inside this component */}
      <Chat.Window />
      <Chat.Input />
    </div>
  </>
);
