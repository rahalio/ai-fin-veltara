import { FormEvent, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { auditService } from "@/services/domains/audit";

export function AuditPage() {
  const qc = useQueryClient();
  const [clientId, setClientId] = useState("");
  const [from, setFrom] = useState(() => new Date(Date.now() - 30 * 864e5).toISOString().slice(0, 16));
  const [to, setTo] = useState(() => new Date().toISOString().slice(0, 16));

  const list = useQuery({
    queryKey: ["audit"],
    queryFn: () => auditService.list() as Promise<{ data?: { items?: any[] } }>,
  });

  const create = useMutation({
    mutationFn: () =>
      auditService.create({
        clientId: clientId || undefined,
        from: new Date(from).toISOString(),
        to: new Date(to).toISOString(),
      }),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["audit"] }),
  });

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    create.mutate();
  }

  return (
    <div style={{ display: "grid", gap: "1.25rem" }}>
      <header>
        <h1 style={{ margin: 0 }}>Advice audit export</h1>
        <p className="muted">
          Period pack tying client, profile, recommendation, gate outcome, and execution intent
          (BR-8).
        </p>
      </header>

      <form className="panel" onSubmit={onSubmit} style={{ padding: "1.25rem", display: "grid", gap: "0.75rem", maxWidth: 520 }}>
        <label className="field">
          Client id (optional)
          <input className="mono" value={clientId} onChange={(e) => setClientId(e.target.value)} />
        </label>
        <label className="field">
          From
          <input type="datetime-local" value={from} onChange={(e) => setFrom(e.target.value)} />
        </label>
        <label className="field">
          To
          <input type="datetime-local" value={to} onChange={(e) => setTo(e.target.value)} />
        </label>
        <button className="btn btn-primary" type="submit">
          Request export pack
        </button>
      </form>

      <section className="panel" style={{ padding: "1.25rem" }}>
        <table className="table">
          <thead>
            <tr>
              <th>Period</th>
              <th>Client</th>
              <th>Status</th>
              <th>Id</th>
            </tr>
          </thead>
          <tbody>
            {(list.data?.data?.items ?? []).map((a: any) => (
              <tr key={a.id}>
                <td className="mono">
                  {a.from} → {a.to}
                </td>
                <td className="mono">{a.clientId ?? "firm-wide"}</td>
                <td>{a.status}</td>
                <td className="mono">{a.id}</td>
              </tr>
            ))}
            {(list.data?.data?.items?.length ?? 0) === 0 && (
              <tr>
                <td colSpan={4} className="muted">
                  No exports yet — select a window for regulator sampling.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </section>
    </div>
  );
}
