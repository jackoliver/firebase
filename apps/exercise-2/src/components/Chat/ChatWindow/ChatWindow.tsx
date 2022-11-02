import { useEffect, useState } from 'react';
import { css } from '@emotion/react';

import { ChatMessage } from '../ChatMessage';

import {
  DocumentData,
  query,
  collection,
  getFirestore,
  orderBy,
  onSnapshot,
} from '@firebase/firestore';

interface IMessageItem {
  id: string;
  message: string;
  displayName: string;
  timestamp: Date;
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
      chat.scrollTop = chat.scrollHeight;
    }
  }, [messagesData]);

  // Is there message data, is it an array, and is it not empty?
  const hasMessages = messagesData && messagesData['length'] > 0;

  return (
    <div id="chat" css={STYLES}>
      {/* This is where we display messages */}
      {hasMessages &&
        messagesData.map((messageItem: IMessageItem) => (
          <ChatMessage key={messageItem.id}>{messageItem.message}</ChatMessage>
        ))}
    </div>
  );
};
