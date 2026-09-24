import assert from "node:assert/strict";
import { test } from "node:test";
import { files, parseSums, render } from "./render.mjs";

const hex = (c) => c.repeat(64);
const sums = (v) =>
  Object.values(files(v))
    .map((name, i) => `${hex("abcd"[i])}  ${name}`)
    .join("\n");

test("renders the version and each file's checksum", () => {
  const { cask, formula } = render("1.2.3", parseSums(sums("1.2.3")));
  assert.match(cask, /version "1\.2\.3"/);
  assert.match(cask, new RegExp(`sha256 "${hex("a")}"`));
  assert.match(formula, /download\/v1\.2\.3\/teitunnel-cli_1\.2\.3_linux-x64\.tar\.gz"/);
  for (const c of "bcd") assert.match(formula, new RegExp(`sha256 "${hex(c)}"`));
});

test("refuses a release without one of the files", () => {
  const partial = parseSums(sums("1.2.3").split("\n").slice(1).join("\n"));
  assert.throws(() => render("1.2.3", partial), /Teitunnel_1\.2\.3_universal\.dmg is missing/);
});

test("refuses malformed input", () => {
  assert.throws(() => parseSums("not a checksum line"), /Unexpected line/);
  assert.throws(() => render("1.2", parseSums(sums("1.2"))), /Not a version/);
  assert.throws(() => render('1.0.0"; system "x', new Map()), /Not a version/);
});

test("accepts binary-mode lines and blank lines", () => {
  const map = parseSums(`\n${hex("e")} *a.zip\n\n`);
  assert.equal(map.get("a.zip"), hex("e"));
});
