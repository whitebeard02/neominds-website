/**
 * n8n webhook health check — run from project root:
 *   node scripts/test-n8n-webhook.mjs
 */

const N8N_WEBHOOK_URL =
  "https://whitebeard28.app.n8n.cloud/webhook/Neominds-leads";

const RESET = "\x1b[0m";
const GREEN = "\x1b[32m";
const RED = "\x1b[31m";
const YELLOW = "\x1b[33m";
const CYAN = "\x1b[36m";
const DIM = "\x1b[2m";

const tests = [
  {
    label: "Contact Form",
    payload: {
      name: "Test User",
      email: "test@test.com",
      phone: "+91 9876543210",
      service: "Web Development",
      budgetRange: "₹25,000 – ₹75,000",
      message: "Testing webhook flow.",
      source: "Contact Form",
      timestamp: new Date().toISOString(),
    },
  },
  {
    label: "NeoBOT",
    payload: {
      name: "Webhook Test User",
      email: "neobot-test@example.com",
      projectType: "Custom AI Projects",
      budgetRange: "₹1–5 lakhs",
      source: "NeoBOT",
      timestamp: new Date().toISOString(),
    },
  },
];

function statusColor(code) {
  if (code >= 200 && code < 300) return GREEN;
  if (code === 404) return YELLOW;
  return RED;
}

async function runTest({ label, payload }) {
  const started = performance.now();

  try {
    const response = await fetch(N8N_WEBHOOK_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const elapsed = Math.round(performance.now() - started);
    const body = await response.text();
    let parsed = body;
    try {
      parsed = JSON.stringify(JSON.parse(body), null, 2);
    } catch {
      /* keep raw text */
    }

    const ok = response.ok;
    const color = statusColor(response.status);

    console.log(`\n${CYAN}━━ ${label} ━━${RESET}`);
    console.log(`  URL      ${DIM}${N8N_WEBHOOK_URL}${RESET}`);
    console.log(`  Status   ${color}${response.status} ${response.statusText}${RESET}`);
    console.log(`  Time     ${elapsed}ms`);
    console.log(`  Result   ${ok ? `${GREEN}✓ WORKING${RESET}` : `${RED}✗ NOT WORKING${RESET}`}`);
    console.log(`  Body     ${DIM}${parsed.slice(0, 400)}${parsed.length > 400 ? "…" : ""}${RESET}`);

    if (response.status === 404) {
      console.log(
        `  ${YELLOW}Hint:${RESET} Activate the "Neominds-leads" workflow in n8n (production URL must be registered).`,
      );
    }

    return ok;
  } catch (error) {
    const elapsed = Math.round(performance.now() - started);
    console.log(`\n${CYAN}━━ ${label} ━━${RESET}`);
    console.log(`  URL      ${DIM}${N8N_WEBHOOK_URL}${RESET}`);
    console.log(`  Time     ${elapsed}ms`);
    console.log(`  Result   ${RED}✗ FAILED (network error)${RESET}`);
    console.log(`  Error    ${DIM}${error.message}${RESET}`);
    return false;
  }
}

console.log(`\n${CYAN}╔══════════════════════════════════════════╗${RESET}`);
console.log(`${CYAN}║   Neominds n8n Webhook — Terminal Test   ║${RESET}`);
console.log(`${CYAN}╚══════════════════════════════════════════╝${RESET}`);

const results = [];
for (const test of tests) {
  results.push(await runTest(test));
}

const passed = results.filter(Boolean).length;
const total = results.length;

console.log(`\n${CYAN}━━ Summary ━━${RESET}`);
if (passed === total) {
  console.log(`  ${GREEN}All ${total} webhook tests passed.${RESET} n8n is receiving requests.\n`);
  process.exit(0);
}

console.log(
  `  ${RED}${passed}/${total} tests passed.${RESET} Webhook is not fully working yet — check n8n workflow activation.\n`,
);
process.exit(1);
