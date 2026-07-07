"use client";

export default function LangToggle({ lang }) {
  function toggle() {
    const next = lang === "ta" ? "en" : "ta";
    document.cookie = `lang=${next};path=/;max-age=31536000`;
    window.location.reload();
  }

  return (
    <button className="lang-toggle" onClick={toggle} aria-label="Change language">
      {lang === "ta" ? "English" : "தமிழ்"}
    </button>
  );
}
