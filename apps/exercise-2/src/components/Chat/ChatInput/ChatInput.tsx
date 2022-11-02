import { useState, ChangeEvent, FormEventHandler } from 'react';
import { Input, Button } from '@mantine/core';

import { getFirestore, collection, addDoc } from '@firebase/firestore';

import { useAuth } from '@fb/shared-auth';

import styles from './ChatInput.styles';

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
    <div css={styles}>
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
