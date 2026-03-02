import { SiteFooter } from "@/components/site-footer";
import { SiteNav } from "@/components/site-nav";
import { loadPilotSubmissions } from "@/lib/pilot-store";

export const dynamic = "force-dynamic";

export default async function PilotOpsPage() {
  const submissions = await loadPilotSubmissions();

  return (
    <main className="site mono">
      <SiteNav />

      <section className="container hero hero-compact">
        <p className="eyebrow">Internal ops</p>
        <h1 className="hero-title">Pilot submissions</h1>
        <p className="hero-copy">
          Internal queue view for pilot intake requests captured from /submit-model.
        </p>
      </section>

      <section className="container section">
        {submissions.length === 0 ? (
          <article className="card">
            <h3>No submissions yet</h3>
            <p>Once a lead form is submitted, entries appear here.</p>
          </article>
        ) : (
          <div className="grid cards-2">
            {submissions.map((submission, index) => (
              <article key={`${submission.email}-${index}`} className="card">
                <h3>{submission.company}</h3>
                <p>
                  {submission.name} · {submission.email}
                </p>
                <p>Robot stack: {submission.robotType}</p>
                <p>Submitted: {new Date(submission.createdAt).toLocaleString()}</p>
                <p>{submission.notes}</p>
              </article>
            ))}
          </div>
        )}
      </section>

      <SiteFooter />
    </main>
  );
}
