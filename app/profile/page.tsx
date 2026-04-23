"use client";
import { useState } from "react";
import Link from "next/link";
import { SessionControls } from "@/components/auth/session-controls";
import { APP_NAV_ITEMS } from "@/lib/navigation";

const ARTICLES = [
  { id: 1, title: "The Art of Readable Design", gradient: "linear-gradient(135deg,#1a0d2e 0%,#2d1060 100%)", accent: "#9b22e8" },
  { id: 2, title: "Space as a Moral Choice", gradient: "linear-gradient(135deg,#0d1a2e 0%,#103060 100%)", accent: "#2255e8" },
  { id: 3, title: "Reading as a Shared Act", gradient: "linear-gradient(135deg,#0d2e1a 0%,#106040 100%)", accent: "#22b888" },
];

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState<"Overview" | "Articles" | "Collections" | "About">("Overview");
  const [following, setFollowing] = useState(false);

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
            <Link key={item.label} href={item.href} className={`nav-link ${item.label === "Profile" ? "nav-link-active" : ""}`}>{item.label}</Link>
          ))}
        </div>
      </nav>
      <div className="secondary-bar">
        <button className="bar-btn"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>Search</button>
        <button className="bar-btn"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/></svg>Access</button>
        <SessionControls />
      </div>

      {/* ── PROFILE HEADER ── */}
      <div className="profile-header">
        {/* decorative circles */}
        <div className="deco-circle deco-left" />
        <div className="deco-circle deco-right" />
        <div className="deco-dot deco-dot-1" />
        <div className="deco-dot deco-dot-2" />

        <div className="profile-inner">
          {/* Avatar */}
          <div className="profile-avatar-wrap">
            <div className="profile-avatar">EV</div>
          </div>

          {/* Info */}
          <div className="profile-info">
            <h1 className="profile-name">Elena Voss</h1>
            <p className="profile-handle">@elenavoss</p>
            <p className="profile-bio">
              Typographer and essayist exploring how words feel on a page. Writing about restraint, rhythm, and the quiet ethics of design.
            </p>
            <div className="profile-meta">
              <span className="meta-item">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
                Utrecht, NL
              </span>
              <span className="meta-item">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 11a9 9 0 0 1 9 9"/><path d="M4 4a16 16 0 0 1 16 16"/><circle cx="5" cy="19" r="1"/></svg>
                Publishing weekly
              </span>
            </div>
          </div>

          {/* CTAs */}
          <div className="profile-actions">
            <button className={`follow-orbit-btn ${following ? "following" : ""}`} onClick={() => setFollowing(!following)}>
              {following ? "Following ✓" : "Follow Orbit"}
            </button>
            <button className="transmission-btn">Send Transmission</button>
          </div>
        </div>

        {/* Tabs */}
        <div className="tabs">
          {(["Overview","Articles","Collections","About"] as const).map((tab) => (
            <button
              key={tab}
              className={`tab ${activeTab === tab ? "tab-active" : ""}`}
              onClick={() => setActiveTab(tab)}
            >{tab}</button>
          ))}
        </div>
      </div>

      {/* ── MAIN ── */}
      <main className="main">
        {activeTab === "Overview" && (
          <>
            {/* Stat cards */}
            <div className="stats-grid">
              <div className="stat-card">
                <div className="stat-card-top">
                  <span className="stat-label">Stellar Reach</span>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.5)" strokeWidth="1.5"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
                </div>
                <p className="stat-value">12.4k</p>
                <p className="stat-sub">followers across the galaxy</p>
              </div>
              <div className="stat-card">
                <div className="stat-card-top">
                  <span className="stat-label">Time in Orbit</span>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.5)" strokeWidth="1.5"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                </div>
                <p className="stat-value">3y 4m</p>
                <p className="stat-sub">since joining Quillora</p>
              </div>
              <div className="stat-card">
                <div className="stat-card-top">
                  <span className="stat-label">Galaxy of Posts</span>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.5)" strokeWidth="1.5"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>
                </div>
                <p className="stat-value">87</p>
                <p className="stat-sub">essays and field notes</p>
              </div>
            </div>

            {/* Signal from the Orbit */}
            <div className="section-header">
              <h2 className="section-title">Signal from the Orbit</h2>
              <Link href="#" className="view-all">View all 87 →</Link>
            </div>
            <div className="articles-grid">
              {ARTICLES.map((a) => (
                <Link href="#" key={a.id} className="article-card" style={{ background: a.gradient }}>
                  <div className="ac-circle" style={{ borderColor: a.accent }} />
                  <p className="ac-title">{a.title}</p>
                </Link>
              ))}
            </div>
          </>
        )}

        {activeTab === "Articles" && (
          <div className="empty-tab">
            <p>All 87 articles by Elena Voss will appear here.</p>
          </div>
        )}
        {activeTab === "Collections" && (
          <div className="empty-tab"><p>Collections coming soon.</p></div>
        )}
        {activeTab === "About" && (
          <div className="about-section">
            <p className="about-text">
              Elena Voss is a typographer and essayist based in Utrecht, NL. She writes about the ethics of readability, the philosophy of white space, and what it means to design with restraint.
            </p>
          </div>
        )}
      </main>

      <style jsx>{`
        * { box-sizing: border-box; margin: 0; padding: 0; }
        .page { min-height: 100vh; font-family: Georgia, serif; display: flex; flex-direction: column; background: #f0eeeb; }

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

        /* Profile header */
        .profile-header {
          background: #fff;
          border-bottom: 1px solid #e8e5e0;
          position: relative;
          overflow: hidden;
          padding: 2.5rem 2rem 0;
        }
        .deco-circle {
          position: absolute;
          width: 200px; height: 200px;
          border-radius: 50%;
          border: 1px solid rgba(155,34,232,0.12);
          pointer-events: none;
        }
        .deco-left { top: -60px; left: -60px; }
        .deco-right { top: -40px; right: -40px; width: 160px; height: 160px; }
        .deco-dot { position: absolute; width: 5px; height: 5px; border-radius: 50%; background: #d0cdc8; pointer-events: none; }
        .deco-dot-1 { top: 30px; left: 45%; }
        .deco-dot-2 { top: 20px; right: 28%; }

        .profile-inner {
          display: flex;
          align-items: flex-start;
          gap: 1.5rem;
          max-width: 1100px;
          margin: 0 auto;
          padding-bottom: 1.5rem;
          flex-wrap: wrap;
        }
        .profile-avatar-wrap { flex-shrink: 0; }
        .profile-avatar {
          width: 90px; height: 90px;
          border: 2px solid #9b22e8;
          border-radius: 14px;
          display: flex; align-items: center; justify-content: center;
          font-size: 1.4rem; font-weight: 700; color: #1a1a2e;
          background: #fafaf8;
        }
        .profile-info { flex: 1; min-width: 220px; }
        .profile-name { font-size: 1.4rem; font-weight: 700; color: #1a1a2e; margin-bottom: 0.15rem; }
        .profile-handle { font-size: 0.88rem; color: #9a9590; margin-bottom: 0.6rem; }
        .profile-bio { font-size: 0.92rem; line-height: 1.6; color: #4a4640; margin-bottom: 0.75rem; max-width: 420px; }
        .profile-meta { display: flex; gap: 1rem; flex-wrap: wrap; }
        .meta-item { display: flex; align-items: center; gap: 0.35rem; font-size: 0.82rem; color: #8a8680; }
        .profile-actions { display: flex; gap: 0.6rem; align-items: center; flex-shrink: 0; padding-top: 0.5rem; }
        .follow-orbit-btn {
          background: #9b22e8; border: none; border-radius: 10px;
          color: #fff; font-size: 0.88rem; font-family: Georgia, serif;
          padding: 0.6rem 1.3rem; cursor: pointer;
          transition: background 0.2s;
        }
        .follow-orbit-btn:hover { background: #8010d0; }
        .follow-orbit-btn.following { background: #2d1060; }
        .transmission-btn {
          background: transparent; border: 1.5px solid #1a1a2e;
          border-radius: 10px; color: #1a1a2e;
          font-size: 0.88rem; font-family: Georgia, serif;
          padding: 0.6rem 1.3rem; cursor: pointer;
          transition: background 0.2s;
        }
        .transmission-btn:hover { background: rgba(26,26,46,0.06); }

        /* Tabs */
        .tabs {
          display: flex;
          gap: 0;
          max-width: 1100px;
          margin: 0 auto;
        }
        .tab {
          background: transparent; border: none;
          font-size: 0.9rem; font-family: Georgia, serif;
          color: #6a6660; padding: 0.75rem 1.2rem;
          cursor: pointer; position: relative;
          transition: color 0.2s;
        }
        .tab:hover { color: #1a1a2e; }
        .tab-active {
          color: #9b22e8;
          font-weight: 600;
        }
        .tab-active::after {
          content: '';
          position: absolute;
          bottom: 0; left: 0; right: 0;
          height: 2px;
          background: #9b22e8;
          border-radius: 2px 2px 0 0;
        }

        /* Main */
        .main { flex: 1; max-width: 1100px; width: 100%; margin: 0 auto; padding: 2rem; }

        /* Stat cards */
        .stats-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1rem; margin-bottom: 2.5rem; }
        @media (max-width: 700px) { .stats-grid { grid-template-columns: 1fr; } }
        .stat-card {
          background: #1a1a2e; border-radius: 14px;
          padding: 1.4rem 1.4rem 1.2rem;
          display: flex; flex-direction: column; gap: 0.4rem;
        }
        .stat-card-top { display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.4rem; }
        .stat-label { font-style: italic; font-size: 0.85rem; color: rgba(255,255,255,0.5); }
        .stat-value { font-size: 2.4rem; font-weight: 300; color: #fff; line-height: 1.1; }
        .stat-sub { font-size: 0.8rem; color: rgba(255,255,255,0.4); }

        /* Section header */
        .section-header { display: flex; align-items: center; justify-content: space-between; margin-bottom: 1rem; }
        .section-title { font-size: 1.15rem; font-weight: 700; font-style: italic; color: #1a1a2e; }
        .section-header :global(.view-all) { font-size: 0.85rem; color: #6a6660; text-decoration: none; }
        .section-header :global(.view-all:hover) { color: #9b22e8; }

        /* Article cards */
        .articles-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 1rem; }
        @media (max-width: 600px) { .articles-grid { grid-template-columns: 1fr; } }
        .articles-grid :global(.article-card) {
          border-radius: 14px; padding: 1.5rem; min-height: 160px;
          text-decoration: none; position: relative; overflow: hidden;
          display: flex; align-items: flex-end;
          transition: transform 0.2s;
        }
        .articles-grid :global(.article-card:hover) { transform: translateY(-2px); }
        .ac-circle {
          position: absolute; width: 120px; height: 120px;
          border-radius: 50%; border: 1px solid;
          top: -20px; right: -20px; opacity: 0.4;
          pointer-events: none;
        }
        .ac-title { font-size: 0.95rem; font-weight: 700; color: rgba(255,255,255,0.9); line-height: 1.35; }

        /* Empty / About */
        .empty-tab { padding: 3rem 0; color: #8a8680; font-style: italic; }
        .about-section { max-width: 560px; padding: 1rem 0; }
        .about-text { font-size: 1rem; line-height: 1.7; color: #3a3630; }
      `}</style>
    </div>
  );
}
