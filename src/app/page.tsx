const PROOF = [
  {
    title: "Data Quality Score",
    eq: "Q = w_s S + w_c C + w_t T + w_l L,   Σw_i = 1",
    note:
      "S=success consistency, C=contact-label correctness, T=temporal alignment, L=language-action alignment.",
  },
  {
    title: "Expected Value of Labeling",
    eq: "EV = Δp_success · V_task · N_episodes - C_labeling",
    note:
      "If EV > 0, the data-annotation program is economically justified.",
  },
  {
    title: "Off-policy Risk Gap",
    eq: "R(π) = E_{τ~π}[ℓ(τ)],   gap = R_real(π) - R_sim(π)",
    note:
      "Our objective is to reduce this gap using domain randomization and failure replay datasets.",
  },
];

const REFS = [
  {
    name: "OpenVLA",
    url: "https://openvla.github.io/",
    claim: "Open-source VLA report describing pretraining on Open X-Embodiment episodes.",
  },
  {
    name: "Open X-Embodiment / RT-X",
    url: "https://robotics-transformer-x.github.io/",
    claim: "Large multi-institution robot dataset and model effort.",
  },
  {
    name: "Action Chunking with Transformers (ACT)",
    url: "https://arxiv.org/abs/2304.13705",
    claim: "Sequence chunking for robust control from small demonstration sets.",
  },
  {
    name: "Diffusion Policy",
    url: "https://arxiv.org/abs/2303.04137",
    claim: "Action diffusion policy formulation with strong benchmark performance.",
  },
  {
    name: "π0: Our First Generalist Policy",
    url: "https://www.pi.website/blog/pi0",
    claim: "Generalist policy framing for language-conditioned physical intelligence.",
  },
];

export default function Home() {
  return (
    <main className="site mono">
      <header className="nav-wrap">
        <nav className="container nav" aria-label="Main navigation">
          <a href="#top" className="brand" aria-label="Solace Robotics Home">
            Solace Robotics
          </a>
          <div className="nav-links">
            <a href="#what">What we do</a>
            <a href="#why">Why now</a>
            <a href="#proof">Rigor</a>
            <a href="#references">References</a>
          </div>
        </nav>
      </header>

      <section id="top" className="container hero">
        <p className="eyebrow">Simulation-first robotics intelligence</p>
        <h1 className="hero-title typewriter">We build data engines for embodied AI.</h1>
        <p className="hero-copy">
          Solace Robotics helps teams train and evaluate robot policies with
          action-sequence datasets, benchmark suites, and failure analysis before large
          hardware deployments.
        </p>
        <div className="hero-cta" role="group" aria-label="Primary actions">
          <a className="btn btn-solid" href="#what">
            Explore offering
          </a>
          <a className="btn btn-outline" href="#references">
            View research basis
          </a>
        </div>
      </section>

      <section id="what" className="container section">
        <h2 className="section-title">What we do</h2>
        <div className="grid cards-3">
          <article className="card">
            <h3>Synthetic trajectory packs</h3>
            <p>
              Task-conditioned simulation trajectories with temporal labels, success
              states, and failure metadata.
            </p>
          </article>
          <article className="card">
            <h3>Action-sequence labeling</h3>
            <p>
              Phase boundaries, contact events, and language-action alignment for modern
              policy classes.
            </p>
          </article>
          <article className="card">
            <h3>Benchmark report cards</h3>
            <p>
              Reproducible policy scoring with robustness metrics, failure clusters, and
              retraining recommendations.
            </p>
          </article>
        </div>
      </section>

      <section id="why" className="container section section-soft">
        <h2 className="section-title">Why now</h2>
        <div className="grid cards-2">
          <article className="card">
            <h3>Model capability is rising faster than data quality</h3>
            <p>
              The frontier has moved to vision-language-action and sequence models. Data
              quality and evaluation rigor are now primary constraints.
            </p>
          </article>
          <article className="card">
            <h3>Simulation can compress product cycles</h3>
            <p>
              Teams can iterate policy behavior, diagnose failure regimes, and improve
              deployment confidence before expensive real-world rollouts.
            </p>
          </article>
        </div>
      </section>

      <section id="proof" className="container section">
        <h2 className="section-title">Mathematical rigor</h2>
        <div className="grid cards-3">
          {PROOF.map((item) => (
            <article key={item.title} className="card">
              <h3>{item.title}</h3>
              <p className="equation">{item.eq}</p>
              <p>{item.note}</p>
            </article>
          ))}
        </div>
      </section>

      <section id="references" className="container section">
        <h2 className="section-title">References</h2>
        <ul className="ref-list">
          {REFS.map((ref) => (
            <li key={ref.url}>
              <a href={ref.url} target="_blank" rel="noreferrer">
                {ref.name}
              </a>
              <span> — {ref.claim}</span>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
