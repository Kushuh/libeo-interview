import Drug, { drugs } from "./drug";
import rules, { maxBenefit } from "./drug_rules";

describe("Drug - constructor", () => {
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
        1}: cannot be greater than ${maxBenefit}`
    );
  });

  it("should instantiate with valid values", () => {
    let fervex = new Drug({ ...drugs.fervex, benefit: 15, expiresIn: 30 });

    expect(fervex.name).toBe(drugs.fervex.name);
    expect(fervex.benefit).toBe(15);
    expect(fervex.expiresIn).toBe(30);

    fervex = new Drug({ ...drugs.fervex, benefit: 0, expiresIn: 30 });

    expect(fervex.name).toBe(drugs.fervex.name);
    expect(fervex.benefit).toBe(0);
    expect(fervex.expiresIn).toBe(30);

    fervex = new Drug({ ...drugs.fervex, benefit: maxBenefit, expiresIn: 30 });

    expect(fervex.name).toBe(drugs.fervex.name);
    expect(fervex.benefit).toBe(maxBenefit);
    expect(fervex.expiresIn).toBe(30);

    fervex = new Drug({ ...drugs.fervex, benefit: 15, expiresIn: Infinity });

    expect(fervex.name).toBe(drugs.fervex.name);
    expect(fervex.benefit).toBe(15);
    expect(fervex.expiresIn).toBe(Infinity);
  });
});

const testUpdater = (init, expected) => {
  const dummy = new Drug(init);

  expect(dummy.expiresIn).toBe(expected[0][0]);
  expect(dummy.benefit).toBe(expected[0][1]);

  for (const e of expected.slice(1)) {
    dummy.update();

    expect(dummy.expiresIn).toBe(e[0]);
    expect(dummy.benefit).toBe(e[1]);
  }
};

describe("Drug - update (standard)", () => {
  it("should decrease correctly when it doesn't reach 0 before expiry", () => {
    testUpdater(
      {
        name: "dummy",
        expiresIn: 1,
        benefit: 5,
        rule: rules.standard
      },
      [[1, 5], [0, 4], [-1, 3], [-2, 1], [-3, 0], [-4, 0]]
    );
  });

  it("should decrease correctly when it reaches 0 before expiry", () => {
    testUpdater(
      {
        name: "dummy",
        expiresIn: 2,
        benefit: 1,
        rule: rules.standard
      },
      [[2, 1], [1, 0], [0, 0], [-1, 0]]
    );
  });
});
