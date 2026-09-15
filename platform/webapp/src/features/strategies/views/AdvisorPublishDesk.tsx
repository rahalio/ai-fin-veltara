import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { strategiesService } from "@/services/domains/strategies";
import { apiFetch } from "@/lib/api-client";

export function AdvisorPublishDesk() {
  const qc = useQueryClient();
  const list = useQuery({
    queryKey: ["strategies"],
    queryFn: () => strategiesService.list() as Promise<{ data?: { items?: any[] } }>,
  });

  const publish = useMutation({
    mutationFn: async ({ id, status, evidenceStatus }: { id: string; status: string; evidenceStatus: string }) => {
      await apiFetch(`/v1/strategies/${id}`, {
        method: "PATCH",
        body: JSON.stringify({ status, evidenceStatus }),
        headers: { "Idempotency-Key": crypto.randomUUID() },
      });
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["strategies"] }),
  });

  return (
    <div style={{ display: "grid", gap: "1.25rem" }}>
      <header>
        <h1 style={{ margin: 0 }}>Advisor publish desk</h1>
        <p className="muted">
          Review AI drafts, edit thesis/risk bounds, publish under license attestation (BR-4).
        </p>
      </header>

      <section className="panel" style={{ padding: "1.25rem", display: "grid", gap: "1rem" }}>
        {(list.data?.data?.items ?? []).map((s: any) => (
          <article
            key={s.id}
            style={{
              borderBottom: "1px solid color-mix(in srgb, var(--color-ink) 10%, transparent)",
              paddingBottom: "1rem",
              display: "grid",
              gap: "0.5rem",
            }}
          >
            <div style={{ display: "flex", gap: "0.75rem", alignItems: "center" }}>
              <h2 style={{ margin: 0, fontSize: "1.35rem" }}>{s.name}</h2>
              <span className={`plaque ${s.provenance}`}>{s.provenance}</span>
            </div>
            <p style={{ margin: 0 }}>{s.thesis || "No thesis yet — edit before client visibility."}</p>
            <div className="mono muted">{s.id}</div>
            <div style={{ display: "flex", gap: "0.5rem" }}>
              <button
                className="btn btn-primary"
                type="button"
                onClick={() =>
                  publish.mutate({ id: s.id, status: "published", evidenceStatus: "verified" })
                }
              >
                Approve & publish
              </button>
              <button
                className="btn"
                type="button"
                onClick={() =>
                  publish.mutate({ id: s.id, status: "draft", evidenceStatus: "rejected" })
                }
              >
                Reject
              </button>
            </div>
          </article>
        ))}
        {(list.data?.data?.items?.length ?? 0) === 0 && (
          <p className="muted">No AI drafts in queue. Strategies appear here after registry submit.</p>
        )}
      </section>
    </div>
  );
}
