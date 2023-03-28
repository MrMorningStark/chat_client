import React from 'react';

const ChatArea = ({ data, isLoading }) => (
  <div id='style-2' className='chatArea'>
    {data.map((d, index) => (
      <div key={index} className={d.role === 'user' ? 'user' : 'assistant'}>
        <p style={{ margin: 0 }}>{d.role === 'user' ? '🧔🏻‍♂️' : '🤖'}{d.content}</p>
      </div>
    ))}
    <div className="list-bottom"></div>
    {isLoading && (
      <div className='assistant'>
        <p className='fa-bounce' style={{ margin: 0 }}>🤔</p>
      </div>
    )}
  </div>
);

export default ChatArea;