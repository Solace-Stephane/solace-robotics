# Solace Robotics — Research Notes (v1)

## Positioning
Simulation-first robotics data and evaluation company.

## Core thesis
The bottleneck for robust robot policies is high-quality temporal action data and consistent benchmark evaluation, not just model size.

## Sources checked
1. OpenVLA project page — https://openvla.github.io/
2. Open X-Embodiment / RT-X — https://robotics-transformer-x.github.io/
3. ACT paper (arXiv:2304.13705) — https://arxiv.org/abs/2304.13705
4. Diffusion Policy (arXiv:2303.04137) — https://arxiv.org/abs/2303.04137
5. π0 blog — https://www.pi.website/blog/pi0

## Mathematical framing

### 1) Data quality objective
Q = w_s S + w_c C + w_t T + w_l L, with Σw_i = 1.

Where:
- S: success-consistency across repeated task seeds
- C: contact/event label correctness
- T: temporal alignment (state-action lag correctness)
- L: language-action alignment score

### 2) Labeling ROI criterion
EV = Δp_success · V_task · N_episodes - C_labeling

Ship data operations only if EV > 0 under conservative Δp_success estimates.

### 3) Sim-to-real risk gap
R(π) = E_{τ~π}[ℓ(τ)], gap = R_real(π) - R_sim(π)

Mitigate gap by targeted randomization and failure replay datasets.

## Initial product components
- Synthetic trajectory packs (task-specific)
- Action-sequence labels (phase boundaries + failure taxonomy)
- Benchmark report card (success, robustness, failure clusters)
- Retraining pack (hard negatives + recovery trajectories)

## Notes
This is a strategy/engineering artifact, not legal/financial advice.
