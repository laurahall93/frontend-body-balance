import React from "react";
import { useState } from "react";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";

async function sendMessage(message) {
  const endpoint = "https://bodyandbalance.onrender.com/chat"; // Replace with the appropriate endpoint

  const data = {
    message: message,
  };

  const response = await fetch(endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  const json = await response.json();
  const reply = json.content;
  return reply;
}

export default function ChatAI() {
  const [message, setMessage] = useState("");
  const [chats, setChats] = useState([]);
  const [isTyping, setIsTyping] = useState(false);

  const chat = async (e, message) => {
    e.preventDefault();

    if (!message) return;
    setIsTyping(true);
    window.scrollTo(0, 1e10);

    chats.push({ role: "user", content: message });
    setChats(chats);

    setMessage("");

    sendMessage(message)
      .then((response) => {
        chats.push({ role: "AI trainer", content: response });
        setChats(chats);
        setIsTyping(false);
        window.scrollTo(0, 1e10);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
      <main>
        <h1>Chat with Your trainer </h1>
        <button onClick={() => firebase.auth().signOut()}>Sign-out</button>

        <section>
          {chats && chats.length
            ? chats.map((chat, index) => (
                <p
                  key={index}
                  className={chat.role === "user" ? "user_msg" : ""}
                >
                  <span>
                    <b>
                      {chat.role === "user"
                        ? firebase.auth().currentUser.displayName
                        : chat.role.toUpperCase()}
                    </b>
                  </span>
                  <span>:</span>
                  <span>{chat.content}</span>
                </p>
              ))
            : ""}
        </section>

        <div className={isTyping ? "" : "hide"}>
          <p>
            <i>{isTyping ? "Typing" : ""}</i>
          </p>
        </div>

        <form action="" onSubmit={(e) => chat(e, message)}>
          <input
            type="text"
            name="message"
            value={message}
            placeholder="Type a message here and hit Enter..."
            onChange={(e) => setMessage(e.target.value)}
          />
        </form>
      </main>
    </div>
  );
}
