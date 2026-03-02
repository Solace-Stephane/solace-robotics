#!/usr/bin/env python3
from __future__ import annotations

import argparse

from io_utils import fake_checkpoint, load_yaml, now_iso, resolve_output, stage_header, write_json


def main() -> None:
    parser = argparse.ArgumentParser(description="Train VLA student from teacher trajectories (scaffold).")
    parser.add_argument("--config", required=True, help="Path to base IL config YAML")
    args = parser.parse_args()

    cfg = load_yaml(args.config)
    out = resolve_output(args.config, cfg["output_dir"])

    training = {
        "stage": "vla_student_training",
        "run_name": cfg["run_name"],
        "created_at": now_iso(),
        "architecture": cfg["model"]["architecture"],
        "action_head": cfg["model"]["action_head"],
        "steps": cfg["training"]["train_steps"],
        "batch_size": cfg["training"]["batch_size"],
        "learning_rate": cfg["training"]["learning_rate"],
        "status": "scaffold_complete",
        "next": "Plug trainer backend and dataset loader here.",
    }

    write_json(out / "train_metrics.json", training)
    fake_checkpoint(out / "checkpoints" / "latest.pt", training)

    print(stage_header("vla_student_training complete"))
    print(f"Wrote: {out / 'train_metrics.json'}")


if __name__ == "__main__":
    main()
