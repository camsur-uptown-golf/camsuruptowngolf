// QA Task 2 — full broken-link crawl using Linkinator.
// Usage: npm run links:crawl   (BASE_URL env overrides the default)
import { LinkChecker } from 'linkinator';

const BASE = process.env.BASE_URL ?? 'http://localhost:3000';

const checker = new LinkChecker();
let broken = 0;

checker.on('link', (result) => {
  if (result.state === 'BROKEN') {
    broken++;
    console.log(`BROKEN ${result.status ?? '—'}  ${result.url}  (from ${result.parent})`);
  }
});

console.log(`Crawling ${BASE} …`);
const result = await checker.check({
  path: BASE,
  recurse: true,
  concurrency: 25,
  // Skip external hosts that rate-limit bots; remove to check them too.
  linksToSkip: ['^tel:', '^mailto:'],
});

const total = result.links.length;
console.log(`\nChecked ${total} links — ${broken} broken.`);
process.exit(broken > 0 ? 1 : 0);
