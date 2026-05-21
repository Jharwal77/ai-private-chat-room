import { useState, useEffect } from "react";
import MessageBubble from "./MessageBubble";
import TypingIndicator from "./TypingIndicator";
import LoveMeter from "./LoveMeter";
import { model } from "../utils/gemini";
import { saveChat, loadChat } from "../utils/memory";
import { startVoice } from "../utils/voice";

export default function Chat() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);

  // Load history on mount
  useEffect(() => {
    const saved = loadChat();
    if (saved) setMessages(saved);
  }, []);

  const sendMessage = async () => {
    if (!input.trim() || typing) return;

    const userMsg = { role: "user", text: input };
    const updated = [...messages, userMsg];

    setMessages(updated);
    saveChat(updated);
    setInput("");
    setTyping(true);

    try {
      // Format history for Gemini API
      const history = updated
        .filter((m) => m.text)
        .map((m) => ({
          role: m.role === "user" ? "user" : "model",
          parts: [{ text: m.text }],
        }));

      const result = await model.generateContent({ contents: history });
      const responseText = await result.response.text();

      const aiMsg = { role: "model", text: responseText };
      const finalMessages = [...updated, aiMsg];

      setMessages(finalMessages);
      saveChat(finalMessages);
    } catch (error) {
      console.error("Sanjana API Error:", error);
      
      // Handle Rate Limit (429) gracefully
      let errorResponse = "Sorry Rahul, I'm feeling a bit overwhelmed. Can we talk in a minute? ❤️";
      
      if (error.message.includes("429")) {
        errorResponse = "I'm blushing too much! Give me 30 seconds to calm down, Rahul. 🥰 (Rate limit reached)";
      }

      const aiErrorMsg = { role: "model", text: errorResponse };
      setMessages([...updated, aiErrorMsg]);
    } finally {
      setTyping(false);
    }
  };

  const sendImage = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    const imgMsg = { role: "user", image: url };
    const updated = [...messages, imgMsg];
    setMessages(updated);
    saveChat(updated);
  };

  return (
    <div className="flex flex-col h-screen bg-gradient-to-br from-purple-500 via-pink-500 to-orange-400">
      <div className="bg-white p-4 text-center font-bold shadow-lg text-pink-600">
        Rahul ❤️ Sanjana
      </div>

      <LoveMeter messages={messages} />

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((m, i) => (
          <MessageBubble key={i} message={m} />
        ))}
        {typing && <TypingIndicator />}
      </div>

      <div className="bg-white p-4 flex items-center gap-2 shadow-2xl">
        <label className="cursor-pointer hover:opacity-70">
          📷
          <input type="file" className="hidden" onChange={sendImage} />
        </label>

        <button onClick={() => startVoice(setInput)} className="text-xl">
          🎤
        </button>

        <input
          className="flex-1 border-2 border-pink-100 rounded-full px-4 py-2 focus:outline-none focus:border-pink-400"
          placeholder="Say something sweet..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
        />

        <button
          onClick={sendMessage}
          disabled={typing}
          className="bg-pink-500 hover:bg-pink-600 text-white px-6 py-2 rounded-full font-semibold disabled:bg-gray-300"
        >
          Send
        </button>
      </div>
    </div>
  );
}