const store = require('../store')
const api = require('./api')
const gameSpots = document.querySelectorAll('.game-spots')
const winCombos = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [6, 4, 2]
]
const startGameSuccess = function (response) {
  store.game = response.game
  $('#message').text('Game in progress!')
  $('.game-spots').css('pointer-events', 'auto')
}
const startGameFailure = function () {
  $('#message').text('Please sign in!')
}
const userChoiceSuccess = function (response) {
  store.game = response.game
  $('#status').text('User spot selected!')

  checkGameStatus(store.game)
}
const checkGameStatus = (game) => {
  const cells = game.cells
  winCombos.forEach(function (winCombo) {

    const winningString = cells[winCombo[0]] + cells[winCombo[1]] + cells[winCombo[2]]
    if (winningString === 'XXX' || winningString === '000') {
      $('#message').text('You Won!')
      api.gameOver()
      gameSpots.forEach(function (gameSpot) {
        const cellIndex = parseInt(gameSpot.dataset.cellIndex)
        if (winCombo.includes(cellIndex)) {
          gameSpot.style.backgroundColor = 'black'
          gameSpot.style.pointerEvents = 'none'
        } else {
          gameSpot.style.backgroundColor = 'black'
          gameSpot.style.pointerEvents = 'none'
        }
      })
    }
  })
}
const userChoiceFailure = function () {
  $('#status').text('Your choice was unsuccessful.')
}
const resetGameSuccess = function (response) {
  $('#message').text('You reset the game!')
}
const resetGameFailure = function () {
  $('#message').text('Game reset unsuccessful. Try again.')
}
module.exports = {
  startGameFailure,
  startGameSuccess,
  userChoiceSuccess,
  userChoiceFailure,
  resetGameSuccess,
  resetGameFailure
}
