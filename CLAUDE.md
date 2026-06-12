## Układ repozytoriów (3 repo) — przeczytaj NAJPIERW

**Jesteś w repo: `zywa-roza` (apka-publiczna).**

Projekt „Żywa Róża" żyje w 3 repozytoriach:
- `rozer` (PRYWATNE) — planowanie: ADR, ROADMAP, PROGRESS, `docs/tasks/TASK_NNN.md`, recenzje. Źródło prawdy specyfikacji.
- `zywa-roza` (PUBLICZNE) — apka (GitHub Pages) + `src/core/` + `roze/*.json` (publiczny, tylko display-name).
- `zywa-roza-dane` (PRYWATNE) — pełne dane (telefony, nazwiska), cron SMS, Action wyprowadzająca public JSON.

**REGUŁA GRANICY (bezpieczeństwo):** telefony i pełne nazwiska istnieją WYŁĄCZNIE w `zywa-roza-dane`.
NIGDY nie commituj ich do `zywa-roza` (publiczne) ani `rozer`.

**Gdzie są zadania:** specyfikacje `TASK_NNN.md` leżą w repo `rozer` (https://github.com/dud3k/rozer), nie tutaj.
Przed kodowaniem przeczytaj przydzielony `TASK_NNN.md` z `rozer` oraz `docs/architecture/ADR_003_uklad-repozytoriow.md`.
