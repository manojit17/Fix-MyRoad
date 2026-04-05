import { useState } from "react";
import { Card, StatusBadge } from "./UI";
import theme from "../theme";

const IssueCard = ({ issue }) => {
  const [votes, setVotes] = useState(issue.upvotes);
  const [voted, setVoted] = useState(false);

  return (
    <Card
      style={{ cursor: "pointer", transition: "all 0.2s" }}
      onMouseEnter={e => {
        e.currentTarget.style.transform = "translateY(-4px)";
        e.currentTarget.style.boxShadow = "0 12px 32px rgba(0,0,0,0.4)";
      }}
      onMouseLeave={e => {
        e.currentTarget.style.transform = "none";
        e.currentTarget.style.boxShadow = "none";
      }}
    >
      {/* Emoji thumbnail */}
      <div style={{
        height: 140, background: theme.surfaceHi,
        display: "flex", alignItems: "center",
        justifyContent: "center", fontSize: 52,
        borderBottom: `1px solid ${theme.border}`,
      }}>
        {issue.img}
      </div>

      {/* Card body */}
      <div style={{ padding: 18 }}>
        <div style={{
          display: "flex", justifyContent: "space-between",
          alignItems: "flex-start", marginBottom: 10,
        }}>
          <StatusBadge status={issue.status} />
          <span style={{ fontSize: 11, color: theme.textDim }}>{issue.date}</span>
        </div>

        <h3 style={{
          fontSize: 15, fontWeight: 700,
          marginBottom: 6, color: theme.text, lineHeight: 1.3,
        }}>{issue.title}</h3>

        <p style={{
          fontSize: 13, color: theme.textMuted,
          marginBottom: 12, lineHeight: 1.5,
          display: "-webkit-box",
          WebkitLineClamp: 2,
          WebkitBoxOrient: "vertical",
          overflow: "hidden",
        }}>{issue.desc}</p>

        <div style={{ fontSize: 12, color: theme.textDim, marginBottom: 14 }}>
          📍 {issue.location}
        </div>

        {/* Upvote + category */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <button
            onClick={() => {
              if (!voted) { setVotes(v => v + 1); setVoted(true); }
            }}
            style={{
              display: "flex", alignItems: "center", gap: 6,
              background: voted ? theme.amber + "22" : theme.surfaceHi,
              color:      voted ? theme.amber         : theme.textMuted,
              border: `1px solid ${voted ? theme.amber + "44" : theme.border}`,
              borderRadius: 8, padding: "6px 12px",
              fontSize: 13, fontWeight: 600,
              cursor: "pointer", fontFamily: "inherit",
            }}
          >👍 {votes}</button>

          <span style={{
            fontSize: 12, color: theme.textMuted,
            background: theme.surfaceHi,
            padding: "4px 10px", borderRadius: 6,
          }}>{issue.category}</span>
        </div>
      </div>
    </Card>
  );
};

export default IssueCard;