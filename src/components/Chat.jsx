import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  useEffect(() => {
    if (messages.length > 0 && messages[messages.length - 1].sender === "You") {
      setTimeout(() => {
        const botReply = autoReply(messages[messages.length - 1].text);
        setMessages((prev) => [...prev, { text: botReply, sender: "Bot" }]);
        toast.info("New message from Bot 🤖");
      }, 1000);
    }
  }, [messages]);

  // Simple AI for auto-reply
  const autoReply = (userMessage) => {
    const responses = {
      hello: "Hi there! 👋",
      how: "I'm just a bot, but I'm doing great! 😊",
      bye: "Goodbye! Have a great day! 🚀",
      howAreYou:"i am great what about you",
      default: "I'm still learning. Try saying 'hello' or 'bye'! 🤖",
    };

    return responses[userMessage.toLowerCase()] || responses.default;
  };

  // Send message
  const sendMessage = () => {
    if (input.trim() !== "") {
      setMessages([...messages, { text: input, sender: "You" }]);
      toast.success("Message sent ✅");
      setInput("");
    }
  };

  return (
    <div className="chat-container">
      <h2>🔒 Secure Chat</h2>
      <div className="chat-messages">
        {messages.map((msg, index) => (
          <div key={index} className={`message ${msg.sender === "You" ? "user" : "bot"}`}>
            {msg.sender}: {msg.text}
          </div>
        ))}
      </div>

      <div className="input-container">
        <input
          type="text"
          placeholder="Type a message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
};

export default Chat;
