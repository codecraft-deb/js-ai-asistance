import { useContext, useState } from 'react';
import './App.css'

import aiImage from './assets/ai-image.gif';
import aiSpeakImage from './assets/ai-speak.gif';
import { dataContext } from './globalContext';

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();

const SpeechApp = () => {
  const showValue = useContext(dataContext);
  console.log(showValue);
  
  const [transcript, setTranscript] = useState('');
  const [isSpeaking, setIsSpeaking] = useState(false);

  // Function to speak the given text
  const speak = (text) => {
    if (!window.speechSynthesis) {
      console.error('Speech synthesis not supported in this browser.');
      return;
    }

    const speakText = new SpeechSynthesisUtterance(text);
    speakText.rate = 1;
    speakText.volume = 1;
    speakText.pitch = 1;
    speakText.lang = 'en-GB';  

    window.speechSynthesis.speak(speakText);
    setIsSpeaking(true);
  };

  // Function to automatically greet the user based on the time of day
  const autoGreetUser = () => {
    const hour = new Date().getHours();
    const greetings = [
      'Good Morning Debparna...',  // 0-11 hours
      'Good Afternoon Debparna...', // 12-16 hours
      'Good Evening Debparna...',   // 17-23 hours
    ];

    const greeting = hour < 12 ? greetings[0] : hour < 17 ? greetings[1] : greetings[2];
    speak(greeting);
  };

  // Utility function to open a URL and speak about it
  const openURL = (url, description) => {
    window.open(url, '_blank');
    speak(`Opening ${description}...`);
  };

  // Utility function to handle search queries
  const handleSearchQuery = (query, searchEngine, baseUrl) => {
    const finalText = `This is what I found on ${searchEngine} regarding "${query}"`;
    window.open(`${baseUrl}${query.replace(' ', '+')}`, '_blank');
    speak(finalText);
  };

  // Handle user command for various voice inputs
  const handleUserCommand = (message) => {
    const commands = {
      greetings: ['hi', 'hello', 'good morning', 'good afternoon', 'good evening', 'good night'],
      openLinks: {
        google: 'open google',
        youtube: 'open youtube',
      },
      searchCommands: ['what is', 'who is', 'what are'],
    };

    if (commands.greetings.some((greeting) => message.includes(greeting))) {
      autoGreetUser();
      speak('How should I help you today?');
    } else if (Object.values(commands.openLinks).some((cmd) => message.includes(cmd))) {
      if (message.includes(commands.openLinks.google)) {
        openURL('https://google.com', 'Google');
      } else if (message.includes(commands.openLinks.youtube)) {
        openURL('https://youtube.com', 'YouTube');
      }
    } else if (commands.searchCommands.some((cmd) => message.includes(cmd))) {
      handleSearchQuery(message, 'Google', 'https://www.google.com/search?q=');
    } else {
      speak("I'm sorry, I didn't understand that command.");
    }
  };

  // Speech recognition result handler
  recognition.onresult = (event) => {
    const currentIndex = event.resultIndex;
    const transcriptText = event.results[currentIndex][0].transcript;

    setTranscript(transcriptText);
    handleUserCommand(transcriptText.toLowerCase());
  };

  const handleTalkButtonClick = () => {
    autoGreetUser();
    recognition.start();
  };

  return (
    <section className="main">
      <div className="main__image-container">
        <div className="main__image-container__image">
          <img className="main__image-container__image-img" src={aiImage} alt="AI Image" />
        </div>
        <h1 className="main__image-container__text">
          Hi, I am <span>Jasmine</span>, How should I help you?
        </h1>
        <img id="main__image__speak-ai" src={aiSpeakImage} alt="Speaking AI" style={{ display: isSpeaking ? 'block' : 'none' }} />
      </div>
      <div className="main__mic">
        <button className="main__mic__talk" onClick={handleTalkButtonClick}>
          <i className="fas fa-microphone-alt main__mic__talk-icon"></i>
        </button>
        <span className="main__mic__content">{transcript}</span>
      </div>
    </section>
  );
};

export default SpeechApp;
