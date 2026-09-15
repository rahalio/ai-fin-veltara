import { FormEvent, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { profilesService } from "@/services/domains/profiles";

export function ProfilesPage() {
  const qc = useQueryClient();
  const [clientId, setClientId] = useState("cli_01HZYXK8J0M0W5N6P7Q8R9S0T1");
  const [riskScore, setRiskScore] = useState("45");
  const [horizonYears, setHorizonYears] = useState("7");
  const [hardLoss, setHardLoss] = useState("12");

  const policies = useQuery({
    queryKey: ["policies"],
    queryFn: () => profilesService.listPolicies() as Promise<{ data?: { items?: any[] } }>,
  });

  const upsert = useMutation({
    mutationFn: () =>
      profilesService.upsertProfile(
        { clientId },
        {
          riskScore: Number(riskScore),
          horizonYears: Number(horizonYears),
          hardLossLimitPct: Number(hardLoss),
          status: "active",
        },
      ),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["policies"] }),
  });

  const createPolicy = useMutation({
    mutationFn: () =>
      profilesService.createPolicy({
        name: "Retail suitability pack",
        version: "2026.1",
        rulesSummary: "Block when riskScore exceeds policy max; require human gate for hybrid AI drafts.",
        maxRiskScore: 70,
        requireHumanGate: true,
        status: "active",
      }),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["policies"] }),
  });

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    upsert.mutate();
  }

  return (
    <div style={{ display: "grid", gap: "1.25rem" }}>
      <header>
        <h1 style={{ margin: 0 }}>Client risk profile</h1>
        <p className="muted">
          Record risk/reward bands and hard constraints used by suitability (BR-1). Missing profile
          blocks all recommendations.
        </p>
      </header>

      <form className="panel" onSubmit={onSubmit} style={{ padding: "1.25rem", display: "grid", gap: "0.85rem", maxWidth: 560 }}>
        <label className="field">
          Client id
          <input className="mono" value={clientId} onChange={(e) => setClientId(e.target.value)} />
        </label>
        <label className="field">
          Risk score
          <input value={riskScore} onChange={(e) => setRiskScore(e.target.value)} />
        </label>
        <label className="field">
          Horizon (years)
          <input value={horizonYears} onChange={(e) => setHorizonYears(e.target.value)} />
        </label>
        <label className="field">
          Hard loss limit %
          <input value={hardLoss} onChange={(e) => setHardLoss(e.target.value)} />
        </label>
        <button className="btn btn-primary" type="submit" disabled={upsert.isPending}>
          Update profile
        </button>
        {upsert.isSuccess && <div className="seal">Profile locked for matching.</div>}
        {upsert.isError && <div style={{ color: "var(--color-freeze)" }}>{String(upsert.error)}</div>}
      </form>

      <section className="panel" style={{ padding: "1.25rem" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <h2 style={{ margin: 0 }}>Suitability policies</h2>
          <button className="btn" type="button" onClick={() => createPolicy.mutate()}>
            Add policy pack
          </button>
        </div>
        <table className="table" style={{ marginTop: "0.75rem" }}>
          <thead>
            <tr>
              <th>Name</th>
              <th>Version</th>
              <th>Max risk</th>
              <th>Human gate</th>
            </tr>
          </thead>
          <tbody>
            {(policies.data?.data?.items ?? []).map((p: any) => (
              <tr key={p.id}>
                <td>{p.name}</td>
                <td className="mono">{p.version}</td>
                <td>{p.maxRiskScore ?? "—"}</td>
                <td>{p.requireHumanGate ? "required" : "optional"}</td>
              </tr>
            ))}
            {(policies.data?.data?.items?.length ?? 0) === 0 && (
              <tr>
                <td colSpan={4} className="muted">
                  No policy packs yet — create one to unlock gated matching.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </section>
    </div>
  );
}
