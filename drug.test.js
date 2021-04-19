import Drug, { drugs } from "./drug";
import rules, { maxBenefit } from "./drug_rules";

describe("Drug", () => {
  it("should reject non valid constructor  values", () => {
    expect(
      () =>
        new Drug({ name: "", expiresIn: 15, benefit: 30, rule: rules.standard })
    ).toThrow("illegal drug name: cannot be empty");

    expect(
      () =>
        new Drug({
          name: null,
          expiresIn: 15,
          benefit: 30,
          rule: rules.standard
        })
    ).toThrow("illegal drug name: cannot be empty");

    expect(
      () => new Drug({ ...drugs.fervex, expiresIn: 15, benefit: -1 })
    ).toThrow("illegal drug benefit value -1: cannot be lower than 0");

    expect(
      () =>
        new Drug({ ...drugs.fervex, expiresIn: 15, benefit: maxBenefit + 1 })
    ).toThrow(
      `illegal drug benefit value ${maxBenefit +
        1} : cannot be greater than ${maxBenefit}`
    );
  });
});
