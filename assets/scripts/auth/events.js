'use strict'
const api = require('./api')
const ui = require('./ui')
const getFormFields = require('../../../lib/get-form-fields')

const onSignUp = function (event) {
    event.preventDefault()
    const data = event.target
    const formData = getFormFields(data)

    api.signUp(formData)
        .then(ui.SignUpSuccess)
        .catch(ui.SignUpFailure)
}

const onSignIn = function (event) {
    event.preventDefault()
    const data = event.target
    const formData = getFormFields(data)
    api.SignIn(formData)
        .then(ui.SignInSuccess)
        .catch(ui.SignInFailure)
}

const displayChangePassword = function (event) {
    $('.change-password-container').show()
    $('#game-board').hide()
    $('#winner-message').hide()
}

const onChangePassword = function (event) {
    event.preventDefault()
    const form = event.target
    const formData = getFormFields(form)

    api.ChangePassword(formData)
        .then(ui.ChangePasswordSuccess)
        .catch(ui.ChangePasswordFailure)
}

const onSignOut = function (event) {
    event.preventDefault()
    api.SignOut()
        .then(ui.signOutSuccess)
        .catch(ui.signOutFailure)
}

const stats = function (event) {
  api.getStats()
  .then(ui.getStatsSuccess)
  .catch(ui.getStatsFail)
}

module.exports = {
    onSignUp,
    onSignIn,
    onChangePassword,
    displayChangePassword,
    onSignOut
}
