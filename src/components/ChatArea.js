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
          <div class="chat-text" style={{ margin: 0 }}>
            <li className="chat-icon">{d.role === 'user' ? '🧔🏻‍♂️   ' : ' 🤖   '}</li>
            <p>{d.content}</p>
          </div>
        </div>
      ))}
      <div className="list-bottom"></div>
      {/* {isLoading && (
        <div className='assistant'>
          <p className='fa-bounce' style={{ margin: 0 }}>🧠</p>
        </div>
      )} */}
      {isLoading && (
        <div className='assistant loading'>
          <div className="loading-icon">🚀</div>
        </div>
      )}
    </div>
  )
};

export default ChatArea;