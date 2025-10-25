const billInput = document.querySelector(".BILL input");
const peopleInput = document.querySelector(".number_of_people input");
const tipButtons = document.querySelectorAll(".BTNs button");
const customBtn = document.querySelector("._custom_");
const tipAmountResult = document.querySelector(".tip_amount_RESULT");
const totalResult = document.querySelector(".total_RESULT");
const resetBtn = document.querySelector(".reset");
const errorText = document.querySelector(".error-text");

let tipPercent = 0;

// ფუნქცია: გამოთვლა
function calculateTip() {
  const bill = parseFloat(billInput.value);
  const people = parseInt(peopleInput.value);

  if (!bill || bill <= 0) {
    tipAmountResult.textContent = "...";
    totalResult.textContent = "...";
    return;
  }

  if (!people || people <= 0) {
    errorText.textContent = "Can't be zero";
    tipAmountResult.textContent = "...";
    totalResult.textContent = "...";
    peopleInput.style.border = "2px solid red";
    return;
  } else {
    errorText.textContent = "";
    peopleInput.style.border = "none";
  }

  const tipPerPerson = (bill * tipPercent) / 100 / people;
  const totalPerPerson = bill / people + tipPerPerson;

  tipAmountResult.textContent = `$${tipPerPerson.toFixed(2)}`;
  totalResult.textContent = `$${totalPerPerson.toFixed(2)}`;
}

// Tip ღილაკების ფუნქციონალი
tipButtons.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    tipButtons.forEach((b) => b.classList.remove("active"));
    e.target.classList.add("active");

    if (e.target.classList.contains("_custom_")) {
      const custom = prompt("Enter custom tip percentage:");
      tipPercent = parseFloat(custom) || 0;
    } else {
      tipPercent = parseFloat(e.target.textContent.replace("%", ""));
    }

    calculateTip();
  });
});

// Input ცვლილება
[billInput, peopleInput].forEach((input) => {
  input.addEventListener("input", calculateTip);
});

// RESET ღილაკი
resetBtn.addEventListener("click", () => {
  billInput.value = "";
  peopleInput.value = "";
  tipPercent = 0;
  tipButtons.forEach((b) => b.classList.remove("active"));
  tipAmountResult.textContent = "...";
  totalResult.textContent = "...";
  errorText.textContent = "";
  peopleInput.style.border = "none";
});
