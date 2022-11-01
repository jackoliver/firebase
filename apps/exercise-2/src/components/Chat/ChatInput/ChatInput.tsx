import { css } from '@emotion/react';

interface IChatInputProps {
  children: React.ReactNode;
}

const STYLES = css`
  margin-top: auto;
  border-top: 1px solid rgba(0, 0, 0, 0.1);
  display: flex;
  gap: 8px;
  height: 80px;
  align-items: center;
  padding: 0 16px;

  .mantine-Input-wrapper {
    flex: 1 0 auto;
  }
`;

export const ChatInput = ({ children }: IChatInputProps) => (
  <div css={STYLES}>{children}</div>
);
