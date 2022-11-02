import { useMemo } from 'react';
import { css } from '@emotion/react';
import { Box, Avatar, Tooltip, useMantineTheme } from '@mantine/core';
interface IChatMessageProps {
  children: string;
  displayName?: string;
}

const concatDisplayName = (string: string) =>
  string
    .split(' ')
    .map((word) => word[0])
    .join('');

export const ChatMessage = ({ children, displayName }: IChatMessageProps) => {
  const { colors } = useMantineTheme();

  const STYLES = css`
    background: white;
    padding: 0 8px;
    line-height: 1.3;
    border-radius: 3px;
    display: flex;
    align-items: center;
    gap: 12px;
  `;

  const randomColor = useMemo(
    () =>
      Object.keys(colors)[
        Math.floor(Math.random() * Object.keys(colors).length)
      ],
    [colors]
  );

  return (
    <Box css={STYLES}>
      {displayName && (
        <Tooltip color={randomColor} label={displayName} withArrow>
          <Avatar radius="xl" color={randomColor}>
            {concatDisplayName(displayName)}
          </Avatar>
        </Tooltip>
      )}
      <p>{children}</p>
    </Box>
  );
};
