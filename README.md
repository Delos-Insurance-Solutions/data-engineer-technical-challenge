# Agent Feed Challenge

Two partners send us agent, agency, and license data. They describe overlapping
populations of the same people, on different schedules, in different shapes.
Converge them into one source of truth, then serve it.

## Setup

You need Docker, Node 24.18.0 or newer, and pnpm 12. The repo pins pnpm via
`packageManager`, so `corepack enable` will pick up the right version for you.

```bash
cp .env.example .env
docker compose up -d      # Postgres 15 on host port 55432
pnpm install
pnpm db:migrate
pnpm test
pnpm start                # then: curl localhost:3000/health
```

The scaffold is a minimal NestJS app with one working module (`/health`), Prisma
with the `pg` driver adapter, and Zod. There is one throwaway table so the
connection has something to prove itself against; delete it when you design your
own schema.

The eight feed files are in `fixtures/`. They arrive in batch order, which is the
order a real feed would deliver them in:

```
fixtures/partner-a-batch-1.json  …  partner-a-batch-4.json
fixtures/partner-b-batch-1.csv   …  partner-b-batch-4.csv
```

## The task

Three things to hand back. All three exist as stubs that currently fail.

### 1. `pnpm ingest <partner> <file>`

```bash
pnpm ingest partner-a fixtures/partner-a-batch-1.json
```

Loads one file into the database. It must be idempotent and resumable: running
all eight files in order, and then running all eight again, has to leave the
database in the same state as the first pass. It also has to survive being killed
partway through a file.

Stub: `src/cli/ingest.ts`.

### 2. `pnpm report`

A reconciliation report over whatever you have loaded: what went in, what came
out, and what did not line up. What it counts is your call, and what you choose
to count is part of what we read.

Stub: `src/cli/report.ts`.

### 3. `GET /agents/:npn`

Returns the reconciled agent, with their licenses and their agency.
Authenticated with a static key read from `API_KEY`.

Assume the caller is outside the company — a partner's integration, not another
one of our services.

Stub: `src/agents/agents.controller.ts`.

## What we're looking for

- **Judgment you can point at.** Keys, constraints, and nullability chosen for a
  reason you can state, rather than inherited from whatever the file happened to
  contain.
- **A pipeline you would be willing to run unattended.** We will kill it partway
  through and run it again.
- **A design that survives a third partner.** Assume `PARTNER_C` starts next
  month with its own column names and its own vocabulary.
- **Decisions written down.** `DECISIONS.md` is the deliverable we read first.

## What we're not grading

- NestJS idiom. We scaffolded it; we do not grade it, and you do not need to know
  the framework well.
- Test coverage, as long as `DECISIONS.md` says what you would have tested and
  why you stopped where you did.
- Choosing the simpler design on purpose, if you say why you chose it.

## A note on the data

This data is representative of real partner feeds. We have not cleaned it.

The records themselves are synthetic — generated for this exercise, not sampled
from anything of ours.

## `DECISIONS.md`

Required back, and capped at one page. There is a template in the repo. It should
cover:

- The assumptions you made, and what you would have asked us if you had the time.
- The tradeoffs you took, and what you gave up taking them.
- Anything you noticed about the data.
- What you would do next with another day.

We read this before we read the code, and it sets the agenda for the live
session.

## Using AI

Use whatever assistants you normally use. We assume you will, we do not ask about
it, and it does not count against you.

What it buys you is limited, though, and you should plan for that. The live
session is 45 minutes walking through your own code, with your assistant closed
for most of it, followed by 15 minutes of discussion. You will be asked why a
particular line is the way it is. Submit code you can defend.

## How to submit

Clone this repository, do not fork it. Push to a private repository of your own invite us as collaborators.
Reach out to us to get the emails to invite to the repository.

Send us the link 24 hours before the live session.

We run your submission from a fresh clone, on a machine that is not yours: `git
clone`, `cp .env.example .env`, `docker compose up`, `pnpm install`, then your
three commands. If it needs a step that is not in your README, put it in your
README.

## Questions

Email them. Asking is not a penalty here, and we would rather answer than have you guess. 
If you make an assumption instead, that is fine too — write it in `DECISIONS.md`.

## The live session

60 minutes, with two of us.

- **A walkthrough of your own code.** You drive, we ask why. Assistant closed.
- **A recovery scenario.** We kill your loader partway through a batch and ask
  you what the database contains and what happens on the next run.
- **A change to the requirements,** handed to you live, with your assistant open
  for that part.
- **15 minutes of discussion** — your work, your judgment, and your questions
  for us.

Have the repository cloned and running before we start.
