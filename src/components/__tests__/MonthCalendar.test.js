import { describe, it, expect } from "vitest";

import { mount } from "@vue/test-utils";
import MonthCalendar from "../MonthCalendar.vue";

describe("HelloWorld", () => {
  it.skip("renders properly", () => {
    const wrapper = mount(MonthCalendar, { props: { msg: "Hello Vitest" } });
    expect(wrapper.text()).toContain("Hello Vitest");
  });
});
