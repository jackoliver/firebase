import { useEffect, useState } from 'react';

import {
  DocumentData,
  getFirestore,
  query,
  collection,
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
    // Get the firestore instance
    const db = getFirestore();

    // Query 'messages' collection ordered by timestamp (asc)
    const q = query(collection(db, 'messages'), orderBy('timestamp', 'asc'));

    // Format the document to add the ID
    const formatDoc = (doc: any) => ({
      id: doc.id,
      ...doc.data(),
    });

    // Map the snapshot and set to state
    const doSomethingWithSnapshot = (querySnapshot: any) => {
      const data = querySnapshot.docs.map(formatDoc);
      setMessagesData(data);
    };

    // Subscribe to messages collection (use onSnapshot) and set the messagesData state variable
    const unsubscribe = onSnapshot(q, doSomethingWithSnapshot);

    // Don't forget a cleanup function to unsuscribe from the collection
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    // Set scroll distance of chat to bottom
    const chat = document.getElementById('chat');

    if (chat) {
      chat.scrollTo({
        top: chat.scrollHeight,
        behavior: 'smooth',
      });
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
