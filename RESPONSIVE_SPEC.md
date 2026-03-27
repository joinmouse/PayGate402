# Responsive Design Specification
> For all PayGate402 and future projects

## Core Philosophy

**Fluid, not fixed.** Content should smoothly scale with viewport, not jump between static widths.

---

## 1. Container Strategy

### WRONG: Fixed max-width (our old approach)
```html
<!-- Bad: 1280px max leaves huge gaps on 1920px+ screens -->
<div class="max-w-7xl mx-auto px-6">
```

### RIGHT: Fluid container with percentage padding
```html
<!-- Good: content always fills 88% of viewport, with max cap -->
<div class="mx-auto w-full max-w-[1400px] px-[6%]">
```

### Container width table

| Viewport | Padding each side | Content width |
|----------|------------------|---------------|
| 375px (iPhone) | 22px (6%) | 331px |
| 768px (iPad) | 46px (6%) | 676px |
| 1024px (small laptop) | 61px (6%) | 902px |
| 1280px (laptop) | 77px (6%) | 1126px |
| 1440px (desktop) | 86px (6%) | 1268px |
| 1920px (large) | 115px (6%) | 1400px (capped) |
| 2560px (ultrawide) | 115px + auto margin | 1400px (capped) |

**Key rule:** Use `px-[6%]` (percentage padding), NOT `px-6` (fixed 24px).

---

## 2. Fluid Typography (clamp)

Never use fixed font sizes. Use CSS `clamp()` for smooth scaling:

```
clamp(minimum, preferred, maximum)
```

### Typography scale

| Role | Mobile | Desktop | Tailwind |
|------|--------|---------|----------|
| Hero | 2.25rem (36px) | 4.5rem (72px) | `text-[clamp(2.25rem,5vw,4.5rem)]` |
| H2 | 1.5rem (24px) | 2.75rem (44px) | `text-[clamp(1.5rem,3vw,2.75rem)]` |
| H3 | 1.125rem (18px) | 1.25rem (20px) | `text-[clamp(1.125rem,1.5vw,1.25rem)]` |
| Body | 0.875rem (14px) | 0.9375rem (15px) | `text-[0.9375rem]` (stable) |
| Small | 0.8125rem (13px) | 0.8125rem (13px) | `text-[0.8125rem]` (stable) |
| Micro | 0.6875rem (11px) | 0.6875rem (11px) | `text-[0.6875rem]` (stable) |

---

## 3. Grid System

### Cards/Features grid
```html
<!-- Fluid: 1 col → 2 col → 3 col, auto-fill for wide screens -->
<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
```

### Steps (4 items)
```html
<div class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
```

### Code blocks (side by side)
```html
<div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
```

### Pricing (3 tier)
```html
<!-- Always 3-col on md+, NOT wrapped in a narrow max-w -->
<div class="grid grid-cols-1 md:grid-cols-3 gap-4">
```

**Key rule:** Grid containers should be as wide as the outer container. Do NOT nest a `max-w-5xl` inside `max-w-7xl`.

---

## 4. Breakpoints

| Name | Width | Target |
|------|-------|--------|
| (default) | 0px+ | Mobile phones |
| `sm` | 640px+ | Large phones / small tablets |
| `md` | 768px+ | Tablets |
| `lg` | 1024px+ | Laptops |
| `xl` | 1280px+ | Desktops |
| `2xl` | 1536px+ | Large monitors |

### Mobile-first rules
1. Write base styles for mobile (no prefix)
2. Add `sm:`, `md:`, `lg:` overrides for larger screens
3. Never use `max-md:` unless absolutely necessary

---

## 5. Spacing

### Section vertical padding
```
Mobile:  py-16 (64px)
Desktop: md:py-24 (96px)
```
NOT `py-20 md:py-28` — these values are odd and don't scale well.

### Section horizontal padding
```
All:     px-[6%]  (fluid, percentage-based)
```
NOT `px-6` (fixed 24px — too tight on large screens, too wide proportion on mobile).

### Card padding
```
Mobile:  p-5 (20px)
Desktop: md:p-6 (24px)
```

### Gap between cards
```
Standard: gap-4 (16px)
Loose:    gap-6 (24px) — for code blocks side by side
```

---

## 6. Common Patterns

### Full-width section with capped content
```html
<section class="py-16 md:py-24 px-[6%]">
  <div class="mx-auto max-w-[1400px]">
    <!-- Section label -->
    <p class="text-[0.6875rem] font-medium uppercase tracking-[0.15em] text-zinc-500 mb-3 text-center">
      Section Label
    </p>
    <!-- Section title with fluid type -->
    <h2 class="text-[clamp(1.5rem,3vw,2.75rem)] font-bold tracking-tight text-center mb-4">
      Section Title
    </h2>
    <!-- Grid content -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      ...
    </div>
  </div>
</section>
```

### Hero centering (narrow text, wide code)
```html
<section class="pt-28 md:pt-40 pb-16 md:pb-24 px-[6%]">
  <div class="mx-auto max-w-[1400px]">
    <div class="max-w-2xl mx-auto text-center">
      <h1>...</h1>
      <p>...</p>
      <buttons>...</buttons>
    </div>
    <!-- Code block can be wider than text -->
    <div class="max-w-3xl mx-auto mt-16">
      <code-block />
    </div>
  </div>
</section>
```

---

## 7. Anti-patterns (NEVER DO)

| Bad | Why | Good |
|-----|-----|------|
| `max-w-3xl` for main content | 768px is too narrow for any screen | `max-w-[1400px]` with `px-[6%]` |
| `px-6` everywhere | Fixed 24px doesn't scale | `px-[6%]` |
| Nested `max-w-5xl` inside `max-w-7xl` | Creates unnecessarily narrow content | One container, use grid for layout |
| `gap-px` or `gap-1` between cards | No breathing room | `gap-4` minimum |
| Fixed font size for hero | Tiny on mobile or wasted on desktop | `clamp()` |
| Only testing on 1440px | Misses mobile AND ultrawide | Test at 375px, 768px, 1440px, 1920px |

---

## 8. Testing Checklist

Before every deploy, verify at these widths:

- [ ] **375px** — iPhone SE: single column, readable text, no horizontal scroll
- [ ] **768px** — iPad: 2-column grids appear, nav adapts
- [ ] **1024px** — Laptop: 3-column grids, side-by-side code blocks
- [ ] **1440px** — Desktop: content well-proportioned, no excess whitespace
- [ ] **1920px** — Large: content capped at 1400px, centered, balanced margins
- [ ] **2560px** — Ultrawide: still looks intentional, not floating in space
