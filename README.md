# Caelum Context Graph

Caelum Context Graph is a deterministic, local-only code-intelligence toolkit for Caelum Build repositories. It parses source with tree-sitter and builds a local graph that helps coding agents orient quickly, retrieve exact code, inspect API surfaces, and measure change blast radius without sending proprietary source to a remote service.

## Safety boundary

The executable product has no telemetry, provider keys, remote LLM mode, update checker, npm self-upgrade, `npx` fallback, or remote MCP launcher. Its visualization server binds to `127.0.0.1`. Installation and explicit Git operations may use the network; graph building and querying do not.

The repository retains the original MIT license and copyright notice. This Caelum-owned fork is derived from the Context Graph Engine project but does not depend on or contact its upstream repository at runtime.

## Useful commands

```bash
npm ci --ignore-scripts
npm run build
npm link

caelum-graph build /path/to/repository
caelum-graph ask "where is project authorization enforced?" /path/to/repository --source
caelum-graph skeleton apps/api/main.py /path/to/repository
caelum-graph callers create_award /path/to/repository --depth all
caelum-graph map /path/to/repository
caelum-graph check /path/to/repository
caelum-graph viz /path/to/repository
```

Use `caelum-graph --help` for the complete local command set.

## Caelum Build pilot

The pilot should generate the graph as a disposable local cache and add concise repository instructions telling Codex and Claude Code to use it for orientation, symbol retrieval, and blast-radius checks before broad source reads. Do not commit generated graph data unless the repository explicitly decides to version it.

## Verification

```bash
npm run build
node --import tsx --test test/local-only-policy.test.ts
```

The policy test prevents restoration of provider flags, upstream `npx` launching, npm upgrade checks, or postinstall behavior.
