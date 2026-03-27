import { describe, it, expect } from "vitest";

const BASE = "http://localhost:3000";

describe("API /api/health (free)", () => {
  it("returns 200 with service info", async () => {
    const res = await fetch(`${BASE}/api/health`);
    expect(res.status).toBe(200);
    const body = await res.json();
    expect(body.status).toBe("healthy");
    expect(body.service).toBe("PayGate402");
  });
});

describe("API /api/weather (x402 paid)", () => {
  it("returns 402 without payment", async () => {
    const res = await fetch(`${BASE}/api/weather`);
    expect(res.status).toBe(402);
  });
});

describe("API /api/ai-summary (x402 paid)", () => {
  it("GET returns 402 without payment", async () => {
    const res = await fetch(`${BASE}/api/ai-summary`);
    expect(res.status).toBe(402);
  });

  it("POST returns 402 without payment", async () => {
    const res = await fetch(`${BASE}/api/ai-summary`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text: "hello world" }),
    });
    expect(res.status).toBe(402);
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
    const html = await (await fetch(`${BASE}/`)).text();
    expect(html).toContain("PayGate402");
    expect(html).toContain("Pay any API");
  });

  it("docs page contains Quick Start", async () => {
    const html = await (await fetch(`${BASE}/docs`)).text();
    expect(html).toContain("Quick Start");
    expect(html).toContain("@x402/next");
  });

  it("demo page contains 402", async () => {
    const html = await (await fetch(`${BASE}/demo`)).text();
    expect(html).toContain("402");
  });

  it("pricing page contains pricing tiers", async () => {
    const html = await (await fetch(`${BASE}/pricing`)).text();
    expect(html).toContain("Free");
    expect(html).toContain("Growth");
    expect(html).toContain("Enterprise");
  });

  it("homepage has theme toggle button", async () => {
    const html = await (await fetch(`${BASE}/`)).text();
    expect(html).toContain("theme-toggle");
  });
});

describe("No dead internal links", () => {
  it("all internal links from homepage resolve", async () => {
    const html = await (await fetch(`${BASE}/`)).text();
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
