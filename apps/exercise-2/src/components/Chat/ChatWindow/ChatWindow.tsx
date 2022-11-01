import { css } from '@emotion/react';

interface IChatWindowProps {
  children: React.ReactNode;
}

const STYLES = css`
  background: #f3f3f3;
  flex: 1 0 auto;
  padding: 16px;
  height: calc(100vh - 144px);
  overflow-y: auto;

  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const ChatWindow = ({ children }: IChatWindowProps) => (
  <div css={STYLES}>{children}</div>
);
