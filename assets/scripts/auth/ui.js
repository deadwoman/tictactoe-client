'use strict'
const store = require('../store')
const { css } = require('jquery')

const SignUpSuccess = function () {
    $('.create-account-message').text('Account creation successful!')
    $('#create-account :input').val('')
}

const SignUpFailure = function () {
    $('.create-account-message').text('Please create an account to access the website!')
}

const SignInSuccess = function (response) {
    // hide features
    $('#create-account').hide()
    $('#sign-in').hide()

    //show features
    $('.view-header-image').show()
    $('#change-password').show()
    $('#sign-out').show()
    $('#game-controls').show()
    store.user = response.user
}

const SignInFailure = function () {
    $('.sign-in-message-error').text('Login credentials incorrect. Try again!')
    $('.sign-in-message-error').addClass('alert alert-info').show()
}

const ChangePasswordSuccess = function () {
    $('.change-password-message').text('Password change successful.')
    $('#change-password :input').val('')
}

const ChangePasswordFailure = function () {
    $('.change-password-message').text('Password update unsuccessful. Try again!')
}

const signOutSuccess = function () {
    // hide features
    $('#sign-out').hide()
    $('#change-password').hide()
    $('.sign-in-message').hide()
    $('.view-header-image').hide()
    $('.game-board').hide()
    $('.sign-in-message-error').hide()
    $('.change-password-container').hide()
    $('#winner-message').hide()

    // show features
    $('.create-account').show()
    $('#sign-in').show()

    $('#sign-in :input').val('')
}

const signOutFailure = function () {
    $('.sign-out-message').text('You must be logged in first!')
}

module.exports = {
    SignUpSuccess,
    SignUpFailure,
    SignInSuccess,
    SignInFailure,
    ChangePasswordSuccess,
    ChangePasswordFailure,
    signOutSuccess,
    signOutFailure
}
