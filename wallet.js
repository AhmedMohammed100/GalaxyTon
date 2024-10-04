// script.js

// Initial balance
let balance = 0;

// Function to update the displayed balance
function updateBalance() {
  document.getElementById("balance").innerText = balance;
}

// Function to deposit tokens
function deposit() {
  let depositAmount = parseFloat(document.getElementById("deposit-amount").value);

  // Check if the deposit amount is valid
  if (isNaN(depositAmount) || depositAmount <= 0) {
    showErrorMessage("Please enter a valid deposit amount.");
    return;
  }

  balance += depositAmount; // Add to balance
  updateBalance(); // Update balance display
  clearInput("deposit-amount");
  clearErrorMessage();
}

// Function to withdraw tokens
function withdraw() {
  let withdrawAmount = parseFloat(document.getElementById("withdraw-amount").value);

  // Check if the withdraw amount is valid
  if (isNaN(withdrawAmount) || withdrawAmount <= 0) {
    showErrorMessage("Please enter a valid withdrawal amount.");
    return;
  }

  // Check if there are sufficient funds
  if (withdrawAmount > balance) {
    showErrorMessage("Insufficient balance.");
    return;
  }

  balance -= withdrawAmount; // Subtract from balance
  updateBalance(); // Update balance display
  clearInput("withdraw-amount");
  clearErrorMessage();
}

// Function to display error messages
function showErrorMessage(message) {
  document.getElementById("error-message").innerText = message;
}

// Function to clear error messages
function clearErrorMessage() {
  document.getElementById("error-message").innerText = "";
}

// Function to clear input fields
function clearInput(inputId) {
  document.getElementById(inputId).value = "";
}


$(document).ready(function () {
    $(".menu-links li a").click(function (e) {
      $(".menu-links li.active").removeClass("active");
      var $parent = $(this).parent();
      $parent.addClass("active");
    });
    $(".hamburger-icon").click(function () {
      $(".menu-links").toggleClass("left");
    });
    $(".hamburger-icon").click(function () {
      $(this).toggleClass("ham-style");
    });
    const themeSwitch = document.querySelector("#checkbox");
    themeSwitch.addEventListener("change", () => {
      document.body.classList.toggle("dark-theme");
    });
});