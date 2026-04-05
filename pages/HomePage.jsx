import { Btn } from "../components/UI";
import IssueCard from "../components/IssueCard";
import { ISSUES } from "../data/mockData";
import theme from "../theme";

const HomePage = ({ setPage }) => {
  const steps = [
    { icon: "📸", num: "01", title: "Upload a Photo",
      desc: "Take a clear photo to help authorities understand the severity." },
    { icon: "📍", num: "02", title: "Mark the Location",
      desc: "Use the interactive map to pinpoint the exact problem location." },
    { icon: "✅", num: "03", title: "Submit & Track",
      desc: "Submit your report and track it in real-time as work progresses." },
  ];

  const categories = [
    { icon: "🕳️", label: "Potholes",       count: 89 },
    { icon: "🛣️", label: "Damaged Roads",  count: 54 },
    { icon: "🚧", label: "Infrastructure", count: 43 },
    { icon: "🚫", label: "Missing Signs",  count: 28 },
    { icon: "🌊", label: "Drainage",       count: 21 },
    { icon: "💡", label: "Street Lights",  count: 13 },
  ];

  return (
    <div style={{ paddingTop: 64 }}>

      {/* ── HERO ──────────────────────────────────────────── */}
      <div style={{
        position: "relative", minHeight: "92vh",
        display: "flex", alignItems: "center", overflow: "hidden",
      }}>
        {/* Glow */}
        <div style={{
          position: "absolute", inset: 0,
          background: `radial-gradient(ellipse 80% 60% at 60% 40%, ${theme.amber}11 0%, transparent 60%)`,
        }} />

        <div style={{
          maxWidth: 1280, margin: "0 auto", padding: "80px 24px",
          display: "grid", gridTemplateColumns: "1fr 1fr",
          gap: 60, alignItems: "center", width: "100%",
        }}>

          {/* Left text */}
          <div>
            {/* Live badge */}
            <div style={{
              display: "inline-flex", alignItems: "center", gap: 8,
              background: theme.amber + "22",
              border: `1px solid ${theme.amber}44`,
              borderRadius: 20, padding: "6px 14px", marginBottom: 24,
            }}>
              <span style={{
                width: 8, height: 8, borderRadius: "50%",
                background: theme.green,
                animation: "pulse 2s infinite",
              }} />
              <span style={{ fontSize: 13, color: theme.amber, fontWeight: 600 }}>
                Live reporting platform
              </span>
            </div>

            {/* Headline */}
            <h1 style={{
              fontFamily: "'Syne', sans-serif",
              fontSize: "clamp(2.2rem, 5vw, 4rem)",
              fontWeight: 800, lineHeight: 1.05, marginBottom: 20,
            }}>
              Report Road Issues.<br />
              <span style={{ color: theme.amber }}>Fix Your City.</span>
            </h1>

            <p style={{
              fontSize: 18, color: theme.textMuted,
              lineHeight: 1.7, marginBottom: 36, maxWidth: 480,
            }}>
              Fix MyRoad empowers citizens to report road problems directly
              to local authorities and track real-time resolution.
            </p>

            {/* CTA buttons */}
            <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
              <Btn variant="primary" onClick={() => setPage("report")}>
                🚨 Report an Issue
              </Btn>
              <Btn variant="outline" onClick={() => setPage("map")}>
                🗺️ View Issues Map
              </Btn>
            </div>

            {/* Stats row */}
            <div style={{
              display: "flex", gap: 32, marginTop: 48,
              paddingTop: 32, borderTop: `1px solid ${theme.border}`,
            }}>
              {[["248","Total Reports"], ["87","Resolved"], ["4.2k","Citizens"]].map(([n, l]) => (
                <div key={l}>
                  <div style={{
                    fontFamily: "'Syne', sans-serif",
                    fontSize: 28, fontWeight: 800, color: theme.amber,
                  }}>{n}</div>
                  <div style={{ fontSize: 13, color: theme.textMuted, marginTop: 2 }}>{l}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right — floating cards */}
          <div style={{ position: "relative", height: 440 }}>
            {[
              { top: 0,   left: 20,  rot: "-3deg", i: 0 },
              { top: 80,  left: 160, rot: "2deg",  i: 1 },
              { top: 260, left: 60,  rot: "-1deg", i: 2 },
            ].map(({ top, left, rot, i }) => (
              <div key={i} style={{
                position: "absolute", top, left, width: 260,
                background: theme.surface,
                border: `1px solid ${theme.border}`,
                borderRadius: 14, padding: 16,
                transform: `rotate(${rot})`,
                boxShadow: "0 20px 40px rgba(0,0,0,0.5)",
              }}>
                <div style={{
                  height: 80, background: theme.surfaceHi,
                  borderRadius: 8, marginBottom: 12,
                  display: "flex", alignItems: "center",
                  justifyContent: "center", fontSize: 36,
                }}>{ISSUES[i].img}</div>
                <div style={{ fontSize: 13, fontWeight: 700, color: theme.text }}>
                  {ISSUES[i].title}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── HOW IT WORKS ──────────────────────────────────── */}
      <div style={{
        background: theme.surface,
        borderTop: `1px solid ${theme.border}`,
        borderBottom: `1px solid ${theme.border}`,
      }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "80px 24px" }}>
          <div style={{ textAlign: "center", marginBottom: 60 }}>
            <div style={{
              fontSize: 13, color: theme.amber, fontWeight: 700,
              letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 12,
            }}>Simple Process</div>
            <h2 style={{
              fontFamily: "'Syne', sans-serif",
              fontSize: "clamp(1.8rem,3vw,2.5rem)", fontWeight: 800,
            }}>How It Works</h2>
          </div>

          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
            gap: 32,
          }}>
            {steps.map(({ icon, num, title, desc }, i) => (
              <div key={num} style={{ position: "relative" }}>
                <div style={{
                  background: theme.bg,
                  border: `1px solid ${theme.border}`,
                  borderRadius: 16, padding: 32,
                }}>
                  <div style={{
                    fontFamily: "'Syne', sans-serif", fontSize: 48,
                    fontWeight: 800, color: theme.amber + "22",
                    marginBottom: -20, lineHeight: 1,
                  }}>{num}</div>
                  <div style={{ fontSize: 36, marginBottom: 16 }}>{icon}</div>
                  <h3 style={{ fontSize: 18, fontWeight: 700, marginBottom: 10 }}>{title}</h3>
                  <p style={{ fontSize: 14, color: theme.textMuted, lineHeight: 1.7 }}>{desc}</p>
                </div>
                {/* Arrow between steps — hidden on mobile */}
                {i < 2 && (
                  <div className="hide-mobile" style={{
                    position: "absolute", top: "50%", right: -20,
                    transform: "translateY(-50%)",
                    color: theme.textDim, fontSize: 20,
                  }}>→</div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── CATEGORIES ────────────────────────────────────── */}
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "80px 24px" }}>
        <h2 style={{
          fontFamily: "'Syne', sans-serif",
          fontSize: "clamp(1.6rem,2.5vw,2rem)", fontWeight: 800, marginBottom: 32,
        }}>Issue Categories</h2>

        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))",
          gap: 16,
        }}>
          {categories.map(({ icon, label, count }) => (
            <div
              key={label}
              onClick={() => setPage("map")}
              style={{
                background: theme.surface,
                border: `1px solid ${theme.border}`,
                borderRadius: 12, padding: "20px 16px",
                textAlign: "center", cursor: "pointer", transition: "all 0.2s",
              }}
              onMouseEnter={e => {
                e.currentTarget.style.borderColor = theme.amber + "88";
                e.currentTarget.style.transform = "translateY(-2px)";
              }}
              onMouseLeave={e => {
                e.currentTarget.style.borderColor = theme.border;
                e.currentTarget.style.transform = "none";
              }}
            >
              <div style={{ fontSize: 28, marginBottom: 8 }}>{icon}</div>
              <div style={{ fontWeight: 700, fontSize: 14, marginBottom: 4 }}>{label}</div>
              <div style={{ fontSize: 12, color: theme.textMuted }}>{count} reports</div>
            </div>
          ))}
        </div>
      </div>

      {/* ── RECENT REPORTS ────────────────────────────────── */}
      <div style={{ background: theme.surface, borderTop: `1px solid ${theme.border}` }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "80px 24px" }}>
          <div style={{
            display: "flex", justifyContent: "space-between",
            alignItems: "center", marginBottom: 32,
          }}>
            <h2 style={{
              fontFamily: "'Syne', sans-serif",
              fontSize: "clamp(1.6rem,2.5vw,2rem)", fontWeight: 800,
            }}>Recent Reports</h2>
            <Btn variant="outline" small onClick={() => setPage("map")}>View All →</Btn>
          </div>

          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
            gap: 20,
          }}>
            {ISSUES.slice(0, 3).map(issue => (
              <IssueCard key={issue.id} issue={issue} />
            ))}
          </div>
        </div>
      </div>

      {/* ── CTA BANNER ────────────────────────────────────── */}
      <div style={{
        background: `linear-gradient(135deg, ${theme.amber}22, ${theme.amber}08)`,
        borderTop: `1px solid ${theme.amber}33`,
        borderBottom: `1px solid ${theme.amber}33`,
      }}>
        <div style={{
          maxWidth: 1280, margin: "0 auto",
          padding: "60px 24px", textAlign: "center",
        }}>
          <h2 style={{
            fontFamily: "'Syne', sans-serif",
            fontSize: "clamp(1.8rem,3vw,2.4rem)", fontWeight: 800, marginBottom: 12,
          }}>See a road issue? Report it now.</h2>
          <p style={{ color: theme.textMuted, marginBottom: 28, fontSize: 16 }}>
            Every report helps make our roads safer.
          </p>
          <Btn variant="primary" onClick={() => setPage("report")}>
            🚨 Report an Issue
          </Btn>
        </div>
      </div>
    </div>
  );
};

export default HomePage;