# Sleep Calculator Site — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a full-stack sleep calculator website at thesleepcalculator.co with three calculator tools, a Supabase-powered blog, a minimal `/admin` panel, full Schema.org SEO, dark/light mode, GA4 + Vercel Analytics, and deploy to Vercel.

**Architecture:** Next.js 14 App Router for SSR/SSG pages; Supabase PostgreSQL stores blog posts and handles admin auth; all three calculators run client-side with a shared sleep-science engine; SEO metadata is generated server-side per page using the Next.js `metadata` API.

**Tech Stack:** Next.js 14 (App Router), TypeScript, Tailwind CSS, Supabase (DB + Auth), TipTap (rich text editor), next-themes (dark/light toggle), Vercel Analytics, GA4.

## Global Constraints

- Node.js >= 18.17
- Next.js 14 with App Router (`app/` directory), NOT pages router
- TypeScript strict mode enabled
- Tailwind CSS for all styling — no inline styles, no CSS modules except where Tailwind cannot reach
- All Supabase keys stored in `.env.local`, never hardcoded
- All pages must score >= 90 on Lighthouse SEO
- Sleep cycle duration: 90 minutes; fall-asleep buffer: 14 minutes
- CDC sleep recommendations used for age-based guidance
- Dark mode default; `next-themes` for toggle; Tailwind `dark:` classes throughout
- Domain: `thesleepcalculator.co`
- Deploy target: Vercel free tier

---

## File Structure

```
sleepcalculator/
├── app/
│   ├── layout.tsx                  # Root layout: ThemeProvider, GA4 script, Vercel Analytics
│   ├── page.tsx                    # Home page: calculator + hero + SEO metadata
│   ├── blog/
│   │   ├── page.tsx                # Blog index: fetches posts from Supabase
│   │   └── [slug]/
│   │       └── page.tsx            # Blog post: SSG with generateStaticParams
│   ├── admin/
│   │   ├── layout.tsx              # Admin layout: auth guard
│   │   ├── page.tsx                # Admin dashboard: post list
│   │   ├── new/page.tsx            # New post form
│   │   └── edit/[id]/page.tsx      # Edit post form
│   ├── sitemap.ts                  # Dynamic sitemap including blog posts
│   └── robots.ts                   # robots.txt
├── components/
│   ├── calculator/
│   │   ├── SleepCalculator.tsx     # Tab container for all 3 tools
│   │   ├── WakeUpTab.tsx           # "What time should I wake up?" tab
│   │   ├── BedtimeTab.tsx          # "What time should I go to sleep?" tab
│   │   ├── DurationTab.tsx         # "How much sleep do I need?" tab
│   │   └── ResultCard.tsx          # Shared result display component
│   ├── blog/
│   │   ├── BlogCard.tsx            # Post preview card for index
│   │   └── BlogPost.tsx            # Rendered post content
│   ├── admin/
│   │   ├── PostForm.tsx            # Shared new/edit form with TipTap
│   │   └── LoginForm.tsx           # Supabase Auth email/password form
│   ├── seo/
│   │   ├── StructuredData.tsx      # JSON-LD script injector
│   │   └── BreadcrumbSchema.tsx    # BreadcrumbList schema component
│   ├── ThemeToggle.tsx             # Dark/light mode button
│   ├── Header.tsx                  # Site nav with ThemeToggle
│   └── Footer.tsx                  # Footer with links
├── lib/
│   ├── sleep-engine.ts             # Pure sleep science calculations
│   ├── supabase/
│   │   ├── client.ts               # Browser Supabase client
│   │   ├── server.ts               # Server Supabase client (SSR)
│   │   └── types.ts                # Database TypeScript types
│   └── seo/
│       ├── metadata.ts             # Shared metadata builders
│       └── schemas.ts              # Schema.org JSON-LD builders
├── public/
│   └── favicon.ico
├── .env.local                      # NEXT_PUBLIC_SUPABASE_URL, NEXT_PUBLIC_SUPABASE_ANON_KEY, SUPABASE_SERVICE_ROLE_KEY, NEXT_PUBLIC_GA_ID
├── tailwind.config.ts
├── next.config.ts
└── package.json
```

---

## Task 1: Project Scaffold + Tailwind + Dark Mode

**Files:**
- Create: `package.json`, `next.config.ts`, `tailwind.config.ts`, `tsconfig.json`
- Create: `app/layout.tsx`
- Create: `components/ThemeToggle.tsx`
- Create: `components/Header.tsx`
- Create: `components/Footer.tsx`
- Create: `.env.local` (template with placeholder values)

**Interfaces:**
- Produces: `ThemeToggle` component (no props); `Header` component (no props); `Footer` component (no props); root layout wrapping `{children}` with `ThemeProvider`

- [ ] **Step 1: Initialize Next.js project**

```bash
cd D:/Legacy/sleepcalculator
npx create-next-app@14 . --typescript --tailwind --eslint --app --src-dir=false --import-alias="@/*"
```

Expected: Project files created. Answer prompts: TypeScript=Yes, ESLint=Yes, Tailwind=Yes, src dir=No, App Router=Yes, import alias=`@/*`.

- [ ] **Step 2: Install additional dependencies**

```bash
npm install next-themes @supabase/supabase-js @supabase/ssr @tiptap/react @tiptap/pm @tiptap/starter-kit @tiptap/extension-link @tiptap/extension-image @vercel/analytics
npm install -D @types/node
```

Expected: All packages install without error.

- [ ] **Step 3: Configure Tailwind for dark mode**

Replace contents of `tailwind.config.ts`:

```typescript
import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        midnight: {
          50: "#f0f4ff",
          100: "#e0e9ff",
          200: "#c7d7fe",
          300: "#a4bcfd",
          400: "#8098fb",
          500: "#6171f6",
          600: "#4c53eb",
          700: "#3d41d0",
          800: "#3337a8",
          900: "#2e3285",
          950: "#1c1d4d",
        },
        slate: {
          850: "#172033",
          950: "#0a0f1e",
        },
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
```

- [ ] **Step 4: Create `.env.local` template**

Create `D:/Legacy/sleepcalculator/.env.local`:

```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
NEXT_PUBLIC_SITE_URL=https://thesleepcalculator.co
```

- [ ] **Step 5: Create ThemeToggle component**

Create `components/ThemeToggle.tsx`:

```typescript
"use client";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);
  if (!mounted) return <div className="w-9 h-9" />;

  return (
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="p-2 rounded-lg bg-white/10 hover:bg-white/20 dark:bg-white/10 dark:hover:bg-white/20 transition-colors"
      aria-label="Toggle theme"
    >
      {theme === "dark" ? (
        <svg className="w-5 h-5 text-yellow-300" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
        </svg>
      ) : (
        <svg className="w-5 h-5 text-slate-700" fill="currentColor" viewBox="0 0 20 20">
          <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
        </svg>
      )}
    </button>
  );
}
```

- [ ] **Step 6: Create Header component**

Create `components/Header.tsx`:

```typescript
import Link from "next/link";
import ThemeToggle from "./ThemeToggle";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-slate-950/80 dark:bg-slate-950/80 light:bg-white/80 backdrop-blur-md">
      <div className="max-w-5xl mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 font-bold text-lg text-white dark:text-white">
          <span className="text-2xl">🌙</span>
          <span className="text-white dark:text-white text-slate-900">The Sleep Calculator</span>
        </Link>
        <nav className="flex items-center gap-6">
          <Link href="/" className="text-sm text-slate-300 hover:text-white dark:text-slate-300 dark:hover:text-white transition-colors">
            Calculator
          </Link>
          <Link href="/blog" className="text-sm text-slate-300 hover:text-white dark:text-slate-300 dark:hover:text-white transition-colors">
            Blog
          </Link>
          <ThemeToggle />
        </nav>
      </div>
    </header>
  );
}
```

- [ ] **Step 7: Create Footer component**

Create `components/Footer.tsx`:

```typescript
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-white/10 mt-20 py-10">
      <div className="max-w-5xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-slate-400">
        <p>© {new Date().getFullYear()} The Sleep Calculator. All rights reserved.</p>
        <nav className="flex gap-6">
          <Link href="/blog" className="hover:text-white transition-colors">Blog</Link>
          <Link href="/admin" className="hover:text-white transition-colors">Admin</Link>
        </nav>
      </div>
    </footer>
  );
}
```

- [ ] **Step 8: Create root layout**

Replace contents of `app/layout.tsx`:

```typescript
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ThemeProvider } from "next-themes";
import { Analytics } from "@vercel/analytics/react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://thesleepcalculator.co"),
  title: {
    default: "Sleep Calculator — Find Your Perfect Bedtime & Wake Up Time",
    template: "%s | The Sleep Calculator",
  },
  description: "Free sleep calculator based on 90-minute sleep cycles. Find the best time to wake up or go to sleep to feel refreshed and avoid grogginess.",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://thesleepcalculator.co",
    siteName: "The Sleep Calculator",
  },
  twitter: {
    card: "summary_large_image",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} bg-slate-950 text-white dark:bg-slate-950 dark:text-white min-h-screen`}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
          <Header />
          <main>{children}</main>
          <Footer />
          <Analytics />
        </ThemeProvider>
      </body>
    </html>
  );
}
```

- [ ] **Step 9: Run dev server and verify layout renders**

```bash
npm run dev
```

Open `http://localhost:3000`. Expected: Dark background, header with "The Sleep Calculator" + nav links + theme toggle, footer visible.

- [ ] **Step 10: Verify light mode toggle works**

Click the theme toggle. Expected: Background switches to light, icon changes to moon.

- [ ] **Step 11: Commit**

```bash
git add -A
git commit -m "feat: scaffold Next.js 14 with Tailwind dark/light mode, header, footer"
```

---

## Task 2: Sleep Science Engine

**Files:**
- Create: `lib/sleep-engine.ts`
- Create: `lib/sleep-engine.test.ts`

**Interfaces:**
- Produces:
  - `calculateWakeUpTimes(bedtime: string): WakeUpResult[]` — bedtime as "HH:MM" (24h), returns array of 6 wake times
  - `calculateBedtimes(wakeTime: string): BedtimeResult[]` — wake time as "HH:MM" (24h), returns array of 6 bedtimes
  - `getRecommendedHours(age: number): { min: number; max: number; label: string }` — CDC recommendations
  - `detectSleepDebt(hoursPlanned: number, age: number): SleepDebtWarning | null`
  - Types: `WakeUpResult`, `BedtimeResult`, `SleepDebtWarning`

- [ ] **Step 1: Install Vitest for unit testing**

```bash
npm install -D vitest @vitejs/plugin-react
```

Create `vitest.config.ts`:

```typescript
import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  test: {
    environment: "jsdom",
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "."),
    },
  },
});
```

Add to `package.json` scripts:
```json
"test": "vitest run",
"test:watch": "vitest"
```

- [ ] **Step 2: Write failing tests for sleep engine**

Create `lib/sleep-engine.test.ts`:

```typescript
import { describe, it, expect } from "vitest";
import {
  calculateWakeUpTimes,
  calculateBedtimes,
  getRecommendedHours,
  detectSleepDebt,
} from "./sleep-engine";

describe("calculateWakeUpTimes", () => {
  it("returns 6 wake times starting from 1 cycle after bedtime + buffer", () => {
    const results = calculateWakeUpTimes("22:00");
    expect(results).toHaveLength(6);
    // 22:00 + 14min buffer + 1 cycle (90min) = 23:44
    expect(results[0].time).toBe("23:44");
    // 22:00 + 14min + 2 cycles (180min) = 01:14
    expect(results[1].time).toBe("01:14");
    // 22:00 + 14min + 6 cycles (540min) = 07:14
    expect(results[5].time).toBe("07:14");
  });

  it("cycles count starts at 1 for first result", () => {
    const results = calculateWakeUpTimes("22:00");
    expect(results[0].cycles).toBe(1);
    expect(results[5].cycles).toBe(6);
  });

  it("marks 5 and 6 cycle results as recommended", () => {
    const results = calculateWakeUpTimes("22:00");
    expect(results[4].recommended).toBe(true);
    expect(results[5].recommended).toBe(true);
    expect(results[0].recommended).toBe(false);
  });
});

describe("calculateBedtimes", () => {
  it("returns 6 bedtimes working backwards from wake time minus buffer", () => {
    const results = calculateBedtimes("07:00");
    expect(results).toHaveLength(6);
    // 07:00 - 14min buffer - 6 cycles (540min) = 22:06 (shown as earliest sensible bedtime)
    expect(results[0].time).toBe("22:06");
    expect(results[5].time).toBe("01:36");
  });

  it("marks 5 and 6 cycle results as recommended", () => {
    const results = calculateBedtimes("07:00");
    expect(results[4].recommended).toBe(true);
    expect(results[5].recommended).toBe(true);
  });
});

describe("getRecommendedHours", () => {
  it("returns 9-11 hours for age 10 (school-age child)", () => {
    const rec = getRecommendedHours(10);
    expect(rec.min).toBe(9);
    expect(rec.max).toBe(11);
  });

  it("returns 8-10 hours for age 15 (teenager)", () => {
    const rec = getRecommendedHours(15);
    expect(rec.min).toBe(8);
    expect(rec.max).toBe(10);
  });

  it("returns 7-9 hours for age 30 (adult)", () => {
    const rec = getRecommendedHours(30);
    expect(rec.min).toBe(7);
    expect(rec.max).toBe(9);
  });

  it("returns 7-8 hours for age 65 (older adult)", () => {
    const rec = getRecommendedHours(65);
    expect(rec.min).toBe(7);
    expect(rec.max).toBe(8);
  });
});

describe("detectSleepDebt", () => {
  it("returns null when planned hours meet minimum recommendation", () => {
    expect(detectSleepDebt(7, 30)).toBeNull();
  });

  it("returns warning when planned hours are below minimum", () => {
    const warning = detectSleepDebt(5, 30);
    expect(warning).not.toBeNull();
    expect(warning!.deficit).toBe(2);
    expect(warning!.message).toContain("2 hour");
  });
});
```

- [ ] **Step 3: Run tests to verify they fail**

```bash
npm test
```

Expected: All tests FAIL with "Cannot find module './sleep-engine'".

- [ ] **Step 4: Implement sleep engine**

Create `lib/sleep-engine.ts`:

```typescript
export const CYCLE_MINUTES = 90;
export const FALL_ASLEEP_BUFFER = 14;

export interface WakeUpResult {
  time: string;
  cycles: number;
  hours: number;
  recommended: boolean;
}

export interface BedtimeResult {
  time: string;
  cycles: number;
  hours: number;
  recommended: boolean;
}

export interface SleepDebtWarning {
  deficit: number;
  message: string;
}

function parseTime(hhmm: string): number {
  const [h, m] = hhmm.split(":").map(Number);
  return h * 60 + m;
}

function formatTime(totalMinutes: number): string {
  const normalized = ((totalMinutes % 1440) + 1440) % 1440;
  const h = Math.floor(normalized / 60);
  const m = normalized % 60;
  return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`;
}

export function calculateWakeUpTimes(bedtime: string): WakeUpResult[] {
  const bedMinutes = parseTime(bedtime);
  return Array.from({ length: 6 }, (_, i) => {
    const cycles = i + 1;
    const totalSleep = FALL_ASLEEP_BUFFER + cycles * CYCLE_MINUTES;
    const wakeMinutes = bedMinutes + totalSleep;
    return {
      time: formatTime(wakeMinutes),
      cycles,
      hours: parseFloat((cycles * CYCLE_MINUTES / 60).toFixed(1)),
      recommended: cycles >= 5,
    };
  });
}

export function calculateBedtimes(wakeTime: string): BedtimeResult[] {
  const wakeMinutes = parseTime(wakeTime);
  return Array.from({ length: 6 }, (_, i) => {
    const cycles = 6 - i;
    const totalSleep = FALL_ASLEEP_BUFFER + cycles * CYCLE_MINUTES;
    const bedMinutes = wakeMinutes - totalSleep;
    return {
      time: formatTime(bedMinutes),
      cycles,
      hours: parseFloat((cycles * CYCLE_MINUTES / 60).toFixed(1)),
      recommended: cycles >= 5,
    };
  });
}

interface AgeGroup {
  label: string;
  min: number;
  max: number;
}

export function getRecommendedHours(age: number): AgeGroup & { label: string } {
  if (age <= 3) return { label: "Toddler", min: 11, max: 14 };
  if (age <= 5) return { label: "Preschool", min: 10, max: 13 };
  if (age <= 12) return { label: "School-age", min: 9, max: 11 };
  if (age <= 17) return { label: "Teenager", min: 8, max: 10 };
  if (age <= 64) return { label: "Adult", min: 7, max: 9 };
  return { label: "Older Adult", min: 7, max: 8 };
}

export function detectSleepDebt(hoursPlanned: number, age: number): SleepDebtWarning | null {
  const rec = getRecommendedHours(age);
  const deficit = rec.min - hoursPlanned;
  if (deficit <= 0) return null;
  return {
    deficit,
    message: `You're planning ${deficit} hour${deficit !== 1 ? "s" : ""} less sleep than the CDC recommends for your age group (${rec.min}–${rec.max} hours).`,
  };
}
```

- [ ] **Step 5: Run tests to verify they pass**

```bash
npm test
```

Expected: All 9 tests PASS.

- [ ] **Step 6: Commit**

```bash
git add lib/sleep-engine.ts lib/sleep-engine.test.ts vitest.config.ts package.json
git commit -m "feat: add sleep science engine with 90-min cycles, CDC age recommendations, sleep debt detection"
```

---

## Task 3: Supabase Client + Database Schema

**Files:**
- Create: `lib/supabase/client.ts`
- Create: `lib/supabase/server.ts`
- Create: `lib/supabase/types.ts`
- Create: `supabase/schema.sql` (migration to run in Supabase dashboard)

**Interfaces:**
- Produces:
  - `createClient()` — browser Supabase client (from `lib/supabase/client.ts`)
  - `createServerClient()` — server Supabase client (from `lib/supabase/server.ts`)
  - `Database` type (from `lib/supabase/types.ts`)
  - `Post` type: `{ id: string; title: string; slug: string; excerpt: string; content: string; cover_image: string | null; meta_description: string; published: boolean; created_at: string; updated_at: string }`

- [ ] **Step 1: Create Supabase project**

Go to [https://supabase.com](https://supabase.com), create a new project named `sleepcalculator`. Copy the Project URL and anon key into `.env.local`.

- [ ] **Step 2: Create database schema**

Create `supabase/schema.sql`:

```sql
-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- Posts table
create table posts (
  id uuid primary key default uuid_generate_v4(),
  title text not null,
  slug text not null unique,
  excerpt text not null default '',
  content text not null default '',
  cover_image text,
  meta_description text not null default '',
  published boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Auto-update updated_at
create or replace function update_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger posts_updated_at
  before update on posts
  for each row execute function update_updated_at();

-- Row Level Security
alter table posts enable row level security;

-- Public can read published posts
create policy "Public can read published posts"
  on posts for select
  using (published = true);

-- Authenticated users (admin) can do everything
create policy "Authenticated users can manage posts"
  on posts for all
  using (auth.role() = 'authenticated');
```

Run this SQL in the Supabase SQL Editor (supabase.com → your project → SQL Editor).

- [ ] **Step 3: Create TypeScript types**

Create `lib/supabase/types.ts`:

```typescript
export interface Post {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  cover_image: string | null;
  meta_description: string;
  published: boolean;
  created_at: string;
  updated_at: string;
}

export type PostInsert = Omit<Post, "id" | "created_at" | "updated_at">;
export type PostUpdate = Partial<PostInsert>;

export interface Database {
  public: {
    Tables: {
      posts: {
        Row: Post;
        Insert: PostInsert;
        Update: PostUpdate;
      };
    };
  };
}
```

- [ ] **Step 4: Create browser Supabase client**

Create `lib/supabase/client.ts`:

```typescript
import { createBrowserClient } from "@supabase/ssr";
import type { Database } from "./types";

export function createClient() {
  return createBrowserClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}
```

- [ ] **Step 5: Create server Supabase client**

Create `lib/supabase/server.ts`:

```typescript
import { createServerClient as createSSRClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import type { Database } from "./types";

export function createServerClient() {
  const cookieStore = cookies();
  return createSSRClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            );
          } catch {}
        },
      },
    }
  );
}
```

- [ ] **Step 6: Verify Supabase connection**

Add a temporary test in the browser console by adding this to `app/page.tsx` temporarily:

```typescript
// Temporary — remove after verifying
import { createClient } from "@/lib/supabase/client";
const supabase = createClient();
const { data, error } = await supabase.from("posts").select("*");
console.log("Supabase test:", data, error);
```

Open browser console at `http://localhost:3000`. Expected: `data: []`, `error: null`. Remove the test code after verifying.

- [ ] **Step 7: Commit**

```bash
git add lib/supabase/ supabase/schema.sql
git commit -m "feat: add Supabase client setup and posts schema with RLS"
```

---

## Task 4: Sleep Calculator UI

**Files:**
- Create: `components/calculator/SleepCalculator.tsx`
- Create: `components/calculator/WakeUpTab.tsx`
- Create: `components/calculator/BedtimeTab.tsx`
- Create: `components/calculator/DurationTab.tsx`
- Create: `components/calculator/ResultCard.tsx`
- Modify: `app/page.tsx`

**Interfaces:**
- Consumes: `calculateWakeUpTimes`, `calculateBedtimes`, `getRecommendedHours`, `detectSleepDebt` from `lib/sleep-engine.ts`
- Produces: `SleepCalculator` component (no props) embedded in home page

- [ ] **Step 1: Create ResultCard component**

Create `components/calculator/ResultCard.tsx`:

```typescript
interface ResultCardProps {
  time: string;
  cycles: number;
  hours: number;
  recommended: boolean;
}

export default function ResultCard({ time, cycles, hours, recommended }: ResultCardProps) {
  return (
    <div
      className={`relative rounded-xl p-4 border transition-all ${
        recommended
          ? "border-indigo-500 bg-indigo-500/10 ring-1 ring-indigo-500/30"
          : "border-white/10 bg-white/5 hover:bg-white/10"
      }`}
    >
      {recommended && (
        <span className="absolute -top-2.5 left-3 text-xs font-semibold bg-indigo-600 text-white px-2 py-0.5 rounded-full">
          Recommended
        </span>
      )}
      <div className="text-3xl font-bold text-white tabular-nums">{time}</div>
      <div className="text-sm text-slate-400 mt-1">
        {cycles} sleep {cycles === 1 ? "cycle" : "cycles"} · {hours}h
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Create WakeUpTab component**

Create `components/calculator/WakeUpTab.tsx`:

```typescript
"use client";
import { useState } from "react";
import { calculateWakeUpTimes } from "@/lib/sleep-engine";
import ResultCard from "./ResultCard";

export default function WakeUpTab() {
  const [bedtime, setBedtime] = useState("22:30");
  const results = calculateWakeUpTimes(bedtime);

  return (
    <div className="space-y-6">
      <div>
        <label htmlFor="bedtime" className="block text-sm font-medium text-slate-300 mb-2">
          I plan to go to bed at:
        </label>
        <input
          id="bedtime"
          type="time"
          value={bedtime}
          onChange={(e) => setBedtime(e.target.value)}
          className="w-full max-w-xs px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white text-xl font-mono focus:outline-none focus:ring-2 focus:ring-indigo-500 [color-scheme:dark]"
        />
      </div>
      <div>
        <p className="text-sm text-slate-400 mb-4">
          If you fall asleep at <span className="text-white font-medium">{bedtime}</span>, you should wake up at one of these times to feel refreshed:
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {results.map((r) => (
            <ResultCard key={r.cycles} {...r} />
          ))}
        </div>
      </div>
      <p className="text-xs text-slate-500">
        Based on 90-minute sleep cycles + 14-minute average fall-asleep time (National Sleep Foundation).
      </p>
    </div>
  );
}
```

- [ ] **Step 3: Create BedtimeTab component**

Create `components/calculator/BedtimeTab.tsx`:

```typescript
"use client";
import { useState } from "react";
import { calculateBedtimes } from "@/lib/sleep-engine";
import ResultCard from "./ResultCard";

export default function BedtimeTab() {
  const [wakeTime, setWakeTime] = useState("07:00");
  const results = calculateBedtimes(wakeTime);

  return (
    <div className="space-y-6">
      <div>
        <label htmlFor="waketime" className="block text-sm font-medium text-slate-300 mb-2">
          I need to wake up at:
        </label>
        <input
          id="waketime"
          type="time"
          value={wakeTime}
          onChange={(e) => setWakeTime(e.target.value)}
          className="w-full max-w-xs px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white text-xl font-mono focus:outline-none focus:ring-2 focus:ring-indigo-500 [color-scheme:dark]"
        />
      </div>
      <div>
        <p className="text-sm text-slate-400 mb-4">
          To wake up at <span className="text-white font-medium">{wakeTime}</span> feeling refreshed, go to sleep at one of these times:
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {results.map((r) => (
            <ResultCard key={r.cycles} {...r} />
          ))}
        </div>
      </div>
      <p className="text-xs text-slate-500">
        Based on 90-minute sleep cycles + 14-minute average fall-asleep time (National Sleep Foundation).
      </p>
    </div>
  );
}
```

- [ ] **Step 4: Create DurationTab component**

Create `components/calculator/DurationTab.tsx`:

```typescript
"use client";
import { useState } from "react";
import { getRecommendedHours, detectSleepDebt } from "@/lib/sleep-engine";

const CYCLES = [
  { cycles: 3, hours: 4.5 },
  { cycles: 4, hours: 6 },
  { cycles: 5, hours: 7.5 },
  { cycles: 6, hours: 9 },
];

export default function DurationTab() {
  const [age, setAge] = useState(30);
  const rec = getRecommendedHours(age);
  const debt = detectSleepDebt(7.5, age);

  return (
    <div className="space-y-6">
      <div>
        <label htmlFor="age" className="block text-sm font-medium text-slate-300 mb-2">
          Your age: <span className="text-white font-bold">{age}</span>
        </label>
        <input
          id="age"
          type="range"
          min={4}
          max={85}
          value={age}
          onChange={(e) => setAge(Number(e.target.value))}
          className="w-full max-w-xs accent-indigo-500"
        />
        <div className="flex justify-between text-xs text-slate-500 max-w-xs mt-1">
          <span>4</span><span>85</span>
        </div>
      </div>

      <div className="rounded-xl border border-indigo-500/30 bg-indigo-500/10 p-4">
        <p className="text-sm text-slate-300">
          CDC recommends <span className="font-bold text-white">{rec.label}s</span> get:
        </p>
        <p className="text-3xl font-bold text-white mt-1">
          {rec.min}–{rec.max} hours
        </p>
        <p className="text-xs text-slate-400 mt-2">per night</p>
      </div>

      <div>
        <p className="text-sm font-medium text-slate-300 mb-3">Sleep by complete cycles:</p>
        <div className="grid grid-cols-2 gap-3">
          {CYCLES.map(({ cycles, hours }) => {
            const w = detectSleepDebt(hours, age);
            return (
              <div
                key={cycles}
                className={`rounded-xl p-4 border ${
                  !w ? "border-indigo-500 bg-indigo-500/10" : "border-white/10 bg-white/5"
                }`}
              >
                <div className="text-2xl font-bold text-white">{hours}h</div>
                <div className="text-xs text-slate-400 mt-1">{cycles} cycles</div>
                {w && <div className="text-xs text-amber-400 mt-1">⚠ {w.deficit}h short</div>}
              </div>
            );
          })}
        </div>
      </div>

      <p className="text-xs text-slate-500">
        Source: CDC Sleep Recommendations 2023.
      </p>
    </div>
  );
}
```

- [ ] **Step 5: Create SleepCalculator container**

Create `components/calculator/SleepCalculator.tsx`:

```typescript
"use client";
import { useState } from "react";
import WakeUpTab from "./WakeUpTab";
import BedtimeTab from "./BedtimeTab";
import DurationTab from "./DurationTab";

const TABS = [
  { id: "wakeup", label: "Wake Up Time" },
  { id: "bedtime", label: "Bedtime" },
  { id: "duration", label: "Sleep Duration" },
] as const;

type TabId = (typeof TABS)[number]["id"];

export default function SleepCalculator() {
  const [active, setActive] = useState<TabId>("wakeup");

  return (
    <section className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm p-6 md:p-8">
      <h2 className="text-xl font-bold text-white mb-6">Sleep Calculator</h2>
      <div className="flex gap-1 mb-8 bg-white/5 rounded-xl p-1">
        {TABS.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActive(tab.id)}
            className={`flex-1 text-sm font-medium py-2.5 px-3 rounded-lg transition-all ${
              active === tab.id
                ? "bg-indigo-600 text-white shadow-lg"
                : "text-slate-400 hover:text-white"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>
      {active === "wakeup" && <WakeUpTab />}
      {active === "bedtime" && <BedtimeTab />}
      {active === "duration" && <DurationTab />}
    </section>
  );
}
```

- [ ] **Step 6: Build home page**

Replace contents of `app/page.tsx`:

```typescript
import type { Metadata } from "next";
import SleepCalculator from "@/components/calculator/SleepCalculator";

export const metadata: Metadata = {
  title: "Sleep Calculator — Find Your Perfect Bedtime & Wake Up Time",
  description:
    "Free sleep calculator based on 90-minute sleep cycles. Find the best bedtime or wake up time to feel refreshed. Includes age-based CDC sleep recommendations.",
  keywords: ["sleep calculator", "bedtime calculator", "wake up time calculator", "sleep cycle calculator"],
  openGraph: {
    title: "Sleep Calculator — Find Your Perfect Bedtime & Wake Up Time",
    description:
      "Free sleep calculator based on 90-minute sleep cycles. Find the best time to wake up or go to sleep to feel refreshed.",
    url: "https://thesleepcalculator.co",
  },
};

export default function HomePage() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      {/* Hero */}
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4 leading-tight">
          Sleep Calculator
        </h1>
        <p className="text-lg text-slate-300 max-w-2xl mx-auto">
          Based on 90-minute sleep cycles. Find the perfect time to wake up, go to sleep, or
          discover how much sleep your body actually needs.
        </p>
      </div>

      {/* Calculator */}
      <SleepCalculator />

      {/* How it works */}
      <section className="mt-16 grid md:grid-cols-3 gap-6">
        {[
          {
            icon: "🔄",
            title: "90-Minute Cycles",
            body: "Your brain cycles through light sleep, deep sleep, and REM roughly every 90 minutes. Waking at the end of a cycle means less grogginess.",
          },
          {
            icon: "⏰",
            title: "14-Min Fall-Asleep Buffer",
            body: "The average person takes about 14 minutes to fall asleep. This calculator accounts for that so your times are accurate.",
          },
          {
            icon: "🧬",
            title: "Age-Based Recommendations",
            body: "The CDC publishes sleep duration guidelines by age group. Our duration calculator uses these to flag if you're under-sleeping.",
          },
        ].map(({ icon, title, body }) => (
          <div key={title} className="rounded-xl border border-white/10 bg-white/5 p-6">
            <div className="text-3xl mb-3">{icon}</div>
            <h3 className="font-semibold text-white mb-2">{title}</h3>
            <p className="text-sm text-slate-400">{body}</p>
          </div>
        ))}
      </section>
    </div>
  );
}
```

- [ ] **Step 7: Test all three calculator tabs**

```bash
npm run dev
```

Open `http://localhost:3000`. Verify:
- "Wake Up Time" tab shows 6 result cards, 2 marked "Recommended"
- Changing the time input updates results instantly
- "Bedtime" tab works the same way
- "Duration" tab shows CDC recommendation, updates with age slider, marks cycles short on sleep with amber warning

- [ ] **Step 8: Commit**

```bash
git add components/calculator/ app/page.tsx
git commit -m "feat: add 3-tab sleep calculator with 90-min cycle engine and CDC recommendations"
```

---

## Task 5: Blog — Supabase Fetch + Pages

**Files:**
- Create: `components/blog/BlogCard.tsx`
- Create: `components/blog/BlogPost.tsx`
- Create: `app/blog/page.tsx`
- Create: `app/blog/[slug]/page.tsx`

**Interfaces:**
- Consumes: `createServerClient()` from `lib/supabase/server.ts`; `Post` type from `lib/supabase/types.ts`
- Produces: `/blog` page (SSG list of published posts); `/blog/[slug]` page (SSG post content)

- [ ] **Step 1: Create BlogCard component**

Create `components/blog/BlogCard.tsx`:

```typescript
import Link from "next/link";
import type { Post } from "@/lib/supabase/types";

export default function BlogCard({ post }: { post: Post }) {
  return (
    <Link href={`/blog/${post.slug}`} className="group block">
      <article className="rounded-xl border border-white/10 bg-white/5 p-6 hover:bg-white/10 hover:border-indigo-500/50 transition-all">
        <time className="text-xs text-slate-500" dateTime={post.created_at}>
          {new Date(post.created_at).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </time>
        <h2 className="mt-2 text-lg font-semibold text-white group-hover:text-indigo-400 transition-colors">
          {post.title}
        </h2>
        <p className="mt-2 text-sm text-slate-400 line-clamp-3">{post.excerpt}</p>
        <span className="inline-block mt-4 text-sm text-indigo-400 font-medium group-hover:text-indigo-300">
          Read more →
        </span>
      </article>
    </Link>
  );
}
```

- [ ] **Step 2: Create blog index page**

Create `app/blog/page.tsx`:

```typescript
import type { Metadata } from "next";
import { createServerClient } from "@/lib/supabase/server";
import BlogCard from "@/components/blog/BlogCard";

export const metadata: Metadata = {
  title: "Sleep Blog — Tips, Science & Guides",
  description:
    "Evidence-based articles on sleep cycles, bedtime routines, sleep calculators, and how to improve your sleep quality.",
  openGraph: {
    title: "Sleep Blog — Tips, Science & Guides",
    description:
      "Evidence-based articles on sleep cycles, bedtime routines, and improving sleep quality.",
    url: "https://thesleepcalculator.co/blog",
  },
};

export const revalidate = 3600;

export default async function BlogPage() {
  const supabase = createServerClient();
  const { data: posts } = await supabase
    .from("posts")
    .select("*")
    .eq("published", true)
    .order("created_at", { ascending: false });

  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      <div className="mb-10">
        <h1 className="text-4xl font-extrabold text-white">Sleep Blog</h1>
        <p className="text-slate-400 mt-3">
          Evidence-based guides on sleep science, cycles, and better rest.
        </p>
      </div>

      {posts && posts.length > 0 ? (
        <div className="grid md:grid-cols-2 gap-6">
          {posts.map((post) => (
            <BlogCard key={post.id} post={post} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20 text-slate-500">
          <p>No posts published yet. Check back soon.</p>
        </div>
      )}
    </div>
  );
}
```

- [ ] **Step 3: Create BlogPost content component**

Create `components/blog/BlogPost.tsx`:

```typescript
import type { Post } from "@/lib/supabase/types";

export default function BlogPost({ post }: { post: Post }) {
  return (
    <article className="max-w-3xl mx-auto px-4 py-12">
      <header className="mb-10">
        <time className="text-sm text-slate-500" dateTime={post.created_at}>
          {new Date(post.created_at).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </time>
        <h1 className="mt-3 text-4xl font-extrabold text-white leading-tight">{post.title}</h1>
        <p className="mt-4 text-lg text-slate-400">{post.excerpt}</p>
      </header>
      <div
        className="prose prose-invert prose-lg max-w-none
          prose-headings:text-white prose-headings:font-bold
          prose-p:text-slate-300 prose-p:leading-relaxed
          prose-a:text-indigo-400 prose-a:no-underline hover:prose-a:text-indigo-300
          prose-strong:text-white
          prose-li:text-slate-300
          prose-code:text-indigo-300 prose-code:bg-white/10 prose-code:rounded prose-code:px-1"
        dangerouslySetInnerHTML={{ __html: post.content }}
      />
    </article>
  );
}
```

- [ ] **Step 4: Install Tailwind Typography plugin**

```bash
npm install -D @tailwindcss/typography
```

Add to `tailwind.config.ts` plugins array:

```typescript
plugins: [require("@tailwindcss/typography")],
```

- [ ] **Step 5: Create blog post page**

Create `app/blog/[slug]/page.tsx`:

```typescript
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { createServerClient } from "@/lib/supabase/server";
import BlogPost from "@/components/blog/BlogPost";
import StructuredData from "@/components/seo/StructuredData";
import BreadcrumbSchema from "@/components/seo/BreadcrumbSchema";
import { buildArticleSchema } from "@/lib/seo/schemas";

interface Props {
  params: { slug: string };
}

export async function generateStaticParams() {
  const supabase = createServerClient();
  const { data: posts } = await supabase
    .from("posts")
    .select("slug")
    .eq("published", true);
  return (posts ?? []).map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const supabase = createServerClient();
  const { data: post } = await supabase
    .from("posts")
    .select("*")
    .eq("slug", params.slug)
    .eq("published", true)
    .single();

  if (!post) return { title: "Post Not Found" };

  return {
    title: post.title,
    description: post.meta_description || post.excerpt,
    openGraph: {
      title: post.title,
      description: post.meta_description || post.excerpt,
      type: "article",
      publishedTime: post.created_at,
      url: `https://thesleepcalculator.co/blog/${post.slug}`,
    },
  };
}

export const revalidate = 3600;

export default async function BlogPostPage({ params }: Props) {
  const supabase = createServerClient();
  const { data: post } = await supabase
    .from("posts")
    .select("*")
    .eq("slug", params.slug)
    .eq("published", true)
    .single();

  if (!post) notFound();

  const articleSchema = buildArticleSchema(post);
  const breadcrumbs = [
    { name: "Home", url: "https://thesleepcalculator.co" },
    { name: "Blog", url: "https://thesleepcalculator.co/blog" },
    { name: post.title, url: `https://thesleepcalculator.co/blog/${post.slug}` },
  ];

  return (
    <>
      <StructuredData data={articleSchema} />
      <BreadcrumbSchema items={breadcrumbs} />
      <BlogPost post={post} />
    </>
  );
}
```

- [ ] **Step 6: Verify blog pages render**

In Supabase Studio, insert one test post directly:
```sql
insert into posts (title, slug, excerpt, content, meta_description, published)
values (
  'How to Use a Sleep Calculator',
  'how-to-use-a-sleep-calculator',
  'Learn how sleep cycles work and how to use a sleep calculator to wake up feeling refreshed.',
  '<h2>What is a Sleep Calculator?</h2><p>A sleep calculator helps you find the best time to wake up or go to sleep based on your natural 90-minute sleep cycles.</p>',
  'Learn how to use a sleep calculator based on 90-minute sleep cycles to wake up refreshed.',
  true
);
```

Visit `http://localhost:3000/blog` — post card appears.
Visit `http://localhost:3000/blog/how-to-use-a-sleep-calculator` — post renders with prose styles.

- [ ] **Step 7: Commit**

```bash
git add components/blog/ app/blog/ tailwind.config.ts package.json
git commit -m "feat: add blog index and post pages with Supabase SSG and Tailwind prose"
```

---

## Task 6: SEO — Structured Data, Sitemap, Robots

**Files:**
- Create: `components/seo/StructuredData.tsx`
- Create: `components/seo/BreadcrumbSchema.tsx`
- Create: `lib/seo/metadata.ts`
- Create: `lib/seo/schemas.ts`
- Create: `app/sitemap.ts`
- Create: `app/robots.ts`

**Interfaces:**
- Consumes: `Post` type from `lib/supabase/types.ts`; Supabase server client
- Produces:
  - `StructuredData({ data: object })` — injects JSON-LD `<script>` tag
  - `BreadcrumbSchema({ items: { name: string; url: string }[] })` — BreadcrumbList JSON-LD
  - `buildArticleSchema(post: Post): object` — Article JSON-LD object
  - `buildFAQSchema(faqs: { question: string; answer: string }[]): object` — FAQPage JSON-LD
  - `buildWebSiteSchema(): object` — WebSite JSON-LD with SearchAction
  - `/sitemap.xml` — includes homepage + blog index + all published blog posts
  - `/robots.txt` — allows all, points to sitemap

- [ ] **Step 1: Create StructuredData component**

Create `components/seo/StructuredData.tsx`:

```typescript
export default function StructuredData({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
```

- [ ] **Step 2: Create BreadcrumbSchema component**

Create `components/seo/BreadcrumbSchema.tsx`:

```typescript
import StructuredData from "./StructuredData";

interface BreadcrumbItem {
  name: string;
  url: string;
}

export default function BreadcrumbSchema({ items }: { items: BreadcrumbItem[] }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
  return <StructuredData data={schema} />;
}
```

- [ ] **Step 3: Create schema builders**

Create `lib/seo/schemas.ts`:

```typescript
import type { Post } from "@/lib/supabase/types";

const SITE_URL = "https://thesleepcalculator.co";
const SITE_NAME = "The Sleep Calculator";

export function buildWebSiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_NAME,
    url: SITE_URL,
    potentialAction: {
      "@type": "SearchAction",
      target: `${SITE_URL}/blog?q={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  };
}

export function buildArticleSchema(post: Post) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.meta_description || post.excerpt,
    datePublished: post.created_at,
    dateModified: post.updated_at,
    url: `${SITE_URL}/blog/${post.slug}`,
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
      url: SITE_URL,
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${SITE_URL}/blog/${post.slug}`,
    },
  };
}

export function buildFAQSchema(faqs: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}
```

- [ ] **Step 4: Add WebSite schema and FAQ schema to home page**

Modify `app/page.tsx` — add these imports at the top:

```typescript
import StructuredData from "@/components/seo/StructuredData";
import { buildWebSiteSchema, buildFAQSchema } from "@/lib/seo/schemas";
```

Add before the return statement in `HomePage`:

```typescript
const websiteSchema = buildWebSiteSchema();
const faqSchema = buildFAQSchema([
  {
    question: "What is a sleep calculator?",
    answer: "A sleep calculator helps you find the best time to wake up or go to sleep based on your body's natural 90-minute sleep cycles, so you wake up feeling refreshed instead of groggy.",
  },
  {
    question: "How many sleep cycles do I need?",
    answer: "Most adults need 5–6 complete sleep cycles (7.5–9 hours) per night. Each cycle lasts approximately 90 minutes and includes light sleep, deep sleep, and REM sleep stages.",
  },
  {
    question: "Why do I wake up groggy even after 8 hours?",
    answer: "Grogginess (sleep inertia) often occurs when you wake up in the middle of a deep sleep stage. Using a sleep calculator helps you time your alarm to the end of a complete 90-minute cycle.",
  },
  {
    question: "How long does it take to fall asleep?",
    answer: "The average person takes about 14 minutes to fall asleep. This calculator accounts for this buffer when calculating your ideal wake up or bedtime.",
  },
]);
```

Add at the top of the returned JSX (before `<div className="max-w-5xl...">`):

```typescript
<>
  <StructuredData data={websiteSchema} />
  <StructuredData data={faqSchema} />
  <div className="max-w-5xl mx-auto px-4 py-12">
    {/* ... rest of JSX */}
  </div>
</>
```

Also add the FAQ section at the bottom of the page, before the closing `</div>`:

```typescript
{/* FAQ Section */}
<section className="mt-20">
  <h2 className="text-2xl font-bold text-white mb-8 text-center">Frequently Asked Questions</h2>
  <div className="space-y-4 max-w-3xl mx-auto">
    {[
      {
        q: "What is a sleep calculator?",
        a: "A sleep calculator helps you find the best time to wake up or go to sleep based on your body's natural 90-minute sleep cycles, so you wake up feeling refreshed instead of groggy.",
      },
      {
        q: "How many sleep cycles do I need?",
        a: "Most adults need 5–6 complete sleep cycles (7.5–9 hours) per night. Each cycle lasts approximately 90 minutes and includes light sleep, deep sleep, and REM sleep stages.",
      },
      {
        q: "Why do I wake up groggy even after 8 hours?",
        a: "Grogginess often occurs when you wake up in the middle of a deep sleep stage. This calculator times your alarm to the end of a complete cycle to minimize grogginess.",
      },
      {
        q: "How long does it take to fall asleep?",
        a: "The average person takes about 14 minutes to fall asleep. This calculator accounts for this buffer when calculating your ideal wake-up or bedtime.",
      },
    ].map(({ q, a }) => (
      <details key={q} className="group rounded-xl border border-white/10 bg-white/5 p-5 cursor-pointer">
        <summary className="font-medium text-white list-none flex justify-between items-center">
          {q}
          <span className="text-slate-400 group-open:rotate-180 transition-transform">▾</span>
        </summary>
        <p className="mt-3 text-sm text-slate-400 leading-relaxed">{a}</p>
      </details>
    ))}
  </div>
</section>
```

- [ ] **Step 5: Create sitemap**

Create `app/sitemap.ts`:

```typescript
import type { MetadataRoute } from "next";
import { createServerClient } from "@/lib/supabase/server";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const supabase = createServerClient();
  const { data: posts } = await supabase
    .from("posts")
    .select("slug, updated_at")
    .eq("published", true);

  const blogUrls: MetadataRoute.Sitemap = (posts ?? []).map((post) => ({
    url: `https://thesleepcalculator.co/blog/${post.slug}`,
    lastModified: new Date(post.updated_at),
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  return [
    {
      url: "https://thesleepcalculator.co",
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: "https://thesleepcalculator.co/blog",
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    ...blogUrls,
  ];
}
```

- [ ] **Step 6: Create robots.txt**

Create `app/robots.ts`:

```typescript
import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/", disallow: "/admin" },
    sitemap: "https://thesleepcalculator.co/sitemap.xml",
  };
}
```

- [ ] **Step 7: Verify structured data**

Visit `http://localhost:3000`. Open browser DevTools → Elements, search for `application/ld+json`. Verify two JSON-LD blocks exist: one `WebSite` and one `FAQPage`.

Visit `http://localhost:3000/sitemap.xml` — expected: XML with homepage, blog, and post URLs.
Visit `http://localhost:3000/robots.txt` — expected: `Disallow: /admin`, `Sitemap:` line.

- [ ] **Step 8: Commit**

```bash
git add components/seo/ lib/seo/ app/sitemap.ts app/robots.ts app/page.tsx
git commit -m "feat: add full Schema.org structured data, sitemap, robots.txt, FAQ section"
```

---

## Task 7: Admin Panel — Auth + Post CRUD

**Files:**
- Create: `components/admin/LoginForm.tsx`
- Create: `components/admin/PostForm.tsx`
- Create: `app/admin/layout.tsx`
- Create: `app/admin/page.tsx`
- Create: `app/admin/new/page.tsx`
- Create: `app/admin/edit/[id]/page.tsx`
- Create: `app/api/admin/posts/route.ts`
- Create: `app/api/admin/posts/[id]/route.ts`

**Interfaces:**
- Consumes: `createClient()` from `lib/supabase/client.ts`; `createServerClient()` from `lib/supabase/server.ts`; `Post`, `PostInsert`, `PostUpdate` from `lib/supabase/types.ts`
- Produces: `/admin` (auth-gated post list), `/admin/new` (create post), `/admin/edit/[id]` (edit post)

- [ ] **Step 1: Create Supabase auth admin user**

In Supabase Dashboard → Authentication → Users → Add User. Use your email. This is the only admin account.

- [ ] **Step 2: Create LoginForm component**

Create `components/admin/LoginForm.tsx`:

```typescript
"use client";
import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const supabase = createClient();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      setError(error.message);
      setLoading(false);
    } else {
      router.push("/admin");
      router.refresh();
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <form onSubmit={handleSubmit} className="w-full max-w-sm space-y-4">
        <h1 className="text-2xl font-bold text-white text-center mb-8">Admin Login</h1>
        {error && (
          <div className="rounded-lg bg-red-500/10 border border-red-500/30 p-3 text-sm text-red-400">
            {error}
          </div>
        )}
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold transition-colors disabled:opacity-50"
        >
          {loading ? "Signing in…" : "Sign In"}
        </button>
      </form>
    </div>
  );
}
```

- [ ] **Step 3: Create admin layout with auth guard**

Create `app/admin/layout.tsx`:

```typescript
import { redirect } from "next/navigation";
import { createServerClient } from "@/lib/supabase/server";
import LoginForm from "@/components/admin/LoginForm";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const supabase = createServerClient();
  const { data: { session } } = await supabase.auth.getSession();

  if (!session) return <LoginForm />;

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      {children}
    </div>
  );
}
```

- [ ] **Step 4: Create PostForm component with TipTap**

Create `components/admin/PostForm.tsx`:

```typescript
"use client";
import { useState } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Link from "@tiptap/extension-link";
import { useRouter } from "next/navigation";

interface PostFormProps {
  initial?: {
    id?: string;
    title: string;
    slug: string;
    excerpt: string;
    content: string;
    meta_description: string;
    published: boolean;
  };
}

export default function PostForm({ initial }: PostFormProps) {
  const [title, setTitle] = useState(initial?.title ?? "");
  const [slug, setSlug] = useState(initial?.slug ?? "");
  const [excerpt, setExcerpt] = useState(initial?.excerpt ?? "");
  const [metaDesc, setMetaDesc] = useState(initial?.meta_description ?? "");
  const [published, setPublished] = useState(initial?.published ?? false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const editor = useEditor({
    extensions: [StarterKit, Link.configure({ openOnClick: false })],
    content: initial?.content ?? "",
    editorProps: {
      attributes: {
        class: "prose prose-invert max-w-none min-h-[300px] focus:outline-none p-4",
      },
    },
  });

  function generateSlug(t: string) {
    return t.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
  }

  async function handleSave() {
    setSaving(true);
    setError(null);
    const body = {
      title,
      slug,
      excerpt,
      content: editor?.getHTML() ?? "",
      meta_description: metaDesc,
      published,
    };
    const url = initial?.id ? `/api/admin/posts/${initial.id}` : "/api/admin/posts";
    const method = initial?.id ? "PUT" : "POST";
    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    if (!res.ok) {
      const data = await res.json();
      setError(data.error ?? "Failed to save");
      setSaving(false);
    } else {
      router.push("/admin");
      router.refresh();
    }
  }

  const inputClass =
    "w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500";

  return (
    <div className="space-y-6">
      {error && (
        <div className="rounded-lg bg-red-500/10 border border-red-500/30 p-3 text-sm text-red-400">
          {error}
        </div>
      )}
      <div>
        <label className="block text-sm text-slate-400 mb-1">Title</label>
        <input
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
            if (!initial?.id) setSlug(generateSlug(e.target.value));
          }}
          className={inputClass}
          placeholder="Post title"
        />
      </div>
      <div>
        <label className="block text-sm text-slate-400 mb-1">Slug</label>
        <input value={slug} onChange={(e) => setSlug(e.target.value)} className={inputClass} placeholder="post-slug" />
      </div>
      <div>
        <label className="block text-sm text-slate-400 mb-1">Excerpt</label>
        <textarea
          value={excerpt}
          onChange={(e) => setExcerpt(e.target.value)}
          rows={2}
          className={inputClass}
          placeholder="Short summary shown on blog index"
        />
      </div>
      <div>
        <label className="block text-sm text-slate-400 mb-1">Meta Description (SEO)</label>
        <textarea
          value={metaDesc}
          onChange={(e) => setMetaDesc(e.target.value)}
          rows={2}
          className={inputClass}
          placeholder="160 character max for Google search results"
          maxLength={160}
        />
        <p className="text-xs text-slate-500 mt-1">{metaDesc.length}/160</p>
      </div>
      <div>
        <label className="block text-sm text-slate-400 mb-1">Content</label>
        <div className="rounded-xl border border-white/20 bg-white/5 min-h-[350px]">
          {/* TipTap toolbar */}
          <div className="flex gap-2 p-2 border-b border-white/10 flex-wrap">
            {[
              { label: "B", action: () => editor?.chain().focus().toggleBold().run(), active: editor?.isActive("bold") },
              { label: "I", action: () => editor?.chain().focus().toggleItalic().run(), active: editor?.isActive("italic") },
              { label: "H2", action: () => editor?.chain().focus().toggleHeading({ level: 2 }).run(), active: editor?.isActive("heading", { level: 2 }) },
              { label: "H3", action: () => editor?.chain().focus().toggleHeading({ level: 3 }).run(), active: editor?.isActive("heading", { level: 3 }) },
              { label: "• List", action: () => editor?.chain().focus().toggleBulletList().run(), active: editor?.isActive("bulletList") },
              { label: "1. List", action: () => editor?.chain().focus().toggleOrderedList().run(), active: editor?.isActive("orderedList") },
            ].map(({ label, action, active }) => (
              <button
                key={label}
                type="button"
                onClick={action}
                className={`px-3 py-1 text-xs rounded font-mono transition-colors ${
                  active ? "bg-indigo-600 text-white" : "bg-white/10 text-slate-300 hover:bg-white/20"
                }`}
              >
                {label}
              </button>
            ))}
          </div>
          <EditorContent editor={editor} />
        </div>
      </div>
      <div className="flex items-center gap-3">
        <label className="relative inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            checked={published}
            onChange={(e) => setPublished(e.target.checked)}
            className="sr-only peer"
          />
          <div className="w-11 h-6 bg-white/20 peer-checked:bg-indigo-600 rounded-full transition-colors" />
          <div className="absolute left-0.5 top-0.5 w-5 h-5 bg-white rounded-full transition-transform peer-checked:translate-x-5" />
        </label>
        <span className="text-sm text-slate-300">{published ? "Published" : "Draft"}</span>
      </div>
      <div className="flex gap-3">
        <button
          onClick={handleSave}
          disabled={saving}
          className="px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold transition-colors disabled:opacity-50"
        >
          {saving ? "Saving…" : initial?.id ? "Update Post" : "Create Post"}
        </button>
        <button
          onClick={() => router.push("/admin")}
          className="px-6 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
```

- [ ] **Step 5: Create admin API routes**

Create `app/api/admin/posts/route.ts`:

```typescript
import { NextResponse } from "next/server";
import { createServerClient } from "@/lib/supabase/server";

export async function POST(req: Request) {
  const supabase = createServerClient();
  const { data: { session } } = await supabase.auth.getSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await req.json();
  const { data, error } = await supabase.from("posts").insert(body).select().single();
  if (error) return NextResponse.json({ error: error.message }, { status: 400 });
  return NextResponse.json(data, { status: 201 });
}
```

Create `app/api/admin/posts/[id]/route.ts`:

```typescript
import { NextResponse } from "next/server";
import { createServerClient } from "@/lib/supabase/server";

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  const supabase = createServerClient();
  const { data: { session } } = await supabase.auth.getSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await req.json();
  const { data, error } = await supabase
    .from("posts")
    .update(body)
    .eq("id", params.id)
    .select()
    .single();
  if (error) return NextResponse.json({ error: error.message }, { status: 400 });
  return NextResponse.json(data);
}

export async function DELETE(_req: Request, { params }: { params: { id: string } }) {
  const supabase = createServerClient();
  const { data: { session } } = await supabase.auth.getSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { error } = await supabase.from("posts").delete().eq("id", params.id);
  if (error) return NextResponse.json({ error: error.message }, { status: 400 });
  return NextResponse.json({ success: true });
}
```

- [ ] **Step 6: Create admin dashboard page**

Create `app/admin/page.tsx`:

```typescript
import Link from "next/link";
import { createServerClient } from "@/lib/supabase/server";

export default async function AdminDashboard() {
  const supabase = createServerClient();
  const { data: posts } = await supabase
    .from("posts")
    .select("id, title, slug, published, created_at")
    .order("created_at", { ascending: false });

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold text-white">Posts</h1>
        <Link
          href="/admin/new"
          className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-semibold transition-colors"
        >
          + New Post
        </Link>
      </div>
      <div className="space-y-3">
        {(posts ?? []).map((post) => (
          <div
            key={post.id}
            className="flex items-center justify-between rounded-xl border border-white/10 bg-white/5 px-5 py-4"
          >
            <div>
              <p className="font-medium text-white">{post.title}</p>
              <p className="text-xs text-slate-500 mt-0.5">/{post.slug}</p>
            </div>
            <div className="flex items-center gap-3">
              <span
                className={`text-xs px-2 py-1 rounded-full ${
                  post.published
                    ? "bg-green-500/20 text-green-400"
                    : "bg-amber-500/20 text-amber-400"
                }`}
              >
                {post.published ? "Published" : "Draft"}
              </span>
              <Link
                href={`/admin/edit/${post.id}`}
                className="text-sm text-indigo-400 hover:text-indigo-300 transition-colors"
              >
                Edit
              </Link>
            </div>
          </div>
        ))}
        {(!posts || posts.length === 0) && (
          <p className="text-center text-slate-500 py-12">No posts yet. Create your first one!</p>
        )}
      </div>
    </div>
  );
}
```

- [ ] **Step 7: Create new post page**

Create `app/admin/new/page.tsx`:

```typescript
import PostForm from "@/components/admin/PostForm";

export default function NewPostPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-white mb-8">New Post</h1>
      <PostForm />
    </div>
  );
}
```

- [ ] **Step 8: Create edit post page**

Create `app/admin/edit/[id]/page.tsx`:

```typescript
import { notFound } from "next/navigation";
import { createServerClient } from "@/lib/supabase/server";
import PostForm from "@/components/admin/PostForm";

export default async function EditPostPage({ params }: { params: { id: string } }) {
  const supabase = createServerClient();
  const { data: post } = await supabase
    .from("posts")
    .select("*")
    .eq("id", params.id)
    .single();

  if (!post) notFound();

  return (
    <div>
      <h1 className="text-2xl font-bold text-white mb-8">Edit Post</h1>
      <PostForm initial={post} />
    </div>
  );
}
```

- [ ] **Step 9: Test admin flow end to end**

```bash
npm run dev
```

1. Visit `http://localhost:3000/admin` — login form appears (not logged in).
2. Sign in with the admin credentials created in Step 1.
3. Dashboard appears with post list.
4. Click "+ New Post" — form with TipTap editor appears.
5. Fill in title (slug auto-populates), excerpt, meta description, write content.
6. Toggle "Published" on, click "Create Post".
7. Redirected to dashboard — post appears in list.
8. Visit `http://localhost:3000/blog` — post appears in blog index.
9. Click post — post detail page renders with correct content.
10. Return to admin, click Edit — existing content loads in form, edit and save.

- [ ] **Step 10: Commit**

```bash
git add app/admin/ app/api/ components/admin/
git commit -m "feat: add Supabase Auth admin panel with TipTap CRUD for blog posts"
```

---

## Task 8: GA4 + Cookie Consent Banner

**Files:**
- Create: `components/analytics/GA4Script.tsx`
- Create: `components/analytics/CookieBanner.tsx`
- Modify: `app/layout.tsx`

**Interfaces:**
- Consumes: `NEXT_PUBLIC_GA_ID` env var
- Produces: GA4 tracking on all pages, cookie consent banner on first visit, Vercel Analytics already included from Task 1

- [ ] **Step 1: Install cookie consent library**

```bash
npm install js-cookie
npm install -D @types/js-cookie
```

- [ ] **Step 2: Create GA4Script component**

Create `components/analytics/GA4Script.tsx`:

```typescript
"use client";
import Script from "next/script";

export default function GA4Script() {
  const gaId = process.env.NEXT_PUBLIC_GA_ID;
  if (!gaId) return null;

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
        strategy="afterInteractive"
      />
      <Script id="ga4-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${gaId}', { anonymize_ip: true });
        `}
      </Script>
    </>
  );
}
```

- [ ] **Step 3: Create CookieBanner component**

Create `components/analytics/CookieBanner.tsx`:

```typescript
"use client";
import { useState, useEffect } from "react";
import Cookies from "js-cookie";

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!Cookies.get("cookie_consent")) setVisible(true);
  }, []);

  function accept() {
    Cookies.set("cookie_consent", "accepted", { expires: 365 });
    setVisible(false);
  }

  function decline() {
    Cookies.set("cookie_consent", "declined", { expires: 365 });
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 bg-slate-900/95 backdrop-blur border-t border-white/10">
      <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-start sm:items-center gap-4 justify-between">
        <p className="text-sm text-slate-300">
          We use cookies to analyze traffic and improve your experience. See our{" "}
          <a href="/blog" className="text-indigo-400 hover:underline">
            privacy policy
          </a>
          .
        </p>
        <div className="flex gap-3 shrink-0">
          <button
            onClick={decline}
            className="px-4 py-2 text-sm rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors"
          >
            Decline
          </button>
          <button
            onClick={accept}
            className="px-4 py-2 text-sm rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-semibold transition-colors"
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  );
}
```

- [ ] **Step 4: Add GA4 and cookie banner to root layout**

Modify `app/layout.tsx` — add imports:

```typescript
import GA4Script from "@/components/analytics/GA4Script";
import CookieBanner from "@/components/analytics/CookieBanner";
```

Add `<GA4Script />` and `<CookieBanner />` inside the `<ThemeProvider>` block, after `<Analytics />`:

```typescript
<ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
  <Header />
  <main>{children}</main>
  <Footer />
  <Analytics />
  <GA4Script />
  <CookieBanner />
</ThemeProvider>
```

- [ ] **Step 5: Verify GA4 and cookie banner**

Add your real GA4 Measurement ID to `.env.local` (`NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX`).

```bash
npm run dev
```

Open `http://localhost:3000`. Expected:
- Cookie banner appears at bottom of page on first visit.
- Click "Accept" — banner disappears, does not reappear on refresh.
- Open DevTools → Network → filter "gtag" — GA4 request fires after accepting.
- Click "Decline" (clear cookies first via DevTools) — banner disappears, no GA4 request.

- [ ] **Step 6: Commit**

```bash
git add components/analytics/ app/layout.tsx package.json
git commit -m "feat: add GA4 analytics script and GDPR cookie consent banner"
```

---

## Task 9: Vercel Deployment

**Files:**
- Create: `vercel.json` (optional, for config)

**Interfaces:**
- Consumes: all previous tasks; Vercel project + Supabase env vars
- Produces: live site at `https://thesleepcalculator.co`

- [ ] **Step 1: Final local build check**

```bash
npm run build
```

Expected: Build completes with 0 errors. Note any warnings and fix TypeScript errors before proceeding.

- [ ] **Step 2: Run tests one final time**

```bash
npm test
```

Expected: All tests PASS.

- [ ] **Step 3: Create Vercel project**

```bash
npx vercel
```

Follow prompts: link to existing project or create new one named `sleepcalculator`. Set framework to Next.js.

- [ ] **Step 4: Add environment variables in Vercel dashboard**

Go to Vercel Dashboard → your project → Settings → Environment Variables. Add:
- `NEXT_PUBLIC_SUPABASE_URL` = your Supabase project URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` = your Supabase anon key
- `SUPABASE_SERVICE_ROLE_KEY` = your Supabase service role key
- `NEXT_PUBLIC_GA_ID` = your GA4 Measurement ID
- `NEXT_PUBLIC_SITE_URL` = `https://thesleepcalculator.co`

- [ ] **Step 5: Deploy to production**

```bash
npx vercel --prod
```

Expected: Deployment URL returned. Site is live.

- [ ] **Step 6: Configure custom domain**

In Vercel Dashboard → your project → Settings → Domains → Add `thesleepcalculator.co`. Follow DNS configuration instructions (add CNAME or A record at your domain registrar).

- [ ] **Step 7: Enable Vercel Analytics**

In Vercel Dashboard → your project → Analytics → Enable. This activates the `<Analytics />` component already in the layout.

- [ ] **Step 8: Submit to Google Search Console**

1. Go to [Google Search Console](https://search.google.com/search-console).
2. Add property `https://thesleepcalculator.co`.
3. Verify via DNS TXT record (add at domain registrar).
4. Submit sitemap: enter `https://thesleepcalculator.co/sitemap.xml` → Submit.

- [ ] **Step 9: Final smoke test**

Visit `https://thesleepcalculator.co`:
- Calculator loads, all 3 tabs work.
- Theme toggle works.
- `/blog` shows posts.
- `/blog/[slug]` renders post correctly.
- `/admin` shows login form when unauthenticated.
- `/sitemap.xml` returns XML.
- `/robots.txt` returns correct content.
- View source → find `application/ld+json` blocks on homepage.

- [ ] **Step 10: Final commit**

```bash
git add -A
git commit -m "feat: complete sleep calculator site — deploy to Vercel, custom domain, Search Console"
```

---

## Self-Review

### Spec Coverage Check

| Requirement | Task |
|---|---|
| All 3 calculators (wake up, bedtime, duration) | Task 4 |
| 90-min cycles + 14-min buffer + CDC age + sleep debt | Task 2, 4 |
| Next.js 14 App Router | Task 1 |
| Dark default + light mode toggle | Task 1 |
| Supabase blog with `/admin` | Tasks 3, 5, 7 |
| TipTap rich text editor | Task 7 |
| Supabase Auth for admin | Task 7 |
| Blog index + blog post pages | Task 5 |
| Full Schema.org (Article, FAQ, WebSite, Breadcrumb) | Task 6 |
| Dynamic sitemap.xml | Task 6 |
| robots.txt with /admin disallow | Task 6 |
| Open Graph + Twitter Card meta | Task 1, 5, 6 |
| Vercel Analytics | Task 1 |
| GA4 + cookie consent banner | Task 8 |
| Vercel deployment | Task 9 |
| Google Search Console submission | Task 9 |
| Domain: thesleepcalculator.co | Task 9 |

### Type Consistency Check

- `Post` type defined once in `lib/supabase/types.ts`, used in Tasks 5, 6, 7 — consistent.
- `calculateWakeUpTimes` / `calculateBedtimes` defined in Task 2, consumed in Task 4 — consistent.
- `buildArticleSchema(post: Post)` defined in Task 6 `lib/seo/schemas.ts`, called in Task 5 `app/blog/[slug]/page.tsx` — consistent.
- `createServerClient()` defined in Task 3, used in Tasks 5, 6, 7 — consistent.
- `createClient()` defined in Task 3, used in Task 7 admin components — consistent.

### Placeholder Scan

No TBD, TODO, or placeholder steps found. All code blocks are complete.
