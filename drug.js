import rules from "./drug_rules";

/**
 * maxBenefit is a constant representing the maximum benefit value a drug can have.
 *
 * @type {number}
 */
const maxBenefit = 50;

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
  }
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
      throw new Error("drug name cannot be empty");
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

    this.#name = name;
    this.#expiresIn = expiresIn;
    this.#benefit = benefit;
    this.#rule = rule;
  }

  /**
   * @type string
   * @description the name of the drug
   */
  #name;

  /**
   * @type number
   * @description denotes the number of days we have until the item expires
   */
  #expiresIn;

  /**
   * @type number
   * @description denotes how powerful the drug is
   */
  #benefit;

  /**
   * @type UpdateRule
   * @description rule to update the drug properties over time
   */
  #rule;

  /**
   * returns the name of the current drug.
   *
   * @return {string}
   */
  getName = () => this.#name;

  /**
   * returns the remaining days befor expiry
   *
   * @return {number}
   */
  getExpiry = () => this.#expiresIn;

  /**
   * returns the current benefit value of the drug.
   *
   * @return {number}
   */
  getBenefit = () => this.#benefit;
}

export default Drug;
export { drugs };