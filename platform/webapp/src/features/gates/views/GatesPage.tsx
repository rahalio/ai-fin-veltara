import { FormEvent, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { gatesService } from "@/services/domains/gates";

export function GatesPage() {
  const qc = useQueryClient();
  const [recommendationId, setRecommendationId] = useState("");
  const [outcome, setOutcome] = useState<"pass" | "fail" | "override">("pass");
  const [reasons, setReasons] = useState("Fits profile risk band and hard-loss limit.");
  const [overrideJustification, setOverrideJustification] = useState("");
  const [secondApproverId, setSecondApproverId] = useState("");

  const list = useQuery({
    queryKey: ["gates"],
    queryFn: () => gatesService.list() as Promise<{ data?: { items?: any[] } }>,
  });

  const decide = useMutation({
    mutationFn: () =>
      gatesService.decide(
        { recommendationId },
        {
          outcome,
          reasons: reasons.split(";").map((s) => s.trim()).filter(Boolean),
          overrideJustification: outcome === "override" ? overrideJustification : undefined,
          secondApproverId: outcome === "override" ? secondApproverId : undefined,
        },
      ),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["gates"] }),
  });

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    decide.mutate();
  }

  return (
    <div style={{ display: "grid", gap: "1.25rem" }}>
      <header>
        <h1 style={{ margin: 0 }}>Advice gate & explanation</h1>
        <p className="muted">
          Pass / block suitability with client-grade explanation. Dual-control override for near-miss
          cases (BR-1, BR-3, BR-4).
        </p>
      </header>

      <form className="panel" onSubmit={onSubmit} style={{ padding: "1.25rem", display: "grid", gap: "0.75rem" }}>
        <label className="field">
          Recommendation id
          <input
            className="mono"
            value={recommendationId}
            onChange={(e) => setRecommendationId(e.target.value)}
            required
          />
        </label>
        <label className="field">
          Outcome
          <select
            value={outcome}
            onChange={(e) => setOutcome(e.target.value as "pass" | "fail" | "override")}
          >
            <option value="pass">Pass</option>
            <option value="fail">Block</option>
            <option value="override">Override (dual control)</option>
          </select>
        </label>
        <label className="field">
          Reasons
          <textarea value={reasons} onChange={(e) => setReasons(e.target.value)} rows={2} />
        </label>
        {outcome === "override" && (
          <>
            <label className="field">
              Override justification
              <textarea
                value={overrideJustification}
                onChange={(e) => setOverrideJustification(e.target.value)}
                rows={2}
                required
              />
            </label>
            <label className="field">
              Second approver id
              <input
                className="mono"
                value={secondApproverId}
                onChange={(e) => setSecondApproverId(e.target.value)}
                required
              />
            </label>
          </>
        )}
        <button
          className={`btn ${outcome === "pass" ? "btn-primary" : outcome === "fail" ? "btn-freeze" : "btn"}`}
          type="submit"
        >
          Record gate decision
        </button>
      </form>

      <section className="panel" style={{ padding: "1.25rem" }}>
        <h2 style={{ marginTop: 0 }}>Compliance backlog</h2>
        <table className="table">
          <thead>
            <tr>
              <th>Outcome</th>
              <th>Recommendation</th>
              <th>Reasons</th>
              <th>Id</th>
            </tr>
          </thead>
          <tbody>
            {(list.data?.data?.items ?? []).map((g: any) => (
              <tr key={g.id}>
                <td
                  style={{
                    color:
                      g.outcome === "pass"
                        ? "var(--color-champagne)"
                        : g.outcome === "fail"
                          ? "var(--color-freeze)"
                          : "var(--color-frost-ai)",
                  }}
                >
                  {g.outcome}
                </td>
                <td className="mono">{g.recommendationId}</td>
                <td>{(g.reasons ?? []).join("; ")}</td>
                <td className="mono">{g.id}</td>
              </tr>
            ))}
            {(list.data?.data?.items?.length ?? 0) === 0 && (
              <tr>
                <td colSpan={4} className="muted">
                  No gate decisions yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </section>
    </div>
  );
}
