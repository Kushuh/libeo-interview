/**
 * maxBenefit is a constant representing the maximum benefit value a drug can have.
 *
 * @type {number}
 */
const maxBenefit = 50;

/**
 * @typedef {function} UpdateRule
 *
 * @param {Drug} drug
 *
 * @return {number} updateValue - value to add/remove to the current benefit value of the drug.
 */

/**
 * List available drugs update rules here to be able to reuse them easily.
 *
 * @type {Object<UpdateRule>}
 */
const rules = {
  standard: drug => {
    const currentBenefit = drug.benefit;

    // Prevent benefit from being lower than 0.
    if (currentBenefit === 0) {
      return 0;
    }

    // Drug benefit decreases twice as fast passed expiry date, however it is also important to ensure the benefit
    // value stays positive.
    if (drug.expiresIn < 0 && currentBenefit > 1) {
      return -2;
    }

    return -1;
  },
  herbalTea: drug => {
    const currentBenefit = drug.benefit;

    // Prevent benefit from being greater than 50.
    if (currentBenefit === maxBenefit) {
      return 0;
    }

    // Drug benefit increases twice as fast passed expiry date, however it is also important to ensure the benefit
    // value stays under or equal to maxBenefit.
    if (drug.expiresIn < 0 && currentBenefit < maxBenefit - 1) {
      return 2;
    }

    return 1;
  },
  fervex: drug => {
    const currentBenefit = drug.benefit;
    const currentExpiry = drug.expiresIn;

    // Set benefit to 0 passed expiration date.
    if (currentExpiry < 0) {
      return -currentBenefit;
    }

    // Increases by 3 when there is 5 or less days left before expiry.
    if (currentExpiry <= 5) {
      if (currentBenefit <= maxBenefit - 3) {
        return 3;
      }

      return maxBenefit - currentBenefit;
    }

    // Increases by 2 when there is 10 or less days left before expiry.
    if (currentExpiry <= 10 && currentBenefit < maxBenefit - 1) {
      return 2;
    }

    return 1;
  },
  magicPill: () => 0,
  dafalgan: drug => {
    const currentBenefit = drug.benefit;

    // Prevent benefit from being lower than 0.
    if (currentBenefit === 0) {
      return 0;
    }

    // Dafalgan benefit decreases twice as fast as standard drug.
    if (drug.expiresIn < 0) {
      if (currentBenefit > 4) {
        return -4;
      }

      return -currentBenefit;
    }

    if (currentBenefit > 1) {
      return -2;
    }

    return -1;
  }
};

export default rules;
export { maxBenefit };
