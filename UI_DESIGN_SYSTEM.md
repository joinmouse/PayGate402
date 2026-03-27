# PayGate402 UI Design System
> Distilled from Linear, Vercel, shadcn/ui, Stripe, x402.org

## Core Principles
1. **Less is more** — 大量留白，信息密度低
2. **Subtle not flashy** — 不要浮夸的渐变，用微妙的光影
3. **Typography-first** — 字体层级清晰，大标题有气势
4. **Mono accents** — 大面积灰度 + 小面积高亮

## Color Tokens (Dark Theme)

### Backgrounds (从深到浅)
```
--bg-base:       #09090b    (页面底色，接近纯黑但不纯)
--bg-surface:    #111113    (卡片底色)
--bg-elevated:   #18181b    (悬浮元素)
--bg-overlay:    #1c1c1f    (弹窗)
```

### Borders (极低对比度)
```
--border-default:  rgba(255,255,255,0.06)
--border-hover:    rgba(255,255,255,0.1)
--border-active:   rgba(255,255,255,0.15)
```

### Text (4级层次)
```
--text-primary:    #fafafa      (标题)
--text-secondary:  #a1a1aa      (正文)
--text-tertiary:   #71717a      (辅助)
--text-quaternary: #52525b      (最弱)
```

### Accent (单一主色 + 语义色)
```
--accent:          #6366f1      (Indigo — 所有交互)
--accent-hover:    #818cf8
--success:         #22c55e
--warning:         #eab308
--error:           #ef4444
```

## Typography

### Font Stack
```
Sans:  "Inter", -apple-system, sans-serif
Mono:  "JetBrains Mono", "Fira Code", monospace
```

### Scale (rem-based)
```
Hero:     4.5rem / 700 / tracking: -0.04em / leading: 1.05
H1:       2.75rem / 700 / tracking: -0.03em
H2:       2rem / 600 / tracking: -0.02em
H3:       1.25rem / 600
Body:     0.9375rem / 400 / leading: 1.7 / color: text-secondary
Small:    0.8125rem / 400 / color: text-tertiary
Micro:    0.6875rem / 500 / uppercase / tracking: 0.1em / color: text-quaternary
```

### Key Rules
- 标题永远不要超过 font-bold (600-700)，不用 900/black
- Body text 用 400 weight + text-secondary 颜色，不要用 primary 白色
- 标签/badge 用 MICRO 样式（全大写+宽字间距）
- 代码用 mono 字体 + 0.8125rem

## Spacing System (8px base)

```
4px   — 图标与文字间距
8px   — 紧凑内边距
12px  — 列表项间距
16px  — 卡片内边距（小）
24px  — 卡片内边距（标准）
32px  — 区块间距
48px  — Section padding (mobile)
80px  — Section padding (desktop)
120px — Hero顶部留白
```

## Component Patterns

### Cards
```
bg: var(--bg-surface)
border: 1px solid var(--border-default)
border-radius: 16px
padding: 24px
hover: border-color → var(--border-hover)
transition: all 150ms ease
NO shadows by default, only on highlight cards
```

### Buttons
Primary:
```
bg: var(--accent) → hover: lighten 8%
text: white
padding: 12px 28px
border-radius: 12px
font-weight: 500
font-size: 0.875rem
shadow: 0 0 0 0 → hover: 0 4px 24px accent/25%
```

Secondary/Ghost:
```
bg: rgba(255,255,255,0.04) → hover: 0.07
border: 1px solid var(--border-default)
text: white
```

### Code Blocks
```
bg: #08080a
border: 1px solid var(--border-default)
border-radius: 16px
header: flex row with 3 dots (macOS style)
font: mono, 0.8125rem, line-height: 1.8
syntax colors:
  - keyword: #c084fc (purple-400)
  - string:  #34d399 (emerald-400)
  - function: #67e8f9 (cyan-300)
  - comment:  #3f3f46 (zinc-700)
  - default:  #d4d4d8 (zinc-300)
```

### Badges/Tags
```
font: MICRO style
padding: 4px 10px
border-radius: 6px
background: accent/8%
border: 1px solid accent/15%
color: accent-light
```

## Animation Guidelines

### DO
- Fade-in + slight translateY on scroll (framer-motion, once: true)
- Opacity transitions on hover: 150ms ease
- Subtle pulse on status indicators
- Staggered children animations (delay: index * 60ms)

### DON'T
- No bouncy springs
- No aurora/blob backgrounds (they look cheap)
- No rotating/spinning elements
- No parallax scrolling
- No text color transitions

## Layout

### Max-widths
```
Content:    max-w-3xl (prose/docs)
Cards:      max-w-5xl (pricing grid)
Full:       max-w-6xl (feature grids)
```

### Grid
```
Features:  3-column on lg, 2 on md, 1 on sm
Pricing:   3-column on md, 1 on sm
Steps:     4-column on md, 1 on sm
Code:      2-column on lg, 1 on sm
```

### Section Structure
```
<section className="py-20 md:py-28 px-6">
  <div className="max-w-6xl mx-auto">
    <!-- Section label: MICRO style -->
    <!-- Section title: H1 style, mb-4 -->
    <!-- Section desc: Body style, max-w-xl mx-auto, mb-16 -->
    <!-- Content grid -->
  </div>
</section>
```
