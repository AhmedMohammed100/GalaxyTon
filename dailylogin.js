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

    const loginButton = document.getElementById('daily-login-btn');
    const loginStatus = document.getElementById('login-status');
    const pointsDisplay = document.getElementById('points');

    // Initialize points from localStorage or set to 0 if not present
    let points = parseInt(localStorage.getItem('points')) || 0;
    pointsDisplay.textContent = points; // Display current points

    // Check if the user has logged in today
    function hasLoggedInToday() {
        const today = new Date().toISOString().split('T')[0]; // Get today's date in YYYY-MM-DD format
        const lastLoginDate = localStorage.getItem('lastLoginDate');
        return lastLoginDate === today;
    }

    // Set the login date to today in localStorage
    function setLoginDate() {
        const today = new Date().toISOString().split('T')[0];
        localStorage.setItem('lastLoginDate', today);
    }

    // Update points in localStorage and UI
    function addPoints(pointsToAdd) {
        // Increment the points
        points += pointsToAdd;
        // Store the updated points in localStorage
        localStorage.setItem('points', points); 
        // Update the points displayed on the UI
        pointsDisplay.textContent = points;
    }

    // Disable the button and show a message after the login is claimed
    function disableLogin() {
        loginButton.disabled = true;
        loginButton.style.backgroundColor = '#ccc';
        loginStatus.textContent = "You have already claimed your daily reward!";
        loginStatus.classList.add('already-logged-in');
    }

    // Handle the login button click
    loginButton.addEventListener('click', function() {
        if (hasLoggedInToday()) {
            loginStatus.textContent = "You have already logged in today!";
            loginStatus.classList.add('already-logged-in');
        } else {
            setLoginDate();
            addPoints(10); // Add 10 points for the daily login
            loginStatus.textContent = "Daily reward claimed! Come back tomorrow.";
            loginStatus.classList.add('success');
            disableLogin();
        }
    });

    // Check if the user has already logged in today when the page loads
    document.addEventListener('DOMContentLoaded', function() {
        if (hasLoggedInToday()) {
            disableLogin();
        }

// dailylogin.js (Daily Login)
let dailyLoginScore = 0;

// Load daily login score from localStorage or initialize to 0
function loadDailyLoginScore() {
    const savedDailyLoginScore = localStorage.getItem('dailyLoginScore');
    return savedDailyLoginScore ? parseInt(savedDailyLoginScore) : 0;
}

// Save daily login score to localStorage
function saveDailyLoginScore() {
    localStorage.setItem('dailyLoginScore', dailyLoginScore);
}

// Add daily login points and update the score
function addDailyLoginPoints(points) {
    dailyLoginScore += points;
    saveDailyLoginScore();
    
    // Display daily login score on the daily login page
    const dailyLoginScoreElement = document.getElementById('daily-login-score');
    if (dailyLoginScoreElement) {
        dailyLoginScoreElement.innerText = `Total Points: ${dailyLoginScore}`;
    }
}

// Initialize daily login
function initializeDailyLogin() {
    dailyLoginScore = loadDailyLoginScore(); // Load stored points
    addDailyLoginPoints(30); // Example: Add 30 points for logging in today
}

// Start the daily login process when the page loads
initializeDailyLogin();

})
})