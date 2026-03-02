from __future__ import annotations

import json
from datetime import datetime, timezone
from pathlib import Path
from typing import Any


def now_iso() -> str:
    return datetime.now(timezone.utc).isoformat()


def ensure_dir(path: str | Path) -> Path:
    p = Path(path)
    p.mkdir(parents=True, exist_ok=True)
    return p


def write_json(path: str | Path, payload: dict[str, Any]) -> None:
    path = Path(path)
    ensure_dir(path.parent)
    path.write_text(json.dumps(payload, indent=2), encoding="utf-8")


def write_markdown(path: str | Path, content: str) -> None:
    path = Path(path)
    ensure_dir(path.parent)
    path.write_text(content, encoding="utf-8")


def fake_checkpoint(path: str | Path, metadata: dict[str, Any]) -> None:
    path = Path(path)
    ensure_dir(path.parent)
    text = "# Placeholder checkpoint for scaffold runs\n" + json.dumps(metadata, indent=2)
    path.write_text(text, encoding="utf-8")


def resolve_output(config_path: str, output_dir: str) -> Path:
    cfg = Path(config_path).resolve()
    root = cfg.parent
    return (root / output_dir).resolve()


def load_yaml(path: str | Path) -> dict[str, Any]:
    import yaml  # type: ignore

    with open(path, "r", encoding="utf-8") as f:
        return yaml.safe_load(f)


def stage_header(name: str) -> str:
    return f"[{now_iso()}] {name}"
