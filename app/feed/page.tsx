"use client"

import Link from "next/link"
import { useState } from "react"

import { SessionControls } from "@/components/auth/session-controls"
import { Footer } from "@/components/footer"
import { APP_NAV_ITEMS } from "@/lib/navigation"

const ARTICLES = [
  {
    id: 1,
    category: "Featured",
    title: "The Art of Readable Design",
    excerpt:
      "Readability is not a luxury - it is a fundamental requirement. Crafting interfaces that prioritize clarity is an ethical choice.",
    author: "Elena Voss",
    date: "Apr 23, 2026",
    readTime: "8 min",
    tags: ["#Typography", "#Design"],
  },
  {
    id: 2,
    category: "Accessibility",
    title: "Designing for Neurodiversity",
    excerpt:
      "Understanding how different minds process information can transform your approach to interface design.",
    author: "Sarah Chen",
    date: "Apr 20, 2026",
    readTime: "6 min",
    tags: ["#Research", "#Inclusion"],
  },
  {
    id: 3,
    category: "Typography",
    title: "The Return of Serif Fonts",
    excerpt:
      "Why variable serif typefaces are making a comeback in modern web design and what it means for readability.",
    author: "Marcus Rodriguez",
    date: "Apr 18, 2026",
    readTime: "5 min",
    tags: ["#Fonts", "#Trends"],
  },
  {
    id: 4,
    category: "Standards",
    title: "Color Contrast Beyond WCAG",
    excerpt:
      "Meeting compliance is just the beginning. Truly inclusive design requires understanding context and intent.",
    author: "Aisha Patel",
    date: "Apr 15, 2026",
    readTime: "7 min",
    tags: ["#Accessibility", "#Color"],
  },
  {
    id: 5,
    category: "UX",
    title: "Building with Intention",
    excerpt:
      "How to balance visual delight with functional clarity when designing interactive experiences.",
    author: "James Kim",
    date: "Apr 12, 2026",
    readTime: "9 min",
    tags: ["#Interaction", "#Craft"],
  },
  {
    id: 6,
    category: "Essay",
    title: "The Space Between Words",
    excerpt:
      "White space is not empty - it is the scaffolding of attention. A meditation on restraint in a maximalist era.",
    author: "Nadia Osei",
    date: "Apr 9, 2026",
    readTime: "4 min",
    tags: ["#Philosophy", "#Craft"],
  },
] as const

const FILTERS = ["All", "Featured", "Typography", "Accessibility", "Essay", "UX"] as const

export default function FeedPage() {
  const [activeFilter, setActiveFilter] = useState<(typeof FILTERS)[number]>("All")
  const [bookmarked, setBookmarked] = useState<number[]>([])

  const toggleBookmark = (id: number) => {
    setBookmarked((prev) =>
      prev.includes(id) ? prev.filter((bookmarkId) => bookmarkId !== id) : [...prev, id]
    )
  }

  const filtered =
    activeFilter === "All"
      ? ARTICLES
      : ARTICLES.filter((article) => article.category === activeFilter)

  return (
    <div className="page">
      <nav className="navbar">
        <Link href="/" className="logo">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
            <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
            <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
          </svg>
          <span>Quillora</span>
        </Link>

        <div className="navCenter">
          {APP_NAV_ITEMS.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className={`navLink ${item.label === "Feed" ? "navLinkActive" : ""}`}
            >
              {item.label}
            </Link>
          ))}
        </div>
      </nav>

      <div className="secondaryBar">
        <button className="barBtn">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          Search
        </button>
        <button className="barBtn">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
            <circle cx="9" cy="7" r="4" />
            <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
            <path d="M16 3.13a4 4 0 0 1 0 7.75" />
          </svg>
          Access
        </button>
        <SessionControls />
      </div>

      <main className="main">
        <section className="hero">
          <p className="heroLabel">Home Feed</p>
          <h1 className="heroTitle">
            Stories worth your attention, presented with space to breathe.
          </h1>
        </section>

        <div className="filters" aria-label="Feed filters">
          {FILTERS.map((filter) => (
            <button
              key={filter}
              className={`filterPill ${activeFilter === filter ? "filterPillActive" : ""}`}
              onClick={() => setActiveFilter(filter)}
            >
              {filter}
            </button>
          ))}
        </div>

        <div className="grid">
          {filtered.map((article) => (
            <article key={article.id} className="card">
              <div className="cardTop">
                <span className="cardCategory">{article.category}</span>
                <button
                  className={`bookmarkBtn ${bookmarked.includes(article.id) ? "bookmarked" : ""}`}
                  onClick={() => toggleBookmark(article.id)}
                  aria-label={`Bookmark ${article.title}`}
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill={bookmarked.includes(article.id) ? "#9b22e8" : "none"}
                    stroke={bookmarked.includes(article.id) ? "#9b22e8" : "currentColor"}
                    strokeWidth="2"
                  >
                    <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
                  </svg>
                </button>
              </div>

              <h2 className="cardTitle">{article.title}</h2>
              <p className="cardExcerpt">{article.excerpt}</p>

              <div className="cardMeta">
                {article.author} · {article.date} · {article.readTime}
              </div>

              <div className="cardTags">
                {article.tags.map((tag) => (
                  <span key={tag} className="tag">
                    {tag}
                  </span>
                ))}
              </div>

              <Link href="/read" className="readBtn">
                Read Article
              </Link>
            </article>
          ))}
        </div>

        <div className="loadMoreRow">
          <button className="loadMoreBtn">Load More Stories</button>
        </div>
      </main>

      <Footer />

      <style jsx>{`
        * {
          box-sizing: border-box;
          margin: 0;
          padding: 0;
        }

        .page {
          min-height: 100vh;
          background: #f1ede7;
          font-family: Georgia, serif;
          color: #1a1a2e;
          display: flex;
          flex-direction: column;
        }

        .navbar {
          background: #0d0d1a;
          min-height: 64px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 1rem;
          padding: 0.95rem 2rem;
          position: sticky;
          top: 0;
          z-index: 100;
          border-bottom: 1px solid rgba(255, 255, 255, 0.06);
        }

        .navbar :global(.logo) {
          display: flex;
          align-items: center;
          gap: 0.55rem;
          color: #f4efe6;
          text-decoration: none;
          font-style: italic;
          font-size: 1.02rem;
          font-weight: 600;
          letter-spacing: 0.01em;
          white-space: nowrap;
        }

        .navCenter {
          display: flex;
          align-items: center;
          justify-content: flex-end;
          gap: 0.35rem;
          flex-wrap: wrap;
        }

        .navCenter :global(.navLink) {
          color: rgba(232, 228, 220, 0.82);
          text-decoration: none;
          font-size: 0.92rem;
          font-weight: 500;
          padding: 0.42rem 0.9rem;
          border-radius: 999px;
          border: 1px solid transparent;
          transition: color 0.2s, background 0.2s, border-color 0.2s;
        }

        .navCenter :global(.navLink:hover) {
          color: #ffffff;
          background: rgba(255, 255, 255, 0.05);
        }

        .navCenter :global(.navLinkActive) {
          color: #ffffff;
          background: rgba(155, 34, 232, 0.18);
          border-color: rgba(190, 108, 255, 0.62);
          box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.05);
        }

        .secondaryBar {
          background: #0d0d1a;
          border-top: 1px solid rgba(255, 255, 255, 0.03);
          border-bottom: 1px solid rgba(255, 255, 255, 0.06);
          display: flex;
          align-items: center;
          gap: 0.7rem;
          padding: 0.75rem 2rem;
          flex-wrap: wrap;
        }

        .barBtn {
          display: inline-flex;
          align-items: center;
          gap: 0.45rem;
          min-height: 44px;
          background: rgba(255, 255, 255, 0.03);
          border: 1.5px solid rgba(255, 255, 255, 0.18);
          border-radius: 10px;
          color: #ece6dc;
          font-size: 0.85rem;
          font-family: Georgia, serif;
          font-weight: 500;
          padding: 0.4rem 0.95rem;
          cursor: pointer;
          transition: border-color 0.2s, background 0.2s, color 0.2s;
        }

        .barBtn:hover {
          border-color: rgba(255, 255, 255, 0.35);
          background: rgba(255, 255, 255, 0.06);
          color: #ffffff;
        }

        .main {
          flex: 1;
          max-width: 1280px;
          width: 100%;
          margin: 0 auto;
          padding: 2.75rem 2rem 3rem;
        }

        .hero {
          margin-bottom: 2rem;
        }

        .heroLabel {
          font-size: 0.88rem;
          color: #766e63;
          margin-bottom: 0.65rem;
        }

        .heroTitle {
          font-size: clamp(2rem, 4vw, 4.5rem);
          font-weight: 700;
          line-height: 1.16;
          max-width: 13ch;
          color: #1b1830;
          letter-spacing: -0.02em;
          text-wrap: balance;
        }

        .filters {
          display: flex;
          gap: 0.65rem;
          flex-wrap: wrap;
          margin-bottom: 2rem;
        }

        .filterPill {
          padding: 0.48rem 1.05rem;
          border: 1.5px solid #c9c4be;
          border-radius: 999px;
          background: rgba(255, 255, 255, 0.5);
          font-size: 0.9rem;
          font-family: Georgia, serif;
          color: #2f2a3a;
          cursor: pointer;
          transition: border-color 0.2s, background 0.2s, color 0.2s;
        }

        .filterPill:hover {
          border-color: #9b22e8;
          color: #7d18bf;
          background: #ffffff;
        }

        .filterPillActive {
          background: linear-gradient(135deg, #b437ff 0%, #8d1fe9 100%);
          border-color: transparent;
          color: #ffffff;
          box-shadow: 0 12px 22px rgba(142, 31, 233, 0.22);
        }

        .grid {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 1.3rem;
          margin-bottom: 2.5rem;
        }

        .card {
          background: rgba(255, 255, 255, 0.62);
          border: 1.5px solid #d8d2ca;
          border-radius: 18px;
          padding: 1.5rem;
          display: flex;
          flex-direction: column;
          gap: 0.8rem;
          transition: transform 0.18s, box-shadow 0.18s, border-color 0.18s;
          backdrop-filter: blur(8px);
        }

        .card:hover {
          transform: translateY(-2px);
          border-color: #c9c1d2;
          box-shadow: 0 14px 28px rgba(24, 20, 38, 0.08);
        }

        .cardTop {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 1rem;
        }

        .cardCategory {
          font-size: 0.84rem;
          color: #6f675d;
          font-weight: 500;
        }

        .bookmarkBtn {
          background: #f6f2ee;
          border: 1.5px solid #d2cbc3;
          border-radius: 10px;
          width: 2.75rem;
          height: 2.75rem;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          color: #4b4554;
          transition: border-color 0.2s, background 0.2s, color 0.2s;
        }

        .bookmarkBtn:hover {
          border-color: #9b22e8;
          color: #7d18bf;
          background: #ffffff;
        }

        .bookmarkBtn.bookmarked {
          border-color: #9b22e8;
          background: #f3eaff;
        }

        .cardTitle {
          font-size: 1.8rem;
          font-weight: 700;
          line-height: 1.15;
          color: #171527;
          text-wrap: balance;
        }

        .cardExcerpt {
          font-size: 1rem;
          line-height: 1.72;
          color: #48424c;
          flex: 1;
        }

        .cardMeta {
          font-size: 0.84rem;
          color: #7c746a;
        }

        .cardTags {
          display: flex;
          gap: 0.45rem;
          flex-wrap: wrap;
        }

        .tag {
          font-size: 0.8rem;
          color: #5f5768;
        }

        .card :global(.readBtn) {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          margin-top: 0.25rem;
          min-height: 2.8rem;
          padding: 0.55rem 1.15rem;
          border: 1.5px solid #9b22e8;
          border-radius: 10px;
          color: #8117c4;
          font-size: 0.9rem;
          font-family: Georgia, serif;
          font-weight: 600;
          text-decoration: none;
          width: fit-content;
          transition: background 0.2s, color 0.2s, transform 0.2s;
        }

        .card :global(.readBtn:hover) {
          background: #9b22e8;
          color: #ffffff;
          transform: translateY(-1px);
        }

        .loadMoreRow {
          display: flex;
          justify-content: center;
          margin-top: 1rem;
        }

        .loadMoreBtn {
          min-height: 3rem;
          padding: 0.8rem 2rem;
          background: #161427;
          border: 1.5px solid #161427;
          border-radius: 12px;
          font-size: 0.94rem;
          font-family: Georgia, serif;
          font-weight: 600;
          color: #f6f2ea;
          cursor: pointer;
          transition: background 0.2s, transform 0.2s;
        }

        .loadMoreBtn:hover {
          background: #262138;
          transform: translateY(-1px);
        }



        @media (max-width: 980px) {
          .navbar {
            padding: 1rem 1.25rem;
            align-items: flex-start;
            flex-direction: column;
          }

          .navCenter {
            width: 100%;
            justify-content: flex-start;
          }

          .secondaryBar {
            padding: 0.75rem 1.25rem;
          }

          .main {
            padding: 2.25rem 1.25rem 3rem;
          }

          .grid {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }
        }

        @media (max-width: 640px) {
          .heroTitle {
            max-width: none;
            font-size: clamp(2rem, 11vw, 3.2rem);
          }

          .grid {
            grid-template-columns: 1fr;
          }

          .cardTitle {
            font-size: 1.5rem;
          }
        }
      `}</style>
    </div>
  )
}
