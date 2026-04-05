import { useState } from "react";
import { Card, Btn, StatusBadge, statusColor } from "../components/UI";
import { ISSUES, NOTIFICATIONS, STATS } from "../data/mockData";
import theme from "../theme";

const Dashboard = ({ user }) => {
  const isAdmin = user?.role === "admin";
  const [issues, setIssues] = useState(ISSUES.map(i => ({ ...i })));
  const [notifs, setNotifs] = useState(NOTIFICATIONS);
  const [tab,    setTab]    = useState("overview");

  const stats = isAdmin ? [
    { label: "Total Reports", val: STATS.total,      icon: "📊", color: theme.amber  },
    { label: "Pending",       val: STATS.pending,    icon: "⏳", color: theme.yellow },
    { label: "In Progress",   val: STATS.inProgress, icon: "🔧", color: theme.blue   },
    { label: "Resolved",      val: STATS.resolved,   icon: "✅", color: theme.green  },
  ] : [
    { label: "My Reports",  val: 4, icon: "📝", color: theme.amber  },
    { label: "Pending",     val: 2, icon: "⏳", color: theme.yellow },
    { label: "In Progress", val: 1, icon: "🔧", color: theme.blue   },
    { label: "Resolved",    val: 1, icon: "✅", color: theme.green  },
  ];

  const tabs = isAdmin
    ? ["overview","complaints","analytics","notifications"]
    : ["overview","my-reports","notifications"];

  const unread = notifs.filter(n => !n.read).length;

  return (
    <div style={{ maxWidth: 1280, margin: "0 auto", padding: "80px 24px 40px" }}>

      {/* ── Header ── */}
      <div style={{
        display: "flex", justifyContent: "space-between",
        alignItems: "flex-start", marginBottom: 32,
        flexWrap: "wrap", gap: 16,
      }}>
        <div>
          <div style={{
            fontSize: 13, color: theme.amber, fontWeight: 700,
            letterSpacing: "0.05em", textTransform: "uppercase", marginBottom: 6,
          }}>
            {isAdmin ? "Admin Panel" : "User Dashboard"}
          </div>
          <h1 style={{
            fontFamily: "'Syne', sans-serif",
            fontSize: "clamp(1.8rem,3vw,2.4rem)", fontWeight: 800,
          }}>Welcome back, {user?.name ?? "User"} 👋</h1>
        </div>

        {unread > 0 && (
          <div style={{
            background: theme.red + "22",
            border: `1px solid ${theme.red}44`,
            borderRadius: 10, padding: "10px 16px",
            fontSize: 13, color: theme.red, fontWeight: 600,
          }}>
            🔔 {unread} new notification{unread > 1 ? "s" : ""}
          </div>
        )}
      </div>

      {/* ── Tabs ── */}
      <div style={{
        display: "flex", gap: 4, marginBottom: 28,
        borderBottom: `1px solid ${theme.border}`,
      }}>
        {tabs.map(t => (
          <button key={t} onClick={() => setTab(t)} style={{
            padding: "10px 18px", background: "none", border: "none",
            borderBottom: tab === t
              ? `2px solid ${theme.amber}`
              : "2px solid transparent",
            color:  tab === t ? theme.amber : theme.textMuted,
            fontSize: 14, fontWeight: 600,
            cursor: "pointer", fontFamily: "inherit",
            marginBottom: -1, textTransform: "capitalize", whiteSpace: "nowrap",
          }}>{t.replace("-"," ")}</button>
        ))}
      </div>

      {/* ── Stat cards ── */}
      {(tab === "overview" || tab === "analytics") && (
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
          gap: 16, marginBottom: 32,
        }}>
          {stats.map(({ label, val, icon, color }) => (
            <Card key={label} style={{ padding: 24 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                <div>
                  <div style={{ fontSize: 13, color: theme.textMuted, marginBottom: 8, fontWeight: 600 }}>
                    {label}
                  </div>
                  <div style={{
                    fontFamily: "'Syne', sans-serif",
                    fontSize: 36, fontWeight: 800, color,
                  }}>{val}</div>
                </div>
                <div style={{ fontSize: 28, opacity: 0.7 }}>{icon}</div>
              </div>
              <div style={{ marginTop: 16, height: 4, background: theme.surfaceHi, borderRadius: 2 }}>
                <div style={{
                  height: "100%",
                  width: `${(val / STATS.total) * 100}%`,
                  background: color, borderRadius: 2,
                }} />
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* ── Analytics bar charts ── */}
      {tab === "analytics" && (
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24, marginBottom: 32 }}>

          <Card style={{ padding: 24 }}>
            <h3 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, marginBottom: 20, fontSize: 16 }}>
              Issues by Status
            </h3>
            {[
              { label: "Pending",     val: STATS.pending,    color: theme.yellow },
              { label: "In Progress", val: STATS.inProgress, color: theme.blue   },
              { label: "Resolved",    val: STATS.resolved,   color: theme.green  },
            ].map(({ label, val, color }) => (
              <div key={label} style={{ marginBottom: 16 }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6, fontSize: 13 }}>
                  <span style={{ color: theme.textMuted }}>{label}</span>
                  <span style={{ fontWeight: 700 }}>{val}</span>
                </div>
                <div style={{ height: 8, background: theme.surfaceHi, borderRadius: 4 }}>
                  <div style={{
                    height: "100%",
                    width: `${(val / STATS.total) * 100}%`,
                    background: color, borderRadius: 4,
                  }} />
                </div>
              </div>
            ))}
          </Card>

          <Card style={{ padding: 24 }}>
            <h3 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, marginBottom: 20, fontSize: 16 }}>
              Issues by Category
            </h3>
            {[
              { label: "Potholes",       val: 89 },
              { label: "Damaged Roads",  val: 54 },
              { label: "Infrastructure", val: 43 },
              { label: "Drainage",       val: 28 },
            ].map(({ label, val }) => (
              <div key={label} style={{ marginBottom: 14 }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 5, fontSize: 13 }}>
                  <span style={{ color: theme.textMuted }}>{label}</span>
                  <span style={{ fontWeight: 700 }}>{val}</span>
                </div>
                <div style={{ height: 6, background: theme.surfaceHi, borderRadius: 3 }}>
                  <div style={{
                    height: "100%",
                    width: `${(val / 89) * 100}%`,
                    background: `linear-gradient(90deg, ${theme.amber}, ${theme.amberDim})`,
                    borderRadius: 3,
                  }} />
                </div>
              </div>
            ))}
          </Card>
        </div>
      )}

      {/* ── Issues table ── */}
      {(tab === "overview" || tab === "my-reports" || tab === "complaints") && (
        <Card>
          <div style={{
            padding: "20px 24px",
            borderBottom: `1px solid ${theme.border}`,
          }}>
            <h3 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: 16 }}>
              {isAdmin ? "All Complaints" : "My Reports"}
            </h3>
          </div>
          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr style={{ borderBottom: `1px solid ${theme.border}` }}>
                  {["Issue","Location","Status","Date", isAdmin ? "Actions" : "Votes"].map(h => (
                    <th key={h} style={{
                      padding: "12px 24px", textAlign: "left",
                      fontSize: 12, fontWeight: 700, color: theme.textMuted,
                      textTransform: "uppercase", letterSpacing: "0.05em", whiteSpace: "nowrap",
                    }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {issues.map((issue, i) => (
                  <tr key={issue.id} style={{
                    borderBottom: `1px solid ${theme.border}`,
                    background: i % 2 === 0 ? "transparent" : theme.surfaceHi + "44",
                  }}>
                    <td style={{ padding: "14px 24px" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                        <span style={{ fontSize: 22 }}>{issue.img}</span>
                        <div>
                          <div style={{ fontWeight: 700, fontSize: 14 }}>{issue.title}</div>
                          <div style={{ fontSize: 12, color: theme.textDim }}>{issue.category}</div>
                        </div>
                      </div>
                    </td>
                    <td style={{ padding: "14px 24px", fontSize: 13, color: theme.textMuted, whiteSpace: "nowrap" }}>
                      📍 {issue.location.split(",")[0]}
                    </td>
                    <td style={{ padding: "14px 24px" }}>
                      {isAdmin ? (
                        <select
                          value={issue.status}
                          onChange={e => setIssues(prev =>
                            prev.map(p => p.id === issue.id
                              ? { ...p, status: e.target.value } : p)
                          )}
                          style={{
                            background: theme.surfaceHi,
                            border: `1px solid ${statusColor(issue.status)}66`,
                            borderRadius: 8, padding: "5px 10px",
                            color: statusColor(issue.status),
                            fontSize: 12, fontWeight: 700,
                            fontFamily: "inherit", cursor: "pointer", outline: "none",
                          }}
                        >
                          <option value="pending">Pending</option>
                          <option value="in-progress">In Progress</option>
                          <option value="resolved">Resolved</option>
                        </select>
                      ) : <StatusBadge status={issue.status} />}
                    </td>
                    <td style={{ padding: "14px 24px", fontSize: 13, color: theme.textDim, whiteSpace: "nowrap" }}>
                      {issue.date}
                    </td>
                    <td style={{ padding: "14px 24px" }}>
                      {isAdmin
                        ? <Btn variant="danger" small>Delete</Btn>
                        : <span style={{ fontSize: 13, color: theme.textMuted }}>👍 {issue.upvotes}</span>
                      }
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      )}

      {/* ── Notifications ── */}
      {tab === "notifications" && (
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <div style={{ display: "flex", justifyContent: "flex-end" }}>
            <Btn variant="ghost" small
              onClick={() => setNotifs(n => n.map(x => ({ ...x, read: true })))}>
              Mark all as read
            </Btn>
          </div>
          {notifs.map(notif => (
            <Card key={notif.id} style={{
              padding: 18,
              borderLeft: `3px solid ${notif.read ? theme.border : theme.amber}`,
              background: notif.read ? theme.surface : theme.surfaceHi,
            }}>
              <div style={{
                display: "flex", justifyContent: "space-between",
                alignItems: "flex-start", gap: 12,
              }}>
                <div style={{ display: "flex", gap: 12 }}>
                  <span style={{ fontSize: 20 }}>{notif.read ? "🔔" : "🔴"}</span>
                  <div>
                    <p style={{ fontSize: 14, lineHeight: 1.5, marginBottom: 4 }}>{notif.msg}</p>
                    <span style={{ fontSize: 12, color: theme.textDim }}>{notif.time}</span>
                  </div>
                </div>
                {!notif.read && (
                  <button
                    onClick={() =>
                      setNotifs(n => n.map(x => x.id === notif.id ? { ...x, read: true } : x))
                    }
                    style={{
                      background: "none", border: "none",
                      color: theme.textMuted, cursor: "pointer",
                      fontSize: 12, fontFamily: "inherit",
                      flexShrink: 0, padding: "4px 8px",
                    }}
                  >Mark read</button>
                )}
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dashboard;