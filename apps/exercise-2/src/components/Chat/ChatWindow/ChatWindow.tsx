import { useEffect, useState } from 'react';

import {
  DocumentData,
  query,
  collection,
  getFirestore,
  orderBy,
  onSnapshot,
} from '@firebase/firestore';

import { ZeroMessages } from 'components';

import { ChatMessage } from '../ChatMessage';
import styles from './ChatWindow.styles';
import { IMessageItem } from './types';

export const ChatWindow = () => {
  // State variable to store messages (set in useEffect)
  const [messagesData, setMessagesData] = useState<DocumentData | []>([]);

  useEffect(() => {
    // Query messages collection ordered by timestamp
    const messagesCollection = query(
      collection(getFirestore(), 'messages'),
      orderBy('timestamp', 'asc')
    );

    // Subscribe to messages collection
    const unsubscribe = onSnapshot(messagesCollection, (snapshot) => {
      const messages = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setMessagesData(messages);
    });

    // Cleanup function to unsubscribe from the listener
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    // Set scroll distance of chat to bottom
    const chat = document.getElementById('chat');
    if (chat) {
      // Smooth scroll
      chat.scrollTo({
        top: chat.scrollHeight,
        behavior: 'smooth',
      });
      // chat.scrollTop = chat.scrollHeight;
    }
  }, [messagesData]);

  // Is there message data, is it an array, and is it not empty?
  const hasMessages = messagesData && messagesData['length'] > 0;

  return (
    <div id="chat" css={styles}>
      {/* This is where we display messages */}
      {hasMessages ? (
        messagesData.map((messageItem: IMessageItem) => (
          <ChatMessage
            displayName={messageItem.displayName}
            key={messageItem.id}
          >
            {messageItem.message}
          </ChatMessage>
        ))
      ) : (
        <ZeroMessages />
      )}
    </div>
  );
};
