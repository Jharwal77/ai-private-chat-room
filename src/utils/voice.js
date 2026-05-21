export const startVoice = (setInput) => {

  const recognition = new webkitSpeechRecognition();

  recognition.lang = "en-US";

  recognition.onresult = (event) => {
    const text = event.results[0][0].transcript;
    setInput(text);
  };

  recognition.start();
};