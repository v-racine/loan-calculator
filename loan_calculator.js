//Ask user for the loan amount
//Ask user for the APR
//Calculate the monthly interest rate
//Ask user for loan duration in years
//Calculate the loan duration in months

//Print the monthly payment to the terminal

// let monthlyPayment =
//   loanAmount *
//   (monthlyIntRate / (1 - Math.pow(1 + monthlyIntRate, -loanDurationM)));

const readline = require("readline-sync");
const MESSAGES = require("./loan_calc_messages.json");
const MONTHS = 12;
const DIVISION_TO_GET_PERCENTAGE = 100;

//main function
function loanCalculator() {
  greeting();
  let anotherCalc = "y";
  while (anotherCalc === "y" || anotherCalc === "yes") {
    const loanAmount = determineLoanAmount();
    const loanDurationMonths = determineLoanDuration();
    const monthlyInterestRate = determineMonthlyInterestRate();
    const monthlyPayment = determineMonthlyPayment(
      loanAmount,
      loanDurationMonths,
      monthlyInterestRate
    );
    printMonthlyPayment(monthlyPayment);
    anotherCalc = keepCalculating();
    console.clear();
  }
  prompt(MESSAGES["farewell"]);
}

loanCalculator();

//helper functions
function greeting() {
  prompt(MESSAGES["welcome"]);
}

function determineLoanAmount() {
  prompt(MESSAGES["loanAmount"]);
  let num = readline.question();

  while (invalidNumber(num)) {
    prompt(MESSAGES["invalidNumber"]);
    num = readline.question();
  }

  return Number(num);
}

function determineLoanDuration() {
  prompt(MESSAGES["loanDurationYears"]);
  let num = readline.question();

  while (invalidNumber(num)) {
    prompt(MESSAGES["invalidNumber"]);
    num = readline.question();
  }

  return Number(num) * MONTHS;
}

function determineMonthlyInterestRate() {
  prompt(MESSAGES["apr"]);
  let num = readline.question();

  while (invalidNumber(num)) {
    prompt(MESSAGES["invalidNumber"]);
    num = readline.question();
  }
  return Number(num) / MONTHS / DIVISION_TO_GET_PERCENTAGE;
}

function determineMonthlyPayment(
  loanAmount,
  loanDurationMonths,
  monthlyInterestRate
) {
  let result =
    loanAmount *
    (monthlyInterestRate /
      (1 - Math.pow(1 + monthlyInterestRate, -loanDurationMonths)));

  return Number(result).toFixed(2);
}

function printMonthlyPayment(result) {
  console.log(MESSAGES["result"], result);
}

function keepCalculating() {
  prompt(MESSAGES["runProgram"]);
  anotherCalc = readline.question();

  while (!validYesOrNo(anotherCalc)) {
    prompt(MESSAGES["invalidChoice"]);
    anotherCalc = readline.question();
  }
  return anotherCalc.toLowerCase();
}

function validYesOrNo(input) {
  input = input.toLowerCase();
  return ["y", "yes", "n", "no"].includes(input);
}

function invalidNumber(num) {
  return (
    num.trimStart() === "" || Number.isNaN(Number(num)) || Number(num) <= 0
  );
}

function prompt(message) {
  console.log(`=> ${message}`);
}
