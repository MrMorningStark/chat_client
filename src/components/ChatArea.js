import { useEffect, useRef } from "react";

const ChatArea = ({ data, isLoading }) => {

  const bottomRef = useRef();


  useEffect(() => {
    scrollToBottom();
  }, [data, isLoading]);

  const scrollToBottom = () => {
    bottomRef.current.scrollIntoView({
      behavior: "smooth",
      block: "end",
    });
  };

  return (
    <div className='chat-area' ref={bottomRef} >
      {data.map((d, index) => (
        <div key={index} className={d.role === 'user' ? 'user' : 'assistant'}>
          <p style={{ margin: 0 }}>{d.role === 'user' ? '🧔🏻‍♂️' : '🤖'}{d.content}</p>
        </div>
      ))}
      <div className="list-bottom"></div>
      {isLoading && (
        <div className='assistant'>
          <p className='fa-bounce' style={{ margin: 0 }}>🧠</p>
        </div>
      )}
    </div>
  )
};

export default ChatArea;