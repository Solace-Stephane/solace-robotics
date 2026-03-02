import { LeadForm } from "@/components/lead-form";
import { SiteFooter } from "@/components/site-footer";
import { SiteNav } from "@/components/site-nav";

export default function SubmitModelPage() {
  return (
    <main className="site mono">
      <SiteNav current="/submit-model" />

      <section className="container hero hero-compact">
        <p className="eyebrow">Pilot intake</p>
        <h1 className="hero-title">Submit a model for benchmark and failure analysis.</h1>
        <p className="hero-copy">
          Share your stack and target outcomes. We return a scoped pilot plan with
          benchmark tasks, data requirements, and delivery timeline.
        </p>
      </section>

      <section className="container section">
        <div className="grid cards-2">
          <article className="card">
            <h3>What you get</h3>
            <ul className="feature-list">
              <li>Task suite proposal</li>
              <li>Evaluation metric plan</li>
              <li>Risk and failure taxonomy</li>
              <li>Pilot timeline and milestones</li>
            </ul>
          </article>
          <article className="card">
            <h3>Submit details</h3>
            <LeadForm />
          </article>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
