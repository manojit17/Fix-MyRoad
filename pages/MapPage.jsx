import { useState } from "react";
import { StatusBadge, statusColor, statusLabel } from "../components/UI";
import { ISSUES, MAP_MARKERS } from "../data/mockData";
import theme from "../theme";

const MapPage = () => {
  const [filter,   setFilter]   = useState("all");
  const [selected, setSelected] = useState(null);
  const [search,   setSearch]   = useState("");

  const visible = ISSUES.filter(i =>
    (filter === "all" || i.status === filter) &&
    (search === "" ||
      i.title.toLowerCase().includes(search.toLowerCase()) ||
      i.location.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div style={{ paddingTop: 64, height: "100vh", display: "flex", flexDirection: "column" }}>

      {/* ── Filter bar ── */}
      <div style={{
        background: theme.surface,
        borderBottom: `1px solid ${theme.border}`,
        padding: "14px 24px",
        display: "flex", gap: 14, alignItems: "center", flexWrap: "wrap",
      }}>
        <input
          style={{
            flex: 1, minWidth: 200, background: theme.surfaceHi,
            border: `1px solid ${theme.border}`, borderRadius: 8,
            padding: "9px 14px", color: theme.text,
            fontSize: 14, fontFamily: "inherit", outline: "none",
          }}
          placeholder="🔍  Search by location or title…"
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
        <div style={{ display: "flex", gap: 8 }}>
          {["all","pending","in-progress","resolved"].map(f => (
            <button key={f} onClick={() => setFilter(f)} style={{
              padding: "8px 14px", borderRadius: 8,
              fontSize: 13, fontWeight: 600,
              border: "none", fontFamily: "inherit", cursor: "pointer",
              background: filter === f ? theme.amber : theme.surfaceHi,
              color:      filter === f ? "#0f1117"   : theme.textMuted,
            }}>
              {f === "all" ? "All" : statusLabel(f)}
            </button>
          ))}
        </div>
      </div>

      {/* ── Map + Sidebar ── */}
      <div style={{ flex: 1, display: "grid", gridTemplateColumns: "1fr 360px", minHeight: 0 }}>

        {/* Map */}
        <div style={{ position: "relative", background: theme.surfaceHi, overflow: "hidden" }}>

          {/* Grid */}
          <svg width="100%" height="100%"
            style={{ position: "absolute", inset: 0, opacity: 0.08 }}>
            {[5,10,15,20,25,30,35,40,45,50,55,60,65,70,75,80,85,90,95].map(p => (
              <g key={p}>
                <line x1={`${p}%`} y1="0" x2={`${p}%`} y2="100%"
                  stroke="#e8eaf0" strokeWidth="0.5" />
                <line x1="0" y1={`${p}%`} x2="100%" y2={`${p}%`}
                  stroke="#e8eaf0" strokeWidth="0.5" />
              </g>
            ))}
          </svg>

          {/* Roads */}
          <svg width="100%" height="100%" style={{ position: "absolute", inset: 0 }}>
            <line x1="0" y1="45%" x2="100%" y2="45%"
              stroke={theme.amber} strokeWidth="5" strokeOpacity="0.3" />
            <line x1="0" y1="46.5%" x2="100%" y2="46.5%"
              stroke={theme.amber} strokeWidth="2" strokeOpacity="0.15"
              strokeDasharray="20,20" />
            <line x1="30%" y1="0" x2="30%" y2="100%"
              stroke={theme.amber} strokeWidth="4" strokeOpacity="0.25" />
            <line x1="65%" y1="0" x2="65%" y2="100%"
              stroke={theme.amber} strokeWidth="4" strokeOpacity="0.25" />
            <line x1="0" y1="72%" x2="100%" y2="72%"
              stroke={theme.amber} strokeWidth="3" strokeOpacity="0.2" />
          </svg>

          {/* Markers */}
          {MAP_MARKERS
            .filter(m => filter === "all" || m.status === filter)
            .map(marker => {
              const issue = ISSUES.find(i => i.id === marker.id);
              const isSelected = selected?.id === marker.id;
              return (
                <div
                  key={marker.id}
                  onClick={() => setSelected(issue)}
                  style={{
                    position: "absolute",
                    left: `${marker.x}%`, top: `${marker.y}%`,
                    transform: "translate(-50%,-100%)",
                    cursor: "pointer", zIndex: 10,
                    filter: isSelected
                      ? `drop-shadow(0 0 8px ${statusColor(marker.status)})`
                      : "none",
                  }}
                >
                  <div style={{
                    width: 32, height: 32,
                    borderRadius: "50% 50% 50% 0",
                    transform: "rotate(-45deg)",
                    background: statusColor(marker.status),
                    border: `3px solid ${theme.bg}`,
                    display: "flex", alignItems: "center", justifyContent: "center",
                  }}>
                    <span style={{
                      transform: "rotate(45deg)",
                      fontSize: 13, color: "#fff", fontWeight: 800,
                    }}>!</span>
                  </div>
                </div>
              );
            })}

          {/* Legend */}
          <div style={{
            position: "absolute", bottom: 20, left: 20,
            background: theme.surface + "ee",
            border: `1px solid ${theme.border}`,
            borderRadius: 10, padding: "12px 16px",
            backdropFilter: "blur(8px)",
          }}>
            {["pending","in-progress","resolved"].map(s => (
              <div key={s} style={{
                display: "flex", alignItems: "center",
                gap: 8, marginBottom: 6, fontSize: 12,
              }}>
                <span style={{
                  width: 10, height: 10, borderRadius: "50%",
                  background: statusColor(s), flexShrink: 0,
                }} />
                <span style={{ color: theme.textMuted }}>{statusLabel(s)}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Sidebar */}
        <div style={{
          background: theme.surface,
          borderLeft: `1px solid ${theme.border}`,
          overflowY: "auto",
        }}>
          {selected ? (
            /* ── Detail panel ── */
            <div style={{ padding: 20 }}>
              <button
                onClick={() => setSelected(null)}
                style={{
                  background: "none", border: "none",
                  color: theme.textMuted, cursor: "pointer",
                  fontSize: 13, marginBottom: 16, fontFamily: "inherit",
                  display: "flex", alignItems: "center", gap: 6,
                }}
              >← Back to list</button>

              <div style={{
                height: 160, background: theme.surfaceHi,
                borderRadius: 10, display: "flex",
                alignItems: "center", justifyContent: "center",
                fontSize: 60, marginBottom: 16,
              }}>{selected.img}</div>

              <StatusBadge status={selected.status} />
              <h3 style={{
                fontFamily: "'Syne', sans-serif",
                fontSize: 18, fontWeight: 800,
                margin: "12px 0 8px",
              }}>{selected.title}</h3>
              <p style={{
                fontSize: 14, color: theme.textMuted,
                lineHeight: 1.6, marginBottom: 14,
              }}>{selected.desc}</p>

              {[
                ["📍 Location", selected.location],
                ["🗓️ Reported",  selected.date],
                ["👍 Upvotes",   selected.upvotes],
                ["🏷️ Category",  selected.category],
              ].map(([k, v]) => (
                <div key={k} style={{
                  display: "flex", justifyContent: "space-between",
                  fontSize: 13, padding: "8px 0",
                  borderBottom: `1px solid ${theme.border}`,
                }}>
                  <span style={{ color: theme.textMuted }}>{k}</span>
                  <span style={{ color: theme.text, fontWeight: 600 }}>{v}</span>
                </div>
              ))}
            </div>
          ) : (
            /* ── List panel ── */
            <div style={{ padding: 16 }}>
              <div style={{
                fontSize: 13, color: theme.textMuted,
                marginBottom: 14, fontWeight: 600,
              }}>{visible.length} issues shown</div>

              {visible.map(issue => (
                <div
                  key={issue.id}
                  onClick={() => setSelected(issue)}
                  style={{
                    background: theme.surfaceHi,
                    border: `1px solid ${theme.border}`,
                    borderRadius: 10, padding: 14,
                    marginBottom: 10, cursor: "pointer",
                    transition: "border-color 0.15s",
                  }}
                  onMouseEnter={e =>
                    e.currentTarget.style.borderColor = theme.amber + "66"}
                  onMouseLeave={e =>
                    e.currentTarget.style.borderColor = theme.border}
                >
                  <div style={{ display: "flex", gap: 12 }}>
                    <span style={{ fontSize: 28 }}>{issue.img}</span>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{
                        fontWeight: 700, fontSize: 13, marginBottom: 4,
                        overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap",
                      }}>{issue.title}</div>
                      <StatusBadge status={issue.status} />
                      <div style={{ fontSize: 11, color: theme.textDim, marginTop: 4 }}>
                        📍 {issue.location}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MapPage;