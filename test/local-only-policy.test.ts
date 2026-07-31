import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

test("executable surface has no upstream or provider escape hatch", () => {
  const cli = readFileSync(new URL("../src/cli.ts", import.meta.url), "utf8");
  const mcp = readFileSync(new URL("../src/hosts/mcp-config.ts", import.meta.url), "utf8");
  const pkg = JSON.parse(readFileSync(new URL("../package.json", import.meta.url), "utf8"));

  for (const forbidden of ["--deep", "--api-key", "--base-url", ".command(\"upgrade\")", "getNpmViewVersion"]) {
    assert.equal(cli.includes(forbidden), false, `CLI restored forbidden capability: ${forbidden}`);
  }
  for (const forbidden of ["npx", "@nanonets/graft", "GRAFT_MCP_NPX"]) {
    assert.equal(mcp.includes(forbidden), false, `MCP restored upstream fallback: ${forbidden}`);
  }
  assert.equal(pkg.name, "@caelumbuild/context-graph");
  assert.equal(pkg.scripts.postinstall, undefined);
});
