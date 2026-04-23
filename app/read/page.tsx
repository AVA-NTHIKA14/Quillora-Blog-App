"use client";
import { useState } from "react";
import Link from "next/link";
import { SessionControls } from "@/components/auth/session-controls";
import { APP_NAV_ITEMS } from "@/lib/navigation";

export default function ReadPage() {
  const [bookmarked, setBookmarked] = useState(false);
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(128);

  const handleLike = () => {
    setLiked(!liked);
    setLikeCount((c) => (liked ? c - 1 : c + 1));
  };

  return (
    <div className="page">
      {/* ── NAVBAR ── */}
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
            <Link key={item.label} href={item.href}
              className={`nav-link ${item.label === "Read" ? "nav-link-active" : ""}`}>{item.label}</Link>
          ))}
        </div>
      </nav>
      <div className="secondary-bar">
        <button className="bar-btn"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>Search</button>
        <button className="bar-btn"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/></svg>Access</button>
        <SessionControls />
      </div>

      {/* ── DARK BACKGROUND WRAPPER ── */}
      <div className="dark-bg">
        <div className="article-wrapper">

          {/* Article card */}
          <article className="article-card">
            {/* Meta pill */}
            <div className="meta-pill">
              <span>Typography</span>
              <span className="dot-sep">•</span>
              <span>Apr 23, 2026</span>
              <span className="dot-sep">•</span>
              <span>8 min read</span>
            </div>

            <h1 className="article-title">The Art of Readable Design</h1>
            <p className="article-subtitle">
              How typography shapes understanding, and why a line of text is an ethical document before it is an aesthetic one.
            </p>

            {/* Author */}
            <div className="author-row">
              <div className="author-avatar">EV</div>
              <div>
                <p className="author-name">Elena Voss</p>
                <p className="author-handle">@elenavoss</p>
              </div>
            </div>

            {/* Body */}
            <div className="article-body">
              <p>
                In the ever-evolving landscape of digital design, one principle remains constant: readability is not a luxury—it is a fundamental requirement. When we craft interfaces that prioritize clarity and accessibility, we are not just making aesthetic choices. We are making ethical ones.
              </p>
              <p>
                The relationship between form and function has never been more critical. As content consumption shifts increasingly toward digital mediums, designers bear the responsibility of ensuring that every reader, regardless of ability or context, can engage with written content effortlessly.
              </p>

              <h2 className="section-heading">The Line Before the Page</h2>
              <p>
                A long line of text is a promise you are asking the reader to keep. Somewhere between sixty and seventy-five characters, a sentence learns to breathe.
              </p>

              <blockquote className="pull-quote">
                <em>Good typography is invisible. Great typography is remembered only when the reader looks up from the page and realizes an hour has passed.</em>
              </blockquote>

              <h2 className="section-heading">Space as a Moral Choice</h2>
              <p>
                White space is not absence. It is scaffolding for attention, a form of hospitality extended to the reader.
              </p>

              <h2 className="section-heading">Reading as a Shared Act</h2>
              <p>
                Every reader arrives with a body. Designing for that variance is not charity. It is the work.
              </p>
            </div>

            {/* Floating action bar */}
            <div className="action-bar">
              <button className={`action-btn ${liked ? "action-active" : ""}`} onClick={handleLike}>
                <svg width="15" height="15" viewBox="0 0 24 24" fill={liked ? "#9b22e8" : "none"} stroke={liked ? "#9b22e8" : "currentColor"} strokeWidth="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
                {likeCount}
              </button>
              <button className={`action-btn ${bookmarked ? "action-active" : ""}`} onClick={() => setBookmarked(!bookmarked)}>
                <svg width="15" height="15" viewBox="0 0 24 24" fill={bookmarked ? "#9b22e8" : "none"} stroke={bookmarked ? "#9b22e8" : "currentColor"} strokeWidth="2"><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/></svg>
                Bookmark
              </button>
              <button className="action-btn">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="1"/><circle cx="12" cy="5" r="1"/><circle cx="12" cy="19" r="1"/></svg>
                Tip
              </button>
              <button className="action-btn">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
                24
              </button>
              <button className="action-btn">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/></svg>
              </button>
            </div>

            {/* Author bio card */}
            <div className="author-bio-card">
              <div className="bio-circle" />
              <p className="bio-eyebrow">The Human Behind the Words</p>
              <div className="bio-inner">
                <div className="bio-avatar-box">EV</div>
                <div className="bio-details">
                  <p className="bio-name">Elena Voss</p>
                  <p className="bio-handle">@elenavoss · Utrecht, NL</p>
                  <p className="bio-desc">
                    Typographer and essayist exploring how words feel on a page. Writing about restraint, rhythm, and the quiet ethics of design.
                  </p>
                  <p className="bio-stats"><strong>4.2k</strong> readers &nbsp;•&nbsp; <strong>47</strong> articles</p>
                  <div className="bio-actions">
                    <button className="follow-btn">Follow</button>
                    <button className="note-btn">Send a Note</button>
                  </div>
                </div>
              </div>
            </div>

            {/* Discussion CTA */}
            <div className="discussion-cta">
              <hr className="divider" />
              <p className="cta-label">Continue the conversation</p>
              <Link href="/discussion" className="join-btn">Join the discussion →</Link>
            </div>
          </article>
        </div>
      </div>

      <style jsx>{`
        * { box-sizing: border-box; margin: 0; padding: 0; }
        .page { min-height: 100vh; font-family: Georgia, serif; display: flex; flex-direction: column; }

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

        /* Dark bg */
        .dark-bg { flex: 1; background: #0d0d1a; padding: 2.5rem 1rem 4rem; }
        .article-wrapper { max-width: 600px; margin: 0 auto; }

        /* Article card */
        .article-card { background: #fff; border-radius: 16px; padding: 2.5rem 2.5rem 2rem; position: relative; }

        /* Meta */
        .meta-pill { display: inline-flex; align-items: center; gap: 0.4rem; background: #f0eeeb; border: 1px solid #e0ddd8; border-radius: 999px; padding: 0.3rem 0.9rem; font-size: 0.8rem; color: #6a6660; margin-bottom: 1.4rem; }
        .dot-sep { color: #bbb; }

        .article-title { font-size: 2rem; font-weight: 700; font-style: italic; color: #1a1a2e; line-height: 1.2; margin-bottom: 0.8rem; }
        .article-subtitle { font-size: 1rem; color: #5a5650; line-height: 1.6; margin-bottom: 1.5rem; }

        /* Author */
        .author-row { display: flex; align-items: center; gap: 0.75rem; margin-bottom: 2rem; }
        .author-avatar { background: #9b22e8; color: #fff; font-size: 0.8rem; font-weight: 700; width: 36px; height: 36px; border-radius: 8px; display: flex; align-items: center; justify-content: center; }
        .author-name { font-size: 0.9rem; font-weight: 700; color: #1a1a2e; }
        .author-handle { font-size: 0.8rem; color: #9a9590; }

        /* Body */
        .article-body { display: flex; flex-direction: column; gap: 1.1rem; font-size: 0.96rem; line-height: 1.75; color: #2a2620; }
        .section-heading { font-size: 1.05rem; font-weight: 700; color: #1a1a2e; margin-top: 0.5rem; }
        .pull-quote { border-left: 3px solid #d0cdc8; padding: 0.5rem 0 0.5rem 1.2rem; font-style: italic; color: #3a3630; font-size: 0.95rem; line-height: 1.7; }

        /* Action bar */
        .action-bar { display: flex; align-items: center; gap: 0.3rem; background: rgba(30,30,50,0.85); backdrop-filter: blur(8px); border-radius: 999px; padding: 0.5rem 1rem; width: fit-content; margin: 1.8rem auto 0; }
        .action-btn { display: flex; align-items: center; gap: 0.35rem; background: transparent; border: none; color: #e0ddd8; font-size: 0.82rem; font-family: Georgia, serif; padding: 0.3rem 0.5rem; cursor: pointer; border-radius: 6px; transition: color 0.2s; }
        .action-btn:hover { color: #fff; }
        .action-active { color: #9b22e8 !important; }

        /* Author bio */
        .author-bio-card { position: relative; background: #fafaf8; border: 1px solid #e8e5e0; border-radius: 12px; padding: 1.5rem; margin-top: 2.5rem; overflow: hidden; }
        .bio-circle { position: absolute; width: 120px; height: 120px; border-radius: 50%; border: 1px solid rgba(155,34,232,0.15); top: -30px; right: -20px; pointer-events: none; }
        .bio-eyebrow { font-style: italic; font-size: 0.8rem; color: #9a9590; margin-bottom: 1rem; }
        .bio-inner { display: flex; gap: 1rem; align-items: flex-start; }
        .bio-avatar-box { width: 60px; height: 60px; border: 1.5px solid #9b22e8; border-radius: 10px; display: flex; align-items: center; justify-content: center; font-size: 0.9rem; font-weight: 700; color: #1a1a2e; flex-shrink: 0; }
        .bio-name { font-size: 0.95rem; font-weight: 700; color: #1a1a2e; margin-bottom: 0.15rem; }
        .bio-handle { font-size: 0.8rem; color: #9a9590; margin-bottom: 0.6rem; }
        .bio-desc { font-size: 0.84rem; line-height: 1.6; color: #5a5650; margin-bottom: 0.6rem; }
        .bio-stats { font-size: 0.82rem; color: #6a6660; margin-bottom: 0.8rem; }
        .bio-actions { display: flex; gap: 0.5rem; }
        .follow-btn { background: #9b22e8; border: none; border-radius: 8px; color: #fff; font-size: 0.84rem; font-family: Georgia, serif; padding: 0.45rem 1rem; cursor: pointer; }
        .note-btn { background: transparent; border: 1.5px solid #1a1a2e; border-radius: 8px; color: #1a1a2e; font-size: 0.84rem; font-family: Georgia, serif; padding: 0.45rem 1rem; cursor: pointer; }

        /* Discussion */
        .discussion-cta { margin-top: 2rem; }
        .divider { border: none; border-top: 1px solid #e8e5e0; margin-bottom: 1.2rem; }
        .cta-label { font-size: 0.85rem; color: #9a9590; margin-bottom: 0.8rem; }
        .discussion-cta :global(.join-btn) { display: inline-block; background: #9b22e8; border-radius: 10px; color: #fff; font-size: 0.9rem; font-family: Georgia, serif; padding: 0.65rem 1.4rem; text-decoration: none; transition: background 0.2s; }
        .discussion-cta :global(.join-btn:hover) { background: #8010d0; }

        @media (max-width: 640px) {
          .article-card { padding: 1.5rem 1.2rem; }
          .article-title { font-size: 1.5rem; }
        }
      `}</style>
    </div>
  );
}
