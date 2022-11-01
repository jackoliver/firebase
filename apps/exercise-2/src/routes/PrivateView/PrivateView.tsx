import { useState, useEffect } from 'react';
import { css } from '@emotion/react';
import { Button, Input } from '@mantine/core';

import { Header, Chat } from 'components';
import {
  collection,
  getFirestore,
  getDocs,
  DocumentData,
} from '@firebase/firestore';
import { ChatMessage } from 'src/components/Chat/ChatMessage';

const styles = css`
  display: flex;
  flex-direction: column;
  min-height: calc(100vh - 64px);
  width: 100vw;
`;

interface IMessageItem {
  id: string;
  message: string;
  displayName: string;
}

export const PrivateView = () => {
  const [messagesData, setMessagesData] = useState<DocumentData | []>([]);

  useEffect(() => {
    const db = getFirestore();
    const messagesRef = collection(db, 'messages');

    getDocs(messagesRef).then((querySnapshot) => {
      const data = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setMessagesData(data);
    });
  }, []);

  console.log(messagesData);
  const hasMessages = messagesData && messagesData['length'] > 0;
  return (
    <>
      <Header />
      <div css={styles}>
        <Chat.Window>
          {hasMessages &&
            messagesData.map((messageItem: IMessageItem) => (
              <ChatMessage key={messageItem.id}>
                {messageItem.message}
              </ChatMessage>
            ))}
        </Chat.Window>
        <Chat.Input>
          <Input
            size="lg"
            width="100%"
            placeholder="JackOliver: Type your message and press enter..."
            autoFocus
          />
          <Button size="lg">Send</Button>
        </Chat.Input>
      </div>
    </>
  );
};
