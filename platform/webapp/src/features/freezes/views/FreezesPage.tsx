import { FormEvent, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { freezesService } from "@/services/domains/freezes";

export function FreezesPage() {
  const qc = useQueryClient();
  const [targetType, setTargetType] = useState<"strategy" | "advisor" | "model">("strategy");
  const [targetId, setTargetId] = useState("");
  const [reason, setReason] = useState("Stale Sharpe claim / concentration breach");

  const list = useQuery({
    queryKey: ["freezes"],
    queryFn: () => freezesService.list() as Promise<{ data?: { items?: any[] } }>,
  });

  const create = useMutation({
    mutationFn: () =>
      freezesService.create({
        targetType,
        targetId,
        reason,
      }),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["freezes"] }),
  });

  const lift = useMutation({
    mutationFn: (id: string) => freezesService.lift({ id }),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["freezes"] }),
  });

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    create.mutate();
  }

  return (
    <div style={{ display: "grid", gap: "1.25rem" }}>
      <header>
        <h1 style={{ margin: 0 }}>Kill-switch freezes</h1>
        <p className="muted">
          Suspend a strategy, advisor, or model firm-wide within minutes — no engineering ticket
          (BR-10).
        </p>
      </header>

      <form className="panel" onSubmit={onSubmit} style={{ padding: "1.25rem", display: "grid", gap: "0.75rem" }}>
        <label className="field">
          Target type
          <select
            value={targetType}
            onChange={(e) => setTargetType(e.target.value as "strategy" | "advisor" | "model")}
          >
            <option value="strategy">Strategy</option>
            <option value="advisor">Advisor</option>
            <option value="model">Model</option>
          </select>
        </label>
        <label className="field">
          Target id
          <input className="mono" value={targetId} onChange={(e) => setTargetId(e.target.value)} required />
        </label>
        <label className="field">
          Reason
          <textarea value={reason} onChange={(e) => setReason(e.target.value)} rows={2} />
        </label>
        <button className="btn btn-freeze" type="submit">
          Freeze now
        </button>
      </form>

      <section className="panel" style={{ padding: "1.25rem" }}>
        <table className="table">
          <thead>
            <tr>
              <th>Target</th>
              <th>Reason</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {(list.data?.data?.items ?? []).map((f: any) => (
              <tr key={f.id}>
                <td>
                  <div>{f.targetType}</div>
                  <div className="mono muted">{f.targetId}</div>
                </td>
                <td>{f.reason}</td>
                <td style={{ color: f.status === "active" ? "var(--color-freeze)" : "var(--color-ink)" }}>
                  {f.status}
                </td>
                <td>
                  {f.status === "active" && (
                    <button className="btn" type="button" onClick={() => lift.mutate(f.id)}>
                      Lift
                    </button>
                  )}
                </td>
              </tr>
            ))}
            {(list.data?.data?.items?.length ?? 0) === 0 && (
              <tr>
                <td colSpan={4} className="muted">
                  No active freezes.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </section>
    </div>
  );
}
