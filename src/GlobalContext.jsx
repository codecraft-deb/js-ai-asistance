import React, { createContext } from 'react';
import run from './api';

export const dataContext = createContext();

export default function GlobalContext({ children }) {
  function speak(text) {
    const speakText = new SpeechSynthesisUtterance(text);
    speakText.rate = 1;
    speakText.pitch = 1;
    speakText.volume = 1;
    speakText.lang = 'en-US';

    window.speechSynthesis.speak(speakText);
  }

  async function aiRes(promt) {
    const text = await run(promt);
    speak(text);
    
  }

  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

  const recognition = new SpeechRecognition();

  recognition.onresult = (e) => {
    console.log(e);

    const currentIndex = e.resultIndex;
    const transcript = e.results[currentIndex][0].transcript;
    console.log('Transcript:', transcript);
    aiRes(transcript);
  };

  const value = {
    recognition,
    speak,
  };

  return (
    <dataContext.Provider value={value}>
      {children}
    </dataContext.Provider>
  );
}
