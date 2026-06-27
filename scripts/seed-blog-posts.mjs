// Run: node scripts/seed-blog-posts.mjs
import { createClient } from "@supabase/supabase-js";
import { readFileSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const envPath = resolve(__dirname, "../.env.local");

// Parse .env.local manually
const env = Object.fromEntries(
  readFileSync(envPath, "utf8")
    .split("\n")
    .filter((l) => l.includes("=") && !l.startsWith("#"))
    .map((l) => {
      const idx = l.indexOf("=");
      return [l.slice(0, idx).trim(), l.slice(idx + 1).trim()];
    })
);

const supabase = createClient(
  env.NEXT_PUBLIC_SUPABASE_URL,
  env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

const posts = [
  {
    title: "Why You Wake Up Tired After 8 Hours of Sleep",
    slug: "why-you-wake-up-tired-after-8-hours",
    excerpt:
      "Getting 8 hours but still feeling exhausted? Sleep timing, cycle alignment, and sleep quality all matter more than raw duration.",
    meta_description:
      "Discover why 8 hours of sleep still leaves you tired. Learn how sleep cycles, sleep debt, and sleep quality affect how rested you feel.",
    published: true,
    cover_image: null,
    content: `
<h2>The 8-Hour Myth</h2>
<p>Most people have been told that 8 hours of sleep is the magic number. Yet millions of people wake up after a full night's sleep feeling just as tired as when they went to bed. The reason has nothing to do with how long you slept — it's about <em>when</em> you woke up.</p>

<h2>How Sleep Cycles Work</h2>
<p>Sleep is not a uniform state. It's organized into 90-minute cycles, each containing four stages: light sleep (N1), deeper light sleep (N2), deep slow-wave sleep (N3), and REM sleep. A complete cycle takes roughly 90 minutes, and adults typically complete 4–6 cycles per night.</p>
<p>The key insight: waking up mid-cycle — especially during deep sleep (N3) — triggers <strong>sleep inertia</strong>, the groggy, disoriented feeling that can last 15–60 minutes. Even a perfect 8 hours split at the wrong moment will leave you feeling wrecked.</p>

<h2>Why Cycle Alignment Matters</h2>
<p>If you fall asleep at midnight and wake at 8:00 AM, that's 8 hours — but is it 5 complete cycles (7.5 hrs) plus 30 min of mid-cycle disruption? Or does it land cleanly after a cycle boundary? The difference in how you feel is dramatic.</p>
<p>The <a href="https://sleepschedule.in">Sleep Schedule bedtime calculator</a> solves this by working backwards from your wake time. Enter when you need to get up, and it shows you the exact bedtimes that align with natural 90-minute cycle endpoints — so you wake at the lightest sleep stage, not the deepest.</p>

<h2>Other Common Causes of Morning Fatigue</h2>

<h3>Accumulated Sleep Debt</h3>
<p>One night of 8 hours cannot erase weeks of 6-hour nights. The <a href="https://www.cdc.gov/sleep/index.html" rel="noopener noreferrer">CDC estimates</a> that about 1 in 3 adults don't get enough sleep regularly. Sleep debt accumulates progressively — each hour below your personal need adds to a deficit that only consistent full nights can repay.</p>
<p>Check your <a href="https://sleepschedule.in/sleep-debt-calculator">sleep debt calculator</a> to see how much you've accumulated over the past week.</p>

<h3>Poor Sleep Quality vs. Poor Sleep Duration</h3>
<p>Duration and quality are different metrics. Fragmented sleep — caused by sleep apnea, alcohol consumption, ambient noise, or blue light exposure — breaks the continuity of sleep cycles. You may spend 8 hours in bed but only achieve 5–6 hours of restorative sleep.</p>
<p>According to the <a href="https://aasm.org" rel="noopener noreferrer">American Academy of Sleep Medicine (AASM)</a>, undiagnosed obstructive sleep apnea affects over 30 million Americans and is one of the leading causes of excessive daytime sleepiness despite adequate time in bed.</p>

<h3>Circadian Rhythm Misalignment</h3>
<p>Your body operates on a 24-hour internal clock driven by light exposure, meal timing, and activity. When your sleep schedule conflicts with your natural chronotype — the times your body wants to sleep and wake — you experience social jetlag. Even 8 quality hours slept at the "wrong" biological time will leave you fatigued.</p>
<p>Research published in the journal <em>Current Biology</em> found that people whose sleep schedule misaligns with their chronotype by 2+ hours show significantly higher levels of daytime sleepiness and poorer cognitive performance.</p>

<h3>Thyroid and Iron Deficiency</h3>
<p>Chronic fatigue despite adequate sleep can also signal medical conditions. Hypothyroidism, iron-deficiency anemia, and vitamin D deficiency are the most common culprits. If aligning your sleep cycles doesn't resolve the issue after 2–3 weeks, consult a healthcare provider.</p>

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
`,
  },
  {
    title: "How Much REM Sleep Do You Actually Need? (With Age Charts)",
    slug: "how-much-rem-sleep-do-you-need",
    excerpt:
      "REM sleep drives memory, mood, and cognitive performance. Here's exactly how much you need at every age — and how to get more of it.",
    meta_description:
      "How much REM sleep do you need? Age-by-age REM benchmarks, what happens when you're REM-deprived, and how to increase REM sleep naturally.",
    published: true,
    cover_image: null,
    content: `
<h2>What Is REM Sleep?</h2>
<p>REM (Rapid Eye Movement) sleep is the stage of sleep associated with vivid dreaming, memory consolidation, and emotional regulation. During REM, your brain is nearly as active as when you're awake — processing experiences, forming long-term memories, and regulating mood-related neurotransmitters.</p>
<p>REM is not evenly distributed across the night. It's heavily back-loaded: the first sleep cycle of the night contains only about 10 minutes of REM, while cycles 4 and 5 (in hours 6–8) contain 45–60 minutes each. This is why cutting your sleep short by even 90 minutes can disproportionately eliminate REM.</p>

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

<h2>What Happens When You Don't Get Enough REM?</h2>
<p>REM deprivation has measurable, compounding effects:</p>
<ul>
  <li><strong>Memory impairment:</strong> REM is critical for declarative memory consolidation. Studies show REM-deprived subjects retain up to 40% less of learned material.</li>
  <li><strong>Emotional dysregulation:</strong> The amygdala becomes hyperreactive after REM loss. This manifests as irritability, increased stress reactivity, and difficulty de-escalating negative emotions.</li>
  <li><strong>Impaired creativity:</strong> REM is associated with divergent thinking — the ability to draw non-obvious connections between ideas. Chronic REM deprivation suppresses creative problem-solving.</li>
  <li><strong>Increased anxiety:</strong> A 2019 UC Berkeley study found that even one night of REM disruption increased anxiety levels by 30%, with the effect compounding on subsequent nights.</li>
</ul>

<h2>Why Adults Lose REM As They Age</h2>
<p>After age 60, time spent in REM sleep decreases by roughly 0.6% per decade, according to a 2004 meta-analysis in <em>Sleep</em>. The mechanisms include:</p>
<ul>
  <li>Reduced adenosine sensitivity (the chemical that builds sleep pressure)</li>
  <li>Changes in circadian rhythm strength and timing</li>
  <li>Increased sleep fragmentation from medication, pain, or sleep-disordered breathing</li>
  <li>Lower melatonin secretion</li>
</ul>
<p>This is why older adults tend to feel less refreshed despite spending adequate time in bed — their sleep is lighter and contains less restorative deep and REM sleep.</p>

<h2>How to Increase REM Sleep</h2>

<h3>1. Protect the Final 2 Hours</h3>
<p>REM is concentrated at the end of the night. If you need 7.5 hours and currently sleep 6, you're cutting most of your REM. Extending sleep by even 30–60 minutes can dramatically increase REM time.</p>

<h3>2. Eliminate Alcohol Before Bed</h3>
<p>Alcohol is the most effective REM suppressant available without a prescription. Even moderate intake (2 drinks) within 3 hours of sleep reduces REM in the first half of the night by up to 24%, according to research published in <em>Alcoholism: Clinical &amp; Experimental Research</em>.</p>

<h3>3. Reduce Antidepressant and Sleep Aid Side Effects</h3>
<p>SSRIs, SNRIs, and benzodiazepines all suppress REM. If you take these medications and experience non-restorative sleep, discuss REM effects with your prescriber — some formulations are more REM-neutral than others.</p>

<h3>4. Align Your Sleep Schedule with Your Chronotype</h3>
<p>Waking earlier than your biological clock prefers cuts into the REM-rich late cycles. Using an alarm-free sleep schedule on weekends to observe your natural wake time reveals your chronotype — then align your weekday schedule as close as possible.</p>

<h3>5. Treat Sleep Apnea</h3>
<p>Obstructive sleep apnea preferentially disrupts REM sleep because muscle tone decreases during REM, worsening airway obstruction. CPAP therapy restores REM within days of consistent use.</p>

<h2>Checking Your REM Estimate</h2>
<p>Wearable devices (Oura, Fitbit, Apple Watch) estimate REM using heart rate variability and movement, but accuracy varies — consumer devices show 70–80% agreement with polysomnography for REM detection. Use them as directional data, not clinical measurement.</p>
<p>The <a href="https://sleepschedule.in/rem-sleep-calculator">REM Sleep Calculator</a> uses your total sleep duration and age to estimate expected REM minutes based on the AASM benchmarks above. If your device consistently shows REM below the age-appropriate target, prioritize extending total sleep time before assuming a more complex cause.</p>

<h2>Key Takeaways</h2>
<ul>
  <li>Adults need 20–25% of sleep in REM — roughly 90–120 minutes for 7.5 hours total.</li>
  <li>REM is concentrated in the final 2 hours of the night; cutting sleep short devastates REM disproportionately.</li>
  <li>Alcohol, certain medications, and sleep apnea are the most common suppressants.</li>
  <li>Age reduces REM naturally — older adults need extra attention to sleep quality, not just duration.</li>
</ul>
`,
  },
  {
    title: "The Science Behind 90-Minute Sleep Cycles",
    slug: "science-behind-90-minute-sleep-cycles",
    excerpt:
      "Why 90 minutes? The biology of sleep architecture explains why waking at the right moment determines how rested you feel.",
    meta_description:
      "Learn the science behind 90-minute sleep cycles: the four sleep stages, what each stage does, and why cycle timing determines how rested you wake up.",
    published: true,
    cover_image: null,
    content: `
<h2>Where the 90-Minute Number Comes From</h2>
<p>In the early 1950s, University of Chicago researchers Nathaniel Kleitman and Eugene Aserinsky discovered that sleep is not a uniform passive state — it's an active, structured process that cycles through distinct stages approximately every 90 minutes. This finding, combined with the later discovery of REM sleep, forms the basis of modern sleep science.</p>
<p>The 90-minute cycle length is not a perfect constant. It varies between 70–110 minutes across individuals and across the night (early cycles tend to be shorter; later cycles longer). But 90 minutes is the well-supported average used by sleep researchers and the basis of the <a href="https://sleepschedule.in">Sleep Schedule bedtime calculator</a>.</p>

<h2>The Four Stages of a Sleep Cycle</h2>

<h3>Stage 1 — N1 (Light Sleep, 1–5 minutes)</h3>
<p>The transition between wakefulness and sleep. Brain waves shift from alpha to theta waves. Muscle twitches (hypnic jerks) are common. This stage is very brief and easy to disrupt — it's the stage you're in when someone wakes you and you insist you "weren't sleeping."</p>

<h3>Stage 2 — N2 (Light Sleep, 10–25 minutes)</h3>
<p>The dominant stage of sleep by time — adults spend roughly 50% of total sleep time here. Brain activity shows sleep spindles (brief bursts of 12–15 Hz activity) and K-complexes (large, sharp waves). Body temperature drops, heart rate slows, and the brain begins consolidating procedural memories. This is considered a "lighter" stage — external sounds can still trigger arousal.</p>

<h3>Stage 3 — N3 (Deep / Slow-Wave Sleep, 20–40 minutes)</h3>
<p>The deepest and most physically restorative stage. Delta waves (0.5–4 Hz) dominate. Growth hormone is released. Tissue repair occurs. The immune system is most active. Waking from N3 produces the worst sleep inertia — the disoriented grogginess that can impair performance for up to 30 minutes.</p>
<p>N3 is most concentrated in the first half of the night. By cycles 4 and 5, N3 is almost entirely replaced by REM.</p>

<h3>REM — Rapid Eye Movement Sleep (10–60 minutes)</h3>
<p>First discovered in 1953, REM is paradoxical sleep — the brain is highly active, but the body is essentially paralyzed (atonia) to prevent acting out dreams. Eyes move rapidly beneath closed lids. Dreams are most vivid and narrative here.</p>
<p>REM is critical for emotional memory processing, creativity, and learning. It's concentrated in the latter half of the night — a 90-minute cycle at 7 AM contains far more REM than one at midnight.</p>

<h2>How Cycles Evolve Across the Night</h2>
<p>A full night of sleep changes character as it progresses:</p>
<ul>
  <li><strong>Cycles 1–2 (hours 1–3):</strong> Dominated by deep N3 sleep. Physical restoration, growth hormone release, immune activity.</li>
  <li><strong>Cycles 3–4 (hours 3–6):</strong> N3 decreases. REM increases. Balance of deep and light sleep.</li>
  <li><strong>Cycles 5–6 (hours 6–9):</strong> Dominated by REM and N2. Emotional processing, memory consolidation, creative problem-solving.</li>
</ul>
<p>This distribution explains why 6 hours and 9 hours of sleep are qualitatively different experiences, not just quantitatively different. Sleeping 6 hours gives you most of the physical restoration but very little REM. Sleeping 9 hours gives you a full complement of both.</p>

<h2>Why Waking at the Right Moment Matters</h2>
<p>Sleep inertia — the grogginess felt upon waking — is directly tied to sleep stage at awakening. Waking from N3 (deep sleep) produces severe sleep inertia; waking from N2 or early REM produces minimal inertia.</p>
<p>A 2019 study in <em>Current Biology</em> found that participants who woke during deep sleep showed 20–30% impairment in cognitive tasks for up to 30 minutes, even after reporting feeling "awake." Participants who woke from lighter stages showed no measurable impairment.</p>
<p>This is the practical value of cycle-aligned timing: setting your alarm to match a natural cycle endpoint (multiples of ~90 minutes from sleep onset) places you at the end of REM or early N2, not mid-N3.</p>

<h2>Using the Sleep Cycle Calculator</h2>
<p>The <a href="https://sleepschedule.in">bedtime calculator at Sleep Schedule</a> works backwards from your required wake time:</p>
<ol>
  <li>Enter the time you need to wake up.</li>
  <li>The calculator subtracts 14 minutes (average sleep onset latency) from your target.</li>
  <li>It then presents 4–6 bedtime options at 90-minute intervals, each representing a natural cycle boundary.</li>
  <li>Choose the option that gives you the most sleep while fitting your schedule.</li>
</ol>
<p>The result is not a guarantee — individual variation in cycle length means your personal rhythm may differ by 5–15 minutes. But the bedtime options are close enough to cycle boundaries that most people notice a significant difference in how rested they feel.</p>

<h2>Sleep Debt and Cycle Disruption</h2>
<p>Accumulated sleep debt does not shorten cycles — it deepens N3 in the first cycles as your brain prioritizes physical recovery. This is why after a night of poor sleep, the following night's early cycles contain even more deep sleep than usual. Your brain knows what it missed and takes it first.</p>
<p>Use the <a href="https://sleepschedule.in/sleep-debt-calculator">sleep debt calculator</a> to quantify your deficit. Chronic debt (7+ hours accumulated) requires consistent full nights, not one recovery sleep, to restore baseline function.</p>

<h2>Individual Variation</h2>
<p>The 90-minute average masks real individual differences:</p>
<ul>
  <li>Short sleepers may complete cycles in 70–80 minutes</li>
  <li>Long sleepers may have 100–110 minute cycles</li>
  <li>Cycle length changes with age (tends to shorten slightly in older adults)</li>
  <li>Fever and illness alter cycle structure</li>
</ul>
<p>If you consistently feel better waking 7 hours after sleep onset rather than 7.5, your personal cycle may be slightly shorter than average. Track wake times that leave you feeling best and work backwards.</p>

<h2>Key Takeaways</h2>
<ul>
  <li>A sleep cycle averages 90 minutes and includes N1, N2, N3 (deep), and REM stages.</li>
  <li>N3 dominates early in the night; REM dominates late — both are essential.</li>
  <li>Waking from N3 causes severe sleep inertia; waking from REM or N2 does not.</li>
  <li>Timing your wake alarm to a cycle boundary (90-minute multiple) is the fastest, free way to feel more rested with the same total sleep.</li>
</ul>
`,
  },
  {
    title: "Sleep Debt: How It Accumulates and How to Recover",
    slug: "sleep-debt-how-it-accumulates-and-how-to-recover",
    excerpt:
      "Sleep debt is real, measurable, and has compounding consequences. Here's the science of how it builds — and the evidence-based path to repaying it.",
    meta_description:
      "What is sleep debt, how does it accumulate, and how do you recover from it? Science-backed strategies to repay your sleep deficit and restore baseline function.",
    published: true,
    cover_image: null,
    content: `
<h2>What Is Sleep Debt?</h2>
<p>Sleep debt is the cumulative deficit between the sleep your body needs and the sleep it gets. It is not a metaphor — it is a measurable neurobiological state with quantifiable effects on cognition, mood, metabolism, and immune function.</p>
<p>Your personal sleep need is genetically determined. Most adults need 7–9 hours, per the <a href="https://aasm.org" rel="noopener noreferrer">American Academy of Sleep Medicine</a>. If you need 8 hours and consistently sleep 6, you accumulate 2 hours of debt per night — 14 hours per week.</p>
<p>Estimate your current sleep debt with the <a href="https://sleepschedule.in/sleep-debt-calculator">sleep debt calculator</a>.</p>

<h2>How Sleep Debt Accumulates</h2>
<p>Sleep debt is additive. The <a href="https://www.cdc.gov/sleep/index.html" rel="noopener noreferrer">CDC</a> reports that 35% of U.S. adults sleep less than 7 hours on workdays. For many, this is a decades-long pattern that has become normalized — they've forgotten what fully rested feels like.</p>
<p>A landmark study by David Dinges at the University of Pennsylvania found that subjects restricted to 6 hours of sleep per night for 14 days showed cognitive impairments equivalent to two full nights of total sleep deprivation — yet they reported feeling only "slightly sleepy." Chronic partial sleep restriction masks its own severity; you adapt to impaired function and perceive it as normal.</p>

<h3>What 1 Hour of Debt Costs</h3>
<p>Research quantifies the effects of even mild debt:</p>
<ul>
  <li><strong>Reaction time:</strong> 6 hours/night for 10 days = equivalent to 24 hours total deprivation (van Dongen et al., 2003)</li>
  <li><strong>Memory:</strong> 40% reduction in the ability to form new memories after one night of less than 6 hours (UC Berkeley, 2007)</li>
  <li><strong>Metabolism:</strong> Insulin sensitivity decreases after 6 days of 4-hour sleep restriction (University of Chicago)</li>
  <li><strong>Immune function:</strong> Antibody response to flu vaccination is 50% lower in sleep-deprived individuals (UCSF, 2019)</li>
  <li><strong>Testosterone:</strong> One week of 5-hour sleep reduces testosterone by 10–15% in young men (JAMA, 2011)</li>
</ul>

<h2>The Compound Effect</h2>
<p>Unlike financial debt, sleep debt does not charge interest — but it does compound in effects. The cognitive impairments from 5 nights of 6-hour sleep are not the same as one night of 3-hour sleep, but they are more insidious: they develop gradually, they're hard to notice subjectively, and they persist until the debt is repaid.</p>
<p>The prefrontal cortex — governing decision-making, impulse control, and risk assessment — is the most sleep-sensitive brain region. Sleep-deprived people consistently underestimate how impaired they are, because the region required to make that judgment is the one most compromised.</p>

<h2>Can You Catch Up on Sleep?</h2>
<p>Short answer: partially, and within limits.</p>
<p>A 2019 study in <em>Current Biology</em> (Depner et al.) followed three groups: those who slept adequately all week, those who restricted sleep all week, and those who restricted sleep on weekdays and "caught up" on weekends. Weekend recovery sleep partially reversed some cognitive deficits but did not fully restore metabolic markers — weight gain, insulin resistance, and caloric intake remained elevated even in the recovery group.</p>
<p>For acute debt (2–5 hours), 1–2 nights of extended sleep largely restores baseline performance. For chronic debt (weeks to months of under-sleeping), recovery takes weeks of consistent adequate sleep — not a single long weekend.</p>

<h2>How to Repay Sleep Debt</h2>

<h3>Systematic, Not Sporadic</h3>
<p>The most effective recovery strategy is consistency: target 30–60 minutes more than your normal sleep need for 1–2 weeks. This means going to bed earlier, not sleeping later (which disrupts your circadian rhythm).</p>

<h3>Don't Try to Sleep More Than Your Need</h3>
<p>Sleeping 10–12 hours to "catch up" overshoots your actual repayment curve and can create circadian disruption. Aim for 30–60 minutes above your sleep need, not massive overshooting.</p>

<h3>Anchor Your Wake Time</h3>
<p>A fixed wake time is the most powerful circadian stabilizer. Keep your wake time constant even when going to bed earlier — this prevents delayed sleep phase drift, where your body clock shifts later over time.</p>

<h3>Prioritize the Final 2 Hours</h3>
<p>Because REM is concentrated in the final cycles, extending your sleep from 6 hours to 7.5 hours disproportionately restores REM. If you're only able to add one sleep cycle, adding it at the end (sleeping later) is more cognitively restorative than adding it at the beginning.</p>

<h3>Address the Root Cause</h3>
<p>Repaying debt while the source remains active is a losing battle. If your debt stems from:</p>
<ul>
  <li><strong>Late-night screen use:</strong> implement a digital cutoff 1 hour before bed</li>
  <li><strong>Work schedule:</strong> evaluate whether schedule compression is addressable</li>
  <li><strong>Sleep disorders:</strong> obstructive sleep apnea, insomnia, and restless leg syndrome all require diagnosis and treatment, not just more time in bed</li>
  <li><strong>Young children:</strong> napping strategically during the day is the most evidence-supported short-term intervention</li>
</ul>

<h2>Tracking Your Debt</h2>
<p>The <a href="https://sleepschedule.in/sleep-debt-calculator">sleep debt calculator</a> estimates your 7-day rolling deficit by comparing your actual sleep hours to your stated need. Use it weekly to track whether your recovery plan is working. As you repay debt, you'll notice: faster reaction time, less reliance on caffeine, improved mood stability, and better memory for new information.</p>

<h2>A Note on Naps</h2>
<p>Strategic napping can partially offset acute debt without disrupting nighttime sleep — but only when timed correctly. A 20-minute nap before 3 PM restores alertness without entering deep sleep (which causes sleep inertia and reduces night sleep drive). A 90-minute nap allows a full cycle and can restore higher cognitive functions.</p>
<p>See the <a href="https://sleepschedule.in/nap-calculator">nap calculator</a> for timing recommendations based on your wake time.</p>

<h2>Key Takeaways</h2>
<ul>
  <li>Sleep debt is a real neurobiological state with measurable cognitive and metabolic consequences.</li>
  <li>Chronic partial restriction is more dangerous than it feels — subjective sleepiness adapts faster than objective impairment.</li>
  <li>Short-term debt (days) recovers within 1–2 nights; chronic debt (months) requires weeks of consistent adequate sleep.</li>
  <li>Consistency beats catch-up: 30–60 extra minutes every night for 2 weeks beats one 12-hour weekend session.</li>
</ul>
`,
  },
  {
    title: "Best Nap Length: 20 vs 30 vs 90 Minutes",
    slug: "best-nap-length-20-vs-30-vs-90-minutes",
    excerpt:
      "The ideal nap length depends on what you're trying to restore. Here's the science behind each duration — and how to pick the right one.",
    meta_description:
      "20-minute power nap vs 30-minute nap vs 90-minute nap: which is best? The science of nap duration, sleep inertia, and how to time naps for maximum benefit.",
    published: true,
    cover_image: null,
    content: `
<h2>Why Nap Length Matters</h2>
<p>Not all naps are equal. A 20-minute nap and a 30-minute nap have fundamentally different physiological effects — and a 90-minute nap is categorically different from both. The difference comes down to which sleep stages you enter, and whether you complete a full cycle or interrupt one.</p>
<p>Use the <a href="https://sleepschedule.in/nap-calculator">nap calculator</a> to find your optimal nap time based on your wake time and goals.</p>

<h2>The 20-Minute Power Nap</h2>

<h3>What Happens Physiologically</h3>
<p>A 20-minute nap keeps you in Stage 1 (N1) and Stage 2 (N2) light sleep. You do not enter deep slow-wave sleep (N3). This is important: it means you avoid sleep inertia — the groggy disorientation that follows waking from deep sleep.</p>

<h3>What It Restores</h3>
<ul>
  <li>Alertness and attention: 20-minute naps restore alertness for 2–3 hours (NASA nap study, Rosekind et al., 1994, <a href="https://ntrs.nasa.gov/citations/19950006379" rel="noopener noreferrer">NASA TM 108839</a>)</li>
  <li>Motor performance and reaction time</li>
  <li>Mood and frustration tolerance</li>
  <li>Working memory within the same task</li>
</ul>

<h3>What It Doesn't Restore</h3>
<p>A 20-minute nap does not consolidate long-term memories, does not restore higher-order creative thinking, and does not repay meaningful sleep debt. It's a performance boost, not a restoration.</p>

<h3>Best For</h3>
<ul>
  <li>Pre-performance alertness (before a presentation, driving, exercise)</li>
  <li>Afternoon energy trough (typically 1–3 PM) without disrupting nighttime sleep</li>
  <li>People with insomnia who need to protect nighttime sleep drive</li>
</ul>

<h2>The 30-Minute Nap</h2>

<h3>The Sleep Inertia Problem</h3>
<p>A 30-minute nap is often the worst choice — longer than a power nap but not long enough to complete a full cycle. At 20–30 minutes, many people begin entering N3 (deep slow-wave) sleep. Waking from N3 produces sleep inertia: 15–30 minutes of impaired cognitive performance, grogginess, and disorientation.</p>
<p>This is why some people feel worse after a 30-minute nap than before they napped. They've entered deep sleep but haven't completed the cycle and transitioned back to lighter stages.</p>

<h3>When a 30-Minute Nap Works</h3>
<p>If you're someone who takes 10+ minutes to fall asleep, a 30-minute window may actually result in only 15–20 minutes of real sleep — effectively acting as a power nap. The 30-minute problem is most acute for people who fall asleep quickly (under 5 minutes), who will spend more of that window in deep sleep.</p>

<h3>Best For</h3>
<ul>
  <li>People with long sleep onset (10+ minutes to fall asleep)</li>
  <li>Not generally recommended if you're a fast-to-sleep person</li>
</ul>

<h2>The 90-Minute Full-Cycle Nap</h2>

<h3>What Happens Physiologically</h3>
<p>A 90-minute nap approximates a complete sleep cycle: N1 → N2 → N3 → back through N2 → REM. Waking at the end of REM or early N2 means minimal sleep inertia despite the longer duration.</p>

<h3>What It Restores</h3>
<ul>
  <li><strong>Procedural memory:</strong> Physical skills, instrument practice, and motor sequences benefit most from the N3 component</li>
  <li><strong>Emotional memory processing:</strong> REM processes emotional experiences and reduces their charge</li>
  <li><strong>Creative problem-solving:</strong> REM facilitates novel associations and insight — the "sleep on it" effect is real and tied specifically to REM</li>
  <li><strong>Significant sleep debt repayment:</strong> One 90-minute nap repays approximately one sleep cycle of debt</li>
</ul>

<h3>NASA and Military Research</h3>
<p>The landmark NASA nap study (Rosekind et al., <a href="https://ntrs.nasa.gov/citations/19950006379" rel="noopener noreferrer">NASA TM 108839</a>) found that a 40-minute planned nap improved pilot performance by 34% and alertness by 100%. For longer operations requiring sustained performance, 90-minute naps with predictable wake timing showed the most complete restoration of complex cognitive function.</p>

<h3>The Catch: Timing</h3>
<p>A 90-minute nap must be timed carefully to avoid disrupting nighttime sleep. Napping after 3 PM with a 90-minute duration means waking at 4:30 PM or later — close enough to bedtime to reduce sleep pressure and delay sleep onset by 1–2 hours.</p>
<p>If your wake time is 7 AM, your nighttime sleep window starts around 10–11 PM. A 90-minute nap should be complete by 3 PM at the latest.</p>

<h3>Best For</h3>
<ul>
  <li>Shift workers with predictable sleep windows</li>
  <li>Athletes during double-training days</li>
  <li>People actively repaying significant sleep debt</li>
  <li>Any situation where the napper has 2+ hours of buffer before their planned bedtime</li>
</ul>

<h2>The Caffeine Nap: A Special Case</h2>
<p>Consuming caffeine (150–200 mg, roughly one strong coffee) immediately before a 20-minute nap produces an effect greater than either alone. The caffeine takes 20–30 minutes to cross the blood-brain barrier — when you wake from the nap, both effects peak simultaneously.</p>
<p>Multiple studies confirm caffeine naps outperform either intervention on alertness measures. The 20-minute window is short enough that caffeine doesn't interfere with sleep onset.</p>

<h2>Nap Timing by Wake Time</h2>
<p>Nap timing relative to your wake time determines how much nighttime sleep drive is displaced. A general rule: nap no later than 7 hours after your wake time for a 20-minute nap, and no later than 6 hours after wake for a 90-minute nap.</p>
<p>The <a href="https://sleepschedule.in/nap-calculator">nap calculator</a> takes your wake time and automatically suggests the optimal nap window based on these principles.</p>

<h2>Nap Frequency and Sleep Debt</h2>
<p>If you're napping daily out of necessity (rather than by choice), it often signals accumulated <a href="https://sleepschedule.in/sleep-debt-calculator">sleep debt</a>. Regular napping is not a sustainable substitute for adequate nighttime sleep — it partially offsets debt but does not fully repay it. Use naps as a bridge while systematically extending nighttime sleep.</p>

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

<h2>Key Takeaways</h2>
<ul>
  <li>20 minutes = alertness and mood, no sleep inertia, safe for most contexts.</li>
  <li>30 minutes = risk zone — likely to cause sleep inertia without full cycle benefits.</li>
  <li>90 minutes = full cycle, memory consolidation, REM benefits, but displaces nighttime sleep if timed late.</li>
  <li>Caffeine nap (coffee + 20-min nap) outperforms either alone for acute alertness.</li>
  <li>Daily napping out of necessity suggests sleep debt that requires nighttime sleep extension.</li>
</ul>
`,
  },
];

async function seedPosts() {
  console.log(`Connecting to Supabase: ${env.NEXT_PUBLIC_SUPABASE_URL}`);
  console.log(`Inserting ${posts.length} blog posts...`);

  for (const post of posts) {
    const { data, error } = await supabase
      .from("posts")
      .upsert(post, { onConflict: "slug" })
      .select("id, slug")
      .single();

    if (error) {
      console.error(`✗ Failed: ${post.slug}`, error.message);
    } else {
      console.log(`✓ Upserted: ${data.slug} (id: ${data.id})`);
    }
  }

  console.log("\nDone. Re-enable blog indexing in app/blog/page.tsx and sitemap.ts.");
}

seedPosts();
