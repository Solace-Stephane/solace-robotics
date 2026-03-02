# First Custom Task — `tie_rope_knot_v1`

## Objective
Deliver a deformable-object manipulation task for the no-teleop ALOHA pipeline:

- **Pick up a rope and tie a simple overhand knot**

This is the first deformable-object task after the rigid-body tasks (`move_blue_ball_v1`, `sort_blue_red_v1`).

## Why rope knot tying matters
- Deformable manipulation is a core gap in current robot learning — most benchmarks cover only rigid objects.
- Knot tying requires bimanual coordination, long-horizon planning, and fine-grained contact control — all critical for real-world utility.
- Demonstrable, intuitive success criterion for customer demos and investor presentations.
- Directly transferable to cable routing, surgical suturing, and textile handling use cases.

## Acceptance thresholds
- Standard eval success: **>= 80%**
- Hard randomized eval success: **>= 60%**
- Knot quality: overhand knot topology must be verified (loop closure + end pull-through)
- Stability: knot must hold for **>= 15 consecutive frames** without unraveling

## Experiment plan
1. **Bootstrap (IL)**
   - Config: `pipelines/configs/tie_rope_knot_base_il.yaml`
   - 10,000 teacher episodes at 500 max steps (longer horizon than rigid tasks)
   - Chunk size 20 to capture the extended manipulation sequence

2. **RL refine**
   - Config: `pipelines/configs/tie_rope_knot_rl_refine.yaml`
   - PPO residual with 6,000 updates, horizon 96
   - Curriculum: 50% easy / 30% medium / 20% hard

3. **Evaluation**
   - Config: `pipelines/configs/tie_rope_knot_eval.yaml`
   - 500 standard + 500 hard seeds
   - Failure cluster analysis and demo clip manifest

## Technical risks
- **Sim-to-real gap for deformables**: rope physics in simulation may not transfer well; plan to tune segment count, stiffness, and damping parameters against real rope behavior.
- **Knot topology detection**: automated success checking requires a robust topological knot classifier — initial scaffold uses proxy metrics (loop closure + stability frames).
- **Long horizon instability**: at 500 steps the policy may struggle with temporal credit assignment; chunk size 20 and higher RL horizon (96) mitigate this.
- **Bimanual coordination**: both ALOHA arms must coordinate precisely; reward shaping for loop formation and end-threading is critical.
- **Rope self-collision**: deformable segment collisions may cause simulation instability; segment count (32) and material damping (0.05) are tuned conservatively.
- **Reward hacking**: the policy may find degenerate "knot-like" configurations that pass proxy metrics; plan to add topological verification in evaluator backend.

## Immediate next builds
- Integrate a deformable-body simulator backend (MuJoCo Flex or NVIDIA Warp)
- Implement topological knot classifier for ground-truth success detection
- Add rope color and texture randomization to domain randomization suite
- Extend to more complex knots (figure-eight, reef knot) as follow-up tasks
