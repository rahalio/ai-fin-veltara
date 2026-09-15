import { NavLink, Navigate, Route, Routes, useLocation } from "react-router-dom";
import { WealthOpsHome } from "@/features/platform/views/WealthOpsHome";
import { ProfilesPage } from "@/features/profiles/views/ProfilesPage";
import { StrategiesPage } from "@/features/strategies/views/StrategiesPage";
import { AdvisorPublishDesk } from "@/features/strategies/views/AdvisorPublishDesk";
import { RecommendationsPage } from "@/features/recommendations/views/RecommendationsPage";
import { GatesPage } from "@/features/gates/views/GatesPage";
import { MarketplacePage } from "@/features/marketplace/views/MarketplacePage";
import { FreezesPage } from "@/features/freezes/views/FreezesPage";
import { AuditPage } from "@/features/audit/views/AuditPage";

const nav = [
  { to: "/home", label: "Wealth ops" },
  { to: "/profiles", label: "Client profiles" },
  { to: "/strategies", label: "Strategy registry" },
  { to: "/advisor-desk", label: "Advisor publish" },
  { to: "/recommendations", label: "Recommendations" },
  { to: "/gates", label: "Advice gates" },
  { to: "/marketplace", label: "Marketplace" },
  { to: "/freezes", label: "Kill-switch" },
  { to: "/audit", label: "Advice audit" },
];

export function Shell() {
  const location = useLocation();
  if (location.pathname === "/") return <Navigate to="/home" replace />;

  return (
    <div style={{ display: "grid", gridTemplateColumns: "240px 1fr", minHeight: "100vh" }}>
      <aside
        className="panel"
        style={{
          borderRadius: 0,
          borderTop: "none",
          borderBottom: "none",
          borderLeft: "none",
          padding: "1.5rem 1rem",
          display: "flex",
          flexDirection: "column",
          gap: "1.5rem",
        }}
      >
        <div>
          <div className="brand" style={{ color: "var(--color-champagne)", fontSize: "1.75rem" }}>
            Veltara
          </div>
          <div className="muted" style={{ fontSize: "0.85rem", marginTop: 4 }}>
            Suitable advice. Not opaque feeds.
          </div>
        </div>
        <nav style={{ display: "grid", gap: "0.35rem" }}>
          {nav.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              style={({ isActive }) => ({
                padding: "0.55rem 0.7rem",
                borderRadius: "var(--radius-sm)",
                border: isActive
                  ? "1px solid color-mix(in srgb, var(--color-champagne) 55%, transparent)"
                  : "1px solid transparent",
                background: isActive
                  ? "color-mix(in srgb, var(--color-champagne) 12%, transparent)"
                  : "transparent",
              })}
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
      </aside>
      <main style={{ padding: "1.75rem 2rem" }}>
        <Routes>
          <Route path="/home" element={<WealthOpsHome />} />
          <Route path="/profiles" element={<ProfilesPage />} />
          <Route path="/strategies" element={<StrategiesPage />} />
          <Route path="/advisor-desk" element={<AdvisorPublishDesk />} />
          <Route path="/recommendations" element={<RecommendationsPage />} />
          <Route path="/gates" element={<GatesPage />} />
          <Route path="/marketplace" element={<MarketplacePage />} />
          <Route path="/freezes" element={<FreezesPage />} />
          <Route path="/audit" element={<AuditPage />} />
        </Routes>
      </main>
    </div>
  );
}
