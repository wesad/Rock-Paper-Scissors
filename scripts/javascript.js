let score = JSON.parse(localStorage.getItem('score'));

if (score === null) {
    score = {
        wins: 0,
        losses: 0,
        ties: 0
    };
    }

    updateScore();

let isAutoPlay = false;
let intervalId;

function autoPlay() {
  if (!isAutoPlay) {
    intervalId = setInterval(() => {
    const playerMove = pickComputerMove();
    Play(playerMove);
  }, 1000);
    isAutoPlay = true;

  } else {
    clearInterval(intervalId);
    isAutoPlay = false;
  }
  
}

document.querySelector('.js-rock')
    .addEventListener('click', () => {
        Play('rock')
    });

document.querySelector('.js-paper')
    .addEventListener('click', () => {
        Play('paper')
    });

document.querySelector('.js-scissors')
    .addEventListener('click', () => {
        Play('scissors')
    });

document.querySelector('.js-reset')
    .addEventListener('click', () => {
       score.wins = 0;
       score.losses = 0;
       score.ties = 0;
       localStorage.removeItem('score');
       updateScore();
    });

document.querySelector('.js-auto-play')
    .addEventListener('click', () => {
        autoPlay()
    });

document.body.addEventListener('keydown', (event) => {
  if (event.key === 'r') {
    Play('rock');
  } else if (event.key === 'p') {
    Play('paper');
  } else if (event.key === 's') {
    Play('scissors');
  }
});

function Play(playerMove) {
  const computerMove = pickComputerMove();
  let result = '';
  
  if (playerMove === 'scissors') {
      if (computerMove === 'scissors') {
        result = 'Tie.';
      } else if (computerMove === 'paper') {
        result = 'You win.';
      } else if (computerMove === 'rock') {
        result = 'You lose.';
      }

  } else if (playerMove === 'paper') {
      if (computerMove === 'paper') {
        result = 'Tie.';
      } else if (computerMove === 'rock') {
        result = 'You win.';
      } else if (computerMove === 'scissors') {
        result = 'You lose.';
      }

  } else if (playerMove === 'rock') {
        if (computerMove === 'rock') {
        result = 'Tie.';
      } else if (computerMove === 'paper') {
        result = 'You lose.';
      } else if (computerMove === 'scissors') {
        result = 'You win.';
      }
  }

  if (result === 'You win.') {
    score.wins = score.wins + 1;
  } else if (result === 'You lose.') {
    score.losses = score.losses + 1
  } else if (result === 'Tie.') {
    score.ties = score.ties + 1
  }

  localStorage.setItem('score', JSON.stringify(score));

  updateScore();

  document.querySelector('.js-result')
    .innerHTML = result;

  document.querySelector('.js-moves')
    .innerHTML = `You
            <img src="images/${playerMove}.png" class="move-icon">
            <img src="images/${computerMove}.png" class="move-icon">
            Computer`;
}

function pickComputerMove() {
  const randomNumber = Math.random();
  let computerMove = '';

  if (randomNumber >= 0 && randomNumber < 1 / 3) {
    computerMove = 'rock';
  } else if (randomNumber >= 1 / 3 && randomNumber < 2 / 3) {
    computerMove = 'paper';
  } else if (randomNumber >= 2 / 3 && randomNumber < 1) {
    computerMove = 'scissors';
  }

  return computerMove;
}

function updateScore() {
    document.querySelector('.js-score')
        .innerHTML = `Wins: ${score.wins}, Losses: ${score.losses}, Ties: ${score.ties}`;
}
