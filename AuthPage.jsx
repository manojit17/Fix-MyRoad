import { useState } from "react";
import { Btn } from "../components/UI";
import theme from "../theme";

const AuthPage = ({ mode, setPage, setUser }) => {
  const [form,  setForm]  = useState({ name:"", email:"", password:"", role:"user" });
  const [error, setError] = useState("");

  const input = {
    width: "100%", background: theme.surfaceHi,
    border: `1px solid ${theme.border}`, borderRadius: 8,
    padding: "12px 16px", color: theme.text,
    fontSize: 15, outline: "none", fontFamily: "inherit",
  };

  const set = (key) => (e) => setForm(f => ({ ...f, [key]: e.target.value }));

  const submit = () => {
    if (!form.email || !form.password) {
      setError("Please fill in all required fields.");
      return;
    }
    setUser({
      name:  form.name || form.email.split("@")[0],
      email: form.email,
      role:  form.role,
    });
    setPage("dashboard");
  };

  return (
    <div style={{
      minHeight: "100vh", display: "flex",
      alignItems: "center", justifyContent: "center",
      padding: "80px 24px",
    }}>
      <div style={{ width: "100%", maxWidth: 420 }}>

        {/* Logo + heading */}
        <div style={{ textAlign: "center", marginBottom: 36 }}>
          <div style={{
            width: 56, height: 56, background: theme.amber,
            borderRadius: 14, display: "flex",
            alignItems: "center", justifyContent: "center",
            fontSize: 26, margin: "0 auto 16px",
          }}>🛣️</div>
          <h1 style={{
            fontFamily: "'Syne', sans-serif",
            fontWeight: 800, fontSize: 28, marginBottom: 6,
          }}>
            {mode === "login" ? "Welcome back" : "Create account"}
          </h1>
          <p style={{ color: theme.textMuted, fontSize: 15 }}>
            {mode === "login"
              ? "Sign in to your Fix MyRoad account"
              : "Join the Fix MyRoad community"}
          </p>
        </div>

        {/* Form card */}
        <div style={{
          background: theme.surface,
          border: `1px solid ${theme.border}`,
          borderRadius: 14, padding: 32,
        }}>
          {/* Error */}
          {error && (
            <div style={{
              background: theme.red + "22",
              border: `1px solid ${theme.red}44`,
              borderRadius: 8, padding: "10px 14px",
              marginBottom: 20, fontSize: 13, color: theme.red,
            }}>{error}</div>
          )}

          <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>

            {mode === "register" && (
              <div>
                <label style={{ display: "block", fontSize: 13, fontWeight: 600, marginBottom: 8, color: theme.textMuted }}>Full Name</label>
                <input style={input} placeholder="John Doe"
                  value={form.name} onChange={set("name")} />
              </div>
            )}

            <div>
              <label style={{ display: "block", fontSize: 13, fontWeight: 600, marginBottom: 8, color: theme.textMuted }}>Email Address</label>
              <input style={input} type="email" placeholder="you@example.com"
                value={form.email} onChange={set("email")} />
            </div>

            <div>
              <label style={{ display: "block", fontSize: 13, fontWeight: 600, marginBottom: 8, color: theme.textMuted }}>Password</label>
              <input style={input} type="password" placeholder="••••••••"
                value={form.password} onChange={set("password")} />
            </div>

            {mode === "register" && (
              <div>
                <label style={{ display: "block", fontSize: 13, fontWeight: 600, marginBottom: 8, color: theme.textMuted }}>Account Type</label>
                <select style={{ ...input, appearance: "none" }}
                  value={form.role} onChange={set("role")}>
                  <option value="user">Citizen / Reporter</option>
                  <option value="admin">Authority / Admin</option>
                </select>
              </div>
            )}

            <Btn variant="primary" onClick={submit}
              style={{ width: "100%", justifyContent: "center" }}>
              {mode === "login" ? "Sign In →" : "Create Account →"}
            </Btn>
          </div>

          {/* Switch mode */}
          <div style={{ marginTop: 24, textAlign: "center", fontSize: 14, color: theme.textMuted }}>
            {mode === "login" ? "Don't have an account? " : "Already have an account? "}
            <button
              onClick={() => setPage(mode === "login" ? "register" : "login")}
              style={{
                background: "none", border: "none",
                color: theme.amber, cursor: "pointer",
                fontWeight: 700, fontFamily: "inherit", fontSize: 14,
              }}
            >
              {mode === "login" ? "Register" : "Login"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;