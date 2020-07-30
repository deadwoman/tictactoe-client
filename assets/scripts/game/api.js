const config = require('../config')
const store = require('../store')
const startGame = function () {
  return $.ajax({
    headers: {
      Authorization: 'Bearer ' + store.user.token
    },
    url: config.apiUrl + '/games',
    method: 'POST',
    data: '{}'
  })
}
const userChoice = function (index, player, over) {
  return $.ajax({
    headers: {
      // ui signin success 
      Authorization: 'Bearer ' + store.user.token
    },
    url: config.apiUrl + '/games/' + store.game._id,
    method: 'PATCH',
    data: {
      game: {
        cell: {
          index: index,
          value: player
        },
        over: over
      }
    }
  })
}
const gameOver = function () {
  return $.ajax({
    headers: {
      // ui signin success
      Authorization: 'Bearer ' + store.user.token
    },
    url: config.apiUrl + '/games/' + store.game._id,
    method: 'PATCH',
    data: {
      game: {
        cell: {
          index: -1,
          value: ''
        },
        over: true
      }
    }
  })
}
const getGames = function () {
  return $.ajax({
    headers: {
      Authorization: 'Bearer ' + store.user.token
    },
    url: config.apiUrl + '/games?over=true',
    method: 'GET'
  })
}

module.exports = {
  startGame,
  userChoice,
  gameOver,
  getGames
}
