# Solace Robotics Training Pipelines

This folder contains the first execution target for Solace Robotics:

**Goal:** No-teleop `move_blue_ball_v1` training pipeline (ALOHA in simulation).

## First-goal acceptance criteria

- `>= 80%` success on standard eval seeds
- `>= 60%` success on hard randomized seeds
- Generated benchmark report + demo clip artifacts

## Pipeline stages

1. **Teacher data generation** (`scripts/generate_teacher_data.py`)
   - Uses privileged-state/scripting control in sim
   - Produces trajectories + language instructions

2. **VLA student training (bootstrap)** (`scripts/train_vla_student.py`)
   - Trains student from generated teacher trajectories
   - Tracks training metadata and checkpoints

3. **RL refinement** (`scripts/rl_refine_student.py`)
   - Refines the student with randomized environments
   - Focuses on recovery + robustness

4. **Evaluation** (`scripts/run_eval.py`)
   - Runs standard + hard benchmark seeds
   - Outputs score JSON and summary markdown

## Quickstart

```bash
cd pipelines
python3 scripts/generate_teacher_data.py --config configs/base_il.yaml
python3 scripts/train_vla_student.py --config configs/base_il.yaml
python3 scripts/rl_refine_student.py --config configs/rl_refine.yaml
python3 scripts/run_eval.py --config configs/eval.yaml
```

> Current scripts are production scaffolds with structured I/O and placeholders where simulator/training backends plug in.

## First custom task: `sort_blue_red_v1`

Language-conditioned ALOHA sorting task:
- Blue ball -> left bin
- Red cube -> right bin

Run the scaffold pipeline for this task:

```bash
cd pipelines
python3 scripts/generate_teacher_data.py --config configs/sort_blue_red_base_il.yaml
python3 scripts/train_vla_student.py --config configs/sort_blue_red_base_il.yaml
python3 scripts/rl_refine_student.py --config configs/sort_blue_red_rl_refine.yaml
python3 scripts/run_eval.py --config configs/sort_blue_red_eval.yaml
```
