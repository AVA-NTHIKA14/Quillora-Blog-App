"use client";
import { useState } from "react";
import Link from "next/link";
import { SessionControls } from "@/components/auth/session-controls";
import { APP_NAV_ITEMS } from "@/lib/navigation";

const CHART_DATA = [
  { label: "Mon", value: 42 },
  { label: "Tue", value: 55 },
  { label: "Wed", value: 50 },
  { label: "Thu", value: 63 },
  { label: "Fri", value: 58 },
  { label: "Sat", value: 72 },
  { label: "Sun", value: 88 },
];

const PERIODS = ["7D", "30D", "90D", "1Y"];

export default function DashboardPage() {
  const [activePeriod, setActivePeriod] = useState("7D");

  const maxVal = Math.max(...CHART_DATA.map((d) => d.value));
  const minVal = Math.min(...CHART_DATA.map((d) => d.value));

  // Build SVG polyline points
  const W = 700, H = 180, PAD = 20;
  const pts = CHART_DATA.map((d, i) => {
    const x = PAD + (i / (CHART_DATA.length - 1)) * (W - PAD * 2);
    const y = H - PAD - ((d.value - minVal) / (maxVal - minVal)) * (H - PAD * 2);
    return { x, y, label: d.label, value: d.value };
  });
  const polyline = pts.map((p) => `${p.x},${p.y}`).join(" ");
  const fillPath = `M${pts[0].x},${H} ` + pts.map((p) => `L${p.x},${p.y}`).join(" ") + ` L${pts[pts.length - 1].x},${H} Z`;

  return (
    <div className="page">
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
            <Link key={item.label} href={item.href} className={`nav-link ${item.label === "Dashboard" ? "nav-link-active" : ""}`}>{item.label}</Link>
          ))}
        </div>
      </nav>
      <div className="secondary-bar">
        <button className="bar-btn"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>Search</button>
        <button className="bar-btn"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/></svg>Access</button>
        <SessionControls />
      </div>

      {/* MAIN */}
      <main className="main">
        {/* Hero */}
        <div className="hero">
          <p className="hero-eyebrow">Creative Command</p>
          <h1 className="hero-title">Welcome back, Elena</h1>
          <p className="hero-sub">Your orbit is quiet and steady. Three drafts are waiting, and your latest essay is trending among long-form readers.</p>
        </div>

        {/* Stat cards */}
        <div className="stats-grid">
          {[
            { label: "Readers this week", value: "4,197", delta: "+12.4%" },
            { label: "Finish rate", value: "78%", delta: "+3.1%" },
            { label: "New subscribers", value: "86", delta: "+22" },
            { label: "Tips received", value: "$142", delta: "+$38" },
          ].map((s) => (
            <div key={s.label} className="stat-card">
              <p className="stat-label">{s.label}</p>
              <p className="stat-value">{s.value}</p>
              <p className="stat-delta">{s.delta}</p>
            </div>
          ))}
        </div>

        {/* Chart + Quick Actions */}
        <div className="bottom-grid">
          {/* Chart */}
          <div className="chart-card">
            <div className="chart-header">
              <div>
                <p className="chart-label">Reader Depth</p>
                <p className="chart-highlight">78% avg this week</p>
                <p className="chart-sub">Median scroll completion across published articles</p>
              </div>
              <div className="period-tabs">
                {PERIODS.map((p) => (
                  <button key={p} className={`period-btn ${activePeriod === p ? "period-active" : ""}`} onClick={() => setActivePeriod(p)}>{p}</button>
                ))}
              </div>
            </div>

            {/* SVG Chart */}
            <div className="chart-area">
              <svg viewBox={`0 0 ${W} ${H + 30}`} preserveAspectRatio="none" className="chart-svg">
                {/* Grid lines */}
                {[25, 50, 75, 100].map((pct) => {
                  const y = H - PAD - ((pct - 0) / 100) * (H - PAD * 2);
                  return (
                    <g key={pct}>
                      <line x1={PAD} y1={y} x2={W - PAD} y2={y} stroke="rgba(255,255,255,0.06)" strokeWidth="1"/>
                      <text x={PAD - 5} y={y + 4} fill="rgba(255,255,255,0.3)" fontSize="11" textAnchor="end">{pct}%</text>
                    </g>
                  );
                })}
                {/* Fill */}
                <defs>
                  <linearGradient id="chartFill" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#a8ff00" stopOpacity="0.25"/>
                    <stop offset="100%" stopColor="#a8ff00" stopOpacity="0.02"/>
                  </linearGradient>
                </defs>
                <path d={fillPath} fill="url(#chartFill)"/>
                {/* Line */}
                <polyline points={polyline} fill="none" stroke="#a8ff00" strokeWidth="2.5" strokeLinejoin="round" strokeLinecap="round"/>
                {/* Dots */}
                {pts.map((p, i) => (
                  <circle key={i} cx={p.x} cy={p.y} r="4" fill="#0d0d1a" stroke="#a8ff00" strokeWidth="2"/>
                ))}
                {/* X labels */}
                {pts.map((p, i) => (
                  <text key={i} x={p.x} y={H + 20} fill="rgba(255,255,255,0.3)" fontSize="11" textAnchor="middle">{p.label}</text>
                ))}
              </svg>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="quick-actions">
            <p className="qa-title">Quick Actions</p>
            <div className="qa-grid">
              <Link href="/write" className="qa-card qa-card-lime">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/></svg>
                <p className="qa-card-title">New Draft</p>
                <p className="qa-card-sub">Start something</p>
              </Link>
              <Link href="#" className="qa-card">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>
                <p className="qa-card-title">View Analytics</p>
                <p className="qa-card-sub">Deep-dive stats</p>
              </Link>
              <Link href="#" className="qa-card">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="1" y="4" width="22" height="16" rx="2" ry="2"/><line x1="1" y1="10" x2="23" y2="10"/></svg>
                <p className="qa-card-title">Manage Subscription</p>
                <p className="qa-card-sub">Tiers &amp; payouts</p>
              </Link>
              <Link href="#" className="qa-card">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><polyline points="22 12 16 12 14 15 10 15 8 12 2 12"/><path d="M5.45 5.11L2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z"/></svg>
                <p className="qa-card-title">Broadcast</p>
                <p className="qa-card-sub">Email subscribers</p>
              </Link>
            </div>
          </div>
        </div>
      </main>

      <style jsx>{`
        * { box-sizing: border-box; margin: 0; padding: 0; }
        .page { min-height: 100vh; font-family: Georgia, serif; background: #0d0d1a; color: #e8e4dc; display: flex; flex-direction: column; }

        /* Navbar */
        .navbar { background: #0d0d1a; border-bottom: 1px solid rgba(255,255,255,0.06); display: flex; align-items: center; justify-content: space-between; padding: 0 2rem; height: 56px; position: sticky; top: 0; z-index: 100; }
        .logo { display: flex; align-items: center; gap: 0.5rem; color: #e8e4dc; text-decoration: none; font-style: italic; font-size: 1rem; }
        .nav-links { display: flex; align-items: center; gap: 0.15rem; }
        .nav-link { color: #8a8680; text-decoration: none; font-size: 0.88rem; padding: 0.3rem 0.8rem; border-radius: 8px; transition: color 0.2s; }
        .nav-link:hover { color: #e8e4dc; }
        .nav-link-active { color: #9b22e8; border: 1.5px solid #9b22e8; }
        .secondary-bar { background: #0d0d1a; border-bottom: 1px solid rgba(255,255,255,0.06); display: flex; align-items: center; gap: 0.5rem; padding: 0.55rem 2rem; }
        .bar-btn { display: flex; align-items: center; gap: 0.4rem; background: transparent; border: 1.5px solid rgba(255,255,255,0.15); border-radius: 8px; color: #c8c4bc; font-size: 0.82rem; font-family: Georgia, serif; padding: 0.35rem 0.85rem; cursor: pointer; }
        .bar-btn:hover { border-color: rgba(255,255,255,0.35); }
        .avatar { background: #9b22e8; color: #fff; font-size: 0.68rem; font-weight: 700; width: 22px; height: 22px; border-radius: 50%; display: flex; align-items: center; justify-content: center; }
        .signout-btn { display: flex; align-items: center; gap: 0.4rem; background: #9b22e8; border: none; border-radius: 8px; color: #fff; font-size: 0.82rem; font-family: Georgia, serif; padding: 0.35rem 0.85rem; cursor: pointer; }

        /* Main */
        .main { flex: 1; padding: 2.5rem 2rem 3rem; max-width: 1200px; width: 100%; margin: 0 auto; }

        /* Hero */
        .hero { margin-bottom: 2rem; }
        .hero-eyebrow { font-style: italic; font-size: 0.85rem; color: #6a6660; margin-bottom: 0.4rem; }
        .hero-title { font-size: 1.8rem; font-weight: 700; font-style: italic; color: #f0ece4; margin-bottom: 0.6rem; }
        .hero-sub { font-size: 0.92rem; color: #8a8680; line-height: 1.6; max-width: 560px; }

        /* Stats */
        .stats-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 1rem; margin-bottom: 1.5rem; }
        @media (max-width: 900px) { .stats-grid { grid-template-columns: repeat(2, 1fr); } }
        .stat-card { background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.08); border-radius: 14px; padding: 1.3rem 1.4rem; }
        .stat-label { font-size: 0.82rem; color: #8a8680; margin-bottom: 0.5rem; }
        .stat-value { font-size: 2rem; font-weight: 300; color: #f0ece4; margin-bottom: 0.3rem; }
        .stat-delta { font-size: 0.82rem; color: #a8ff00; }

        /* Bottom grid */
        .bottom-grid { display: grid; grid-template-columns: 1fr 280px; gap: 1.25rem; align-items: start; }
        @media (max-width: 900px) { .bottom-grid { grid-template-columns: 1fr; } }

        /* Chart */
        .chart-card { background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.08); border-radius: 14px; padding: 1.5rem; }
        .chart-header { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 1.5rem; flex-wrap: wrap; gap: 1rem; }
        .chart-label { font-style: italic; font-size: 0.85rem; color: #8a8680; margin-bottom: 0.25rem; }
        .chart-highlight { font-size: 1rem; font-weight: 600; color: #a8ff00; margin-bottom: 0.2rem; }
        .chart-sub { font-size: 0.8rem; color: #6a6660; }
        .period-tabs { display: flex; gap: 0.3rem; }
        .period-btn { background: transparent; border: none; border-radius: 8px; color: #8a8680; font-size: 0.82rem; font-family: Georgia, serif; padding: 0.3rem 0.65rem; cursor: pointer; transition: all 0.2s; }
        .period-btn:hover { color: #e8e4dc; }
        .period-active { background: #9b22e8; color: #fff !important; }
        .chart-area { width: 100%; overflow: hidden; }
        .chart-svg { width: 100%; height: 200px; }

        /* Quick Actions */
        .quick-actions { }
        .qa-title { font-style: italic; font-size: 0.85rem; color: #8a8680; margin-bottom: 0.75rem; }
        .qa-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 0.75rem; }
        .qa-card { display: flex; flex-direction: column; gap: 0.3rem; background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.08); border-radius: 14px; padding: 1.1rem; text-decoration: none; color: #e8e4dc; transition: border-color 0.2s; }
        .qa-card:hover { border-color: rgba(255,255,255,0.2); }
        .qa-card-lime { background: #a8ff00; border-color: transparent; color: #0d0d1a; }
        .qa-card-lime:hover { border-color: transparent; opacity: 0.9; }
        .qa-card-title { font-size: 0.88rem; font-weight: 700; font-style: italic; margin-top: 0.3rem; }
        .qa-card-sub { font-size: 0.78rem; opacity: 0.65; }
      `}</style>
    </div>
  );
}
