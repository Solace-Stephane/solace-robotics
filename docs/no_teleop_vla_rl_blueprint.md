# No-Teleop VLA + RL Blueprint (Move Blue Ball v1)

## Objective
Train a manipulation policy **without human teleoperation** by combining:
1. privileged-state teacher generation in simulation,
2. VLA student imitation bootstrap,
3. RL refinement under domain randomization.

## First milestone (14-day)
- Standard eval success: **>= 80%**
- Hard randomized eval success: **>= 60%**
- Reproducible artifacts: config, score JSON, summary markdown, demo clip manifest

## Core loop
1. Generate synthetic teacher trajectories at scale.
2. Train VLA student on image + instruction + action tuples.
3. RL-refine student for robustness and recovery.
4. Benchmark on fixed seed suites and publish report.
5. Mine failures and repeat.

## Mathematical framing

### Training objective
\[
\pi^* = \arg\max_\pi \mathbb{E}\left[\sum_t \gamma^t r_t\right]
\]

### Distillation objective
\[
\mathcal{L}_{distill} = \mathbb{E}\left[\lVert a_{student} - a_{teacher} \rVert_2^2\right]
\]

### Sim-to-real robustness objective
\[
\min_\pi \max_{\xi \in \Xi} \mathbb{E}_{\tau \sim p(\tau|\pi,\xi)}[\ell(\tau)]
\]
where \(\xi\) are randomized domain factors (lighting, textures, friction, latency, camera jitter).

## Risks to monitor
- mode collapse under sparse rewards,
- overfitting to synthetic visual priors,
- unstable policy switching between chunk boundaries,
- reward hacking around target proximity conditions.

## Execution notes
Pipeline scaffold lives under `pipelines/`.
Replace placeholders with simulator backend and training runtime.
