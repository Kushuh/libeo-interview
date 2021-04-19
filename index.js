import { Drug, Pharmacy } from "./pharmacy";
import fs from "fs";

// Instantiate available drugs.
const drugs = [
  new Drug("Doliprane", 20, 30),
  new Drug("Herbal Tea", 10, 5),
  new Drug("Fervex", 5, 40),
  new Drug("Magic Pill", 15, 40)
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
fs.writeFile("output.txt", log, err => {
  if (err) {
    console.log("error");
  } else {
    console.log("success");
  }
});
/* eslint-enable no-console */
