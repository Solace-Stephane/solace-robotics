# First Custom Task — `sort_blue_red_v1`

## Objective
Deliver our first language-conditioned custom ALOHA task using the no-teleop pipeline:

- **Blue ball → left bin**
- **Red cube → right bin**

This is the first multi-object sorting benchmark after `move_blue_ball_v1`.

## Why this task
- Higher product relevance than single-object reaching
- Easy-to-understand success criterion for demos
- Strong base for follow-up tasks (command switching, clutter, distractors)

## Acceptance thresholds
- Standard eval success: **>= 80%**
- Hard randomized eval success: **>= 60%**

## Experiment schedule (initial)
1. **Bootstrap (IL)**
   - Config: `pipelines/configs/sort_blue_red_base_il.yaml`
   - Generate teacher trajectories and train VLA student scaffold

2. **RL refine**
   - Config: `pipelines/configs/sort_blue_red_rl_refine.yaml`
   - PPO residual refinement with curriculum weights

3. **Evaluation**
   - Config: `pipelines/configs/sort_blue_red_eval.yaml`
   - Fixed standard + hard seed suites

## Risks to monitor
- Object identity confusion (blue vs red under lighting shifts)
- Bin assignment swaps (left/right drift)
- Reward hacking near bin boundaries
- Instability in multi-object phase transitions

## Immediate next build
- Add instruction variants for swapped mapping task (blue right / red left)
- Add failure-cluster labels to report output schema
- Add side-by-side video comparison for baseline vs refined policy
