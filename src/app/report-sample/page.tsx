import Link from "next/link";

import { SiteFooter } from "@/components/site-footer";
import { SiteNav } from "@/components/site-nav";

const METRICS = [
  { label: "Success rate", value: "72.4%", delta: "+11.2 pts" },
  { label: "Collision rate", value: "8.1%", delta: "-4.6 pts" },
  { label: "Recovery success", value: "63.0%", delta: "+14.1 pts" },
  { label: "Policy stability index", value: "0.87", delta: "+0.12" },
];

const FAILURES = [
  "Late grasp closure under occlusion",
  "Wrist overshoot at phase transition",
  "Unstable recovery branch after slip events",
];

const ACTIONS = [
  "Add 1.5k hard-negative trajectories focused on occluded grasping.",
  "Increase phase-boundary penalty around pre-grasp to contact transition.",
  "Retrain with failure replay pack and evaluate on unseen lighting seeds.",
];

export default function ReportSamplePage() {
  return (
    <main className="site mono">
      <SiteNav />

      <section className="container hero hero-compact">
        <p className="eyebrow">Sample deliverable</p>
        <h1 className="hero-title">Benchmark report preview.</h1>
        <p className="hero-copy">
          This is the report format delivered at the end of each evaluation cycle.
        </p>
      </section>

      <section className="container section">
        <h2 className="section-title">Headline metrics</h2>
        <div className="grid cards-2">
          {METRICS.map((metric) => (
            <article key={metric.label} className="card">
              <h3>{metric.label}</h3>
              <p className="price">{metric.value}</p>
              <p>{metric.delta} vs previous baseline</p>
            </article>
          ))}
        </div>
      </section>

      <section className="container section section-soft">
        <h2 className="section-title">Failure clusters</h2>
        <ul className="feature-list">
          {FAILURES.map((failure) => (
            <li key={failure}>{failure}</li>
          ))}
        </ul>
      </section>

      <section className="container section">
        <h2 className="section-title">Recommended next actions</h2>
        <ul className="feature-list">
          {ACTIONS.map((action) => (
            <li key={action}>{action}</li>
          ))}
        </ul>
        <div className="hero-cta">
          <Link href="/submit-model" className="btn btn-solid">
            Request this for my model
          </Link>
          <Link href="/products" className="btn btn-outline">
            Back to products
          </Link>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
