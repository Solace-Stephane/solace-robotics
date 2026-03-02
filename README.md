# Solace Robotics

Simulation-first robotics company prototype focused on:
- action-sequence data products
- benchmark-grade policy evaluation
- failure analysis and retraining recommendations

## Live product surfaces

- `/` — company landing page
- `/products` — package tiers + delivery model
- `/report-sample` — sample benchmark report output
- `/research` — methodology + references
- `/submit-model` — pilot intake form
- `/api/pilot` — pilot submission endpoint (logs requests server-side)
- `/api/sample-report` — sample report JSON endpoint

## Local development

```bash
npm install
npm run dev -- --hostname 0.0.0.0 --port 3010
```

Open http://localhost:3010

## Verification

```bash
npm run lint
npm run build
```

## Research notes

See: `docs/research-notes.md`

## No-teleop training blueprint

- Blueprint: `docs/no_teleop_vla_rl_blueprint.md`
- Pipeline scaffold: `pipelines/`

Run scaffold stages:

```bash
python3 -m venv .venv-pipelines
.venv-pipelines/bin/pip install -r pipelines/requirements.txt
.venv-pipelines/bin/python pipelines/scripts/generate_teacher_data.py --config pipelines/configs/base_il.yaml
.venv-pipelines/bin/python pipelines/scripts/train_vla_student.py --config pipelines/configs/base_il.yaml
.venv-pipelines/bin/python pipelines/scripts/rl_refine_student.py --config pipelines/configs/rl_refine.yaml
.venv-pipelines/bin/python pipelines/scripts/run_eval.py --config pipelines/configs/eval.yaml
```

## Product roadmap

See: `docs/product-roadmap.md`

## Repository

https://github.com/Solace-Stephane/solace-robotics
