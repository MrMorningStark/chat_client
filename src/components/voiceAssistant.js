import React, { useState } from 'react';
import { getResponse } from '../api/api';
import { useSpeechRecognition } from 'react-speech-kit';
import ChatArea from './ChatArea';
import './my.css';
import InputBoxWithMicrophone from './InputBoxWithMicrophone';

const VoiceAssistant = () => {

  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [prompt, setPrompt] = useState('');

  let timeoutID = 1;
  const { listen, listening, stop } = useSpeechRecognition({
    onResult: (voiceInput) => {
      clearTimeout(timeoutID);
      setPrompt(voiceInput);
      timeoutID = setTimeout(() => stopRecording(voiceInput), 700);
    }
  });


  const getAiResponse = async (prompt) => {
    setPrompt('');
    const forShowOnly = [...data, { role: "user", content: prompt }];
    setData(forShowOnly);
    setIsLoading(true);
    const response = await getResponse({ data: data, text: prompt });
    setIsLoading(false);
    if (response.success) {
      setData(response.data);
      speakResponse(response.data[response.data.length - 1].content);
    }


  }

  const speakResponse = (response) => {
    const voices = window.speechSynthesis.getVoices();
    const voice = voices.find(voice => voice.voiceURI === 'Google हिन्दी');
    const utterance = new SpeechSynthesisUtterance(response);
    utterance.voice = voice;
    utterance.volume = 1;
    utterance.rate = 1;
    utterance.pitch = 1;
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(utterance);
  };

  const stopRecording = (prompt) => {
    stop();
    if (prompt.length !== 0) {
      getAiResponse(prompt);
    }
  }

  const onMicrophoneClick = () => {
    if (listening) {
      stopRecording(prompt);
    } else {
      if (!isLoading) {
        window.speechSynthesis.cancel();
        listen({ lang: 'Google हिन्दी' })
        // listen({ lang: 'en-IN' })

      }
    }
  }

  return <>
    <div className='app-name'>BRAIN WAVE</div>
    <div className='voice-assistant' >
      <ChatArea data={data} isLoading={isLoading} />
    </div>

    <div className='input-area'>
      <InputBoxWithMicrophone
        prompt={prompt}
        setPrompt={setPrompt}
        listening={listening}
        isLoading={isLoading}
        onMicrophoneClick={onMicrophoneClick}
        getAiResponse={getAiResponse}
      />
    </div>

  </>
};

export default VoiceAssistant;
