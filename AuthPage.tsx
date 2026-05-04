import React, { useState } from "react";
import "./AuthPage.scss";

type Mode = "login" | "register";

interface FormState {
  name    : string;
  email   : string;
  password: string;
  confirm : string;
}

const AuthPage: React.FC = () => {
  const [mode, setMode]   = useState<Mode>("login");
  const [form, setForm]   = useState<FormState>({ name: "", email: "", password: "", confirm: "" });
  const [show, setShow]   = useState(false);
  const [busy, setBusy]   = useState(false);
  const [error, setError] = useState("");

  const toggle = () => {
    setMode(m => (m === "login" ? "register" : "login"));
    setError("");
    setForm({ name: "", email: "", password: "", confirm: "" });
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm(f => ({ ...f, [e.target.name]: e.target.value }));

  const onSubmit = async (e: React.MouseEvent) => {
    e.preventDefault();
    setError("");

    if (!form.email || !form.password) { setError("Please fill in all required fields."); return; }
    if (mode === "register") {
      if (!form.name)                               { setError("Name is required."); return; }
      if (form.password !== form.confirm)           { setError("Passwords don't match."); return; }
      if (form.password.length < 8)                 { setError("Password must be at least 8 characters."); return; }
    }

    setBusy(true);
    await new Promise(r => setTimeout(r, 1400)); // simulate request
    setBusy(false);
    alert(`${mode === "login" ? "Logged in" : "Registered"} successfully! (demo)`);
  };

  const isLogin = mode === "login";

  return (
    <div className="auth-page">
      {/* Decorative background shapes */}
      <div className="auth-page__orb auth-page__orb--a" />
      <div className="auth-page__orb auth-page__orb--b" />

      <div className={`auth-card ${!isLogin ? "auth-card--register" : ""}`}>
        {/* Header */}
        <div className="auth-card__header">
          <div className="auth-card__logo">✦</div>
          <h1 className="auth-card__title">
            {isLogin ? "Welcome back" : "Create account"}
          </h1>
          <p className="auth-card__sub">
            {isLogin
              ? "Sign in to continue your journey"
              : "Join us — it only takes a moment"}
          </p>
        </div>

        {/* Tab switcher */}
        <div className="auth-card__tabs" role="tablist">
          {(["login", "register"] as Mode[]).map(m => (
            <button
              key={m}
              role="tab"
              aria-selected={mode === m}
              className={`auth-card__tab ${mode === m ? "auth-card__tab--active" : ""}`}
              onClick={() => { setMode(m); setError(""); }}
            >
              {m === "login" ? "Sign In" : "Register"}
            </button>
          ))}
          <div className={`auth-card__tab-indicator ${!isLogin ? "auth-card__tab-indicator--right" : ""}`} />
        </div>

        {/* Form */}
        <div className="auth-card__form">
          {/* Name — register only */}
          <div className={`auth-card__field-wrap ${!isLogin ? "auth-card__field-wrap--visible" : ""}`}>
            <div className="auth-card__field">
              <label className="auth-card__label" htmlFor="name">Full name</label>
              <input
                id="name" name="name" type="text"
                className="auth-card__input"
                placeholder="Jane Doe"
                value={form.name}
                onChange={onChange}
                autoComplete="name"
              />
            </div>
          </div>

          <div className="auth-card__field">
            <label className="auth-card__label" htmlFor="email">Email</label>
            <input
              id="email" name="email" type="email"
              className="auth-card__input"
              placeholder="you@example.com"
              value={form.email}
              onChange={onChange}
              autoComplete="email"
            />
          </div>

          <div className="auth-card__field">
            <label className="auth-card__label" htmlFor="password">Password</label>
            <div className="auth-card__input-wrap">
              <input
                id="password" name="password"
                type={show ? "text" : "password"}
                className="auth-card__input auth-card__input--with-btn"
                placeholder={isLogin ? "••••••••" : "Min. 8 characters"}
                value={form.password}
                onChange={onChange}
                autoComplete={isLogin ? "current-password" : "new-password"}
              />
              <button
                type="button"
                className="auth-card__eye"
                onClick={() => setShow(s => !s)}
                aria-label="Toggle password visibility"
              >
                {show ? "🙈" : "👁️"}
              </button>
            </div>
          </div>

          {/* Confirm — register only */}
          <div className={`auth-card__field-wrap ${!isLogin ? "auth-card__field-wrap--visible" : ""}`}>
            <div className="auth-card__field">
              <label className="auth-card__label" htmlFor="confirm">Confirm password</label>
              <input
                id="confirm" name="confirm"
                type={show ? "text" : "password"}
                className="auth-card__input"
                placeholder="Repeat password"
                value={form.confirm}
                onChange={onChange}
                autoComplete="new-password"
              />
            </div>
          </div>

          {isLogin && (
            <div className="auth-card__forgot">
              <a href="#" className="auth-card__link" onClick={e => e.preventDefault()}>
                Forgot password?
              </a>
            </div>
          )}

          {error && <div className="auth-card__error" role="alert">{error}</div>}

          <button
            className={`auth-card__submit ${busy ? "auth-card__submit--loading" : ""}`}
            onClick={onSubmit}
            disabled={busy}
          >
            {busy
              ? <span className="auth-card__spinner" />
              : isLogin ? "Sign In" : "Create Account"}
          </button>

          <div className="auth-card__divider"><span>or continue with</span></div>

          <div className="auth-card__socials">
            {["G", "⌘", "𝕏"].map((icon, i) => (
              <button key={i} className="auth-card__social-btn" type="button">
                {icon}
              </button>
            ))}
          </div>
        </div>

        <p className="auth-card__switch">
          {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
          <button className="auth-card__link" onClick={toggle}>
            {isLogin ? "Register" : "Sign in"}
          </button>
        </p>
      </div>
    </div>
  );
};

export default AuthPage;
