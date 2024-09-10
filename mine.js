
        let points = 0;
        const claimInterval = 200; // Time in seconds before the button can be clicked again
        let claimButton = document.getElementById('claim-button');
        let timerDisplay = document.getElementById('timer');
        let countdown;

        function claimPoints() {
            points += 200;
            document.getElementById('points').textContent = 'Points: ' + points;

            claimButton.disabled = true;
            startTimer(claimInterval);
        }

        function startTimer(duration) {
            let timeRemaining = duration;
            countdown = setInterval(() => {
                timeRemaining--;
                timerDisplay.textContent = 'Next claim available in: ' + timeRemaining + ' seconds';

                if (timeRemaining <= 0) {
                    clearInterval(countdown);
                    claimButton.disabled = false;
                    timerDisplay.textContent = 'You can claim points now!';
                }
            }, 1000);
        }

        const themeCheckbox = document.getElementById('theme-checkbox');
        const body = document.body;

        // Load theme based on previous selection (if any)
        if (localStorage.getItem('darkTheme') === 'enabled') {
            body.classList.add('dark-theme');
            themeCheckbox.checked = true;
        }

        themeCheckbox.addEventListener('change', () => {
            if (themeCheckbox.checked) {
                body.classList.add('dark-theme');
                localStorage.setItem('darkTheme', 'enabled');
            } else {
                body.classList.remove('dark-theme');
                localStorage.setItem('darkTheme', 'disabled');
            }
        });

        let score = 0;

        document.getElementById('tap-button').addEventListener('click', function() {
            score++;
            document.getElementById('score').textContent = 'Score: ' + score;
        });

        const loginButton = document.getElementById('login-button');
        const message = document.getElementById('message');
        const streakDisplay = document.getElementById('streak');

        // Check for stored data
        let lastLogin = localStorage.getItem('lastLoginDate');
        let loginStreak = parseInt(localStorage.getItem('loginStreak')) || 0;

        function dailyLogin() {
            const currentDate = new Date().toDateString();

            // Check if the user has already logged in today
            if (lastLogin === currentDate) {
                message.textContent = "You've already logged in today!";
                loginButton.disabled = true;
            } else {
                // Update the login date and streak
                if (lastLogin && isYesterday(new Date(lastLogin), new Date())) {
                    loginStreak++;
                } else {
                    loginStreak = 1;
                }

                lastLogin = currentDate;
                localStorage.setItem('lastLoginDate', lastLogin);
                localStorage.setItem('loginStreak', loginStreak);

                message.textContent = "Thank you for logging in!";
                streakDisplay.textContent = "Current Streak: " + loginStreak + " day(s)";
                loginButton.disabled = true;
            }
        }

        // Function to check if the last login was yesterday
        function isYesterday(lastLoginDate, currentDate) {
            const yesterday = new Date(currentDate);
            yesterday.setDate(yesterday.getDate() - 1);
            return lastLoginDate.toDateString() === yesterday.toDateString();
        }

        // Display the streak and disable the button if logged in today
        function displayLoginStatus() {
            if (lastLogin === new Date().toDateString()) {
                message.textContent = "You've already logged in today!";
                loginButton.disabled = true;
            }
            streakDisplay.textContent = "Current Streak: " + loginStreak + " day(s)";
        }

        // Run display status on page load
        displayLoginStatus();

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