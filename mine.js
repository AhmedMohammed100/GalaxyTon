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
