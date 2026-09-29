import { performance } from 'node:perf_hooks';

const target = process.env.LOAD_URL ?? 'https://camsuruptowngolf.vercel.app/';
const requests = positiveInteger('LOAD_REQUESTS', 30);
const concurrency = positiveInteger('LOAD_CONCURRENCY', 5);
const timeoutMs = positiveInteger('LOAD_TIMEOUT_MS', 10_000);
const maxP95Ms = positiveInteger('LOAD_MAX_P95_MS', 3_000);

if (requests > 500 || concurrency > 20) {
  throw new Error('Safety limit exceeded: LOAD_REQUESTS must be <= 500 and LOAD_CONCURRENCY <= 20.');
}

const durations = [];
const statuses = new Map();
const errors = [];
let cursor = 0;
const startedAt = performance.now();

await Promise.all(
  Array.from({ length: Math.min(concurrency, requests) }, async () => {
    while (true) {
      const requestNumber = cursor++;
      if (requestNumber >= requests) return;

      const started = performance.now();
      try {
        const response = await fetch(target, {
          headers: { 'user-agent': 'camsur-qa-bounded-load-test/1.0' },
          redirect: 'follow',
          signal: AbortSignal.timeout(timeoutMs),
        });
        await response.arrayBuffer();
        durations.push(performance.now() - started);
        statuses.set(response.status, (statuses.get(response.status) ?? 0) + 1);
      } catch (error) {
        durations.push(performance.now() - started);
        errors.push(error instanceof Error ? error.message : String(error));
      }
    }
  }),
);

const elapsedMs = performance.now() - startedAt;
const sorted = [...durations].sort((a, b) => a - b);
const successful = [...statuses.entries()]
  .filter(([status]) => status >= 200 && status < 400)
  .reduce((sum, [, count]) => sum + count, 0);
const report = {
  target,
  requests,
  concurrency,
  successful,
  failed: requests - successful,
  statuses: Object.fromEntries([...statuses.entries()].sort(([a], [b]) => a - b)),
  durationMs: round(elapsedMs),
  requestsPerSecond: round((requests / elapsedMs) * 1_000),
  latencyMs: {
    min: round(sorted[0] ?? 0),
    p50: round(percentile(sorted, 0.5)),
    p95: round(percentile(sorted, 0.95)),
    p99: round(percentile(sorted, 0.99)),
    max: round(sorted.at(-1) ?? 0),
  },
  errors: errors.slice(0, 10),
  thresholds: { maxP95Ms, requiredSuccessRate: 1 },
};

console.log(JSON.stringify(report, null, 2));

if (successful !== requests || report.latencyMs.p95 > maxP95Ms) {
  process.exitCode = 1;
}

function positiveInteger(name, fallback) {
  const value = Number.parseInt(process.env[name] ?? String(fallback), 10);
  if (!Number.isInteger(value) || value <= 0) {
    throw new Error(`${name} must be a positive integer.`);
  }
  return value;
}

function percentile(values, ratio) {
  if (values.length === 0) return 0;
  return values[Math.min(values.length - 1, Math.ceil(values.length * ratio) - 1)];
}

function round(value) {
  return Math.round(value * 100) / 100;
}
