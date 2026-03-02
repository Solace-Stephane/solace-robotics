#!/usr/bin/env python3
from __future__ import annotations

import argparse
from pathlib import Path

from io_utils import load_yaml, now_iso, resolve_output, stage_header, write_json


def main() -> None:
    parser = argparse.ArgumentParser(description="Generate teacher trajectories (scaffold).")
    parser.add_argument("--config", required=True, help="Path to base IL config YAML")
    args = parser.parse_args()

    cfg = load_yaml(args.config)
    out = resolve_output(args.config, cfg["output_dir"])

    episodes = int(cfg["teacher_data"]["episodes"])
    max_steps = int(cfg["teacher_data"]["max_steps_per_episode"])

    manifest = {
        "stage": "teacher_data_generation",
        "run_name": cfg["run_name"],
        "created_at": now_iso(),
        "episodes": episodes,
        "max_steps_per_episode": max_steps,
        "instruction_source": "task_spec templates",
        "status": "scaffold_complete",
        "next": "Plug simulator backend and privileged teacher policy in this stage.",
    }

    write_json(out / "teacher_data_manifest.json", manifest)
    print(stage_header("teacher_data_generation complete"))
    print(f"Wrote: {out / 'teacher_data_manifest.json'}")


if __name__ == "__main__":
    main()
