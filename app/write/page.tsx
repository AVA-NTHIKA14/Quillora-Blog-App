"use client";
import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { SessionControls } from "@/components/auth/session-controls";
import { APP_NAV_ITEMS } from "@/lib/navigation";

export default function WritePage() {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [zenMode, setZenMode] = useState(false);
  const [saved, setSaved] = useState(false);
  const titleRef = useRef<HTMLTextAreaElement>(null);

  const wordCount = body.trim() === "" && title.trim() === ""
    ? 0
    : [...(title + " " + body).trim().split(/\s+/)].filter(Boolean).length;

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  // Auto-resize title textarea
  useEffect(() => {
    if (titleRef.current) {
      titleRef.current.style.height = "auto";
      titleRef.current.style.height = titleRef.current.scrollHeight + "px";
    }
  }, [title]);

  return (
    <div className={`page ${zenMode ? "zen" : ""}`}>
      {/* ── NAVBAR ── */}
      {!zenMode && (
        <>
          <nav className="navbar">
            <Link href="/feed" className="logo">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/>
                <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>
              </svg>
              <span>Quillora</span>
            </Link>
            <div className="nav-links">
              {APP_NAV_ITEMS.map((item) => (
                <Link key={item.label} href={item.href} className={`nav-link ${item.label === "Write" ? "nav-link-active" : ""}`}>{item.label}</Link>
              ))}
            </div>
          </nav>
          <div className="secondary-bar">
            <button className="bar-btn"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>Search</button>
            <button className="bar-btn"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/></svg>Access</button>
            <SessionControls />
          </div>
        </>
      )}

      {/* ── EDITOR BAR ── */}
      <div className="editor-bar">
        <span className="draft-status">
          {saved ? "✓ Saved" : `Draft · ${wordCount} ${wordCount === 1 ? "word" : "words"}`}
        </span>
        <div className="editor-actions">
          <button className={`zen-btn ${zenMode ? "zen-active" : ""}`} onClick={() => setZenMode(!zenMode)}>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              {zenMode
                ? <><path d="M8 3H5a2 2 0 0 0-2 2v3"/><path d="M21 8V5a2 2 0 0 0-2-2h-3"/><path d="M3 16v3a2 2 0 0 0 2 2h3"/><path d="M16 21h3a2 2 0 0 0 2-2v-3"/></>
                : <><path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3M3 16v3a2 2 0 0 0 2 2h3m8 0h3a2 2 0 0 0 2-2v-3"/></>
              }
            </svg>
            Zen Mode
          </button>
          <button className="save-btn" onClick={handleSave}>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"/><polyline points="17 21 17 13 7 13 7 21"/><polyline points="7 3 7 8 15 8"/></svg>
            Save
          </button>
          <button className="publish-btn">Publish</button>
        </div>
      </div>

      {/* ── EDITOR ── */}
      <div className="editor-area">
        <div className="editor-inner">
          <textarea
            ref={titleRef}
            className="title-input"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            rows={1}
          />
          <textarea
            className="body-input"
            placeholder="Begin writing. The page is yours."
            value={body}
            onChange={(e) => setBody(e.target.value)}
          />
        </div>
      </div>

      <style jsx>{`
        * { box-sizing: border-box; margin: 0; padding: 0; }
        .page { min-height: 100vh; font-family: Georgia, serif; display: flex; flex-direction: column; }
        .zen { background: #f5f4f2; }

        /* Navbar */
        .navbar { background: #0d0d1a; display: flex; align-items: center; justify-content: space-between; padding: 0 2rem; height: 56px; position: sticky; top: 0; z-index: 100; }
        .navbar :global(.logo) { display: flex; align-items: center; gap: 0.5rem; color: #e8e4dc; text-decoration: none; font-style: italic; font-size: 1rem; }
        .nav-links { display: flex; align-items: center; gap: 0.15rem; }
        .nav-links :global(.nav-link) { color: #c8c4bc; text-decoration: none; font-size: 0.88rem; padding: 0.3rem 0.8rem; border-radius: 8px; transition: color 0.2s; }
        .nav-links :global(.nav-link:hover) { color: #fff; }
        .nav-links :global(.nav-link-active) { color: #9b22e8; border: 1.5px solid #9b22e8; }
        .secondary-bar { background: #0d0d1a; border-top: 1px solid rgba(255,255,255,0.06); display: flex; align-items: center; gap: 0.5rem; padding: 0.55rem 2rem; }
        .bar-btn { display: flex; align-items: center; gap: 0.4rem; background: transparent; border: 1.5px solid rgba(255,255,255,0.15); border-radius: 8px; color: #c8c4bc; font-size: 0.82rem; font-family: Georgia, serif; padding: 0.35rem 0.85rem; cursor: pointer; }
        .avatar { background: #9b22e8; color: #fff; font-size: 0.68rem; font-weight: 700; width: 22px; height: 22px; border-radius: 50%; display: flex; align-items: center; justify-content: center; }
        .signout-btn { display: flex; align-items: center; gap: 0.4rem; background: #9b22e8; border: none; border-radius: 8px; color: #fff; font-size: 0.82rem; font-family: Georgia, serif; padding: 0.35rem 0.85rem; cursor: pointer; }

        /* Editor bar */
        .editor-bar {
          display: flex; align-items: center; justify-content: space-between;
          padding: 0.6rem 2rem;
          border-bottom: 1px solid #e0ddd8;
          background: #f5f4f2;
          position: sticky; top: 0; z-index: 50;
        }
        .draft-status { font-style: italic; font-size: 0.85rem; color: #9a9590; }
        .editor-actions { display: flex; gap: 0.5rem; align-items: center; }
        .zen-btn {
          display: flex; align-items: center; gap: 0.4rem;
          background: transparent; border: 1.5px solid #1a1a2e;
          border-radius: 8px; color: #1a1a2e;
          font-size: 0.84rem; font-family: Georgia, serif;
          padding: 0.4rem 0.9rem; cursor: pointer;
          transition: all 0.2s;
        }
        .zen-btn:hover { background: rgba(26,26,46,0.06); }
        .zen-active { background: #1a1a2e; color: #fff; }
        .save-btn {
          display: flex; align-items: center; gap: 0.4rem;
          background: transparent; border: 1.5px solid #1a1a2e;
          border-radius: 8px; color: #1a1a2e;
          font-size: 0.84rem; font-family: Georgia, serif;
          padding: 0.4rem 0.9rem; cursor: pointer;
        }
        .save-btn:hover { background: rgba(26,26,46,0.06); }
        .publish-btn {
          background: #9b22e8; border: none; border-radius: 8px;
          color: #fff; font-size: 0.84rem; font-family: Georgia, serif;
          padding: 0.45rem 1.1rem; cursor: pointer;
          transition: background 0.2s;
        }
        .publish-btn:hover { background: #8010d0; }

        /* Editor area */
        .editor-area {
          flex: 1; background: #f5f4f2;
          display: flex; justify-content: center;
          padding: 4rem 1rem;
        }
        .editor-inner { width: 100%; max-width: 640px; display: flex; flex-direction: column; gap: 1.5rem; }

        .title-input {
          width: 100%;
          font-size: 2.2rem;
          font-style: italic;
          font-family: Georgia, serif;
          color: #b0ada8;
          background: transparent;
          border: none;
          outline: none;
          resize: none;
          line-height: 1.3;
          overflow: hidden;
        }
        .title-input::placeholder { color: #c8c4bc; }
        .title-input:focus { color: #1a1a2e; }

        .body-input {
          width: 100%;
          min-height: 60vh;
          font-size: 1rem;
          font-family: Georgia, serif;
          color: #b0ada8;
          background: transparent;
          border: none;
          outline: none;
          resize: none;
          line-height: 1.8;
        }
        .body-input::placeholder { color: #c8c4bc; }
        .body-input:focus { color: #2a2620; }
      `}</style>
    </div>
  );
}
