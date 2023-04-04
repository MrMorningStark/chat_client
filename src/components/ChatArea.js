import { useState } from "react";
import { useEffect, useRef } from "react";

const ChatArea = ({ data, isLoading, setPrompt, getAiResponse }) => {

  const bottomRef = useRef();

  const [active, setActive] = useState(false);

  useEffect(() => {
    scrollToBottom();
  }, [data, isLoading]);

  const scrollToBottom = () => {
    bottomRef.current.scrollIntoView({
      behavior: "smooth",
      block: "end",
    });
  };

  const onOptionClick = (option) => {
    setActive(false);
    setPrompt(option);
    getAiResponse(option);
  }

  return (
    <div className='chat-area' ref={bottomRef} >
      {data.map((d, index) => (
        <div key={index} className={d.role === 'user' ? 'user' : 'assistant'}>
          <div class="chat-text" style={{ margin: 0 }}>
            <li className="chat-icon">{d.role === 'user' ? '🧔🏻' : '🤖'}</li>
            <p>{d.content}</p>
          </div>
        </div>
      ))}

      <div className="list-bottom"></div>
      <div className={`assitant-options ${(active || data.length > 1) && 'none'}`}>
        <ul>
          <li onClick={() => onOptionClick('Excercise')}>Excercise</li>
          <li onClick={() => onOptionClick('Recipe')}>Recipe</li>
          <li onClick={() => onOptionClick('Blog')}>Blog</li>
          <li onClick={() => onOptionClick('Q/A')}>Q/A</li>
        </ul>
      </div>
      {isLoading && (
        <div className='assistant loading'>
          <div className="loading-icon">🚀</div>
        </div>
      )}
    </div>
  )
};

export default ChatArea;