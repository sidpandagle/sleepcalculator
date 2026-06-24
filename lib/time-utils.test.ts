import { describe, it, expect } from "vitest";
import { toMinutes, fromMinutes, display12h } from "./time-utils";

describe("toMinutes", () => {
  it("converts HH:MM to total minutes", () => {
    expect(toMinutes("00:00")).toBe(0);
    expect(toMinutes("01:30")).toBe(90);
    expect(toMinutes("22:30")).toBe(1350);
    expect(toMinutes("23:59")).toBe(1439);
  });
});

describe("fromMinutes", () => {
  it("converts total minutes to HH:MM", () => {
    expect(fromMinutes(0)).toBe("00:00");
    expect(fromMinutes(90)).toBe("01:30");
    expect(fromMinutes(1350)).toBe("22:30");
  });

  it("wraps forward past midnight", () => {
    expect(fromMinutes(1440)).toBe("00:00");
    expect(fromMinutes(1455)).toBe("00:15");
  });

  it("wraps backward past midnight", () => {
    expect(fromMinutes(-15)).toBe("23:45");
    expect(fromMinutes(-60)).toBe("23:00");
  });
});

describe("display12h", () => {
  it("renders midnight as 12:00 AM", () => {
    expect(display12h("00:00")).toBe("12:00 AM");
  });

  it("renders noon as 12:00 PM", () => {
    expect(display12h("12:00")).toBe("12:00 PM");
  });

  it("renders AM times correctly", () => {
    expect(display12h("07:00")).toBe("7:00 AM");
    expect(display12h("09:30")).toBe("9:30 AM");
  });

  it("renders PM times correctly", () => {
    expect(display12h("22:30")).toBe("10:30 PM");
    expect(display12h("23:45")).toBe("11:45 PM");
  });
});
