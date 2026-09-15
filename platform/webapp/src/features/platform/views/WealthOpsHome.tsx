import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { strategiesService } from "@/services/domains/strategies";
import { freezesService } from "@/services/domains/freezes";
import { gatesService } from "@/services/domains/gates";

export function WealthOpsHome() {
  const strategies = useQuery({
    queryKey: ["strategies"],
    queryFn: () => strategiesService.list() as Promise<{ data?: { items?: unknown[] } }>,
  });
  const freezes = useQuery({
    queryKey: ["freezes"],
    queryFn: () => freezesService.list() as Promise<{ data?: { items?: unknown[] } }>,
  });
  const gates = useQuery({
    queryKey: ["gates"],
    queryFn: () => gatesService.list() as Promise<{ data?: { items?: unknown[] } }>,
  });

  const strategyCount = strategies.data?.data?.items?.length ?? 0;
  const freezeCount = freezes.data?.data?.items?.length ?? 0;
  const gateCount = gates.data?.data?.items?.length ?? 0;

  return (
    <div style={{ display: "grid", gap: "1.25rem" }}>
      <header>
        <div className="brand" style={{ color: "var(--color-champagne)", fontSize: "1.1rem" }}>
          Veltara
        </div>
        <h1 style={{ margin: "0.25rem 0" }}>Wealth ops home</h1>
        <p className="muted" style={{ marginTop: 0 }}>
          Governed AI advice throughput versus unmanaged copytrading risk — one composition for the
          head of digital wealth.
        </p>
      </header>

      <section
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
          gap: "1rem",
        }}
      >
        <Metric
          label="Published strategies"
          value={String(strategyCount)}
          hint="Registry under provenance plaques"
        />
        <Metric
          label="Gate backlog"
          value={String(gateCount)}
          hint="Suitability decisions recorded"
        />
        <Metric
          label="Active freezes"
          value={String(freezeCount)}
          hint="Kill-switch MTTR measured in minutes"
          danger={freezeCount > 0}
        />
      </section>

      <section className="panel" style={{ padding: "1.25rem", display: "grid", gap: "0.75rem" }}>
        <h2 style={{ margin: 0 }}>Today’s moves</h2>
        <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
          <Link className="btn" to="/gates">
            Open gates backlog
          </Link>
          <Link className="btn btn-freeze" to="/freezes">
            Open freezes
          </Link>
          <Link className="btn" to="/audit">
            Export period comparison
          </Link>
        </div>
        <p className="muted" style={{ margin: 0 }}>
          Alerts for concentration and stale Sharpe claims surface here once risk monitors are
          connected.
        </p>
      </section>
    </div>
  );
}

function Metric({
  label,
  value,
  hint,
  danger,
}: {
  label: string;
  value: string;
  hint: string;
  danger?: boolean;
}) {
  return (
    <div className="panel" style={{ padding: "1rem 1.1rem" }}>
      <div className="muted" style={{ fontSize: "0.85rem" }}>
        {label}
      </div>
      <div
        style={{
          fontFamily: "var(--font-display)",
          fontSize: "2rem",
          color: danger ? "var(--color-freeze)" : "var(--color-champagne)",
          margin: "0.25rem 0",
        }}
      >
        {value}
      </div>
      <div className="muted" style={{ fontSize: "0.85rem" }}>
        {hint}
      </div>
    </div>
  );
}
