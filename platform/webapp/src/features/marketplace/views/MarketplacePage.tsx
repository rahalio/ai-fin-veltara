import { FormEvent, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { marketplaceService } from "@/services/domains/marketplace";

export function MarketplacePage() {
  const qc = useQueryClient();
  const [clientId, setClientId] = useState("cli_01HZYXK8J0M0W5N6P7Q8R9S0T1");
  const [strategyId, setStrategyId] = useState("");
  const [feeBps, setFeeBps] = useState("75");
  const [takeRateBps, setTakeRateBps] = useState("25");
  const [scope, setScope] = useState("Copy follow — ideas only; execution via host OMS");
  const [hardLossPct, setHardLossPct] = useState("10");

  const list = useQuery({
    queryKey: ["marketplace"],
    queryFn: () => marketplaceService.list() as Promise<{ data?: { items?: any[] } }>,
  });

  const create = useMutation({
    mutationFn: () =>
      marketplaceService.create({
        clientId,
        strategyId,
        feeBps: Number(feeBps),
        takeRateBps: Number(takeRateBps),
        scope,
        hardLossPct: Number(hardLossPct),
      }),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["marketplace"] }),
  });

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    create.mutate();
  }

  return (
    <div style={{ display: "grid", gap: "1.25rem" }}>
      <header>
        <h1 style={{ margin: 0 }}>Marketplace contracts</h1>
        <p className="muted">
          Auditable fees, disclosed take-rates, and copytrading scope (BR-6, BR-11). Suitability still
          applies.
        </p>
      </header>

      <form className="panel" onSubmit={onSubmit} style={{ padding: "1.25rem", display: "grid", gap: "0.75rem" }}>
        <label className="field">
          Client id
          <input className="mono" value={clientId} onChange={(e) => setClientId(e.target.value)} />
        </label>
        <label className="field">
          Strategy id
          <input className="mono" value={strategyId} onChange={(e) => setStrategyId(e.target.value)} required />
        </label>
        <label className="field">
          Fee (bps)
          <input value={feeBps} onChange={(e) => setFeeBps(e.target.value)} />
        </label>
        <label className="field">
          Take-rate (bps, disclosed)
          <input value={takeRateBps} onChange={(e) => setTakeRateBps(e.target.value)} />
        </label>
        <label className="field">
          Scope
          <input value={scope} onChange={(e) => setScope(e.target.value)} />
        </label>
        <label className="field">
          Hard loss %
          <input value={hardLossPct} onChange={(e) => setHardLossPct(e.target.value)} />
        </label>
        <button className="btn btn-primary" type="submit">
          Create contract
        </button>
      </form>

      <section className="panel" style={{ padding: "1.25rem" }}>
        <table className="table">
          <thead>
            <tr>
              <th>Client</th>
              <th>Strategy</th>
              <th>Fee / take-rate</th>
              <th>Scope</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {(list.data?.data?.items ?? []).map((c: any) => (
              <tr key={c.id}>
                <td className="mono">{c.clientId}</td>
                <td className="mono">{c.strategyId}</td>
                <td>
                  {c.feeBps} bps · take {c.takeRateBps} bps
                </td>
                <td>{c.scope}</td>
                <td>{c.status}</td>
              </tr>
            ))}
            {(list.data?.data?.items?.length ?? 0) === 0 && (
              <tr>
                <td colSpan={5} className="muted">
                  No contracts — undisclosed fees cannot activate.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </section>
    </div>
  );
}
