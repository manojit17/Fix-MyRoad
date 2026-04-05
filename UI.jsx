import { useState } from "react";
import theme from "../theme";

export const statusColor = (s) =>
  ({ pending: theme.yellow, "in-progress": theme.blue, resolved: theme.green }[s] || theme.textMuted);

export const statusLabel = (s) =>
  ({ pending: "Pending", "in-progress": "In Progress", resolved: "Resolved" }[s] || s);

export const StatusBadge = ({ status }) => (
  <span style={{
    display: "inline-flex", alignItems: "center", gap: 5,
    padding: "3px 10px", borderRadius: 20,
    fontSize: 11, fontWeight: 700,
    letterSpacing: "0.05em", textTransform: "uppercase",
    background: statusColor(status) + "22",
    color: statusColor(status),
    border: `1px solid ${statusColor(status)}44`,
  }}>
    <span style={{
      width: 6, height: 6, borderRadius: "50%",
      background: statusColor(status),
    }} />
    {statusLabel(status)}
  </span>
);

export const Card = ({ children, style = {} }) => (
  <div style={{
    background: theme.surface,
    border: `1px solid ${theme.border}`,
    borderRadius: 14, overflow: "hidden",
    ...style,
  }}>
    {children}
  </div>
);

export const Btn = ({
  children, variant = "primary",
  onClick, style = {}, small = false,
}) => {
  const [hov, setHov] = useState(false);

  const base = {
    display: "inline-flex", alignItems: "center", gap: 7,
    padding: small ? "7px 16px" : "12px 24px",
    borderRadius: 8, fontFamily: "inherit",
    fontSize: small ? 13 : 15, fontWeight: 700,
    cursor: "pointer", border: "none",
    transition: "all 0.2s",
    ...style,
  };

  const props = {
    onMouseEnter: () => setHov(true),
    onMouseLeave: () => setHov(false),
    onClick,
  };

  if (variant === "primary") return (
    <button {...props} style={{
      ...base,
      background: hov ? theme.amberDim : theme.amber,
      color: "#0f1117",
      transform: hov ? "translateY(-1px)" : "none",
      boxShadow: hov ? `0 8px 24px ${theme.amber}44` : "none",
    }}>{children}</button>
  );

  if (variant === "outline") return (
    <button {...props} style={{
      ...base,
      background: hov ? theme.border : "transparent",
      color: theme.text,
      border: `1px solid ${theme.border}`,
    }}>{children}</button>
  );

  if (variant === "ghost") return (
    <button {...props} style={{
      ...base,
      background: hov ? theme.surfaceHi : "transparent",
      color: theme.textMuted,
    }}>{children}</button>
  );

  if (variant === "danger") return (
    <button {...props} style={{
      ...base,
      background: hov ? "#c53030" : theme.red + "22",
      color: theme.red,
      border: `1px solid ${theme.red}44`,
    }}>{children}</button>
  );
};