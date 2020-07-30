const api = require('./api')
const ui = require('./ui')
const onStartGame = function (event) {
  event.preventDefault()
  api.startGame()
    .then(ui.startGameSuccess)
    .catch(ui.startGameFailure)
  api.getGames()
    .then(displayGames)
}
const displayGames = function (response) {
  $('#games-played').text(response.games.length)
}

const gameSpots = document.querySelectorAll('.game-spots')
let currentMove = 'X'
// resets gameboard
const onReset = () => {
  for (let i = 0; i < gameSpots.length; i++) {
    gameSpots[i].innerHTML = ''
    gameSpots[i].style.backgroundColor = 'black'
    gameSpots[i].style.pointerEvents = 'none'
  }
  $('#message').text('Start game!')
  $('#status').text('')
}

const onCellClick = (e) => {
  // display move, check winner, switch user
  if (currentMove === 'X') {
    api.userChoice(e.target.dataset.cellIndex, currentMove)
      .then(ui.userChoiceSuccess)
      .catch(ui.userChoiceFailure)
    $('#' + e.target.id).append('<img class="spot-image" src="https://i.imgur.com/IEgRX0a.png"/>')
    currentMove = '0'
  } else {
    api.userChoice(e.target.dataset.cellIndex, currentMove)
      .then(ui.userChoiceSuccess)
      .catch(ui.userChoiceFailure)
    $('#' + e.target.id).append('<img class="spot-image" src="https://i.imgur.com/q1pdA4g.png"/>')
    currentMove = 'X'
  }
  e.target.style.pointerEvents = 'none'
}

module.exports = {
  onStartGame,
  onCellClick,
  onReset,
  gameSpots
}
