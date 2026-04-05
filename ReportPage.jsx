import { useState } from "react";
import { Btn } from "../components/UI";
import theme from "../theme";

const input = {
  width: "100%", background: theme.surfaceHi,
  border: `1px solid ${theme.border}`,
  borderRadius: 8, padding: "12px 16px",
  color: theme.text, fontSize: 15,
  outline: "none", fontFamily: "inherit",
};

const Label = ({ text }) => (
  <label style={{
    display: "block", fontSize: 13, fontWeight: 600,
    marginBottom: 8, color: theme.textMuted,
    textTransform: "uppercase", letterSpacing: "0.05em",
  }}>{text}</label>
);

const ReportPage = ({ setPage }) => {
  const [form, setForm] = useState({ title: "", category: "", desc: "", location: "" });
  const [pin,  setPin]  = useState(null);
  const [preview, setPreview] = useState(null);
  const [done,    setDone]    = useState(false);

  const set = (key) => (e) => setForm(f => ({ ...f, [key]: e.target.value }));

  const handleFile = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const r = new FileReader();
    r.onload = ev => setPreview(ev.target.result);
    r.readAsDataURL(file);
  };

  const handleMapClick = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left)  / rect.width)  * 100;
    const y = ((e.clientY - rect.top)   / rect.height) * 100;
    setPin({ x, y });
    setForm(f => ({
      ...f,
      location: `Lat: ${(40 + y * 0.05).toFixed(4)}, Lng: ${(-74 + x * 0.08).toFixed(4)}`,
    }));
  };

  /* ── Success screen ── */
  if (done) return (
    <div style={{
      minHeight: "100vh", display: "flex",
      alignItems: "center", justifyContent: "center",
      padding: "80px 24px",
    }}>
      <div style={{ textAlign: "center", maxWidth: 480 }}>
        <div style={{ fontSize: 72, marginBottom: 24 }}>✅</div>
        <h2 style={{
          fontFamily: "'Syne', sans-serif",
          fontSize: 28, fontWeight: 800, marginBottom: 12,
        }}>Report Submitted!</h2>
        <p style={{ color: theme.textMuted, marginBottom: 28, lineHeight: 1.6 }}>
          Your issue has been sent to local authorities.
          You'll get notifications when the status changes.
        </p>
        <div style={{ display: "flex", gap: 12, justifyContent: "center" }}>
          <Btn variant="primary" onClick={() => setPage("dashboard")}>
            View My Reports
          </Btn>
          <Btn variant="outline" onClick={() => {
            setDone(false);
            setForm({ title: "", category: "", desc: "", location: "" });
            setPin(null); setPreview(null);
          }}>
            Report Another
          </Btn>
        </div>
      </div>
    </div>
  );

  return (
    <div style={{ maxWidth: 900, margin: "0 auto", padding: "80px 24px 40px" }}>
      <div style={{ marginBottom: 36 }}>
        <h1 style={{
          fontFamily: "'Syne', sans-serif",
          fontSize: "clamp(1.8rem,3vw,2.5rem)", fontWeight: 800, marginBottom: 8,
        }}>Report a Road Issue</h1>
        <p style={{ color: theme.textMuted }}>
          Fill in the details below to report a problem to local authorities.
        </p>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 32 }}>

        {/* ── Left column ── */}
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>

          <div>
            <Label text="Issue Title *" />
            <input style={input} placeholder="e.g. Large pothole on Main Street"
              value={form.title} onChange={set("title")} />
          </div>

          <div>
            <Label text="Category *" />
            <select style={{ ...input, appearance: "none" }}
              value={form.category} onChange={set("category")}>
              <option value="">Select a category</option>
              {["Pothole","Damaged Road","Infrastructure",
                "Signage","Drainage","Street Lights","Other"].map(c => (
                <option key={c}>{c}</option>
              ))}
            </select>
          </div>

          <div>
            <Label text="Description" />
            <textarea style={{ ...input, minHeight: 120, resize: "vertical" }}
              placeholder="Describe the issue in detail..."
              value={form.desc} onChange={set("desc")} />
          </div>

          <div>
            <Label text="Upload Photo" />
            <label style={{
              display: "block", background: theme.surfaceHi,
              border: `2px dashed ${theme.border}`,
              borderRadius: 10, padding: 24,
              textAlign: "center", cursor: "pointer", transition: "border-color 0.2s",
            }}
              onMouseEnter={e => e.currentTarget.style.borderColor = theme.amber + "88"}
              onMouseLeave={e => e.currentTarget.style.borderColor = theme.border}
            >
              {preview
                ? <img src={preview} alt="preview"
                    style={{ maxHeight: 140, borderRadius: 8, objectFit: "cover" }} />
                : <>
                    <div style={{ fontSize: 32, marginBottom: 8 }}>📸</div>
                    <div style={{ fontSize: 14, color: theme.textMuted }}>
                      Click to upload or drag & drop
                    </div>
                    <div style={{ fontSize: 12, color: theme.textDim, marginTop: 4 }}>
                      PNG, JPG up to 10MB
                    </div>
                  </>
              }
              <input type="file" accept="image/*"
                style={{ display: "none" }} onChange={handleFile} />
            </label>
          </div>
        </div>

        {/* ── Right column — map ── */}
        <div>
          <Label text="Select Location on Map *" />

          {/* Clickable fake map */}
          <div onClick={handleMapClick} style={{
            position: "relative", height: 340,
            background: theme.surfaceHi, borderRadius: 12,
            border: `1px solid ${theme.border}`,
            cursor: "crosshair", overflow: "hidden", marginBottom: 14,
          }}>
            {/* Grid lines */}
            <svg width="100%" height="100%"
              style={{ position: "absolute", inset: 0, opacity: 0.12 }}>
              {[10,20,30,40,50,60,70,80,90].map(p => (
                <g key={p}>
                  <line x1={`${p}%`} y1="0" x2={`${p}%`} y2="100%"
                    stroke="#e8eaf0" strokeWidth="0.5" />
                  <line x1="0" y1={`${p}%`} x2="100%" y2={`${p}%`}
                    stroke="#e8eaf0" strokeWidth="0.5" />
                </g>
              ))}
            </svg>

            {/* Road lines */}
            <svg width="100%" height="100%"
              style={{ position: "absolute", inset: 0, opacity: 0.3 }}>
              <line x1="0" y1="45%" x2="100%" y2="45%"
                stroke={theme.amber} strokeWidth="3" />
              <line x1="35%" y1="0" x2="35%" y2="100%"
                stroke={theme.amber} strokeWidth="2" />
              <line x1="70%" y1="0" x2="70%" y2="100%"
                stroke={theme.amber} strokeWidth="2" />
            </svg>

            {/* Placeholder text */}
            {!pin && (
              <div style={{
                position: "absolute", top: "50%", left: "50%",
                transform: "translate(-50%,-50%)",
                color: theme.textDim, fontSize: 13,
                pointerEvents: "none", textAlign: "center",
              }}>
                <div style={{ fontSize: 24, marginBottom: 4 }}>📍</div>
                Click to drop pin
              </div>
            )}

            {/* Dropped pin */}
            {pin && (
              <div style={{
                position: "absolute",
                left: `${pin.x}%`, top: `${pin.y}%`,
                transform: "translate(-50%,-100%)",
                fontSize: 28, pointerEvents: "none",
                filter: "drop-shadow(0 4px 8px rgba(0,0,0,0.5))",
              }}>🔴</div>
            )}
          </div>

          {/* Coordinates */}
          {form.location && (
            <div style={{
              background: theme.surfaceHi,
              border: `1px solid ${theme.border}`,
              borderRadius: 8, padding: "10px 14px",
              fontSize: 13, color: theme.textMuted, marginBottom: 14,
            }}>
              📍{" "}
              <span style={{ color: theme.text, fontFamily: "monospace" }}>
                {form.location}
              </span>
            </div>
          )}

          <div>
            <Label text="Area / Address" />
            <input style={input}
              placeholder="Auto-detected or type manually"
              value={form.location} onChange={set("location")} />
          </div>
        </div>
      </div>

      {/* Submit row */}
      <div style={{
        marginTop: 32, paddingTop: 24,
        borderTop: `1px solid ${theme.border}`,
        display: "flex", justifyContent: "flex-end", gap: 14,
      }}>
        <Btn variant="outline" onClick={() => setPage("home")}>Cancel</Btn>
        <Btn variant="primary" onClick={() => {
          if (form.title && form.category) setDone(true);
        }}>
          🚨 Submit Report
        </Btn>
      </div>
    </div>
  );
};

export default ReportPage;