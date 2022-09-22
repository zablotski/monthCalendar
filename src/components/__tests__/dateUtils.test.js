import { describe, it, expect } from "vitest";
import { getCalendarDates } from "@/services/dateUtil";

describe("dateUtils: ", () => {
  it("should return calendar data", () => {
    const result = getCalendarDates(2022, 8);
    expect(result).toMatchSnapshot();
  });
});
