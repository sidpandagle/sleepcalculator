-- Create posts table
create table if not exists public.posts (
  id uuid primary key default gen_random_uuid(),
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
create or replace function public.set_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists posts_set_updated_at on public.posts;
create trigger posts_set_updated_at
  before update on public.posts
  for each row execute function public.set_updated_at();

-- Enable RLS and allow anon reads
alter table public.posts enable row level security;

drop policy if exists "Public can read published posts" on public.posts;
create policy "Public can read published posts"
  on public.posts for select
  using (published = true);

-- ─── Blog Posts ───────────────────────────────────────────────────────────────

insert into public.posts (title, slug, excerpt, meta_description, published, cover_image, created_at, content)
values

(
  'Why You Wake Up Tired After 8 Hours of Sleep',
  'why-you-wake-up-tired-after-8-hours',
  'Getting 8 hours but still feeling exhausted? Sleep timing, cycle alignment, and sleep quality all matter more than raw duration.',
  'Discover why 8 hours of sleep still leaves you tired. Learn how sleep cycles, sleep debt, and sleep quality affect how rested you feel.',
  true,
  null,
  '2026-06-20 00:00:00+00',
  $content$
<h2>The 8-Hour Myth</h2>
<p>Most people have been told that 8 hours of sleep is the magic number. Yet millions of people wake up after a full night''s sleep feeling just as tired as when they went to bed. The reason has nothing to do with how long you slept — it''s about <em>when</em> you woke up.</p>

<h2>How Sleep Cycles Work</h2>
<p>Sleep is not a uniform state. It''s organized into 90-minute cycles, each containing four stages: light sleep (N1), deeper light sleep (N2), deep slow-wave sleep (N3), and REM sleep. A complete cycle takes roughly 90 minutes, and adults typically complete 4–6 cycles per night.</p>
<p>The key insight: waking up mid-cycle — especially during deep sleep (N3) — triggers <strong>sleep inertia</strong>, the groggy, disoriented feeling that can last 15–60 minutes. Even a perfect 8 hours split at the wrong moment will leave you feeling wrecked.</p>

<h2>Why Cycle Alignment Matters</h2>
<p>If you fall asleep at midnight and wake at 8:00 AM, that''s 8 hours — but is it 5 complete cycles (7.5 hrs) plus 30 min of mid-cycle disruption? Or does it land cleanly after a cycle boundary? The difference in how you feel is dramatic.</p>
<p>The <a href="https://sleepschedule.in">Sleep Schedule bedtime calculator</a> solves this by working backwards from your wake time. Enter when you need to get up, and it shows you the exact bedtimes that align with natural 90-minute cycle endpoints — so you wake at the lightest sleep stage, not the deepest.</p>

<h2>Other Common Causes of Morning Fatigue</h2>

<h3>Accumulated Sleep Debt</h3>
<p>One night of 8 hours cannot erase weeks of 6-hour nights. The <a href="https://www.cdc.gov/sleep/index.html" rel="noopener noreferrer">CDC estimates</a> that about 1 in 3 adults don''t get enough sleep regularly. Sleep debt accumulates progressively — each hour below your personal need adds to a deficit that only consistent full nights can repay.</p>
<p>Check your <a href="https://sleepschedule.in/sleep-debt-calculator">sleep debt calculator</a> to see how much you''ve accumulated over the past week.</p>

<h3>Poor Sleep Quality vs. Poor Sleep Duration</h3>
<p>Duration and quality are different metrics. Fragmented sleep — caused by sleep apnea, alcohol consumption, ambient noise, or blue light exposure — breaks the continuity of sleep cycles. You may spend 8 hours in bed but only achieve 5–6 hours of restorative sleep.</p>
<p>According to the <a href="https://aasm.org" rel="noopener noreferrer">American Academy of Sleep Medicine (AASM)</a>, undiagnosed obstructive sleep apnea affects over 30 million Americans and is one of the leading causes of excessive daytime sleepiness despite adequate time in bed.</p>

<h3>Circadian Rhythm Misalignment</h3>
<p>Your body operates on a 24-hour internal clock driven by light exposure, meal timing, and activity. When your sleep schedule conflicts with your natural chronotype — the times your body wants to sleep and wake — you experience social jetlag. Even 8 quality hours slept at the "wrong" biological time will leave you fatigued.</p>
<p>Research published in <em>Current Biology</em> found that people whose sleep schedule misaligns with their chronotype by 2+ hours show significantly higher levels of daytime sleepiness and poorer cognitive performance.</p>

<h3>Thyroid and Iron Deficiency</h3>
<p>Chronic fatigue despite adequate sleep can also signal medical conditions. Hypothyroidism, iron-deficiency anemia, and vitamin D deficiency are the most common culprits. If aligning your sleep cycles doesn''t resolve the issue after 2–3 weeks, consult a healthcare provider.</p>

<h2>The Role of REM Sleep</h2>
<p>REM (rapid eye movement) sleep is concentrated in the later cycles of the night — the final 2 hours of an 8-hour night contain the most REM. Cutting sleep short by even 90 minutes disproportionately strips REM, which governs memory consolidation, emotional processing, and the feeling of "mental refresh."</p>
<p>Adults need 20–25% of total sleep time in REM, or roughly 90–120 minutes per night for someone sleeping 7.5 hours, per <a href="https://www.cdc.gov/sleep/index.html" rel="noopener noreferrer">CDC guidelines</a>. Use the <a href="https://sleepschedule.in/rem-sleep-calculator">REM sleep calculator</a> to estimate your REM based on your total sleep time.</p>

<h2>Practical Fixes</h2>
<ul>
  <li><strong>Time your alarm to a cycle boundary.</strong> Use the <a href="https://sleepschedule.in">bedtime calculator</a> — pick a bedtime that puts your wake-up at a 90-minute multiple from when you fall asleep.</li>
  <li><strong>Keep a consistent sleep schedule.</strong> Same bedtime and wake time every day, including weekends, anchors your circadian rhythm.</li>
  <li><strong>Avoid alcohol within 3 hours of bed.</strong> Alcohol suppresses REM and fragments sleep architecture even when total duration looks fine.</li>
  <li><strong>Address sleep debt systematically.</strong> Add 30–60 minutes per night for 2 weeks rather than trying to "catch up" with one long weekend.</li>
  <li><strong>Reduce pre-sleep light exposure.</strong> Blue light from screens suppresses melatonin production. Dim lights 1–2 hours before bed.</li>
</ul>

<h2>Summary</h2>
<p>8 hours is a population average, not a universal prescription. Waking up tired after 8 hours usually means one of three things: you woke mid-cycle, you have accumulated sleep debt, or your sleep quality is compromised. Fixing the timing with a cycle-aligned calculator is the fastest, free intervention — try it tonight and notice the difference.</p>
$content$
),

(
  'How Much REM Sleep Do You Actually Need? (With Age Charts)',
  'how-much-rem-sleep-do-you-need',
  'REM sleep drives memory, mood, and cognitive performance. Here''s exactly how much you need at every age — and how to get more of it.',
  'How much REM sleep do you need? Age-by-age REM benchmarks, what happens when you''re REM-deprived, and how to increase REM sleep naturally.',
  true,
  null,
  '2026-06-21 00:00:00+00',
  $content$
<h2>What Is REM Sleep?</h2>
<p>REM (Rapid Eye Movement) sleep is the stage of sleep associated with vivid dreaming, memory consolidation, and emotional regulation. During REM, your brain is nearly as active as when you''re awake — processing experiences, forming long-term memories, and regulating mood-related neurotransmitters.</p>
<p>REM is not evenly distributed across the night. It''s heavily back-loaded: the first sleep cycle contains only about 10 minutes of REM, while cycles 4 and 5 (hours 6–8) contain 45–60 minutes each. This is why cutting sleep short by even 90 minutes can disproportionately eliminate REM.</p>

<h2>REM Sleep by Age: The Benchmarks</h2>
<p>REM requirements change significantly across the lifespan. Newborns spend up to 50% of their sleep in REM; adults settle into 20–25%.</p>

<table>
  <thead>
    <tr><th>Age Group</th><th>Total Sleep Needed</th><th>REM %</th><th>REM Duration (approx.)</th></tr>
  </thead>
  <tbody>
    <tr><td>Newborns (0–3 mo)</td><td>14–17 hrs</td><td>50%</td><td>7–8.5 hrs</td></tr>
    <tr><td>Infants (4–11 mo)</td><td>12–15 hrs</td><td>40–50%</td><td>5–7 hrs</td></tr>
    <tr><td>Toddlers (1–2 yr)</td><td>11–14 hrs</td><td>30–40%</td><td>3.5–5 hrs</td></tr>
    <tr><td>Preschool (3–5 yr)</td><td>10–13 hrs</td><td>25–30%</td><td>2.5–4 hrs</td></tr>
    <tr><td>School age (6–13 yr)</td><td>9–11 hrs</td><td>20–25%</td><td>1.8–2.7 hrs</td></tr>
    <tr><td>Teenagers (14–17 yr)</td><td>8–10 hrs</td><td>20–25%</td><td>1.6–2.5 hrs</td></tr>
    <tr><td>Young adults (18–25 yr)</td><td>7–9 hrs</td><td>20–25%</td><td>1.4–2.25 hrs</td></tr>
    <tr><td>Adults (26–64 yr)</td><td>7–9 hrs</td><td>20–25%</td><td>1.4–2.25 hrs</td></tr>
    <tr><td>Older adults (65+)</td><td>7–8 hrs</td><td>15–20%</td><td>1–1.6 hrs</td></tr>
  </tbody>
</table>

<p>Source: <a href="https://aasm.org" rel="noopener noreferrer">American Academy of Sleep Medicine (AASM)</a> and <a href="https://www.cdc.gov/sleep/index.html" rel="noopener noreferrer">CDC Sleep Guidelines</a>.</p>
<p>For a quick estimate based on your total sleep time, use the <a href="https://sleepschedule.in/rem-sleep-calculator">REM Sleep Calculator</a>.</p>

<h2>What Happens When You Don''t Get Enough REM?</h2>
<ul>
  <li><strong>Memory impairment:</strong> REM is critical for declarative memory consolidation. Studies show REM-deprived subjects retain up to 40% less of learned material.</li>
  <li><strong>Emotional dysregulation:</strong> The amygdala becomes hyperreactive after REM loss — irritability, increased stress reactivity, difficulty de-escalating negative emotions.</li>
  <li><strong>Impaired creativity:</strong> REM is associated with divergent thinking. Chronic REM deprivation suppresses creative problem-solving.</li>
  <li><strong>Increased anxiety:</strong> A 2019 UC Berkeley study found even one night of REM disruption increased anxiety levels by 30%, compounding on subsequent nights.</li>
</ul>

<h2>Why Adults Lose REM As They Age</h2>
<p>After age 60, time spent in REM sleep decreases by roughly 0.6% per decade (meta-analysis in <em>Sleep</em>, 2004). The mechanisms include reduced adenosine sensitivity, circadian rhythm weakening, increased sleep fragmentation, and lower melatonin secretion.</p>

<h2>How to Increase REM Sleep</h2>

<h3>1. Protect the Final 2 Hours</h3>
<p>REM is concentrated at the end of the night. Extending sleep from 6 hours to 7.5 hours disproportionately restores REM. If you can only add one change, go to bed earlier.</p>

<h3>2. Eliminate Alcohol Before Bed</h3>
<p>Alcohol is the most effective REM suppressant available without a prescription. Even moderate intake (2 drinks) within 3 hours of sleep reduces REM in the first half of the night by up to 24%, per research in <em>Alcoholism: Clinical &amp; Experimental Research</em>.</p>

<h3>3. Treat Sleep Apnea</h3>
<p>Obstructive sleep apnea preferentially disrupts REM because muscle tone decreases during REM, worsening airway obstruction. CPAP therapy restores REM within days of consistent use.</p>

<h3>4. Align With Your Chronotype</h3>
<p>Waking earlier than your biological clock prefers cuts into REM-rich late cycles. Use an alarm-free schedule on weekends to find your natural wake time, then align your weekdays as close as possible.</p>

<h2>Key Takeaways</h2>
<ul>
  <li>Adults need 20–25% of sleep in REM — roughly 90–120 minutes for 7.5 hours total.</li>
  <li>REM is concentrated in the final 2 hours; cutting sleep short devastates REM disproportionately.</li>
  <li>Alcohol, certain medications, and sleep apnea are the most common suppressants.</li>
  <li>Age reduces REM naturally — older adults need extra attention to sleep quality, not just duration.</li>
</ul>
$content$
),

(
  'The Science Behind 90-Minute Sleep Cycles',
  'science-behind-90-minute-sleep-cycles',
  'Why 90 minutes? The biology of sleep architecture explains why waking at the right moment determines how rested you feel.',
  'Learn the science behind 90-minute sleep cycles: the four sleep stages, what each stage does, and why cycle timing determines how rested you wake up.',
  true,
  null,
  '2026-06-22 00:00:00+00',
  $content$
<h2>Where the 90-Minute Number Comes From</h2>
<p>In the early 1950s, University of Chicago researchers Nathaniel Kleitman and Eugene Aserinsky discovered that sleep is not a uniform passive state — it''s an active, structured process that cycles through distinct stages approximately every 90 minutes. This finding, combined with the later discovery of REM sleep, forms the basis of modern sleep science.</p>
<p>The 90-minute cycle length varies between 70–110 minutes across individuals and across the night (early cycles tend to be shorter; later cycles longer). But 90 minutes is the well-supported average used by sleep researchers and the basis of the <a href="https://sleepschedule.in">Sleep Schedule bedtime calculator</a>.</p>

<h2>The Four Stages of a Sleep Cycle</h2>

<h3>Stage 1 — N1 (Light Sleep, 1–5 minutes)</h3>
<p>The transition between wakefulness and sleep. Brain waves shift from alpha to theta waves. Muscle twitches (hypnic jerks) are common. This is the stage you''re in when someone wakes you and you insist you "weren''t sleeping."</p>

<h3>Stage 2 — N2 (Light Sleep, 10–25 minutes)</h3>
<p>The dominant stage by time — adults spend roughly 50% of total sleep here. Brain activity shows sleep spindles and K-complexes. Body temperature drops, heart rate slows, and the brain begins consolidating procedural memories. External sounds can still trigger arousal.</p>

<h3>Stage 3 — N3 (Deep / Slow-Wave Sleep, 20–40 minutes)</h3>
<p>The deepest and most physically restorative stage. Delta waves dominate. Growth hormone is released. Tissue repair and immune activity peak. Waking from N3 produces the worst sleep inertia — disoriented grogginess that can impair performance for up to 30 minutes.</p>
<p>N3 is most concentrated in the first half of the night. By cycles 4 and 5, N3 is almost entirely replaced by REM.</p>

<h3>REM — Rapid Eye Movement Sleep (10–60 minutes)</h3>
<p>The brain is highly active, but the body is essentially paralyzed (atonia) to prevent acting out dreams. REM is critical for emotional memory processing, creativity, and learning. It''s concentrated in the latter half of the night — a 90-minute cycle at 7 AM contains far more REM than one at midnight.</p>

<h2>How Cycles Evolve Across the Night</h2>
<ul>
  <li><strong>Cycles 1–2 (hours 1–3):</strong> Dominated by deep N3 sleep. Physical restoration, growth hormone release, immune activity.</li>
  <li><strong>Cycles 3–4 (hours 3–6):</strong> N3 decreases. REM increases. Balance of deep and light sleep.</li>
  <li><strong>Cycles 5–6 (hours 6–9):</strong> Dominated by REM and N2. Emotional processing, memory consolidation, creative problem-solving.</li>
</ul>
<p>This explains why 6 hours and 9 hours of sleep are qualitatively different, not just quantitatively. 6 hours gives you most of the physical restoration but very little REM. 9 hours gives you a full complement of both.</p>

<h2>Why Waking at the Right Moment Matters</h2>
<p>Sleep inertia is directly tied to sleep stage at awakening. Waking from N3 produces severe inertia; waking from N2 or early REM produces minimal inertia.</p>
<p>A 2019 study in <em>Current Biology</em> found that participants who woke during deep sleep showed 20–30% impairment in cognitive tasks for up to 30 minutes after reporting feeling "awake." Participants who woke from lighter stages showed no measurable impairment.</p>
<p>This is the practical value of cycle-aligned timing: setting your alarm to match a natural cycle endpoint places you at the end of REM or early N2, not mid-N3. The <a href="https://sleepschedule.in">bedtime calculator</a> works backwards from your required wake time and shows bedtimes at 90-minute intervals to hit those boundaries.</p>

<h2>Sleep Debt and Cycle Disruption</h2>
<p>Accumulated sleep debt deepens N3 in the first cycles as your brain prioritizes physical recovery. After a poor night, the following night''s early cycles contain even more deep sleep than usual — your brain takes what it missed first.</p>
<p>Use the <a href="https://sleepschedule.in/sleep-debt-calculator">sleep debt calculator</a> to quantify your deficit. Chronic debt requires consistent full nights, not one recovery sleep, to restore baseline function.</p>

<h2>Individual Variation</h2>
<ul>
  <li>Short sleepers may complete cycles in 70–80 minutes</li>
  <li>Long sleepers may have 100–110 minute cycles</li>
  <li>Cycle length changes with age (tends to shorten slightly in older adults)</li>
</ul>
<p>If you consistently feel better waking 7 hours after sleep onset rather than 7.5, your personal cycle may be slightly shorter than average. Track wake times that leave you feeling best and work backwards.</p>

<h2>Key Takeaways</h2>
<ul>
  <li>A sleep cycle averages 90 minutes and includes N1, N2, N3 (deep), and REM stages.</li>
  <li>N3 dominates early in the night; REM dominates late — both are essential.</li>
  <li>Waking from N3 causes severe sleep inertia; waking from REM or N2 does not.</li>
  <li>Timing your alarm to a cycle boundary is the fastest, free way to feel more rested with the same total sleep.</li>
</ul>
$content$
),

(
  'Sleep Debt: How It Accumulates and How to Recover',
  'sleep-debt-how-it-accumulates-and-how-to-recover',
  'Sleep debt is real, measurable, and has compounding consequences. Here''s the science of how it builds — and the evidence-based path to repaying it.',
  'What is sleep debt, how does it accumulate, and how do you recover from it? Science-backed strategies to repay your sleep deficit and restore baseline function.',
  true,
  null,
  '2026-06-23 00:00:00+00',
  $content$
<h2>What Is Sleep Debt?</h2>
<p>Sleep debt is the cumulative deficit between the sleep your body needs and the sleep it gets. It is a measurable neurobiological state with quantifiable effects on cognition, mood, metabolism, and immune function.</p>
<p>Your personal sleep need is genetically determined. Most adults need 7–9 hours, per the <a href="https://aasm.org" rel="noopener noreferrer">American Academy of Sleep Medicine</a>. If you need 8 hours and consistently sleep 6, you accumulate 2 hours of debt per night — 14 hours per week.</p>
<p>Estimate your current sleep debt with the <a href="https://sleepschedule.in/sleep-debt-calculator">sleep debt calculator</a>.</p>

<h2>How Sleep Debt Accumulates</h2>
<p>The <a href="https://www.cdc.gov/sleep/index.html" rel="noopener noreferrer">CDC</a> reports that 35% of U.S. adults sleep less than 7 hours on workdays. A landmark study by David Dinges at the University of Pennsylvania found that subjects restricted to 6 hours of sleep per night for 14 days showed cognitive impairments equivalent to two full nights of total sleep deprivation — yet they reported feeling only "slightly sleepy." Chronic partial sleep restriction masks its own severity.</p>

<h3>What 1 Hour of Debt Costs</h3>
<ul>
  <li><strong>Reaction time:</strong> 6 hours/night for 10 days = equivalent to 24 hours total deprivation (van Dongen et al., 2003)</li>
  <li><strong>Memory:</strong> 40% reduction in new memory formation after one night under 6 hours (UC Berkeley, 2007)</li>
  <li><strong>Metabolism:</strong> Insulin sensitivity decreases after 6 days of 4-hour sleep restriction (University of Chicago)</li>
  <li><strong>Immune function:</strong> Antibody response to flu vaccination is 50% lower in sleep-deprived individuals (UCSF, 2019)</li>
  <li><strong>Testosterone:</strong> One week of 5-hour sleep reduces testosterone by 10–15% in young men (JAMA, 2011)</li>
</ul>

<h2>Can You Catch Up on Sleep?</h2>
<p>Partially, and within limits. A 2019 study in <em>Current Biology</em> (Depner et al.) found that weekend recovery sleep partially reversed cognitive deficits but did not fully restore metabolic markers — weight gain, insulin resistance, and caloric intake remained elevated even in the recovery group.</p>
<p>For acute debt (2–5 hours), 1–2 nights of extended sleep largely restores baseline performance. For chronic debt (weeks to months), recovery takes weeks of consistent adequate sleep — not a single long weekend.</p>

<h2>How to Repay Sleep Debt</h2>

<h3>Systematic, Not Sporadic</h3>
<p>The most effective recovery strategy: target 30–60 minutes more than your normal sleep need for 1–2 weeks. Go to bed earlier, not later — sleeping in disrupts your circadian rhythm.</p>

<h3>Anchor Your Wake Time</h3>
<p>A fixed wake time is the most powerful circadian stabilizer. Keep your wake time constant even when going to bed earlier — this prevents delayed sleep phase drift over time.</p>

<h3>Prioritize the Final 2 Hours</h3>
<p>Because REM is concentrated in the final cycles, extending your sleep from 6 hours to 7.5 hours disproportionately restores REM. If you can only add one sleep cycle, adding it at the end is more cognitively restorative.</p>

<h3>Address the Root Cause</h3>
<ul>
  <li><strong>Late-night screen use:</strong> digital cutoff 1 hour before bed</li>
  <li><strong>Sleep disorders:</strong> sleep apnea, insomnia, and restless leg syndrome require diagnosis and treatment, not just more time in bed</li>
  <li><strong>Young children:</strong> strategic daytime napping is the most evidence-supported short-term intervention</li>
</ul>

<h2>A Note on Naps</h2>
<p>A 20-minute nap before 3 PM restores alertness without entering deep sleep. A 90-minute nap allows a full cycle and can restore higher cognitive functions. Neither substitutes for nighttime sleep, but both offset acute debt.</p>
<p>See the <a href="https://sleepschedule.in/nap-calculator">nap calculator</a> for timing recommendations based on your wake time.</p>

<h2>Key Takeaways</h2>
<ul>
  <li>Sleep debt is a real neurobiological state with measurable cognitive and metabolic consequences.</li>
  <li>Chronic partial restriction is more dangerous than it feels — subjective sleepiness adapts faster than objective impairment.</li>
  <li>Short-term debt recovers within 1–2 nights; chronic debt requires weeks of consistent adequate sleep.</li>
  <li>Consistency beats catch-up: 30–60 extra minutes every night for 2 weeks beats one 12-hour weekend session.</li>
</ul>
$content$
),

(
  'Best Nap Length: 20 vs 30 vs 90 Minutes',
  'best-nap-length-20-vs-30-vs-90-minutes',
  'The ideal nap length depends on what you''re trying to restore. Here''s the science behind each duration — and how to pick the right one.',
  '20-minute power nap vs 30-minute nap vs 90-minute nap: which is best? The science of nap duration, sleep inertia, and how to time naps for maximum benefit.',
  true,
  null,
  '2026-06-24 00:00:00+00',
  $content$
<h2>Why Nap Length Matters</h2>
<p>Not all naps are equal. A 20-minute nap and a 30-minute nap have fundamentally different physiological effects — and a 90-minute nap is categorically different from both. The difference comes down to which sleep stages you enter, and whether you complete a full cycle or interrupt one.</p>
<p>Use the <a href="https://sleepschedule.in/nap-calculator">nap calculator</a> to find your optimal nap time based on your wake time and goals.</p>

<h2>The 20-Minute Power Nap</h2>

<h3>What Happens Physiologically</h3>
<p>A 20-minute nap keeps you in N1 and N2 light sleep. You do not enter deep slow-wave sleep (N3) — meaning no sleep inertia (the groggy disorientation that follows waking from deep sleep).</p>

<h3>What It Restores</h3>
<ul>
  <li>Alertness and attention for 2–3 hours (NASA nap study, Rosekind et al., 1994, <a href="https://ntrs.nasa.gov/citations/19950006379" rel="noopener noreferrer">NASA TM 108839</a>)</li>
  <li>Motor performance and reaction time</li>
  <li>Mood and frustration tolerance</li>
  <li>Working memory within the same task</li>
</ul>

<h3>Best For</h3>
<ul>
  <li>Pre-performance alertness (before a presentation, driving, exercise)</li>
  <li>Afternoon energy trough (typically 1–3 PM) without disrupting nighttime sleep</li>
  <li>People with insomnia who need to protect nighttime sleep drive</li>
</ul>

<h2>The 30-Minute Nap: The Danger Zone</h2>
<p>A 30-minute nap is often the worst choice — longer than a power nap but not long enough to complete a full cycle. At 20–30 minutes, many people begin entering N3 (deep slow-wave) sleep. Waking from N3 produces sleep inertia: 15–30 minutes of impaired cognitive performance and grogginess.</p>
<p>This is why some people feel worse after a 30-minute nap than before. The exception: if you take 10+ minutes to fall asleep, a 30-minute window may effectively be only 15–20 minutes of real sleep — acting as a power nap.</p>

<h2>The 90-Minute Full-Cycle Nap</h2>

<h3>What Happens Physiologically</h3>
<p>A 90-minute nap approximates a complete sleep cycle: N1 → N2 → N3 → back through N2 → REM. Waking at the end of REM or early N2 means minimal sleep inertia despite the longer duration.</p>

<h3>What It Restores</h3>
<ul>
  <li><strong>Procedural memory:</strong> Physical skills and motor sequences benefit from the N3 component</li>
  <li><strong>Emotional memory processing:</strong> REM reduces the emotional charge of experiences</li>
  <li><strong>Creative problem-solving:</strong> REM facilitates novel associations — the "sleep on it" effect is real</li>
  <li><strong>Sleep debt repayment:</strong> One 90-minute nap repays approximately one sleep cycle of debt</li>
</ul>

<h3>The Timing Constraint</h3>
<p>A 90-minute nap must be complete by 2–3 PM at the latest. Waking at 4:30 PM or later reduces nighttime sleep pressure enough to delay sleep onset by 1–2 hours.</p>

<h2>The Caffeine Nap: Best of Both</h2>
<p>Consume caffeine (150–200 mg) immediately before a 20-minute nap. Caffeine takes 20–30 minutes to cross the blood-brain barrier — when you wake, both effects peak simultaneously. Multiple studies confirm caffeine naps outperform either intervention alone for alertness.</p>

<h2>Decision Guide</h2>
<table>
  <thead>
    <tr><th>Goal</th><th>Best Nap Length</th><th>Time Limit</th></tr>
  </thead>
  <tbody>
    <tr><td>Quick alertness boost</td><td>20 minutes</td><td>Before 3 PM</td></tr>
    <tr><td>Motor skill consolidation</td><td>90 minutes</td><td>Before 2 PM</td></tr>
    <tr><td>Creative problem solving</td><td>90 minutes</td><td>Before 2 PM</td></tr>
    <tr><td>Emotional reset</td><td>20–90 minutes</td><td>Before 3 PM</td></tr>
    <tr><td>Sleep debt repayment</td><td>90 minutes</td><td>Before 2 PM</td></tr>
    <tr><td>Protecting nighttime sleep</td><td>20 minutes</td><td>Before 4 PM</td></tr>
  </tbody>
</table>

<h2>Napping Daily? Check Your Sleep Debt</h2>
<p>If you''re napping daily out of necessity, it often signals accumulated <a href="https://sleepschedule.in/sleep-debt-calculator">sleep debt</a>. Regular napping partially offsets debt but doesn''t fully repay it — use naps as a bridge while systematically extending nighttime sleep.</p>

<h2>Key Takeaways</h2>
<ul>
  <li>20 minutes = alertness and mood, no sleep inertia, safe for most contexts.</li>
  <li>30 minutes = risk zone — likely to cause sleep inertia without full cycle benefits.</li>
  <li>90 minutes = full cycle, memory consolidation, REM benefits; must be timed early.</li>
  <li>Caffeine nap (coffee + 20-min nap) outperforms either alone for acute alertness.</li>
</ul>
$content$
)

on conflict (slug) do update set
  title = excluded.title,
  excerpt = excluded.excerpt,
  meta_description = excluded.meta_description,
  content = excluded.content,
  published = excluded.published,
  updated_at = now();

-- ─── Contact Submissions ──────────────────────────────────────────────────────

create table if not exists public.contact_submissions (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  message text not null,
  created_at timestamptz not null default now()
);

alter table public.contact_submissions enable row level security;

drop policy if exists "Anyone can submit contact" on public.contact_submissions;
create policy "Anyone can submit contact"
  on public.contact_submissions for insert to anon with check (true);
