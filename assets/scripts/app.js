'use strict'

const authEvents = require('./auth/events')
const gameEvents = require('./game/events')

$(() => {

  // Features to hide
  $('#change-password').hide()
  $('#sign-out').hide()
  $('#game-board').hide()
  $('#game-controls').hide()
  $('.view-header-image').hide()
  $('#winner-message').hide()
  $('.change-password-container').hide()
  $('.sign-in-message').hide()

  // Account sign up
  $('#create-account').on('submit', authEvents.onSignUp)
  // Sign in feature
  $('#sign-in').on('submit', authEvents.onSignIn)
  // Change password feature
  $('#displayChangePassword').on('click', authEvents.displayChangePassword)
  // Change password display
  $('#change-password').on('submit', authEvents.onChangePassword)
  // Sign out feature
  $('#sign-out').on('click', authEvents.onSignOut)
  //Start game!
  $('#new-game').on('click', gameEvents.onCreateGame)
  $('.square').on('click', gameEvents.trackBoard)
  // Reset the game to a new Game. *
  $('#reset-game').on('click', gameEvents.onResetGame)

})
