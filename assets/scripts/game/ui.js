
createGameSuccess
createGameError

'use strict'
const store = require('../store')
const { css } = require('jquery')
const { trackBoard } = require('./events')

const createGameSuccess = function (response) {
  store.ID = response.game._id
  $('game-board').show()
}

const createGameError = function (error) {
}

const updateGameSuccess = function () {
}

const updateGameFailure = function (error) {
}

const winnerGameSuccess = function () {
}

const createNewGame = function () {
  $('.cell').removeClass("X")
  $('.cell').removeClass("O")
  $('#game-board').hide()
}

const showBoard = function () {
  $('#game-board').show()
}


module.exports = {
  createGameSuccess,
  createGameError,
  updateGameSuccess,
  updateGameFailure,
  winnerGameSuccess,
  createNewGame,
  showBoard
}
