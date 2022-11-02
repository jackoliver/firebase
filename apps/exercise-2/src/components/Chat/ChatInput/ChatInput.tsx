import { useState, ChangeEvent, FormEventHandler } from 'react';
import { css } from '@emotion/react';
import { Input, Button } from '@mantine/core';

import { getFirestore, collection, addDoc } from '@firebase/firestore';

import { useAuth } from '@fb/shared-auth';

const STYLES = css`
  margin-top: auto;
  border-top: 1px solid rgba(0, 0, 0, 0.1);
  display: flex;
  gap: 8px;
  height: 64px;
  align-items: center;
  padding: 0 16px;

  .mantine-Input-wrapper {
    flex: 1 0 auto;
  }

  form {
    display: contents;
  }
`;

export const ChatInput = () => {
  const { user } = useAuth();

  // State variable to store message input
  const [inputValue, setInputValue] = useState('');

  const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    // Prevent the default page refresh
    e.preventDefault();
    // Send the message to firestore
    const db = getFirestore();
    const messagesCollection = collection(db, 'messages');
    const message = user
      ? {
          message: inputValue,
          displayName: user.displayName,
          timestamp: new Date().toISOString(),
        }
      : null;
    if (message) {
      addDoc(messagesCollection, message);
    }
    // Reset the input value
    setInputValue('');
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  return (
    <div css={STYLES}>
      <form onSubmit={handleSubmit}>
        <Input
          size="md"
          width="100%"
          placeholder="Type your message and press enter..."
          autoFocus
          onChange={handleChange}
          value={inputValue}
        />
        <Button variant="gradient" size="md">
          Send
        </Button>
      </form>
    </div>
  );
};
