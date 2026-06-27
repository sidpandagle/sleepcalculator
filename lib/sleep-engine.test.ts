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
    // 22:00 + 15min buffer + 1 cycle (90min) = 23:45
    expect(results[0].time).toBe("23:45");
    // 22:00 + 15min + 2 cycles (180min) = 01:15
    expect(results[1].time).toBe("01:15");
    // 22:00 + 15min + 6 cycles (540min) = 07:15
    expect(results[5].time).toBe("07:15");
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
    // 07:00 - 15min buffer - 1 cycle (90min) = 05:15 (fewest cycles, latest bedtime)
    expect(results[0].time).toBe("05:15");
    // 07:00 - 15min buffer - 6 cycles (540min) = 21:45 (most cycles, earliest bedtime)
    expect(results[5].time).toBe("21:45");
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

import {
  calculateSleepDebt,
  calculateREMSleep,
  getPregnancySleepNeeds,
  getBabySleepNeeds,
} from "./sleep-engine";

describe("calculateSleepDebt", () => {
  it("returns debt when slept less than minimum", () => {
    const result = calculateSleepDebt(5, 30);
    expect(result.debt).toBe(2);
    expect(result.surplus).toBe(0);
    expect(result.label).toBe("Adult");
  });
  it("returns surplus when slept more than maximum", () => {
    const result = calculateSleepDebt(11, 30);
    expect(result.debt).toBe(0);
    expect(result.surplus).toBe(2);
  });
  it("returns zero debt and surplus when within recommended range", () => {
    const result = calculateSleepDebt(8, 30);
    expect(result.debt).toBe(0);
    expect(result.surplus).toBe(0);
  });
});

describe("calculateREMSleep", () => {
  it("returns 0 cycles and 0 REM for less than 90 minutes", () => {
    const result = calculateREMSleep(1);
    expect(result.cycles).toBe(0);
    expect(result.remMinutes).toBe(0);
    expect(result.breakdown).toHaveLength(0);
  });
  it("returns 5 cycles for 7.5 hours", () => {
    const result = calculateREMSleep(7.5);
    expect(result.cycles).toBe(5);
    expect(result.breakdown).toHaveLength(5);
  });
  it("returns increasing REM per cycle", () => {
    const result = calculateREMSleep(9);
    const rems = result.breakdown.map((c) => c.remMinutes);
    expect(rems[0]).toBeLessThan(rems[rems.length - 1]);
  });
  it("remMinutes equals sum of breakdown", () => {
    const result = calculateREMSleep(6);
    const sum = result.breakdown.reduce((s, c) => s + c.remMinutes, 0);
    expect(result.remMinutes).toBe(sum);
  });
});

describe("getPregnancySleepNeeds", () => {
  it("returns 8–10h range for first trimester", () => {
    const result = getPregnancySleepNeeds(1);
    expect(result.range.min).toBe(8);
    expect(result.range.max).toBe(10);
  });
  it("returns 7–9h range for second trimester", () => {
    const result = getPregnancySleepNeeds(2);
    expect(result.range.min).toBe(7);
    expect(result.range.max).toBe(9);
  });
  it("returns tips and commonIssues for all trimesters", () => {
    ([1, 2, 3] as const).forEach((t) => {
      const result = getPregnancySleepNeeds(t);
      expect(result.tips.length).toBeGreaterThan(0);
      expect(result.commonIssues.length).toBeGreaterThan(0);
    });
  });
});

describe("getBabySleepNeeds", () => {
  it("returns 16h total for newborn", () => {
    const result = getBabySleepNeeds(0);
    expect(result.total).toBe(16);
    expect(result.ageLabel).toBe("Newborn");
  });
  it("returns 14h and 3 naps for 6-month-old", () => {
    const result = getBabySleepNeeds(6);
    expect(result.total).toBe(14);
    expect(result.napCount).toBe(3);
  });
  it("returns correct ageLabel", () => {
    expect(getBabySleepNeeds(1).ageLabel).toBe("1-Month-Old");
    expect(getBabySleepNeeds(12).ageLabel).toBe("12-Month-Old");
  });
});
