"use client";

import { useState } from "react";
import { STORE } from "@/lib/store";

export default function MessageForm() {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");

  function send(e) {
    e.preventDefault();
    const text = encodeURIComponent(
      `Vanakkam ${STORE.name}! I'm ${name.trim() || "a customer"}.\n${message.trim()}`
    );
    window.open(`https://wa.me/${STORE.whatsapp}?text=${text}`, "_blank", "noopener");
  }

  return (
    <form className="msg-form" onSubmit={send}>
      <div className="field-row">
        <div className="field">
          <label htmlFor="m-name">Your name</label>
          <input
            id="m-name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g. Senthil"
          />
        </div>
        <div className="field">
          <label htmlFor="m-msg">Your message</label>
          <input
            id="m-msg"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Do you have fresh murukku today?"
            required
          />
        </div>
      </div>
      <button type="submit" className="btn primary">
        Send on WhatsApp
      </button>
      <p className="form-note">
        Opens WhatsApp with your message ready to send — we usually reply within minutes during
        shop hours.
      </p>
    </form>
  );
}
