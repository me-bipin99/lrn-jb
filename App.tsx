

import React, { useState } from "react";
import Card from "./Card";
import AuthPage from "./AuthPage";
import "./Card.scss";

type View = "cards" | "auth";

const App: React.FC = () => {
  const [view, setView] = useState<View>("cards");

  return (
    <div style={{ fontFamily: "'DM Sans', sans-serif" }}>
      {/* Navigation */}
      <nav style={{
        position      : "fixed",
        top           : 0,
        left          : 0,
        right         : 0,
        zIndex        : 100,
        display       : "flex",
        gap           : "8px",
        padding       : "12px 20px",
        background    : "rgba(8,8,16,0.85)",
        backdropFilter: "blur(12px)",
        borderBottom  : "1px solid rgba(255,255,255,0.07)",
      }}>
        {(["cards", "auth"] as View[]).map(v => (
          <button key={v} onClick={() => setView(v)} style={{
            padding     : "7px 18px",
            borderRadius: "8px",
            border      : "1px solid",
            borderColor : view === v ? "rgba(201,168,76,0.6)" : "rgba(255,255,255,0.1)",
            background  : view === v ? "rgba(201,168,76,0.12)" : "transparent",
            color       : view === v ? "#c9a84c" : "#7a7a90",
            fontSize    : "0.85rem",
            fontWeight  : 500,
            cursor      : "pointer",
            fontFamily  : "inherit",
            transition  : "all 220ms ease",
          }}>
            {v === "cards" ? "🃏 Card Container" : "🔐 Auth Page"}
          </button>
        ))}
      </nav>

      {/* Views */}
      <div style={{ paddingTop: "57px" }}>
        {view === "cards" ? <CardDemo /> : <AuthPage />}
      </div>
    </div>
  );
};

const CardDemo: React.FC = () => (
  <div className="card-container">
    <div className="card-container__heading">
      <h1>Card Components</h1>
      <p>Four variants — default · elevated · outlined · glass</p>
    </div>

    {/* Default */}
    <Card
      title="Default Card"
      subtitle="Clean surface with subtle border"
      badge="New"
      onClick={() => alert("Card clicked!")}
      footer={<>⏱ 5 min read · <a href="#" style={{ color: "#c9a84c" }}>Read more</a></>}
    >
      A default card for displaying content with an optional click handler and footer slot.
    </Card>

    {/* Elevated */}
    <Card
      variant="elevated"
      title="Elevated Card"
      subtitle="Deeper shadow, richer surface"
      image="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&q=80"
    >
      Use elevated cards to draw attention or show a primary piece of content above the fold.
    </Card>

    {/* Outlined */}
    <Card
      variant="outlined"
      title="Outlined Card"
      subtitle="Transparent with accent border"
      badge="Pro"
      footer={<span style={{ color: "#7a7a90" }}>Updated just now</span>}
    >
      Outlined cards work well for secondary content or option pickers where a lighter weight is needed.
    </Card>

    {/* Glass */}
    <Card
      variant="glass"
      title="Glass Card"
      subtitle="Frosted backdrop blur effect"
      onClick={() => alert("Glass card!")}
    >
      <p style={{ margin: 0 }}>Perfect for overlays or hero sections with busy backgrounds behind.</p>
      <div style={{ display: "flex", gap: "8px", marginTop: "12px", flexWrap: "wrap" }}>
        {["React", "TypeScript", "SCSS"].map(tag => (
          <span key={tag} style={{
            padding: "4px 10px", borderRadius: "6px",
            background: "rgba(201,168,76,0.12)", color: "#c9a84c",
            fontSize: "0.75rem", fontWeight: 600,
          }}>{tag}</span>
        ))}
      </div>
    </Card>
  </div>
);

export default App;
