const synth = window.speechSynthesis;

function getRandomEmotion() {
    const emotions = [
        { name: "Neutral", rate: 1.0, pitch: 1.0, transform: text => text },
        { name: "Happy 😊", rate: 1.3, pitch: 1.5, transform: text => text.replace(/!/g, "!!!") },
        { name: "Sad 😢", rate: 0.7, pitch: 0.8, transform: text => text.replace(/\./g, "...") },
        { name: "Angry 😡", rate: 1.5, pitch: 0.9, transform: text => text.toUpperCase() + "!!" }
    ];
    return emotions[Math.floor(Math.random() * emotions.length)];
}

function getRandomVoice() {
    const voices = synth.getVoices();
    return voices.length ? voices[Math.floor(Math.random() * voices.length)] : null;
}

function speakWithEmotion(text) {
    if (!text) return alert("Please enter some text!");

    let emotion = getRandomEmotion();
    let voice = getRandomVoice();
    let utterance = new SpeechSynthesisUtterance(emotion.transform(text));

    utterance.rate = emotion.rate;
    utterance.pitch = emotion.pitch;
    if (voice) utterance.voice = voice;

    console.log(`Speaking with emotion: ${emotion.name} (${voice ? voice.name : "Default Voice"})`);
    synth.speak(utterance);
}

// Ensure voices load properly
speechSynthesis.onvoiceschanged = () => {};

