#!/usr/bin/env python3
from __future__ import annotations

import argparse

from io_utils import load_yaml, now_iso, resolve_output, stage_header, write_json, write_markdown


def main() -> None:
    parser = argparse.ArgumentParser(description="Run benchmark evaluation (scaffold).")
    parser.add_argument("--config", required=True, help="Path to eval config YAML")
    args = parser.parse_args()

    cfg = load_yaml(args.config)
    out = resolve_output(args.config, cfg["output_dir"])

    # Placeholder scores (replace with real evaluator output).
    standard_success = 0.0
    hard_success = 0.0

    scores = {
        "stage": "evaluation",
        "run_name": cfg["run_name"],
        "created_at": now_iso(),
        "standard_seeds": cfg["evaluation"]["standard_seeds"],
        "hard_seeds": cfg["evaluation"]["hard_seeds"],
        "standard_success_rate": standard_success,
        "hard_success_rate": hard_success,
        "acceptance": {
            "standard_success_rate_min": cfg["acceptance"]["standard_success_rate_min"],
            "hard_success_rate_min": cfg["acceptance"]["hard_success_rate_min"],
            "pass": False,
        },
        "status": "scaffold_complete",
        "next": "Plug evaluator backend and metrics aggregation here.",
    }

    write_json(out / "scores.json", scores)

    md = f"""# Benchmark Summary: {cfg['run_name']}

- Created: {scores['created_at']}
- Standard success: {standard_success:.1%}
- Hard success: {hard_success:.1%}
- Pass acceptance: {scores['acceptance']['pass']}

## Acceptance thresholds
- Standard >= {cfg['acceptance']['standard_success_rate_min']:.0%}
- Hard >= {cfg['acceptance']['hard_success_rate_min']:.0%}

## Notes
Scaffold output only. Replace with real evaluation metrics.
"""
    write_markdown(out / "summary.md", md)

    print(stage_header("evaluation complete"))
    print(f"Wrote: {out / 'scores.json'}")


if __name__ == "__main__":
    main()
