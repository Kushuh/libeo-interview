import rules, { maxBenefit } from "./drug_rules";

/**
 * @typedef {Object} DrugData
 *
 * @property {UpdateRule} rule
 * @property {string} name
 */

/**
 * List available types of drugs here.
 *
 * @type {Object<DrugData>}
 */
const drugs = {
  doliprane: {
    rule: rules.standard,
    name: "Doliprane"
  },
  herbalTea: {
    rule: rules.herbalTea,
    name: "Herbal Tea"
  },
  fervex: {
    rule: rules.fervex,
    name: "Fervex"
  },
  magicPill: {
    rule: rules.magicPill,
    name: "Magic Pill"
  },
  dafalgan: {
    rule: rules.dafalgan,
    name: "Dafalgan"
  }
};

/**
 * Constructors for all standards types of drugs.
 *
 * @type {Object<Drug#constructor>}
 */
const build = {
  Doliprane: (expiresIn, benefit) =>
    new Drug({ ...drugs.doliprane, expiresIn, benefit }),
  HerbalTea: (expiresIn, benefit) =>
    new Drug({ ...drugs.herbalTea, expiresIn, benefit }),
  Fervex: (expiresIn, benefit) =>
    new Drug({ ...drugs.fervex, expiresIn, benefit }),
  MagicPill: (expiresIn, benefit) =>
    new Drug({ ...drugs.magicPill, expiresIn, benefit }),
  Dafalgan: (expiresIn, benefit) =>
    new Drug({ ...drugs.dafalgan, expiresIn, benefit })
};

/**
 * Drug represents a specific instance of a drug (and not general information about a kind of drug) that is available
 * for sell.
 *
 * @class Drug
 * */
class Drug {
  /**
   * @typedef {Object} DrugSetup
   *
   * @property {string} name - the name of the drug
   * @property {number} expiresIn - denotes the number of days we have until the item expires
   * @property {number} benefit - denotes how powerful the drug is
   * @property {UpdateRule} rule - rule to update the drug properties over time
   */

  /**
   * @param {DrugSetup} params - instantiate new drug with parameters
   *
   * @return Drug
   */
  constructor(params) {
    // Check parameters.
    const { name, expiresIn, benefit, rule } = params;

    // Enforce name not to be empty.
    if (name == null || name === "") {
      throw new Error("illegal drug name: cannot be empty");
    }

    if (benefit < 0) {
      throw new Error(
        `illegal drug benefit value ${benefit}: cannot be lower than 0`
      );
    }

    if (benefit > maxBenefit) {
      throw new Error(
        `illegal drug benefit value ${benefit}: cannot be greater than ${maxBenefit}`
      );
    }

    this.name = name;
    this.expiresIn = expiresIn;
    this.benefit = benefit;
    this.rule = rule;

    this.update = this.update.bind(this);
  }

  update() {
    // Will still work for Infinity values since they are never changed when decreased.
    this.expiresIn--;
    this.benefit += this.rule(this);
  }
}

export default Drug;
export { drugs, build };
