# Environment Placeholder — `tie_rope_knot_v1`

## Overview
This document defines the expected simulator features and API contract for the rope knot tying environment. No simulator backend is implemented yet — this serves as the specification for plugging in a real physics engine.

## Expected simulator features

### Deformable rope simulation
- Rope modeled as a chain of **32 rigid segments** connected by spring-damper joints
- Configurable parameters: length (0.30 m default), radius (0.004 m), stiffness (0.08–0.18), damping (0.05), friction (0.7–1.3)
- Self-collision detection between rope segments
- Rope-table and rope-gripper contact with friction

### ALOHA embodiment
- Dual-arm setup with 7-DOF ee_delta_plus_gripper action space per arm
- Gripper force feedback for grasp stability sensing
- Joint position, velocity, and gripper state observations

### Visual observations
- `front_rgb`: 480x640 front camera
- `wrist_rgb`: 480x640 wrist-mounted camera
- Both cameras support domain randomization (lighting, textures, jitter)

### Knot success detection
- Topological knot classifier checking overhand knot formation
- Proxy metrics: loop closure (boolean), knot quality (boolean), stability frame counter
- Success = all three constraints satisfied for 15 consecutive frames

## API contract

### `TieRopeKnotEnv`

```python
class TieRopeKnotEnv:
    """Gym-style environment for rope knot tying."""

    def __init__(self, config: dict) -> None:
        """
        Args:
            config: Parsed task spec + runtime config dict.
                    Must include 'objects.rope', 'workspace', 'actions',
                    'success', 'domain_randomization', 'curriculum'.
        """
        ...

    def reset(self, seed: int | None = None) -> dict:
        """Reset environment and return initial observation dict.

        Returns:
            obs: dict with keys 'front_rgb', 'wrist_rgb',
                 'joint_positions', 'joint_velocities',
                 'gripper_state', 'language_instruction'.
        """
        ...

    def step(self, action: np.ndarray) -> tuple[dict, float, bool, bool, dict]:
        """Execute action and return (obs, reward, terminated, truncated, info).

        Args:
            action: np.ndarray of shape (7,) — ee_delta (6) + gripper (1).

        Returns:
            obs: observation dict (same keys as reset).
            reward: float scalar from reward_terms.
            terminated: True if knot success criteria met.
            truncated: True if max steps exceeded.
            info: dict with 'knot_quality', 'loop_closure',
                  'stability_frame_count', 'rope_segment_positions'.
        """
        ...

    def set_curriculum_stage(self, stage: str) -> None:
        """Switch curriculum stage: 'easy', 'medium', or 'hard'."""
        ...

    @property
    def observation_space(self) -> gym.spaces.Dict:
        ...

    @property
    def action_space(self) -> gym.spaces.Box:
        ...
```

### Integration points
- **Teacher data generation**: privileged-state teacher policy receives full rope segment positions and computes scripted knot-tying trajectory.
- **VLA student training**: student receives only visual observations + language instruction.
- **RL refinement**: environment must support vectorized parallel instances (256 envs target).
- **Evaluation**: deterministic seeding via `reset(seed=...)` for reproducible benchmarks.

## Candidate simulator backends
| Backend | Deformable support | Vectorized | Notes |
|---|---|---|---|
| MuJoCo (Flex) | Yes (tendons/composites) | Via MJX | Best MuJoCo integration |
| NVIDIA Warp | Yes (particles/FEM) | Native GPU | High performance, newer API |
| NVIDIA Isaac Sim | Yes (PhysX 5) | Native GPU | Full-featured but heavyweight |
| PyBullet | Limited (soft body) | No | Simplest to prototype |

## Status
**Scaffold only** — no simulator backend is connected. All pipeline scripts produce placeholder outputs. Connect a real backend by implementing `TieRopeKnotEnv` following the API contract above.
