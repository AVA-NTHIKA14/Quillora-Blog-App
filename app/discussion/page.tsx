"use client";
import { useState } from "react";
import Link from "next/link";
import { SessionControls } from "@/components/auth/session-controls";
import { APP_NAV_ITEMS } from "@/lib/navigation";

const COMMENTS = [
  { id: 1, initials: "MR", name: "Marcus Rodriguez", handle: "@marcusr", time: "2h ago", text: "This piece reframed how I think about type choices. The idea that readability is an ethical act—not just a UX nicety—is something I'll carry into every project." },
  { id: 2, initials: "SC", name: "Sarah Chen", handle: "@sarahdesigns", time: "5h ago", text: "The section on line length was quietly revelatory. 65–75 characters isn't just a guideline—it's a contract with the reader." },
  { id: 3, initials: "AP", name: "Aisha Patel", handle: "@aishap", time: "1d ago", text: "I appreciated the framing around white space as hospitality. It's such a generous way to think about design decisions that often feel like constraints." },
  { id: 4, initials: "JK", name: "James Kim", handle: "@jkim", time: "1d ago", text: "Sent this to my entire team. Required reading for anyone who puts text on a screen." },
];

const SEARCH_RESULTS = [
  { id: 1, category: "Typography", title: "The Art of Readable Design", excerpt: "Readability is not a luxury. A line of text is an ethical document before it is an aesthetic one.", author: "Elena Voss", time: "8 min" },
  { id: 2, category: "Essay", title: "Space as a Moral Choice", excerpt: "White space is not absence. It is scaffolding for attention, a form of hospitality.", author: "Elena Voss", time: "6 min" },
  { id: 3, category: "Accessibility", title: "Designing for Neurodiversity", excerpt: "Understanding how different minds process information can transform interface design.", author: "Sarah Chen", time: "6 min" },
  { id: 4, category: "Typography", title: "The Return of Serif Fonts", excerpt: "Variable serif typefaces are making a comeback — and they read beautifully on screens.", author: "Marcus Rodriguez", time: "5 min" },
];

const TEXT_SIZES = ["sm", "md", "lg", "xl"];

export default function DiscussionPage() {
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState(COMMENTS);
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(128);
  const [bookmarked, setBookmarked] = useState(false);

  // Search overlay
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  // Access panel
  const [accessOpen, setAccessOpen] = useState(false);
  const [textSize, setTextSize] = useState("md");
  const [highContrast, setHighContrast] = useState(false);
  const [dyslexiaFont, setDyslexiaFont] = useState(false);

  const handlePost = () => {
    if (!comment.trim()) return;
    setComments([
      { id: Date.now(), initials: "GR", name: "Guest Reader", handle: "@guest", time: "just now", text: comment },
      ...comments,
    ]);
    setComment("");
  };

  const filteredResults = searchQuery.length > 0
    ? SEARCH_RESULTS.filter((r) =>
        r.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        r.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        r.author.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : SEARCH_RESULTS;

  const fontStyle = dyslexiaFont ? "'Atkinson Hyperlegible', Georgia, serif" : "Georgia, serif";

  return (
    <div className={`page ${highContrast ? "high-contrast" : ""}`} style={{ fontFamily: fontStyle }}>
      {/* NAVBAR */}
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
            <Link key={item.label} href={item.href} className={`nav-link ${item.label === "Discussion" ? "nav-link-active" : ""}`}>{item.label}</Link>
          ))}
        </div>
      </nav>
      <div className="secondary-bar">
        <button className="bar-btn" onClick={() => { setSearchOpen(true); setAccessOpen(false); }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
          Search
        </button>
        <button className={`bar-btn ${accessOpen ? "bar-btn-active" : ""}`} onClick={() => { setAccessOpen(!accessOpen); setSearchOpen(false); }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/></svg>
          Access
        </button>
        <SessionControls />
      </div>

      {/* ACCESS PANEL */}
      {accessOpen && (
        <div className="access-panel">
          <div className="access-row">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="4 7 4 4 20 4 20 7"/><line x1="9" y1="20" x2="15" y2="20"/><line x1="12" y1="4" x2="12" y2="20"/></svg>
            <span className="access-label">Text Size</span>
            <div className="size-btns">
              {TEXT_SIZES.map((s, i) => (
                <button key={s} className={`size-btn ${textSize === s ? "size-active" : ""}`}
                  style={{ fontSize: `${0.72 + i * 0.08}rem` }}
                  onClick={() => setTextSize(s)}>A</button>
              ))}
            </div>
            <div className="access-divider" />
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/></svg>
            <span className="access-label">Contrast</span>
            <button className={`contrast-toggle ${highContrast ? "contrast-on" : ""}`} onClick={() => setHighContrast(!highContrast)}>
              {highContrast ? "High Contrast: On" : "High Contrast: Off"}
            </button>
          </div>
          <div className="access-row access-row-2">
            <span className="access-label">Dyslexia-friendly font</span>
            <button className={`dyslexia-btn ${dyslexiaFont ? "dyslexia-on" : ""}`} onClick={() => setDyslexiaFont(!dyslexiaFont)}>
              {dyslexiaFont ? "On — Hyperlegible" : "Off — use Hyperlegible"}
            </button>
            <span className="access-hint">Increases letter differentiation for easier reading.</span>
          </div>
        </div>
      )}

      {/* MAIN */}
      <main className={`main ${textSize === "sm" ? "text-sm" : textSize === "lg" ? "text-lg" : textSize === "xl" ? "text-xl" : ""}`}>
        {/* Back link */}
        <Link href="/read" className="back-link">← Back to article</Link>

        {/* Article meta */}
        <p className="article-meta">Typography · 8 min read</p>
        <h1 className="article-title">The Art of Readable Design</h1>
        <p className="article-desc">Readers are gathered below to share what this piece sparked. Be kind, be specific, be curious.</p>

        {/* Shared space */}
        <div className="shared-space-header">
          <h2 className="shared-title">Shared Space</h2>
          <span className="thought-count">{comments.length} thoughts from readers</span>
        </div>

        <div className="discussion-card">
          {/* Add voice */}
          <div className="add-voice">
            <p className="add-voice-label">Add your voice</p>
            <textarea
              className="voice-input"
              placeholder="What did this spark for you?"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              rows={4}
            />
            <div className="voice-footer">
              <span className="voice-hint">Be kind. Be specific. Be curious.</span>
              <button className="post-btn" onClick={handlePost}>Post Comment</button>
            </div>
          </div>

          {/* Comments */}
          <div className="comments">
            {comments.map((c) => (
              <div key={c.id} className="comment">
                <div className="comment-avatar">{c.initials}</div>
                <div className="comment-body">
                  <div className="comment-header">
                    <span className="comment-name">{c.name}</span>
                    <span className="comment-handle">{c.handle} · {c.time}</span>
                  </div>
                  <p className="comment-text">{c.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* FLOATING ACTION BAR */}
      <div className="float-bar">
        <button className={`float-btn ${liked ? "float-active" : ""}`} onClick={() => { setLiked(!liked); setLikeCount(c => liked ? c-1 : c+1); }}>
          <svg width="15" height="15" viewBox="0 0 24 24" fill={liked?"#9b22e8":"none"} stroke={liked?"#9b22e8":"currentColor"} strokeWidth="2"><path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3H14z"/><path d="M7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"/></svg>
          {likeCount}
        </button>
        <button className={`float-btn ${bookmarked ? "float-active" : ""}`} onClick={() => setBookmarked(!bookmarked)}>
          <svg width="15" height="15" viewBox="0 0 24 24" fill={bookmarked?"#9b22e8":"none"} stroke={bookmarked?"#9b22e8":"currentColor"} strokeWidth="2"><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/></svg>
          Bookmark
        </button>
        <button className="float-btn">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="8" r="1"/><circle cx="12" cy="12" r="1"/><circle cx="12" cy="16" r="1"/></svg>
          Tip
        </button>
        <button className="float-btn float-active">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
          {comments.length}
        </button>
        <button className="float-btn">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/></svg>
        </button>
      </div>

      {/* SEARCH OVERLAY */}
      {searchOpen && (
        <div className="search-overlay" onClick={(e) => { if (e.target === e.currentTarget) setSearchOpen(false); }}>
          <div className="search-modal">
            <div className="search-top">
              <p className="search-title">Search the Nebula</p>
              <button className="esc-btn" onClick={() => setSearchOpen(false)}>✕ Esc</button>
            </div>
            <div className="search-input-row">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
              <input
                autoFocus
                className="search-input"
                placeholder="Search essays, authors, or topics..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <span className="esc-hint">Esc</span>
            </div>

            {filteredResults.length > 0 && (
              <>
                <p className="results-count">{filteredResults.length} results</p>
                <div className="results-grid">
                  {filteredResults.map((r) => (
                    <Link key={r.id} href="#" className="result-card" onClick={() => setSearchOpen(false)}>
                      <div className="result-card-top">
                        <span className="result-category">{r.category}</span>
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
                      </div>
                      <h3 className="result-title">{r.title}</h3>
                      <p className="result-excerpt">{r.excerpt}</p>
                      <p className="result-meta">{r.author} · {r.time}</p>
                    </Link>
                  ))}
                </div>
              </>
            )}

            <p className="trending-label">Trending Categories</p>
            <div className="trending-pills">
              {["Writing","Neo-grotesque","Slow Reading","Typography","Essay"].map((t) => (
                <button key={t} className="trending-pill" onClick={() => setSearchQuery(t)}>{t}</button>
              ))}
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        * { box-sizing: border-box; margin: 0; padding: 0; }
        .page { min-height: 100vh; font-family: Georgia, serif; background: #f0eeeb; display: flex; flex-direction: column; }
        .high-contrast { background: #000; color: #fff; }
        .high-contrast .main, .high-contrast .discussion-card { background: #111; }

        /* Navbar */
        .navbar { background: #0d0d1a; display: flex; align-items: center; justify-content: space-between; padding: 0 2rem; height: 56px; position: sticky; top: 0; z-index: 200; }
        .navbar :global(.logo) { display: flex; align-items: center; gap: 0.5rem; color: #e8e4dc; text-decoration: none; font-style: italic; font-size: 1rem; }
        .nav-links { display: flex; align-items: center; gap: 0.15rem; }
        .nav-links :global(.nav-link) { color: #8a8680; text-decoration: none; font-size: 0.88rem; padding: 0.3rem 0.8rem; border-radius: 8px; transition: color 0.2s; }
        .nav-links :global(.nav-link:hover) { color: #e8e4dc; }
        .nav-links :global(.nav-link-active) { color: #9b22e8; border: 1.5px solid #9b22e8; }
        .secondary-bar { background: #0d0d1a; border-bottom: 1px solid rgba(255,255,255,0.06); display: flex; align-items: center; gap: 0.5rem; padding: 0.55rem 2rem; position: sticky; top: 56px; z-index: 199; }
        .bar-btn { display: flex; align-items: center; gap: 0.4rem; background: transparent; border: 1.5px solid rgba(255,255,255,0.15); border-radius: 8px; color: #c8c4bc; font-size: 0.82rem; font-family: Georgia, serif; padding: 0.35rem 0.85rem; cursor: pointer; transition: border-color 0.2s; }
        .bar-btn:hover { border-color: rgba(255,255,255,0.4); }
        .bar-btn-active { border-color: #9b22e8 !important; color: #9b22e8; }
        .avatar { background: #9b22e8; color: #fff; font-size: 0.68rem; font-weight: 700; width: 22px; height: 22px; border-radius: 50%; display: flex; align-items: center; justify-content: center; }
        .signout-btn { display: flex; align-items: center; gap: 0.4rem; background: #9b22e8; border: none; border-radius: 8px; color: #fff; font-size: 0.82rem; font-family: Georgia, serif; padding: 0.35rem 0.85rem; cursor: pointer; }

        /* Access Panel */
        .access-panel { background: #1a1a2e; border-bottom: 1px solid rgba(255,255,255,0.08); padding: 0.75rem 2rem; display: flex; flex-direction: column; gap: 0.6rem; }
        .access-row { display: flex; align-items: center; gap: 0.75rem; flex-wrap: wrap; }
        .access-row-2 { }
        .access-label { font-size: 0.82rem; color: #8a8680; white-space: nowrap; }
        .size-btns { display: flex; gap: 0.3rem; }
        .size-btn { background: rgba(255,255,255,0.05); border: 1.5px solid rgba(255,255,255,0.12); border-radius: 8px; color: #c8c4bc; font-family: Georgia, serif; width: 34px; height: 34px; cursor: pointer; display: flex; align-items: center; justify-content: center; transition: all 0.2s; }
        .size-btn:hover { border-color: rgba(255,255,255,0.3); }
        .size-active { background: #9b22e8 !important; border-color: #9b22e8 !important; color: #fff; }
        .access-divider { width: 1px; height: 24px; background: rgba(255,255,255,0.1); }
        .contrast-toggle { background: rgba(255,255,255,0.08); border: 1.5px solid rgba(255,255,255,0.15); border-radius: 8px; color: #c8c4bc; font-size: 0.82rem; font-family: Georgia, serif; padding: 0.35rem 0.9rem; cursor: pointer; transition: all 0.2s; }
        .contrast-toggle:hover { border-color: rgba(255,255,255,0.3); }
        .contrast-on { background: #fff; color: #000; border-color: #fff; }
        .dyslexia-btn { background: rgba(255,255,255,0.08); border: 1.5px solid rgba(255,255,255,0.2); border-radius: 8px; color: #c8c4bc; font-size: 0.82rem; font-family: Georgia, serif; padding: 0.35rem 0.9rem; cursor: pointer; white-space: nowrap; }
        .dyslexia-on { background: #9b22e8; border-color: #9b22e8; color: #fff; }
        .access-hint { font-size: 0.78rem; color: #6a6660; }

        /* Main */
        .main { flex: 1; max-width: 700px; width: 100%; margin: 0 auto; padding: 2rem 1.5rem 8rem; }
        .text-sm { font-size: 0.88rem; }
        .text-lg { font-size: 1.08rem; }
        .text-xl { font-size: 1.18rem; }
        .main :global(.back-link) { display: inline-flex; align-items: center; gap: 0.3rem; color: #6a6660; text-decoration: none; font-size: 0.85rem; margin-bottom: 1.5rem; transition: color 0.2s; }
        .main :global(.back-link:hover) { color: #1a1a2e; }
        .article-meta { font-style: italic; font-size: 0.85rem; color: #9a9590; margin-bottom: 0.5rem; }
        .article-title { font-size: 2rem; font-weight: 700; font-style: italic; color: #1a1a2e; margin-bottom: 0.75rem; line-height: 1.2; }
        .article-desc { font-size: 0.95rem; line-height: 1.65; color: #5a5650; margin-bottom: 2rem; }

        /* Shared space */
        .shared-space-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem; }
        .shared-title { font-size: 1.1rem; font-weight: 700; color: #1a1a2e; }
        .thought-count { font-size: 0.82rem; color: #9a9590; }

        /* Discussion card */
        .discussion-card { background: #fff; border: 1px solid #e8e5e0; border-radius: 14px; overflow: hidden; }

        /* Add voice */
        .add-voice { padding: 1.4rem; border-bottom: 1px solid #f0ede8; }
        .add-voice-label { font-size: 0.88rem; font-weight: 600; color: #1a1a2e; margin-bottom: 0.6rem; }
        .voice-input { width: 100%; border: 1.5px solid #d8d5d0; border-radius: 10px; padding: 0.85rem 1rem; font-size: 0.92rem; font-family: Georgia, serif; color: #2a2620; resize: none; outline: none; transition: border-color 0.2s; }
        .voice-input::placeholder { color: #b8b5b0; }
        .voice-input:focus { border-color: #9b22e8; }
        .voice-footer { display: flex; justify-content: space-between; align-items: center; margin-top: 0.75rem; flex-wrap: wrap; gap: 0.5rem; }
        .voice-hint { font-size: 0.8rem; color: #9a9590; }
        .post-btn { background: #9b22e8; border: none; border-radius: 8px; color: #fff; font-size: 0.88rem; font-family: Georgia, serif; padding: 0.5rem 1.2rem; cursor: pointer; transition: background 0.2s; }
        .post-btn:hover { background: #8010d0; }

        /* Comments */
        .comments { display: flex; flex-direction: column; }
        .comment { display: flex; gap: 0.9rem; padding: 1.2rem 1.4rem; border-bottom: 1px solid #f0ede8; }
        .comment:last-child { border-bottom: none; }
        .comment-avatar { width: 36px; height: 36px; border-radius: 50%; background: #2a2a3e; color: #c8c4bc; font-size: 0.72rem; font-weight: 700; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
        .comment-header { display: flex; align-items: center; gap: 0.5rem; margin-bottom: 0.4rem; flex-wrap: wrap; }
        .comment-name { font-size: 0.88rem; font-weight: 700; color: #1a1a2e; }
        .comment-handle { font-size: 0.78rem; color: #9a9590; }
        .comment-text { font-size: 0.9rem; line-height: 1.65; color: #3a3630; }

        /* Float bar */
        .float-bar { position: fixed; bottom: 1.5rem; left: 50%; transform: translateX(-50%); background: rgba(26,26,46,0.92); backdrop-filter: blur(10px); border-radius: 999px; padding: 0.5rem 1rem; display: flex; gap: 0.15rem; z-index: 150; box-shadow: 0 8px 32px rgba(0,0,0,0.3); }
        .float-btn { display: flex; align-items: center; gap: 0.35rem; background: transparent; border: none; color: #c8c4bc; font-size: 0.82rem; font-family: Georgia, serif; padding: 0.35rem 0.6rem; cursor: pointer; border-radius: 8px; transition: color 0.2s; white-space: nowrap; }
        .float-btn:hover { color: #fff; }
        .float-active { color: #9b22e8 !important; }

        /* Search overlay */
        .search-overlay { position: fixed; inset: 0; background: rgba(13,13,26,0.8); backdrop-filter: blur(6px); z-index: 300; display: flex; align-items: flex-start; justify-content: center; padding-top: 80px; }
        .search-modal { width: 100%; max-width: 720px; margin: 0 1rem; }
        .search-top { display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.75rem; }
        .search-title { font-style: italic; font-size: 0.88rem; color: rgba(255,255,255,0.5); }
        .esc-btn { display: flex; align-items: center; gap: 0.3rem; background: rgba(255,255,255,0.08); border: 1px solid rgba(255,255,255,0.15); border-radius: 8px; color: #c8c4bc; font-size: 0.8rem; font-family: Georgia, serif; padding: 0.3rem 0.7rem; cursor: pointer; }
        .search-input-row { background: rgba(255,255,255,0.06); border: 1.5px solid rgba(255,255,255,0.12); border-radius: 12px; display: flex; align-items: center; gap: 0.75rem; padding: 0.75rem 1rem; margin-bottom: 1.25rem; }
        .search-input { flex: 1; background: transparent; border: none; outline: none; color: #e8e4dc; font-size: 0.95rem; font-family: Georgia, serif; }
        .search-input::placeholder { color: rgba(255,255,255,0.3); }
        .esc-hint { font-size: 0.72rem; color: rgba(255,255,255,0.3); border: 1px solid rgba(255,255,255,0.15); border-radius: 5px; padding: 0.1rem 0.4rem; }
        .results-count { font-size: 0.8rem; color: rgba(255,255,255,0.4); margin-bottom: 0.75rem; }
        .results-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 0.75rem; margin-bottom: 1.25rem; }
        .results-grid :global(.result-card) { background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1); border-radius: 12px; padding: 1.1rem; text-decoration: none; display: flex; flex-direction: column; gap: 0.4rem; transition: border-color 0.2s; }
        .results-grid :global(.result-card:hover) { border-color: rgba(155,34,232,0.5); }
        .result-card-top { display: flex; justify-content: space-between; align-items: center; }
        .result-category { background: rgba(255,255,255,0.1); border-radius: 6px; color: rgba(255,255,255,0.7); font-size: 0.75rem; padding: 0.15rem 0.5rem; }
        .result-title { font-size: 0.92rem; font-weight: 700; font-style: italic; color: #e8e4dc; line-height: 1.3; }
        .result-excerpt { font-size: 0.8rem; color: rgba(255,255,255,0.5); line-height: 1.5; }
        .result-meta { font-size: 0.76rem; color: rgba(255,255,255,0.35); margin-top: 0.2rem; }
        .trending-label { font-style: italic; font-size: 0.82rem; color: rgba(255,255,255,0.4); margin-bottom: 0.6rem; }
        .trending-pills { display: flex; gap: 0.5rem; flex-wrap: wrap; }
        .trending-pill { background: rgba(255,255,255,0.07); border: 1px solid rgba(255,255,255,0.12); border-radius: 999px; color: rgba(255,255,255,0.6); font-size: 0.8rem; font-family: Georgia, serif; padding: 0.3rem 0.8rem; cursor: pointer; transition: all 0.2s; }
        .trending-pill:hover { background: rgba(155,34,232,0.2); border-color: rgba(155,34,232,0.4); color: #e8e4dc; }
      `}</style>
    </div>
  );
}
