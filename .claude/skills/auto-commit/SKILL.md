---
name: auto-commit
description: Commit changes automatically after edits to prevent data loss
---

After every file edit or creation, commit changes with a descriptive message:
```
git add -A && git commit -m "auto: <brief description of changes>"
```

If multiple files changed in one logical step, one commit is fine. Use messages that describe what was done, not just file names.
