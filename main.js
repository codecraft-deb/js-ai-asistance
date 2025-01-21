const talkButton = document.querySelector('.main__mic__talk');
const content = document.querySelector('.main__mic__content');

// Function to speak the content
const speak = (text) => {
    if (!window.speechSynthesis) {
        console.log('no supported');
        return;
    }

    const speakText = new SpeechSynthesisUtterance(text);
    speakText.rate = 1;
    speakText.volume = 1;
    speakText.pitch = 1;
    speakText.lang = 'de-DE';

    window.speechSynthesis.speak(speakText);
}

const autoGreetUser = () => {
    const hour = new Date().getHours();

    const greetings = [
        'Good Morning',
        'Good Afternoon',
        'Good Evening',
    ]
    const greeting = (hour < 12) ? greetings[0] : (hour < 18) ? greetings[1] : greetings[2];
    speak(greeting);
}

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();

recognition.onresult = (event) => {
    const current = event.resultIndex;
    const transcript = event.results[current][0].transcript;
    content.textContent = transcript;
}


talkButton.addEventListener('click', () => {
    autoGreetUser();
})
