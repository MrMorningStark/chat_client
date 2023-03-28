import React, { useState, useEffect, useRef } from 'react';
import { getResponse, getTranscript } from '../api/api';
import { useSpeechRecognition } from 'react-speech-kit';
import ChatArea from './ChatArea';
import Mic from './Mic';
import './my.css';

const VoiceAssistant = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [micDisabled, setMicDisabled] = useState(false);
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [value, setValue] = useState('');

  const onResult = (result) => {
    clearTimeout(timeOut);
    setValue(result);
    timeOut = setTimeout(() => stopListening(result), 700);
  };

  const { listen, listening, stop } = useSpeechRecognition({
    onResult: onResult
  });

  const bottomRef = useRef();

  useEffect(() => {
    scrollToBottom();
  }, [data, isLoading, listening, setData, setIsLoading, setMicDisabled]);

  let timeOut = null;

  const loadTranscript = async (result) => {
    var length = 0;
    var beforeLoadData = [...data];
    var forShowOnly = [...data, { role: "user", content: result }];
    setData(forShowOnly);
    setIsLoading(true);
    setMicDisabled(true);

    var res = await getResponse({ data: beforeLoadData, text: result });
    if (res.success) {
      length = res.data.length;
      setData(res.data);
    }

    setIsLoading(false);
    setMicDisabled(false);

    speakResponse(res.data[length - 1].content);
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
    setMicDisabled(false);
  };

  const stopListening = (result) => {
    stop();
    setIsRecording(false);
    setMicDisabled(false);
    setValue('');
    if (result.length !== 0) {
      loadTranscript(result);
    }
  };

  const scrollToBottom = () => {
    bottomRef.current.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  const startListening = () => {
    if (isRecording) {
      stopListening(value);
    } else {
      if (!micDisabled) {
        setMicDisabled(true);
        setIsRecording(true);
        window.speechSynthesis.cancel();
        listen({ lang: 'en-IN' })
      }
    }
  };

  return (
    <div className='main' ref={bottomRef}>
      <ChatArea data={data} isLoading={isLoading} />
      <Mic startListening={startListening} value={value} micDisabled={micDisabled} setValue={setValue}
      isLoading={isLoading}
      isRecording={isRecording}
      loadTranscript={loadTranscript}
       />
    </div>
  );
};

export default VoiceAssistant;