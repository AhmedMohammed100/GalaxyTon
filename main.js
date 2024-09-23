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
    let miningActive = false;
let miningInterval;
let balance = 0;
let minedCoins = 0;

const balanceDisplay = document.getElementById('balance');
const statusDisplay = document.getElementById('status');
const mineButton = document.getElementById('mine-btn');
const collectButton = document.getElementById('collect-btn');

// Function to start mining
mineButton.addEventListener('click', function () {
  if (!miningActive) {
    miningActive = true;
    mineButton.innerHTML = 'Stop Mining';
    statusDisplay.innerHTML = 'Mining started...';

    // Start mining process (earn 1 coin every second)
    miningInterval = setInterval(() => {
      minedCoins++;
      statusDisplay.innerHTML = `You have mined ${minedCoins} coins.`;
    }, 1000);
  } else {
    miningActive = false;
    mineButton.innerHTML = 'Start Mining';
    statusDisplay.innerHTML = 'Mining stopped.';
    clearInterval(miningInterval);
  }
});

// Function to collect mined coins and update balance
collectButton.addEventListener('click', function () {
  if (minedCoins > 0) {
    balance += minedCoins;
    balanceDisplay.innerHTML = balance;
    statusDisplay.innerHTML = `You collected ${minedCoins} coins!`;
    minedCoins = 0;
  } else {
    statusDisplay.innerHTML = 'No coins to collect!';
  }
});
  });

  