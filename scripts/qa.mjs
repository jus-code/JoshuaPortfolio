/** Dependency-free browser QA using an existing Chrome or Edge installation.
 * Run the site first, then: node scripts/qa.mjs [http://localhost:3000]
 * No browser or testing package is downloaded.
 */
import { spawn } from "node:child_process";
import { existsSync } from "node:fs";
import { mkdir, writeFile, mkdtemp, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import assert from "node:assert/strict";

const base = process.argv[2] || "http://localhost:3000";
const executable = process.env.BROWSER_PATH || [
  "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
  "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe",
  "/usr/bin/google-chrome", "/usr/bin/chromium", "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
].find(existsSync);
if (!executable) throw new Error("Set BROWSER_PATH to an existing Chrome or Edge installation.");
const approvedTemp = process.env.LOCALAPPDATA ? join(process.env.LOCALAPPDATA, "Temp", "opencode") : tmpdir();
const profile = await mkdtemp(join(existsSync(approvedTemp) ? approvedTemp : tmpdir(), "joshua-qa-"));
const port = 9227;
const child = spawn(executable, ["--headless=new", "--disable-gpu", "--hide-scrollbars", `--remote-debugging-port=${port}`, `--user-data-dir=${profile}`, "--no-first-run", "--no-default-browser-check", "about:blank"], { stdio: "ignore" });
let socket;
let nextId = 1;
const pending = new Map();
const errors = [];
const report = [];
const pause = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

function command(method, params = {}) {
  const id = nextId++;
  return new Promise((resolve, reject) => {
    const timer = setTimeout(() => { pending.delete(id); reject(new Error(`Timed out: ${method}`)); }, 30000);
    pending.set(id, { resolve, reject, timer });
    socket.send(JSON.stringify({ id, method, params }));
  });
}
async function evaluate(expression) {
  const result = await command("Runtime.evaluate", { expression, returnByValue: true, awaitPromise: true });
  if (result.exceptionDetails) throw new Error(JSON.stringify(result.exceptionDetails));
  return result.result.value;
}
async function screenshot(name, full = false) {
  const metrics = await command("Page.getLayoutMetrics");
  const clip = full ? { x: 0, y: 0, width: metrics.cssContentSize.width, height: metrics.cssContentSize.height, scale: 1 } : undefined;
  await command("Page.bringToFront");
  const image = await command("Page.captureScreenshot", { format: "png", fromSurface: true, captureBeyondViewport: full, ...(clip ? { clip } : {}) });
  await writeFile(join(".qa", name), Buffer.from(image.data, "base64"));
}

try {
  let pages;
  for (let attempt = 0; attempt < 60; attempt++) {
    try { pages = (await (await fetch(`http://localhost:${port}/json/list`)).json()).filter((target) => target.type === "page"); if (pages.length) break; } catch {}
    await pause(100);
  }
  if (!pages?.length) throw new Error("Existing browser could not start.");
  socket = new WebSocket(pages[0].webSocketDebuggerUrl);
  await new Promise((resolve, reject) => { socket.onopen = resolve; socket.onerror = reject; });
  socket.onmessage = (event) => {
    const message = JSON.parse(event.data);
    if (message.id && pending.has(message.id)) {
      const request = pending.get(message.id); pending.delete(message.id); clearTimeout(request.timer);
      if (message.error) request.reject(new Error(JSON.stringify(message.error))); else request.resolve(message.result);
    }
    if (message.method === "Runtime.exceptionThrown") errors.push(message.params.exceptionDetails);
    if (message.method === "Runtime.consoleAPICalled" && message.params.type === "error") errors.push(message.params.args.map((arg) => arg.value || arg.description).join(" "));
  };
  await command("Page.enable");
  await command("Runtime.enable");
  await command("Network.enable");
  await mkdir(".qa", { recursive: true });
  await command("Emulation.setDeviceMetricsOverride", { width: 1440, height: 1000, deviceScaleFactor: 1, mobile: false });
  await command("Page.navigate", { url: base });
  for (let attempt = 0; attempt < 100; attempt++) {
    if (await evaluate('document.readyState === "complete" && !!document.querySelector(".hero-name")')) break;
    await pause(100);
  }
  await evaluate("document.fonts.ready");
  await pause(1600);

  for (const width of [360, 390, 768, 1024, 1440, 1920]) {
    await command("Emulation.setDeviceMetricsOverride", { width, height: 1000, screenWidth: width, screenHeight: 1000, deviceScaleFactor: 1, mobile: width < 768 });
    await command("Emulation.setTouchEmulationEnabled", { enabled: width < 768 });
    await command("Page.navigate", { url: base });
    await pause(700);
    await evaluate("document.fonts.ready");
    await pause(1500);
    await evaluate("window.scrollTo({top:0,behavior:'instant'})");
    await pause(200);
    const layout = await evaluate(`({ width: innerWidth, scrollWidth: document.documentElement.scrollWidth, height: document.documentElement.scrollHeight, h1: document.querySelectorAll('h1').length, brokenAnchors: Array.from(document.querySelectorAll('a[href^="#"]')).filter(a => !document.getElementById(a.hash.slice(1))).map(a => a.hash), emptyButtons: Array.from(document.querySelectorAll('button')).filter(b => !b.textContent.trim() && !b.getAttribute('aria-label')).length })`);
    console.log(`Checking ${width}px: viewport ${layout.width}, document ${layout.scrollWidth}`);
    if (!process.env.SKIP_SCREENSHOTS) await screenshot(`hero-${width}.png`);
    if (layout.scrollWidth !== width) console.log(await evaluate(`Array.from(document.querySelectorAll('body *')).map(e=>({tag:e.tagName,cls:e.className,width:e.getBoundingClientRect().width,right:e.getBoundingClientRect().right})).filter(e=>e.right>${width}+1).slice(0,30)`));
    assert.equal(layout.scrollWidth, width, `Horizontal overflow at ${width}px: ${layout.scrollWidth}`);
    assert.equal(layout.h1, 1);
    assert.deepEqual(layout.brokenAnchors, []);
    assert.equal(layout.emptyButtons, 0);
    report.push({ viewport: width, ...layout });
    if (!process.env.SKIP_SCREENSHOTS && (width === 390 || width === 1440)) {
      await command("Emulation.setEmulatedMedia", { features: [{ name: "prefers-reduced-motion", value: "reduce" }] });
      await pause(100);
      await screenshot(`full-${width}.png`, true);
      await command("Emulation.setEmulatedMedia", { features: [{ name: "prefers-reduced-motion", value: "no-preference" }] });
    }
  }

  await evaluate(`document.querySelector('.filters button:nth-child(2)').click()`);
  await pause(150);
  assert.equal(await evaluate("document.querySelectorAll('.project').length"), 1, "AI filter");
  assert.equal(await evaluate("document.querySelector('.project h3').textContent"), "AI video production");
  await evaluate(`document.querySelector('.filters button:first-child').click()`);
  await pause(150);
  assert.equal(await evaluate("document.querySelectorAll('.project').length"), 4, "All filter");

  // Reveal again in both directions, but not while an element stays visible.
  const revealBounds = await evaluate("(() => { const r = document.querySelector('.work-intro').getBoundingClientRect(); return { top: r.top + scrollY, height: r.height }; })()");
  await evaluate(`window.scrollTo({top:${Math.max(0, revealBounds.top - 850)},behavior:'instant'})`);
  await pause(150);
  assert.equal(await evaluate("document.querySelector('.work-intro').getAnimations()[0]?.effect.getKeyframes()[0].transform"), "translateY(38px)", "Downward scroll reveal");
  await pause(1000);
  await evaluate("window.scrollBy({top:20,behavior:'instant'})");
  await pause(100);
  assert.equal(await evaluate("document.querySelector('.work-intro').getAnimations().length"), 0, "No repeated reveal while still visible");
  await evaluate(`window.scrollTo({top:${revealBounds.top + revealBounds.height + 150},behavior:'instant'})`);
  await pause(150);
  await evaluate(`window.scrollTo({top:${revealBounds.top + revealBounds.height - 100},behavior:'instant'})`);
  await pause(150);
  assert.equal(await evaluate("document.querySelector('.work-intro').getAnimations()[0]?.effect.getKeyframes()[0].transform"), "translateY(-28px)", "Upward scroll re-entry reveal");

  await evaluate(`document.getElementById('step-0').focus(); document.getElementById('step-0').dispatchEvent(new KeyboardEvent('keydown', {key:'ArrowRight', bubbles:true}))`);
  await pause(100);
  assert.equal(await evaluate("document.activeElement.id"), "step-1", "Keyboard tab navigation");
  assert.equal(await evaluate("document.querySelector('[role=tab][aria-selected=true]').textContent.includes('Prompt')"), true);
  await evaluate(`document.getElementById('step-1').dispatchEvent(new KeyboardEvent('keydown', {key:'End', bubbles:true}))`);
  await pause(100);
  assert.equal(await evaluate("document.activeElement.id"), "step-4", "End key selects last workflow tab");
  await evaluate(`document.getElementById('step-4').dispatchEvent(new KeyboardEvent('keydown', {key:'Home', bubbles:true}))`);
  await pause(100);
  assert.equal(await evaluate("document.activeElement.id"), "step-0", "Home key selects first workflow tab");
  await evaluate(`document.getElementById('step-4').click()`);
  await pause(100);
  assert.equal(await evaluate("document.querySelector('[role=tabpanel]').textContent.includes('Review / export')"), true);
  await evaluate(`document.getElementById('step-0').click()`);

  await evaluate(`document.querySelector('.service summary').click()`);
  assert.equal(await evaluate("document.querySelector('.service').open"), true, "Service disclosure");
  await evaluate(`document.querySelector('.service summary').click()`);
  await evaluate(`document.querySelector('.timeline-entry:nth-child(2) summary').click()`);

  await evaluate("window.scrollTo({top:500,behavior:'instant'})");
  await pause(100);
  assert.equal(await evaluate("document.querySelector('.navigation').classList.contains('is-scrolled')"), true, "Compact scrolling navigation");
  await evaluate("window.scrollTo({top:0,behavior:'instant'})");
  await pause(100);
  assert.equal(await evaluate("document.querySelector('.navigation').classList.contains('is-scrolled')"), false);
  assert.equal(await evaluate("document.querySelector('.timeline-entry:nth-child(2)').open"), true, "Timeline disclosure");
  await evaluate(`document.querySelector('.timeline-entry:nth-child(2) summary').click()`);

  await command("Emulation.setEmulatedMedia", { features: [{ name: "prefers-reduced-motion", value: "reduce" }] });
  await pause(100);
  assert.equal(await evaluate("getComputedStyle(document.querySelector('.marquee-track')).animationName"), "none");
  assert.equal(await evaluate("getComputedStyle(document.documentElement).scrollBehavior"), "auto");
  assert.equal(await evaluate("getComputedStyle(document.querySelector('.project-cursor')).display"), "none");

  const metadata = await evaluate(`({ title: document.title, description: document.querySelector('meta[name=description]')?.content, og: document.querySelector('meta[property="og:image"]')?.content, emailLinks: Array.from(document.querySelectorAll('a[href^="mailto:"]')).map(a => a.href), whatsapp: document.querySelector('a[href^="https://wa.me"]')?.href, imageCount: document.images.length })`);
  assert.equal(metadata.whatsapp, "https://wa.me/639934103557");
  assert.ok(metadata.emailLinks.every((href) => href === "mailto:aniban.joshuas@gmail.com"));
  assert.ok(metadata.description?.length > 50);
  assert.ok(metadata.og);
  for (const path of ["/", "/icon.svg", "/robots.txt", "/sitemap.xml", "/opengraph-image"]) {
    const response = await fetch(`${base}${path}`);
    assert.equal(response.status, 200, `${path} status`);
    if (path === "/opengraph-image") assert.equal(response.headers.get("content-type"), "image/png");
    await response.arrayBuffer();
  }
  assert.deepEqual(errors, [], "Browser errors");
  await writeFile(".qa/report.json", JSON.stringify({ passed: true, layouts: report, metadata, browserErrors: errors }, null, 2));
  console.log(JSON.stringify({ passed: true, widths: report.map((item) => item.viewport), checks: ["no horizontal overflow", "anchor links", "category filters", "bidirectional scroll reveals", "no reveal jitter", "workflow keyboard controls", "service and timeline disclosure", "reduced motion", "contact links", "metadata", "asset endpoints", "no browser errors"], screenshots: ".qa/", metadata }, null, 2));
} finally {
  if (socket?.readyState === WebSocket.OPEN) {
    try { await command("Browser.close"); } catch {}
    socket.close();
  }
  child.kill();
  // Only remove the unique temporary profile created by this script.
  await pause(250);
  await rm(profile, { recursive: true, force: true }).catch(() => {});
}
