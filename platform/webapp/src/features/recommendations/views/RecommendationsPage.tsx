import { FormEvent, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { recommendationsService } from "@/services/domains/recommendations";
import { strategiesService } from "@/services/domains/strategies";
import { Link } from "react-router-dom";

export function RecommendationsPage() {
  const qc = useQueryClient();
  const [clientId, setClientId] = useState("cli_01HZYXK8J0M0W5N6P7Q8R9S0T1");
  const [strategyId, setStrategyId] = useState("");
  const [explanation, setExplanation] = useState(
    "Thesis fits horizon and hard-loss band; factors include momentum and drawdown discipline.",
  );

  const strategies = useQuery({
    queryKey: ["strategies"],
    queryFn: () => strategiesService.list() as Promise<{ data?: { items?: any[] } }>,
  });

  const list = useQuery({
    queryKey: ["recommendations", clientId],
    queryFn: () =>
      recommendationsService.list({ clientId }) as Promise<{ data?: { items?: any[] } }>,
  });

  const create = useMutation({
    mutationFn: () =>
      recommendationsService.create(
        { clientId },
        {
          strategyId,
          matchReasons: ["risk band overlap", "horizon fit", "hard-loss compatible"],
          explanation,
          rankingScore: 0.82,
        },
      ),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["recommendations", clientId] }),
  });

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    create.mutate();
  }

  return (
    <div style={{ display: "grid", gap: "1.25rem" }}>
      <header>
        <h1 style={{ margin: 0 }}>Recommendation shortlist</h1>
        <p className="muted">
          Profile-aware ranking with supervisor-visible “why these three” (BR-1, BR-9).
        </p>
      </header>

      <form className="panel" onSubmit={onSubmit} style={{ padding: "1.25rem", display: "grid", gap: "0.75rem" }}>
        <label className="field">
          Client id
          <input className="mono" value={clientId} onChange={(e) => setClientId(e.target.value)} />
        </label>
        <label className="field">
          Strategy
          <select value={strategyId} onChange={(e) => setStrategyId(e.target.value)} required>
            <option value="">Select strategy</option>
            {(strategies.data?.data?.items ?? []).map((s: any) => (
              <option key={s.id} value={s.id}>
                {s.name}
              </option>
            ))}
          </select>
        </label>
        <label className="field">
          Client explanation
          <textarea value={explanation} onChange={(e) => setExplanation(e.target.value)} rows={3} />
        </label>
        <button className="btn btn-primary" type="submit">
          Generate shortlist item
        </button>
      </form>

      <section className="panel" style={{ padding: "1.25rem" }}>
        <table className="table">
          <thead>
            <tr>
              <th>Strategy</th>
              <th>Match reasons</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {(list.data?.data?.items ?? []).map((r: any) => (
              <tr key={r.id}>
                <td className="mono">{r.strategyId}</td>
                <td>{(r.matchReasons ?? []).join(" · ") || "—"}</td>
                <td>{r.status ?? "pending_gate"}</td>
                <td>
                  <Link className="btn" to="/gates">
                    Open gate
                  </Link>
                </td>
              </tr>
            ))}
            {(list.data?.data?.items?.length ?? 0) === 0 && (
              <tr>
                <td colSpan={4} className="muted">
                  No shortlist yet — match after profile is recorded.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </section>
    </div>
  );
}
