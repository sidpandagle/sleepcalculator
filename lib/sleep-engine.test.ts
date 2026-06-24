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
    // 07:00 - 14min buffer - 1 cycle (90min) = 05:16 (fewest cycles, latest bedtime)
    expect(results[0].time).toBe("05:16");
    // 07:00 - 14min buffer - 6 cycles (540min) = 21:46 (most cycles, earliest bedtime)
    expect(results[5].time).toBe("21:46");
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
