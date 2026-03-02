#!/usr/bin/env python3
from __future__ import annotations

import argparse

from io_utils import fake_checkpoint, load_yaml, now_iso, resolve_output, stage_header, write_json


def main() -> None:
    parser = argparse.ArgumentParser(description="Refine student with RL (scaffold).")
    parser.add_argument("--config", required=True, help="Path to RL refine config YAML")
    args = parser.parse_args()

    cfg = load_yaml(args.config)
    out = resolve_output(args.config, cfg["output_dir"])

    result = {
        "stage": "rl_refine",
        "run_name": cfg["run_name"],
        "created_at": now_iso(),
        "algorithm": cfg["algorithm"]["name"],
        "updates": cfg["training"]["updates"],
        "envs": cfg["training"]["envs"],
        "horizon": cfg["training"]["horizon"],
        "status": "scaffold_complete",
        "next": "Plug RL trainer and curriculum scheduler backend here.",
    }

    write_json(out / "rl_metrics.json", result)
    fake_checkpoint(out / "checkpoints" / "latest.pt", result)

    print(stage_header("rl_refine complete"))
    print(f"Wrote: {out / 'rl_metrics.json'}")


if __name__ == "__main__":
    main()
