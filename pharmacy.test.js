import Pharmacy from "./pharmacy";
import { build } from "./drug";

describe("Pharmacy", () => {
  it("should decrease the benefit and expiresIn", () => {
    const drugs = new Pharmacy([build.Doliprane(2, 3)]).updateBenefitValue();
    expect(drugs.length).toBe(1);
    expect(drugs[0].expiresIn).toBe(1);
    expect(drugs[0].benefit).toBe(2);
  });
});
