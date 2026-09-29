import { check } from 'k6';
import exec from 'k6/execution';
import http from 'k6/http';

const BASE_URL = (__ENV.BASE_URL ?? 'https://camsuruptowngolf.vercel.app').replace(/\/$/, '');
const PROFILE = __ENV.CAPACITY_PROFILE ?? 'smoke';
const TARGET_RPS = positiveInteger('TARGET_RPS', 100);
const MAX_VUS = positiveInteger('MAX_VUS', 500);
const MAX_P95_MS = positiveInteger('MAX_P95_MS', 1_500);
const MAX_ERROR_RATE = positiveRate('MAX_ERROR_RATE', 0.01);
const RAMP_DURATION = duration('RAMP_DURATION', '1m');
const HOLD_DURATION = duration('HOLD_DURATION', '2m');

const PUBLIC_TARGET = !/^https?:\/\/(localhost|127\.0\.0\.1)(:\d+)?(?:\/|$)/i.test(BASE_URL);
if (PUBLIC_TARGET && __ENV.ALLOW_PRODUCTION_LOAD !== 'true') {
  throw new Error(
    'Public-target capacity testing is locked. Set ALLOW_PRODUCTION_LOAD=true only after confirming authorization, monitoring, and rollback contacts.',
  );
}

if (!['smoke', 'capacity'].includes(PROFILE)) {
  throw new Error('CAPACITY_PROFILE must be either "smoke" or "capacity".');
}

if (TARGET_RPS > 500 || MAX_VUS > 1_000) {
  throw new Error('Safety cap exceeded: TARGET_RPS must be <= 500 and MAX_VUS must be <= 1000.');
}

const ROUTES = [
  { path: '/', weight: 50 },
  { path: '/golf', weight: 15 },
  { path: '/packages', weight: 10 },
  { path: '/accommodations', weight: 10 },
  { path: '/contact', weight: 10 },
  { path: '/plan-your-visit', weight: 5 },
];

export const options = {
  discardResponseBodies: true,
  userAgent: 'camsur-capacity-test/1.0',
  scenarios: PROFILE === 'smoke' ? smokeScenario() : capacityScenario(),
  thresholds: {
    checks: [
      {
        threshold: `rate>${1 - MAX_ERROR_RATE}`,
        abortOnFail: true,
        delayAbortEval: '30s',
      },
    ],
    http_req_failed: [
      {
        threshold: `rate<${MAX_ERROR_RATE}`,
        abortOnFail: true,
        delayAbortEval: '30s',
      },
    ],
    http_req_duration: [
      {
        threshold: `p(95)<${MAX_P95_MS}`,
        abortOnFail: true,
        delayAbortEval: '30s',
      },
    ],
    dropped_iterations: [
      {
        threshold: 'count==0',
        abortOnFail: true,
        delayAbortEval: '30s',
      },
    ],
  },
  summaryTrendStats: ['avg', 'min', 'med', 'max', 'p(90)', 'p(95)', 'p(99)', 'count'],
};

export default function capacityRequest() {
  const route = selectRoute(exec.scenario.iterationInTest);
  const response = http.get(`${BASE_URL}${route.path}`, {
    redirects: 3,
    tags: { route: route.path },
    timeout: '15s',
  });

  check(
    response,
    {
      'status is 2xx or 3xx': (result) => result.status >= 200 && result.status < 400,
    },
    { route: route.path },
  );
}

function smokeScenario() {
  return {
    smoke: {
      executor: 'constant-arrival-rate',
      rate: 1,
      timeUnit: '1s',
      duration: '30s',
      preAllocatedVUs: 2,
      maxVUs: 5,
      gracefulStop: '10s',
    },
  };
}

function capacityScenario() {
  return {
    capacity: {
      executor: 'ramping-arrival-rate',
      startRate: Math.max(1, Math.ceil(TARGET_RPS * 0.05)),
      timeUnit: '1s',
      preAllocatedVUs: Math.min(50, MAX_VUS),
      maxVUs: MAX_VUS,
      gracefulStop: '30s',
      stages: [
        { duration: RAMP_DURATION, target: Math.ceil(TARGET_RPS * 0.1) },
        { duration: HOLD_DURATION, target: Math.ceil(TARGET_RPS * 0.1) },
        { duration: RAMP_DURATION, target: Math.ceil(TARGET_RPS * 0.25) },
        { duration: HOLD_DURATION, target: Math.ceil(TARGET_RPS * 0.25) },
        { duration: RAMP_DURATION, target: Math.ceil(TARGET_RPS * 0.5) },
        { duration: HOLD_DURATION, target: Math.ceil(TARGET_RPS * 0.5) },
        { duration: RAMP_DURATION, target: Math.ceil(TARGET_RPS * 0.75) },
        { duration: HOLD_DURATION, target: Math.ceil(TARGET_RPS * 0.75) },
        { duration: RAMP_DURATION, target: TARGET_RPS },
        { duration: HOLD_DURATION, target: TARGET_RPS },
        { duration: RAMP_DURATION, target: 0 },
      ],
    },
  };
}

function selectRoute(iteration) {
  const slot = iteration % 100;
  let upperBound = 0;

  for (const route of ROUTES) {
    upperBound += route.weight;
    if (slot < upperBound) return route;
  }

  return ROUTES[0];
}

function positiveInteger(name, fallback) {
  const value = Number.parseInt(__ENV[name] ?? String(fallback), 10);
  if (!Number.isInteger(value) || value <= 0) {
    throw new Error(`${name} must be a positive integer.`);
  }
  return value;
}

function positiveRate(name, fallback) {
  const value = Number.parseFloat(__ENV[name] ?? String(fallback));
  if (!Number.isFinite(value) || value <= 0 || value >= 1) {
    throw new Error(`${name} must be greater than 0 and less than 1.`);
  }
  return value;
}

function duration(name, fallback) {
  const value = __ENV[name] ?? fallback;
  if (!/^\d+(ms|s|m|h)$/.test(value)) {
    throw new Error(`${name} must be a k6 duration such as 30s, 2m, or 1h.`);
  }
  return value;
}
