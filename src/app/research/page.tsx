import { SiteFooter } from "@/components/site-footer";
import { SiteNav } from "@/components/site-nav";

const REFERENCES = [
  {
    name: "OpenVLA: An Open-Source Vision-Language-Action Model",
    url: "https://openvla.github.io/",
  },
  {
    name: "Open X-Embodiment / RT-X",
    url: "https://robotics-transformer-x.github.io/",
  },
  {
    name: "Action Chunking with Transformers (arXiv:2304.13705)",
    url: "https://arxiv.org/abs/2304.13705",
  },
  {
    name: "Diffusion Policy (arXiv:2303.04137)",
    url: "https://arxiv.org/abs/2303.04137",
  },
  {
    name: "π0: Our First Generalist Policy",
    url: "https://www.pi.website/blog/pi0",
  },
];

export default function ResearchPage() {
  return (
    <main className="site mono">
      <SiteNav current="/research" />

      <section className="container hero hero-compact">
        <p className="eyebrow">Research basis</p>
        <h1 className="hero-title">Methodology rooted in modern policy literature.</h1>
        <p className="hero-copy">
          Our operating model is to connect action-sequence data quality to measurable
          deployment outcomes.
        </p>
      </section>

      <section className="container section">
        <h2 className="section-title">Formal objective</h2>
        <div className="grid cards-2">
          <article className="card">
            <h3>Quality objective</h3>
            <p className="equation">Q = w_s S + w_c C + w_t T + w_l L,   Σw_i = 1</p>
            <p>
              We measure consistency, contact correctness, temporal accuracy, and
              language-action alignment.
            </p>
          </article>
          <article className="card">
            <h3>Economic criterion</h3>
            <p className="equation">EV = Δp_success · V_task · N_episodes - C_labeling</p>
            <p>
              Data programs are accepted only when expected value remains positive under
              conservative assumptions.
            </p>
          </article>
        </div>
      </section>

      <section className="container section section-soft">
        <h2 className="section-title">References</h2>
        <ul className="ref-list">
          {REFERENCES.map((ref) => (
            <li key={ref.url}>
              <a href={ref.url} target="_blank" rel="noreferrer">
                {ref.name}
              </a>
            </li>
          ))}
        </ul>
      </section>

      <SiteFooter />
    </main>
  );
}
