const msg = new SpeechSynthesisUtterance();
let voices = [];
const voicesDropdown = document.getElementById('myvoices');
const options = document.querySelectorAll('[type="range"], [name="text"]');
const speakButton = document.getElementById('speak');
const pauseButton = document.getElementById('pause');
const stopButton = document.getElementById('stop');
const synth = window.speechSynthesis;
const textArea = document.getElementById('textarea');

let isPaused = false;

function populateVoices() {
    voices = synth.getVoices();
    voicesDropdown.innerHTML = voices
        .filter(voice => voice.lang.includes('en'))
        .map(voice => `<option value="${voice.name}">${voice.name} (${voice.lang})</option>`)
        .join('');
}

function setVoice() {
    msg.voice = voices.find(voice => voice.name === this.value);
    toggle();
}

function toggle() {
    if (isPaused) {
        synth.resume();
        isPaused = false;
    } else {
        msg.text = textArea.innerText;
        msg["rate"] = document.getElementById("rate").value;;
        msg["pitch"] = document.getElementById("pitch").value;;
        synth.speak(msg);
    }
}

synth.addEventListener('voiceschanged', populateVoices);
voicesDropdown.addEventListener('change', setVoice);

speakButton.addEventListener('click', () => {
    msg["text"] = textArea.innerText;
    toggle();
    
    isPaused = false;  
    speakButton.classList.add('active');
    pauseButton.classList.remove('active');
    stopButton.classList.remove('active');
});


pauseButton.addEventListener('click', () => {
    if(!synth.speaking) {
        return;
    }

    isPaused = true;
    synth.pause();

    pauseButton.classList.add('active');
    speakButton.classList.remove('active');
    stopButton.classList.remove('active');
});

stopButton.addEventListener('click', () => {
    isPaused = false;
    synth.cancel();

    stopButton.classList.add('active');
    speakButton.classList.remove('active');
    pauseButton.classList.remove('active');
});

