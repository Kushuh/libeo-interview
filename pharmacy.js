/**
 * Pharmacy can sell many drugs that are available.
 *
 * @class Pharmacy
 *
 * @property {Function} updateBenefitValue {@link Pharmacy#updateBenefitValue}
 * */
class Pharmacy {
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
    for (const i in this.drugs) {
      this.drugs[i].update();
    }

    return this.drugs;
  }
}

export default Pharmacy;
