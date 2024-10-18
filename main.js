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
    const questions = [
      {
          question: "What is the name of the first cryptocurrency ever created?",
          answers: [
              { text: "Bitcoin", correct: true },
              { text: "Ethereum", correct: false },
              { text: "Litecoin", correct: false },
              { text: "Ripple", correct: false }
          ]
      },
      {
          question: "What technology underpins cryptocurrencies like Bitcoin?",
          answers: [
              { text: "Blockchain", correct: true },
              { text: "Quantum Computing", correct: false },
              { text: "AI Networks", correct: false },
              { text: "Cloud Storage", correct: false }
          ]
      },
      {
          question: "Which of these is the primary function of Ethereum?",
          answers: [
              { text: "Smart Contracts", correct: true },
              { text: "Cross-border payments", correct: false },
              { text: "Decentralized Storage", correct: false },
              { text: "Cryptographic Proofs", correct: false }
          ]
      },
      {
          question: "What is the smallest unit of Bitcoin called?",
          answers: [
              { text: "Satoshi", correct: true },
              { text: "Ether", correct: false },
              { text: "Lite", correct: false },
              { text: "Shatoshi", correct: false }
          ]
      },
      {
          question: "What is a private key used for in cryptocurrency?",
          answers: [
              { text: "To sign transactions and prove ownership", correct: true },
              { text: "To mine new coins", correct: false },
              { text: "To create smart contracts", correct: false },
              { text: "To generate new tokens", correct: false }
          ]
      }
  ];
  
  let currentQuestionIndex = 0;
  let score = 0;
  let timeRemaining = 30; // 30 seconds per question
  let timer; // Variable for the timer interval
  let hasAnswered = false; // Track if an answer has been picked
  
  const questionElement = document.getElementById('question');
  const answerButtonsElement = document.getElementById('answer-buttons');
  const scoreElement = document.getElementById('score');
  const timerElement = document.createElement('p'); // Timer display
  timerElement.setAttribute('id', 'timer');
  
  document.body.appendChild(timerElement); // Append the timer at the bottom of the page
  
  // Retrieve saved score from localStorage or initialize to 0
  function loadScore() {
      const savedScore = localStorage.getItem('cryptoQuizScore');
      return savedScore ? parseInt(savedScore) : 0;
  }
  
  function saveScore() {
      localStorage.setItem('cryptoQuizScore', score);
  }
  
  // Save today's date as the completion date
  function saveCompletionDate() {
      const today = new Date().toISOString().split('T')[0]; // Get today's date in YYYY-MM-DD format
      localStorage.setItem('quizCompletionDate', today);
  }
  
  // Check if the quiz was already completed today
  function quizCompletedToday() {
      const today = new Date().toISOString().split('T')[0]; // Get today's date
      const savedDate = localStorage.getItem('quizCompletionDate');
      return savedDate === today; // Returns true if the quiz was completed today
  }
  
  function startTimer() {
      clearInterval(timer); // Clear any existing timer
      timeRemaining = 30; // Reset the time for each question (set to 30 seconds)
      timer = setInterval(() => {
          if (timeRemaining <= 0) {
              clearInterval(timer);
              hasAnswered = false; // Reset answer state
              if (currentQuestionIndex < questions.length - 1) {
                  currentQuestionIndex++;
                  showQuestion();
              } else {
                  endGame(); // End the game after the last question
              }
          } else {
              updateTimerDisplay();
              timeRemaining--;
          }
      }, 1000);
  }
  
  function updateTimerDisplay() {
      // Format the time as MM:SS
      const minutes = Math.floor(timeRemaining / 60);
      const seconds = timeRemaining % 60;
      timerElement.innerText = `Time left for this question: ${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  }
  
  function startGame() {
      if (quizCompletedToday()) {
          // If the quiz has already been completed today, prevent restarting
          questionElement.innerText = "You have already completed the quiz today. Come back tomorrow!";
          answerButtonsElement.innerHTML = ""; // Clear any answer buttons
          return;
      }
      
      currentQuestionIndex = 0;
      score = loadScore(); // Load score from localStorage
      scoreElement.innerText = 'Score: ' + score;
      hasAnswered = false;
      showQuestion();
  }
  
  function showQuestion() {
      resetState();
      const currentQuestion = questions[currentQuestionIndex];
      questionElement.innerText = currentQuestion.question;
      
      currentQuestion.answers.forEach(answer => {
          const button = document.createElement('button');
          button.innerText = answer.text;
          button.classList.add('answer-btn');
          if (answer.correct) {
              button.dataset.correct = answer.correct;
          }
          button.addEventListener('click', selectAnswer);
          answerButtonsElement.appendChild(button);
      });
      startTimer(); // Start the timer for the question
  }
  
  function resetState() {
      clearInterval(timer); // Stop the previous timer
      while (answerButtonsElement.firstChild) {
          answerButtonsElement.removeChild(answerButtonsElement.firstChild);
      }
  }
  
  function selectAnswer(e) {
      if (hasAnswered) return; // Prevent multiple answers
      
      const selectedButton = e.target;
      const correct = selectedButton.dataset.correct === 'true';
      
      if (correct) {
          score += 10;
          scoreElement.innerText = 'Score: ' + score;
          saveScore(); // Save the updated score in localStorage
      }
  
      Array.from(answerButtonsElement.children).forEach(button => {
          setStatusClass(button, button.dataset.correct);
          button.disabled = true; // Disable all buttons after an answer is selected
      });
      
      hasAnswered = true; // Mark that the question has been answered
  }
  
  function setStatusClass(element, correct) {
      element.classList.remove('correct');
      element.classList.remove('wrong');
      if (correct) {
          element.classList.add('correct');
      } else {
          element.classList.add('wrong');
      }
  }
  
  function endGame() {
      questionElement.innerText = "Quiz finished! Your final score is: " + score;
      saveCompletionDate(); // Save today's date as the completion date
      resetState();
  }
  
  // Initialize the game and persist score
  function initializeGame() {
      score = loadScore(); // Load score from localStorage
      scoreElement.innerText = 'Score: ' + score;
      startGame(); // Start the quiz
  }
  
  // Start the quiz
  initializeGame();
       
})  