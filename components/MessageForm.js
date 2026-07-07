"use client";

import { useState } from "react";
import { STORE } from "@/lib/store";
import { getT } from "@/lib/i18n";

export default function MessageForm({ lang = "en" }) {
  const t = getT(lang);
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
          <label htmlFor="m-name">{t.yourName}</label>
          <input
            id="m-name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder={t.namePlaceholder}
          />
        </div>
        <div className="field">
          <label htmlFor="m-msg">{t.yourMsg}</label>
          <input
            id="m-msg"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder={t.msgPlaceholder}
            required
          />
        </div>
      </div>
      <button type="submit" className="btn primary">
        {t.sendWA}
      </button>
      <p className="form-note">{t.msgNote}</p>
    </form>
  );
}
