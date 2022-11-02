import { useMemo } from 'react';
import { Box, Avatar, Tooltip, useMantineTheme } from '@mantine/core';

import { IChatMessageProps } from './types';
import styles from './ChatMessages.styles';

const concatDisplayName = (string: string) =>
  string
    .split(' ')
    .map((word) => word[0])
    .join('');

export const ChatMessage = ({ children, displayName }: IChatMessageProps) => {
  const { colors } = useMantineTheme();

  const randomColor = useMemo(
    () =>
      Object.keys(colors)[
        Math.floor(Math.random() * Object.keys(colors).length)
      ],
    [colors]
  );

  return (
    <Box css={styles}>
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
