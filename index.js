import Pharmacy from "./pharmacy";
import { build } from "./drug";
import fs from "fs";

// Instantiate available drugs.
const drugs = [
  build.Doliprane(20, 30),
  build.HerbalTea(10, 5),
  build.Fervex(5, 40),
  build.MagicPill(15, 40),
  build.Dafalgan(20, 50)
];

// Instantiate a pharmacy to sell the drugs.
const trial = new Pharmacy(drugs);

// Logs saves drug data over a period of 30 days.
const log = [];

// Update drugs status.
for (let elapsedDays = 0; elapsedDays < 30; elapsedDays++) {
  log.push(JSON.stringify(trial.updateBenefitValue()));
}

// Write logs to file.
/* eslint-disable no-console */
fs.writeFile("output.txt", `[\n\t${log.join(",\n\t")}\n]`, err => {
  if (err) {
    console.log("error");
  } else {
    console.log("success");
  }
});
/* eslint-enable no-console */
