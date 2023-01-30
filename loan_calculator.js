//Ask user for the loan amount
//Ask user for the APR
//Calculate the monthly interest rate
//Ask user for loan duration in years
//Calculate the loan duration in months

//Print the monthly payment to the terminal

// let monthlyPayment =
//   loanAmount *
//   (monthlyIntRate / (1 - Math.pow(1 + monthlyIntRate, -loanDurationM)));

const READLINE = require("readline-sync");
const MESSAGES = require("./loan_calc_messages.json");
const MONTHS = 12;

//main function
function loanCalculator() {
  greeting();
  let num;
  let anotherCalc = "y";
  while (anotherCalc === "y") {
    const loanAmount = determineLoanAmount(num);
    const loanDurationMonths = determineLoanDuration(num);
    const monthlyInterestRate = determineMonthlyInterestRate(num);
    const monthlyPayment = determineMonthlyPayment(
      loanAmount,
      loanDurationMonths,
      monthlyInterestRate
    );
    printMonthlyPayment(monthlyPayment);
    anotherCalc = keepCalculating();
    console.clear();
  }
}

loanCalculator();

//helper functions
function greeting() {
  prompt(MESSAGES["welcome"]);
}

function determineLoanAmount(num) {
  prompt(MESSAGES["loanAmount"]);
  num = READLINE.question();

  while (invalidNumber(num)) {
    prompt(MESSAGES["invalidNumber"]);
    num = READLINE.question();
  }

  return Number(num);
}

function determineLoanDuration(num) {
  prompt(MESSAGES["loanDurationYears"]);
  num = READLINE.question();

  while (invalidNumber(num)) {
    prompt(MESSAGES["invalidNumber"]);
    num = READLINE.question();
  }

  return Number(num) * MONTHS;
}

function determineMonthlyInterestRate(num) {
  prompt(MESSAGES["apr"]);
  num = READLINE.question();

  while (invalidNumber(num)) {
    prompt(MESSAGES["invalidNumber"]);
    num = READLINE.question();
  }

  return Number(num) / MONTHS / 100;
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
  let anotherCalc = READLINE.question();

  while (!validAnswer(anotherCalc)) {
    prompt(MESSAGES["invalidChoice"]);
    anotherCalc = READLINE.question();
  }
  return anotherCalc.toLowerCase();
}

function validAnswer(input) {
  input = input.toLowerCase();
  return ["y", "yes", "n", "no"].includes(input);
}

function invalidNumber(number) {
  return (
    number.trimStart() === "" ||
    Number.isNaN(Number(number)) ||
    Number(number) <= 0
  );
}

function prompt(message) {
  console.log(`=> ${message}`);
}
