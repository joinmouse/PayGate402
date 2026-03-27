import { describe, it, expect } from "vitest";

const BASE = "http://localhost:3000";

describe("API /api/health", () => {
  it("returns 200 with service info", async () => {
    const res = await fetch(`${BASE}/api/health`);
    expect(res.status).toBe(200);
    const body = await res.json();
    expect(body.status).toBe("healthy");
    expect(body.service).toBe("PayGate402");
    expect(body.endpoints.paid).toHaveLength(2);
  });
});

describe("API /api/weather", () => {
  it("returns 402 without payment header", async () => {
    const res = await fetch(`${BASE}/api/weather`);
    expect(res.status).toBe(402);
    const body = await res.json();
    expect(body.error).toBe("Payment Required");
    expect(body.payment.price).toBe("$0.001");
    expect(body.payment.token).toBe("USDC");
  });

  it("returns 200 with payment header", async () => {
    const res = await fetch(`${BASE}/api/weather`, {
      headers: { "x-payment": "demo-sig" },
    });
    expect(res.status).toBe(200);
    const body = await res.json();
    expect(body.city).toBeDefined();
    expect(body.temp).toBeDefined();
    expect(body.payment.status).toBe("settled");
  });
});

describe("API /api/ai-summary", () => {
  it("GET returns 402", async () => {
    const res = await fetch(`${BASE}/api/ai-summary`);
    expect(res.status).toBe(402);
  });

  it("POST without payment returns 402", async () => {
    const res = await fetch(`${BASE}/api/ai-summary`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text: "hello world" }),
    });
    expect(res.status).toBe(402);
  });

  it("POST with payment returns 200 + summary", async () => {
    const res = await fetch(`${BASE}/api/ai-summary`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-payment": "demo-sig",
      },
      body: JSON.stringify({ text: "AI agents can autonomously write code and deploy services on the blockchain" }),
    });
    expect(res.status).toBe(200);
    const body = await res.json();
    expect(body.summary).toBeDefined();
    expect(body.model).toBe("paygate402-summarizer-v1");
    expect(body.payment.status).toBe("settled");
  });
});

describe("Pages return 200", () => {
  const pages = ["/", "/demo", "/docs", "/pricing"];
  for (const path of pages) {
    it(`GET ${path} returns 200`, async () => {
      const res = await fetch(`${BASE}${path}`);
      expect(res.status).toBe(200);
      expect(res.headers.get("content-type")).toContain("text/html");
    });
  }
});

describe("Page content", () => {
  it("homepage contains PayGate402", async () => {
    const res = await fetch(`${BASE}/`);
    const html = await res.text();
    expect(html).toContain("PayGate402");
    expect(html).toContain("Pay any API");
  });

  it("docs page contains Quick Start", async () => {
    const res = await fetch(`${BASE}/docs`);
    const html = await res.text();
    expect(html).toContain("Quick Start");
    expect(html).toContain("@x402/next");
  });

  it("demo page contains 402", async () => {
    const res = await fetch(`${BASE}/demo`);
    const html = await res.text();
    expect(html).toContain("402");
    expect(html).toContain("Weather");
  });

  it("pricing page contains pricing tiers", async () => {
    const res = await fetch(`${BASE}/pricing`);
    const html = await res.text();
    expect(html).toContain("Free");
    expect(html).toContain("Growth");
    expect(html).toContain("Enterprise");
  });

  it("docs page has navigation links to home and demo", async () => {
    const res = await fetch(`${BASE}/docs`);
    const html = await res.text();
    expect(html).toContain('href="/"');
    expect(html).toContain('href="/demo"');
  });

  it("homepage has theme toggle button", async () => {
    const res = await fetch(`${BASE}/`);
    const html = await res.text();
    expect(html).toContain("theme-toggle");
  });
});

describe("No dead internal links", () => {
  it("all internal links from homepage resolve", async () => {
    const res = await fetch(`${BASE}/`);
    const html = await res.text();
    const linkRegex = /href="(\/[a-z][a-z0-9/-]*)"/g;
    const paths = new Set<string>();
    let match;
    while ((match = linkRegex.exec(html)) !== null) {
      paths.add(match[1]);
    }

    for (const path of paths) {
      const r = await fetch(`${BASE}${path}`);
      expect(r.status, `${path} should return 200`).toBe(200);
    }
  });
});
