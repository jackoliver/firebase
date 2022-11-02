import { css } from '@emotion/react';
import { Avatar, Tooltip } from '@mantine/core';
interface IChatMessageProps {
  children: string;
  displayName?: string;
}

const STYLES = css`
  background: white;
  padding: 0 8px;
  line-height: 1.3;
  border-radius: 3px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  gap: 12px;
`;

const concatDisplayName = (string: string) =>
  string
    .split(' ')
    .map((word) => word[0])
    .join('');

export const ChatMessage = ({ children, displayName }: IChatMessageProps) => (
  <div css={STYLES}>
    {displayName && (
      <Tooltip label={displayName} withArrow>
        <Avatar radius="xl" color="cyan">
          {concatDisplayName(displayName)}
        </Avatar>
      </Tooltip>
    )}
    <p>{children}</p>
  </div>
);
