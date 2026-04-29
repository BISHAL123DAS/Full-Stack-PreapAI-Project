import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./ReportlistStyle.css";

// ── helpers ───────────────────────────────────────────────────────────────────
const scoreColor = (s) => {
  if (s == null) return "#475569";
  if (s >= 80) return "#22c55e";
  if (s >= 50) return "#f59e0b";
  return "#eb2f6e";
};

const scoreTrack = (s) => {
  if (s == null) return "rgba(255,255,255,0.06)";
  if (s >= 80) return "rgba(34,197,94,0.15)";
  if (s >= 50) return "rgba(245,158,11,0.15)";
  return "rgba(235,47,110,0.15)";
};

const badgeInfo = (s) => {
  if (s == null) return { label: "No score", cls: "rl-badge--none" };
  if (s >= 80) return { label: "High match", cls: "rl-badge--hi" };
  if (s >= 50) return { label: "Medium", cls: "rl-badge--md" };
  return { label: "Low", cls: "rl-badge--lo" };
};

const fmtDate = (iso) =>
  new Date(iso).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

// ── ScoreRing ─────────────────────────────────────────────────────────────────
const ScoreRing = ({ score }) => {
  const size = 52;
  const r = 20;
  const circ = 2 * Math.PI * r;
  const dash = score != null ? ((score / 100) * circ).toFixed(1) : 0;
  const color = scoreColor(score);
  const track = scoreTrack(score);

  return (
    <div className="rl-ring-wrap">
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        style={{ transform: "rotate(-90deg)" }}
      >
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke={track} strokeWidth="4" />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke={color}
          strokeWidth="4"
          strokeDasharray={`${dash} ${circ.toFixed(1)}`}
          strokeLinecap="round"
        />
      </svg>
      <span className="rl-ring-num" style={{ color }}>
        {score ?? "—"}
      </span>
    </div>
  );
};

// ── ReportCard ────────────────────────────────────────────────────────────────
const ReportCard = ({ report, onClick }) => {
  const { label, cls } = badgeInfo(report.matchScore);
  return (
    <div className="rl-card" onClick={onClick}>
      <ScoreRing score={report.matchScore} />
      <div className="rl-card-body">
        <p className="rl-card-title">{report.title || "Untitled"}</p>
        <p className="rl-card-date">{fmtDate(report.createdAt)}</p>
      </div>
      <span className={`rl-badge ${cls}`}>{label}</span>
      <svg className="rl-arrow" width="16" height="16" viewBox="0 0 16 16" fill="none">
        <path d="M6 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </div>
  );
};

// ── ReportList ────────────────────────────────────────────────────────────────
const ReportList = ({ reports = [] }) => {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const [showAll, setShowAll] = useState(false);

  const filters = [
    { key: "all", label: "All" },
    { key: "high", label: "High (80%+)" },
    { key: "mid", label: "Medium" },
    { key: "low", label: "Low" },
  ];

  const filtered = reports.filter((r) => {
    const matchSearch = (r.title || "Untitled")
      .toLowerCase()
      .includes(search.toLowerCase());
    if (!matchSearch) return false;
    if (filter === "high") return r.matchScore >= 80;
    if (filter === "mid") return r.matchScore >= 50 && r.matchScore < 80;
    if (filter === "low") return r.matchScore != null && r.matchScore < 50;
    return true;
  });

  const visible = showAll ? filtered : filtered.slice(0, 5);

  // stats
  const scored = reports.filter((r) => r.matchScore != null);
  const avg = scored.length
    ? Math.round(scored.reduce((a, r) => a + r.matchScore, 0) / scored.length)
    : 0;
  const best = scored.length ? Math.max(...scored.map((r) => r.matchScore)) : 0;
  const high = scored.filter((r) => r.matchScore >= 80).length;

  return (
    <div className="rl-root">
      {/* stats row */}
      {reports.length > 0 && (
        <div className="rl-stats">
          <div className="rl-stat">
            <span className="rl-stat-val">{reports.length}</span>
            <span className="rl-stat-lbl">Total</span>
          </div>
          <div className="rl-stat-divider" />
          <div className="rl-stat">
            <span className="rl-stat-val" style={{ color: "#22c55e" }}>{avg}%</span>
            <span className="rl-stat-lbl">Avg score</span>
          </div>
          <div className="rl-stat-divider" />
          <div className="rl-stat">
            <span className="rl-stat-val" style={{ color: "#22c55e" }}>{best}%</span>
            <span className="rl-stat-lbl">Best</span>
          </div>
          <div className="rl-stat-divider" />
          <div className="rl-stat">
            <span className="rl-stat-val">{high}</span>
            <span className="rl-stat-lbl">High matches</span>
          </div>
        </div>
      )}

      {/* search */}
      <div className="rl-search-wrap">
        <svg className="rl-search-icon" width="14" height="14" viewBox="0 0 14 14" fill="none">
          <circle cx="6" cy="6" r="4.5" stroke="currentColor" strokeWidth="1.4" />
          <path d="M9.5 9.5L12 12" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
        </svg>
        <input
          className="rl-search"
          placeholder="Search job title…"
          value={search}
          onChange={(e) => { setSearch(e.target.value); setShowAll(false); }}
        />
        {search && (
          <button className="rl-search-clear" onClick={() => setSearch("")}>×</button>
        )}
      </div>

      {/* filter pills */}
      <div className="rl-filters">
        {filters.map((f) => (
          <button
            key={f.key}
            className={`rl-pill ${filter === f.key ? "rl-pill--active" : ""}`}
            onClick={() => { setFilter(f.key); setShowAll(false); }}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* list */}
      {visible.length > 0 ? (
        <div className="rl-list">
          {visible.map((r) => (
            <ReportCard
              key={r._id}
              report={r}
              onClick={() => navigate(`/interview/${r._id}`)}
            />
          ))}
        </div>
      ) : (
        <div className="rl-empty">
          <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
            <rect x="6" y="4" width="20" height="24" rx="3" stroke="#475569" strokeWidth="1.4" />
            <path d="M11 11h10M11 16h10M11 21h6" stroke="#475569" strokeWidth="1.4" strokeLinecap="round" />
          </svg>
          <p>No reports found</p>
        </div>
      )}

      {/* show more / less */}
      {filtered.length > 5 && (
        <button className="rl-toggle" onClick={() => setShowAll((v) => !v)}>
          {showAll ? "Show fewer" : `Show all ${filtered.length} reports`}
          <span>{showAll ? "↑" : "↓"}</span>
        </button>
      )}
    </div>
  );
};

export default ReportList;