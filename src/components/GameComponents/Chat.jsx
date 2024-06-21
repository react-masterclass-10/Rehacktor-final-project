import { useEffect, useState, useRef } from 'react';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import style from '../../styles/Game.module.css';
import supabase from '../../supabase/client';

function Chat({ game }) {
  const [messages, setMessages] = useState([]);
  const chatRef = useRef(null);
  dayjs.extend(relativeTime);
  dayjs().locale('it').format();

  const getMessages = async () => {
    const { data: messages, error } = await supabase
      .from('messages')
      .select(
        `*,
        profile: profiles (
          username
        )`
      )
      .eq('game_id', game.id);
    if (error) {
      // eslint-disable-next-line no-alert
      alert(error.message);
    } else {
      setMessages(messages);
    }
  };

  useEffect(() => {
    getMessages();
    const subscription = supabase
      .channel('messages')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'messages' },
        () => getMessages()
      )
      .subscribe();

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div className={style.chatBox} ref={chatRef}>
      {messages &&
        messages.map((message) => (
          <div key={message.id} className={style.message}>
            <div>
              <p className="font-main small fst-italic">
                {message.profile.username}
              </p>
              <p className="m-0 p-0 font-main">{message.content}</p>
            </div>
            <p className="font-main small fst-italic">
              {`${dayjs().to(dayjs(message.created_at))}...`}
            </p>
          </div>
        ))}
    </div>
  );
}

export default Chat;
