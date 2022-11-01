import { css } from '@emotion/react';
interface IChatMessageProps {
  children: string;
}

const STYLES = css`
  background: white;
  padding: 12px 16px;
  line-height: 1.3;
  border-radius: 3px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;

export const ChatMessage = ({ children }: IChatMessageProps) => (
  <div css={STYLES}>{children}</div>
);
