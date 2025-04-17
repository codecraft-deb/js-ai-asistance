import { useContext, useState } from 'react';
import './App.css';

import aiImage from './assets/ai-image.gif';
import aiSpeakImage from './assets/ai-speak.gif';
import { dataContext } from './globalContext';

// const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
// const recognition = new SpeechRecognition();

const SpeechApp = () => {

  const {recognition} = useContext(dataContext);


  return (
    <section className="main">
      <div className="main__image-container">
        <div className="main__image-container__image">
          <img className="main__image-container__image-img" src={aiImage} alt="AI Image" />
        </div>
        <h1 className="main__image-container__text">
          Hi, I am <span>Jasmine</span>, How should I help you?
        </h1>
        <img id="main__image__speak-ai" src={aiSpeakImage} alt="Speaking AI" />
      </div>
      <div className="main__mic">
        <button className="main__mic__talk" onClick={() => recognition.start()}>
          <i className="fas fa-microphone-alt main__mic__talk-icon"></i>
        </button>
        <span className="main__mic__content"></span>
      </div>
    </section>
  );
};

export default SpeechApp;

