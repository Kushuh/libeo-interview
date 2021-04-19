/**
 * Drug represents a specific instance of a drug (and not general information about a kind of drug) that is available
 * for sell.
 *
 * @class Drug
 * */
export class Drug {
  /**
   * @param {string} name - the name of the drug
   * @param {number} expiresIn - denotes the number of days we have until the item expires
   * @param {number} benefit - denotes how powerful the drug is
   *
   * @return Drug
   * */
  constructor(name, expiresIn, benefit) {
    this.name = name;
    this.expiresIn = expiresIn;
    this.benefit = benefit;
  }
}

/**
 * Pharmacy can sell many drugs that are available.
 *
 * @class Pharmacy
 *
 * @property {Function} updateBenefitValue {@link Pharmacy#updateBenefitValue}
 * */
export class Pharmacy {
  /**
   * @param {Array<Drug>} drugs - available drugs in the pharmacy.
   *
   * @return Drug
   * */
  constructor(drugs = []) {
    this.drugs = drugs;
  }

  /**
   * Updates metadata for all drugs available in the pharmacy.
   *
   * @return {Array<Drug>}
   */
  updateBenefitValue() {
    // Loop through each available drug.
    for (var i = 0; i < this.drugs.length; i++) {
      // Both Herbal Tea and Fervex have increasing benefit over time.
      if (
        this.drugs[i].name != "Herbal Tea" &&
        this.drugs[i].name != "Fervex"
      ) {
        // Benefit cannot have negative values.
        if (this.drugs[i].benefit > 0) {
          // Magic Pill value does not change over time.
          if (this.drugs[i].name != "Magic Pill") {
            // Update drug benefit.
            this.drugs[i].benefit = this.drugs[i].benefit - 1;
          }
        }
      } else {
        // Item benefit can never be greater than 50.
        if (this.drugs[i].benefit < 50) {
          // Increase benefit value.
          this.drugs[i].benefit = this.drugs[i].benefit + 1;
          // Fervex benefit increases differently depending on the remaining days before expiry.
          if (this.drugs[i].name == "Fervex") {
            if (this.drugs[i].expiresIn < 11) {
              if (this.drugs[i].benefit < 50) {
                this.drugs[i].benefit = this.drugs[i].benefit + 1;
              }
            }
            if (this.drugs[i].expiresIn < 6) {
              if (this.drugs[i].benefit < 50) {
                this.drugs[i].benefit = this.drugs[i].benefit + 1;
              }
            }
          }
        }
      }
      // Every drug except magic pill expires over time, so the remaining days value should be decreased.
      if (this.drugs[i].name != "Magic Pill") {
        this.drugs[i].expiresIn = this.drugs[i].expiresIn - 1;
      }
      // Drug has expired.
      if (this.drugs[i].expiresIn < 0) {
        // Herbal tea benefit never stops increasing until it reaches max value, then never decreases.
        if (this.drugs[i].name != "Herbal Tea") {
          if (this.drugs[i].name != "Fervex") {
            if (this.drugs[i].benefit > 0) {
              if (this.drugs[i].name != "Magic Pill") {
                this.drugs[i].benefit = this.drugs[i].benefit - 1;
              }
            }
          } else {
            this.drugs[i].benefit =
              this.drugs[i].benefit - this.drugs[i].benefit;
          }
        } else {
          if (this.drugs[i].benefit < 50) {
            this.drugs[i].benefit = this.drugs[i].benefit + 1;
          }
        }
      }
    }

    return this.drugs;
  }
}
