---
name: auto-git-recovery
description: Automatically creates recovery commits during development. Small changes are batched together, while medium and large changes are committed individually using Conventional Commits best practices.
---

# Auto Git Recovery

## Purpose

Maintain a recoverable Git history throughout development while avoiding commit spam.

The goal is to:

- Prevent accidental loss of work
- Create meaningful checkpoints
- Keep Git history clean and understandable
- Follow Conventional Commits standards
- Automatically determine when to batch or split commits

---

# Core Rules

## Rule 1: Small Changes

### Examples

- Typo fixes
- Small UI tweaks
- Comment updates
- Variable renaming
- Minor refactoring
- Small CSS changes
- Configuration adjustments

### Action

Do NOT commit immediately.

Accumulate related small changes.

Create a single commit when:

- 2–3 small related changes are completed
- OR approximately 20–50 changed lines
- OR a small logical task is completed

### Example

Instead of:

```text
fix: typo in login form
fix: rename auth variable
style: update button spacing
```

Create:

```text
chore(recovery): batch minor login module improvements
```

---

## Rule 2: Medium Changes

### Examples

- New component
- New API endpoint
- New utility function
- Database migration
- Feature enhancement
- Authentication update

### Action

Commit immediately after completion.

Each medium-sized logical change gets its own commit.

### Examples

```text
feat(auth): add refresh token support

feat(users): implement profile update endpoint

fix(api): resolve pagination bug
```

---

## Rule 3: Large Changes

### Examples

- Major refactoring
- Multiple module updates
- New subsystem
- Architecture changes
- Feature spanning many files

### Action

Split work into logical checkpoints.

Never create one giant commit.

### Example

```text
refactor(api): extract service layer

feat(api): implement customer endpoints

test(api): add integration coverage
```

---

# Commit Message Standard

Always use Conventional Commits.

## Format

```text
type(scope): concise description
```

### Good Examples

```text
feat(auth): add password reset flow

fix(users): prevent duplicate email registration

refactor(database): simplify query builder

perf(search): optimize query execution

test(api): add customer endpoint tests

docs(readme): update setup instructions

chore(recovery): batch minor code cleanup
```

### Bad Examples

```text
update

changes

latest

final

test

wip

new code
```

---

# Commit Types

| Type | Usage |
|--------|--------|
| feat | New feature |
| fix | Bug fix |
| refactor | Code restructuring |
| perf | Performance improvement |
| test | Tests |
| docs | Documentation |
| build | Build-related changes |
| ci | CI/CD changes |
| chore | Maintenance tasks |
| style | Formatting only |

---

# Recovery Commit Naming

When the purpose is primarily creating a restore point:

```text
chore(recovery): batch minor dashboard updates

chore(recovery): checkpoint before payment integration

chore(recovery): save working state of onboarding flow

chore(recovery): batch authentication cleanup

chore(recovery): checkpoint before refactor
```

---

# Automatic Commit Decision Matrix

| Change Size | Action |
|-------------|---------|
| Tiny | Hold |
| Small | Batch |
| Medium | Commit Individually |
| Large | Split Into Multiple Commits |
| Critical Milestone | Commit Immediately |

---

# Batching Logic

## Hold Commit

When:

```text
1 small change completed
```

## Continue Holding

When:

```text
2 small related changes completed
```

## Create Commit

When:

```text
3 small related changes completed
```

OR

```text
20-50 changed lines reached
```

OR

```text
logical task completed
```

---

# Smart Scope Detection

Infer scope from changed files.

Examples:

```text
src/auth/*
→ auth

src/users/*
→ users

src/dashboard/*
→ dashboard

src/api/*
→ api

src/database/*
→ database

src/components/*
→ components
```

Examples:

```text
feat(auth): add social login support

fix(users): handle missing profile image

refactor(api): simplify validation middleware
```

---

# Pre-Commit Checklist

Before creating any commit:

1. Review staged changes.
2. Verify changes are logically grouped.
3. Ensure commit message accurately reflects changes.
4. Run tests when practical.
5. Verify build passes when practical.
6. Create commit.

---

# Security Rules

Never commit:

- .env files
- API keys
- Secrets
- Access tokens
- Private certificates
- Credentials

Always verify before committing.

---

# Git Commands

Review changes:

```bash
git diff
```

Review staged changes:

```bash
git diff --cached
```

Create commit:

```bash
git commit -m "type(scope): description"
```

---

# Examples of Ideal History

```text
feat(auth): add login endpoint

fix(auth): resolve password validation bug

chore(recovery): batch minor authentication cleanup

feat(users): implement profile management

refactor(users): extract validation utilities

test(users): add profile endpoint tests

feat(dashboard): create onboarding flow

chore(recovery): checkpoint before production deployment
```

---

# Ultimate Objective

Create a professional, recoverable, and maintainable Git history that:

- Minimizes work loss
- Avoids commit spam
- Preserves meaningful checkpoints
- Follows Conventional Commits
- Maintains one logical change per commit whenever possible
- Automatically batches only genuinely small changes
