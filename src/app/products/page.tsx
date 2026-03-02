import Link from "next/link";

import { SiteFooter } from "@/components/site-footer";
import { SiteNav } from "@/components/site-nav";

const PACKAGES = [
  {
    name: "Starter",
    price: "$2.5k / month",
    bullets: [
      "Up to 5 benchmark tasks",
      "Weekly policy scorecard",
      "Failure cluster summaries",
    ],
  },
  {
    name: "Pro",
    price: "$7k / month",
    bullets: [
      "Up to 20 benchmark tasks",
      "Action-sequence label packs",
      "Hard-negative replay datasets",
    ],
  },
  {
    name: "Enterprise",
    price: "Custom",
    bullets: [
      "Private eval infra",
      "Custom simulation scenarios",
      "SLA + integration support",
    ],
  },
];

export default function ProductsPage() {
  return (
    <main className="site mono">
      <SiteNav current="/products" />

      <section className="container hero hero-compact">
        <p className="eyebrow">Offerings</p>
        <h1 className="hero-title">Products built for robotics policy teams.</h1>
        <p className="hero-copy">
          We provide simulation-native data and evaluation products that improve policy
          reliability before large hardware expenditure.
        </p>
      </section>

      <section className="container section">
        <h2 className="section-title">Packages</h2>
        <div className="grid cards-3">
          {PACKAGES.map((pkg) => (
            <article key={pkg.name} className="card">
              <h3>{pkg.name}</h3>
              <p className="price">{pkg.price}</p>
              <ul className="feature-list">
                {pkg.bullets.map((bullet) => (
                  <li key={bullet}>{bullet}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      <section className="container section section-soft">
        <h2 className="section-title">What ships each cycle</h2>
        <div className="grid cards-2">
          <article className="card">
            <h3>Data artifacts</h3>
            <p>
              Trajectory datasets, temporal labels, event tags, and split manifests for
              reproducible training and evaluation.
            </p>
          </article>
          <article className="card">
            <h3>Decision artifacts</h3>
            <p>
              Benchmark deltas, failure heatmaps, risk narrative, and prioritized retrain
              recommendations.
            </p>
          </article>
        </div>
      </section>

      <section className="container section">
        <div className="hero-cta">
          <Link className="btn btn-solid" href="/submit-model">
            Submit model for pilot
          </Link>
          <Link className="btn btn-outline" href="/research">
            Read methodology
          </Link>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
