#!/usr/bin/env python3
"""Build a structured report from eval scores and pipeline artifacts.

Example:
    cd pipelines
    python3 scripts/build_task_report.py --eval-config configs/tie_rope_knot_eval.yaml
"""
from __future__ import annotations

import argparse
import json
from pathlib import Path

from io_utils import load_yaml, now_iso, resolve_output, write_json, write_markdown


def main() -> None:
    parser = argparse.ArgumentParser(
        description="Build report.md and report.json from eval artifacts.",
    )
    parser.add_argument("--eval-config", required=True, help="Path to eval config YAML")
    args = parser.parse_args()

    eval_cfg = load_yaml(args.eval_config)
    eval_out = resolve_output(args.eval_config, eval_cfg["output_dir"])

    # Load eval scores.
    scores_path = eval_out / "scores.json"
    if scores_path.exists():
        scores = json.loads(scores_path.read_text(encoding="utf-8"))
    else:
        scores = {}

    # Load pipeline run summary if available.
    summary_path = eval_out / "pipeline_run_summary.json"
    pipeline_summary = None
    if summary_path.exists():
        pipeline_summary = json.loads(summary_path.read_text(encoding="utf-8"))

    # Gather available artifact paths.
    artifacts_root = eval_out.parent  # e.g. artifacts/tie_rope_knot/
    artifact_files = sorted(str(p.relative_to(artifacts_root)) for p in artifacts_root.rglob("*") if p.is_file())

    run_name = eval_cfg["run_name"]
    std_rate = scores.get("standard_success_rate", "N/A")
    hard_rate = scores.get("hard_success_rate", "N/A")
    acceptance = scores.get("acceptance", {})
    passed = acceptance.get("pass", False)
    std_min = acceptance.get("standard_success_rate_min", "N/A")
    hard_min = acceptance.get("hard_success_rate_min", "N/A")

    # Build report.json
    report_data = {
        "report": "task_pipeline_report",
        "run_name": run_name,
        "created_at": now_iso(),
        "scores": {
            "standard_success_rate": std_rate,
            "hard_success_rate": hard_rate,
        },
        "acceptance": {
            "standard_min": std_min,
            "hard_min": hard_min,
            "pass": passed,
        },
        "pipeline": {
            "success": pipeline_summary["success"] if pipeline_summary else None,
            "started_at": pipeline_summary["started_at"] if pipeline_summary else None,
            "finished_at": pipeline_summary["finished_at"] if pipeline_summary else None,
            "stages": len(pipeline_summary["stages"]) if pipeline_summary else 0,
        },
        "artifacts": artifact_files,
    }
    write_json(eval_out / "report.json", report_data)

    # Build report.md
    def _pct(v: float | str) -> str:
        return f"{v:.1%}" if isinstance(v, (int, float)) else str(v)

    pipeline_section = ""
    if pipeline_summary:
        pipeline_section = f"""
## Pipeline run
- Success: {pipeline_summary['success']}
- Started: {pipeline_summary['started_at']}
- Finished: {pipeline_summary['finished_at']}
- Stages: {len(pipeline_summary['stages'])}
"""

    artifacts_list = "\n".join(f"- `{f}`" for f in artifact_files)

    md = f"""# Task Pipeline Report: {run_name}

- Generated: {report_data['created_at']}

## Eval scores
- Standard success rate: {_pct(std_rate)}
- Hard success rate: {_pct(hard_rate)}
- Acceptance pass: {passed}

## Acceptance thresholds
- Standard >= {_pct(std_min)}
- Hard >= {_pct(hard_min)}
{pipeline_section}
## Artifacts
{artifacts_list}
"""
    write_markdown(eval_out / "report.md", md)

    print(f"[{now_iso()}] report built")
    print(f"Wrote: {eval_out / 'report.json'}")
    print(f"Wrote: {eval_out / 'report.md'}")


if __name__ == "__main__":
    main()
