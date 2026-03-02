#!/usr/bin/env python3
"""Run all scaffold pipeline stages in order for a given task.

Example:
    cd pipelines
    python3 scripts/run_task_pipeline.py \
        --base-il configs/tie_rope_knot_base_il.yaml \
        --rl-refine configs/tie_rope_knot_rl_refine.yaml \
        --eval configs/tie_rope_knot_eval.yaml
"""
from __future__ import annotations

import argparse
import subprocess
import sys
from pathlib import Path

from io_utils import load_yaml, now_iso, resolve_output, write_json

STAGES = [
    ("teacher_data_generation", "generate_teacher_data.py", "base_il"),
    ("vla_student_training", "train_vla_student.py", "base_il"),
    ("rl_refinement", "rl_refine_student.py", "rl_refine"),
    ("evaluation", "run_eval.py", "eval"),
]


def _run_stage(script: Path, config: Path) -> tuple[int, str]:
    """Run a pipeline stage script and return (returncode, stdout+stderr)."""
    result = subprocess.run(
        [sys.executable, str(script), "--config", str(config)],
        capture_output=True,
        text=True,
        cwd=str(script.parent.parent),  # pipelines/
    )
    output = result.stdout
    if result.stderr:
        output += result.stderr
    return result.returncode, output.strip()


def main() -> None:
    parser = argparse.ArgumentParser(
        description="Run all pipeline stages for a task in order.",
    )
    parser.add_argument("--base-il", required=True, help="Path to base IL config YAML")
    parser.add_argument("--rl-refine", required=True, help="Path to RL refine config YAML")
    parser.add_argument("--eval", required=True, help="Path to eval config YAML")
    args = parser.parse_args()

    scripts_dir = Path(__file__).resolve().parent
    config_map = {
        "base_il": Path(args.base_il).resolve(),
        "rl_refine": Path(args.rl_refine).resolve(),
        "eval": Path(args.eval).resolve(),
    }

    pipeline_start = now_iso()
    stage_results: list[dict] = []

    print(f"[{pipeline_start}] pipeline started")

    for stage_name, script_name, config_key in STAGES:
        config_path = config_map[config_key]
        script_path = scripts_dir / script_name
        stage_start = now_iso()

        print(f"[{stage_start}] {stage_name} — {script_name}")

        rc, output = _run_stage(script_path, config_path)
        stage_end = now_iso()

        cfg = load_yaml(str(config_path))
        out_dir = str(resolve_output(str(config_path), cfg["output_dir"]))

        stage_results.append({
            "stage": stage_name,
            "script": script_name,
            "config": str(config_path),
            "output_dir": out_dir,
            "started_at": stage_start,
            "finished_at": stage_end,
            "returncode": rc,
            "output": output,
        })

        if rc != 0:
            print(f"  FAILED (rc={rc}): {output}")
            break
        print(f"  done -> {out_dir}")

    pipeline_end = now_iso()

    # Write summary JSON into the eval output dir.
    eval_cfg = load_yaml(str(config_map["eval"]))
    eval_out = resolve_output(str(config_map["eval"]), eval_cfg["output_dir"])
    summary = {
        "pipeline": "run_task_pipeline",
        "started_at": pipeline_start,
        "finished_at": pipeline_end,
        "stages": stage_results,
        "success": all(s["returncode"] == 0 for s in stage_results),
    }
    write_json(eval_out / "pipeline_run_summary.json", summary)

    print(f"[{pipeline_end}] pipeline finished — success={summary['success']}")
    print(f"Summary: {eval_out / 'pipeline_run_summary.json'}")


if __name__ == "__main__":
    main()
