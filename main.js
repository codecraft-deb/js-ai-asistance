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

// Utility function to hand user search
function handleSearchQuery(query, searchEngine, baseUrl) {
    const finalText = `This is what I found on ${searchEngine} for ${query}`; 
    window.open(`${baseUrl}${query.replace(" ", "+")}`, '_blank');
    speak(finalText);
}

function handleUserCommand(message) {
    const commands = {
        greeting: ['hi', 'hello', 'hey'],
        openLinks: {
            google: 'open google'
        },
        searchCommands: ['what is', 'who is', 'who are', 'what is', 'what are']
    }

    // check greetings
    if (commands.greeting.some(greeting => message.includes(greeting))) {
        speak('Hello, how can I help you?');
    }  
    else if (Object.values(commands.openLinks).some(cmd => message.includes(cmd))) {
        if (message.includes(commands.openLinks.google)) {
            window.open('https://www.google.com');
        }
    }  
    else if (commands.searchCommands.some(cmd => message.includes(cmd))) {
        handleSearchQuery(message, 'Google', 'https://www.google.com/search?q=');
    }
    else {
        speak('I am sorry, I did not understand that');
    }
}

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

const recognition = new SpeechRecognition();

recognition.onresult = (event) => {

    console.log(event);
    const text = event.results[0][0].transcript;
    content.innerHTML = text;
    // speak(text);

    handleUserCommand(text.toLowerCase());
}



talkButton.addEventListener('click', () => {
    // autoGreetUser();
    recognition.start();
})
