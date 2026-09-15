import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getApiKey, setApiKey } from "@/lib/api-client";

export function LoginPage() {
  const navigate = useNavigate();
  const [key, setKey] = useState(getApiKey());

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    setApiKey(key.trim());
    navigate("/home");
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "grid",
        placeItems: "center",
        padding: "2rem",
      }}
    >
      <form
        className="panel"
        onSubmit={onSubmit}
        style={{ width: "min(440px, 100%)", padding: "2rem", display: "grid", gap: "1rem" }}
      >
        <div>
          <div className="brand" style={{ color: "var(--color-champagne)", fontSize: "2.4rem" }}>
            Veltara
          </div>
          <h1 style={{ margin: "0.4rem 0 0", fontSize: "1.35rem" }}>
            Suitable advice. Not opaque feeds.
          </h1>
          <p className="muted" style={{ marginBottom: 0 }}>
            Advice-governance console for host brokers. Enter a tenant API key to continue.
          </p>
        </div>
        <label className="field">
          API key
          <input value={key} onChange={(e) => setKey(e.target.value)} />
        </label>
        <button className="btn btn-primary" type="submit">
          Enter console
        </button>
      </form>
    </div>
  );
}
