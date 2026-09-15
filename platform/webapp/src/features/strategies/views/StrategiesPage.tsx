import { FormEvent, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { strategiesService } from "@/services/domains/strategies";

export function StrategiesPage() {
  const qc = useQueryClient();
  const [name, setName] = useState("");
  const [thesis, setThesis] = useState("");
  const [provenance, setProvenance] = useState<"ai" | "human" | "hybrid">("hybrid");
  const [sharpe, setSharpe] = useState("");

  const list = useQuery({
    queryKey: ["strategies"],
    queryFn: () => strategiesService.list() as Promise<{ data?: { items?: any[] } }>,
  });

  const create = useMutation({
    mutationFn: () =>
      strategiesService.create({
        name,
        thesis,
        provenance,
        sharpeClaim: sharpe ? Number(sharpe) : undefined,
        evidenceStatus: sharpe ? "unverified" : undefined,
      }),
    onSuccess: () => {
      setName("");
      setThesis("");
      setSharpe("");
      qc.invalidateQueries({ queryKey: ["strategies"] });
    },
  });

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    create.mutate();
  }

  return (
    <div style={{ display: "grid", gap: "1.25rem" }}>
      <header>
        <h1 style={{ margin: 0 }}>Strategy registry</h1>
        <p className="muted">
          AI / human / hybrid provenance with evidence seals. Unverifiable claims stay veiled (BR-2,
          BR-7).
        </p>
      </header>

      <form className="panel" onSubmit={onSubmit} style={{ padding: "1.25rem", display: "grid", gap: "0.75rem" }}>
        <label className="field">
          Name
          <input value={name} onChange={(e) => setName(e.target.value)} required />
        </label>
        <label className="field">
          Thesis
          <textarea value={thesis} onChange={(e) => setThesis(e.target.value)} rows={3} />
        </label>
        <label className="field">
          Provenance
          <select
            value={provenance}
            onChange={(e) => setProvenance(e.target.value as "ai" | "human" | "hybrid")}
          >
            <option value="ai">AI</option>
            <option value="human">Human</option>
            <option value="hybrid">Hybrid</option>
          </select>
        </label>
        <label className="field">
          Sharpe claim (optional)
          <input value={sharpe} onChange={(e) => setSharpe(e.target.value)} placeholder="Veiled until verified" />
        </label>
        <button className="btn btn-primary" type="submit">
          Submit strategy
        </button>
      </form>

      <section className="panel" style={{ padding: "1.25rem" }}>
        <table className="table">
          <thead>
            <tr>
              <th>Strategy</th>
              <th>Provenance</th>
              <th>Evidence</th>
              <th>Id</th>
            </tr>
          </thead>
          <tbody>
            {(list.data?.data?.items ?? []).map((s: any) => (
              <tr key={s.id}>
                <td>
                  <div style={{ fontFamily: "var(--font-display)", fontSize: "1.15rem" }}>{s.name}</div>
                  <div className="muted">{s.thesis}</div>
                </td>
                <td>
                  <span className={`plaque ${s.provenance}`}>{s.provenance}</span>
                </td>
                <td>
                  {s.evidenceStatus === "verified" ? (
                    <span className="seal">certified</span>
                  ) : (
                    <span className="veil">{s.evidenceStatus ?? "unverified"} · veiled</span>
                  )}
                </td>
                <td className="mono">{s.id}</td>
              </tr>
            ))}
            {(list.data?.data?.items?.length ?? 0) === 0 && (
              <tr>
                <td colSpan={4} className="muted">
                  Empty registry — connect profiles and submit the first strategy.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </section>
    </div>
  );
}
