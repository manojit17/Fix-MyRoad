import theme from "../theme";

const Footer = () => (
  <footer style={{
    background: theme.surface,
    borderTop: `1px solid ${theme.border}`,
    marginTop: 80,
  }}>
    <div style={{ maxWidth: 1280, margin: "0 auto", padding: "60px 24px 32px" }}>

      {/* 4-column grid */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
        gap: 40, marginBottom: 48,
      }}>

        {/* Brand */}
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
            <div style={{
              width: 32, height: 32, background: theme.amber,
              borderRadius: 8, display: "flex",
              alignItems: "center", justifyContent: "center", fontSize: 16,
            }}>🛣️</div>
            <span style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: 17 }}>
              Fix <span style={{ color: theme.amber }}>MyRoad</span>
            </span>
          </div>
          <p style={{ fontSize: 14, color: theme.textMuted, lineHeight: 1.7 }}>
            Empowering citizens to report road issues and hold authorities accountable.
          </p>
        </div>

        {/* Link columns */}
        {[
          {
            title: "Platform",
            links: ["Home", "Report Issue", "Issues Map", "Dashboard"],
          },
          {
            title: "Support",
            links: ["Help Center", "Contact Us", "Privacy Policy", "Terms"],
          },
          {
            title: "Contact",
            links: ["support@roadfix.gov", "+91100251215", "Mon–Fri 9am–5pm"],
          },
        ].map(({ title, links }) => (
          <div key={title}>
            <h4 style={{
              fontSize: 13, fontWeight: 700, marginBottom: 16,
              textTransform: "uppercase", letterSpacing: "0.08em",
            }}>{title}</h4>
            <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 10 }}>
              {links.map(link => (
                <li key={link}>
                  <span style={{ fontSize: 14, color: theme.textMuted, cursor: "pointer" }}>
                    {link}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Bottom bar */}
      <div style={{
        paddingTop: 24,
        borderTop: `1px solid ${theme.border}`,
        display: "flex", justifyContent: "space-between",
        alignItems: "center", flexWrap: "wrap", gap: 16,
      }}>
        <p style={{ fontSize: 13, color: theme.textDim }}>
          © 2026 RoadFix. All rights reserved.
        </p>
        <div style={{ display: "flex", gap: 12 }}>
          {["𝕏", "📘", "📸"].map(icon => (
            <div key={icon} style={{
              width: 34, height: 34,
              background: theme.surfaceHi,
              border: `1px solid ${theme.border}`,
              borderRadius: 8, display: "flex",
              alignItems: "center", justifyContent: "center",
              cursor: "pointer", fontSize: 14,
            }}>{icon}</div>
          ))}
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;