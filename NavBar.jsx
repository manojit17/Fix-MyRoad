import theme from "../theme";
import { Btn } from "./UI";

const NavBar = ({
  page, setPage, user, setUser,
  notifCount, menuOpen, setMenuOpen,
}) => {
  const items  = ["home", "report", "map", "dashboard"];
  const labels = {
    home:      "Home",
    report:    "Report Issue",
    map:       "Issues Map",
    dashboard: user?.role === "admin" ? "Admin" : "Dashboard",
  };

  return (
    <nav style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
      background: theme.bg + "ee",
      backdropFilter: "blur(12px)",
      borderBottom: `1px solid ${theme.border}`,
    }}>
      {/* ── Top bar ── */}
      <div style={{
        maxWidth: 1280, margin: "0 auto",
        padding: "0 24px",
        display: "flex", alignItems: "center",
        height: 64, gap: 24,
      }}>

        {/* Logo */}
        <div
          onClick={() => setPage("home")}
          style={{ display: "flex", alignItems: "center", gap: 10, cursor: "pointer" }}
        >
          <div style={{
            width: 36, height: 36, background: theme.amber,
            borderRadius: 8, display: "flex",
            alignItems: "center", justifyContent: "center", fontSize: 18,
          }}>🛣️</div>
          <span style={{
            fontFamily: "'Syne', sans-serif",
            fontWeight: 800, fontSize: 17,
          }}>
            Fix <span style={{ color: theme.amber }}>MyRoad</span>
          </span>
        </div>

        {/* Desktop links */}
        <div
          className="desktop-nav"
          style={{ display: "flex", gap: 4, flex: 1, justifyContent: "center" }}
        >
          {items.map(item => (
            <button
              key={item}
              onClick={() => setPage(item)}
              style={{
                background: page === item ? theme.surfaceHi : "transparent",
                color:      page === item ? theme.amber     : theme.textMuted,
                border: "none",
                borderBottom: page === item
                  ? `2px solid ${theme.amber}`
                  : "2px solid transparent",
                padding: "8px 16px", borderRadius: 8,
                fontSize: 14, fontWeight: 600,
                cursor: "pointer", fontFamily: "inherit",
                transition: "all 0.15s",
              }}
            >{labels[item]}</button>
          ))}
        </div>

        {/* Right side */}
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>

          {/* Bell icon */}
          {user && (
            <button
              onClick={() => setPage("dashboard")}
              style={{
                position: "relative", background: "none",
                border: "none", cursor: "pointer", padding: 8,
              }}
            >
              <span style={{ fontSize: 18 }}>🔔</span>
              {notifCount > 0 && (
                <span style={{
                  position: "absolute", top: 4, right: 4,
                  width: 16, height: 16, background: theme.red,
                  borderRadius: "50%", fontSize: 10, fontWeight: 700,
                  color: "#fff", display: "flex",
                  alignItems: "center", justifyContent: "center",
                }}>{notifCount}</span>
              )}
            </button>
          )}

          {/* Avatar or Login/Register */}
          {user ? (
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <div style={{
                width: 34, height: 34, borderRadius: "50%",
                background: `linear-gradient(135deg, ${theme.amber}, ${theme.amberDim})`,
                display: "flex", alignItems: "center",
                justifyContent: "center",
                fontSize: 14, fontWeight: 700, color: "#0f1117",
              }}>{user.name[0]}</div>
              <Btn variant="ghost" small onClick={() => setUser(null)}>
                Logout
              </Btn>
            </div>
          ) : (
            <div style={{ display: "flex", gap: 8 }}>
              <Btn variant="outline" small onClick={() => setPage("login")}>Login</Btn>
              <Btn variant="primary" small onClick={() => setPage("register")}>Register</Btn>
            </div>
          )}

          {/* Hamburger — hidden on desktop by CSS */}
          <button
            className="hamburger"
            onClick={() => setMenuOpen(!menuOpen)}
            style={{
              display: "none", background: "none",
              border: "none", cursor: "pointer",
              padding: 8, color: theme.text, fontSize: 22,
            }}
          >☰</button>
        </div>
      </div>

      {/* ── Mobile dropdown ── */}
      {menuOpen && (
        <div style={{
          background: theme.surface,
          borderTop: `1px solid ${theme.border}`,
          padding: "12px 24px 16px",
        }}>
          {items.map(item => (
            <button
              key={item}
              onClick={() => { setPage(item); setMenuOpen(false); }}
              style={{
                display: "block", width: "100%", textAlign: "left",
                background: page === item ? theme.surfaceHi : "transparent",
                color:      page === item ? theme.amber     : theme.text,
                border: "none", padding: "12px 16px", borderRadius: 8,
                fontSize: 15, fontWeight: 600,
                cursor: "pointer", fontFamily: "inherit",
              }}
            >{labels[item]}</button>
          ))}
        </div>
      )}
    </nav>
  );
};

export default NavBar;