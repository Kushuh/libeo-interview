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
      [[1, 5], [0, 4], [-1, 2], [-2, 0], [-3, 0]]
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

describe("Drug - update (herbal tea)", () => {
  it("should decrease correctly when it doesn't reach max value before expiry", () => {
    testUpdater(
      {
        name: "dummy",
        expiresIn: 2,
        benefit: 44,
        rule: rules.herbalTea
      },
      [[2, 44], [1, 45], [0, 46], [-1, 48], [-2, 50], [-3, 50]]
    );
  });

  it("should decrease correctly when it reaches max value before expiry", () => {
    testUpdater(
      {
        name: "dummy",
        expiresIn: 2,
        benefit: 49,
        rule: rules.herbalTea
      },
      [[2, 49], [1, 50], [0, 50], [-1, 50]]
    );
  });
});

describe("Drug - update (magic pill)", () => {
  it("should never move", () => {
    testUpdater(
      {
        name: "dummy",
        expiresIn: Infinity,
        benefit: 30,
        rule: rules.magicPill
      },
      [[Infinity, 30], [Infinity, 30], [Infinity, 30]]
    );
  });
});

describe("Drug - update (fervex)", () => {
  it("should decrease correctly when it doesn't reach max value before expiry", () => {
    testUpdater(
      {
        name: "dummy",
        expiresIn: 12,
        benefit: 20,
        rule: rules.fervex
      },
      [
        [12, 20],
        [11, 21],
        [10, 23],
        [9, 25],
        [8, 27],
        [7, 29],
        [6, 31],
        [5, 34],
        [4, 37],
        [3, 40],
        [2, 43],
        [1, 46],
        [0, 49],
        [-1, 0]
      ]
    );
  });

  it("should decrease correctly when it reaches max value before expiry", () => {
    testUpdater(
      {
        name: "dummy",
        expiresIn: 12,
        benefit: 30,
        rule: rules.fervex
      },
      [
        [12, 30],
        [11, 31],
        [10, 33],
        [9, 35],
        [8, 37],
        [7, 39],
        [6, 41],
        [5, 44],
        [4, 47],
        [3, 50],
        [2, 50],
        [1, 50],
        [0, 50],
        [-1, 0]
      ]
    );
  });
});

describe("Drug - update (dafalgan)", () => {
  it("should decrease correctly when it doesn't reach 0 before expiry", () => {
    testUpdater(
      {
        name: "dummy",
        expiresIn: 1,
        benefit: 10,
        rule: rules.dafalgan
      },
      [[1, 10], [0, 8], [-1, 4], [-2, 0], [-3, 0]]
    );
  });

  it("should decrease correctly when it reaches 0 before expiry", () => {
    testUpdater(
      {
        name: "dummy",
        expiresIn: 2,
        benefit: 2,
        rule: rules.dafalgan
      },
      [[2, 2], [1, 0], [0, 0], [-1, 0]]
    );
  });
});
