'use strict'

const config = require('../config')
const store = require('../store')

const signUp = function (formData) {
    return $.ajax({
        url: config.apiUrl + '/sign-up',
        method: 'POST',
        data: formData
    })
}

const SignIn = function (formData) {
    return $.ajax({
        url: config.apiUrl + '/sign-in',
        method: 'POST',
        data: formData
    })
}

const ChangePassword = function (formData) {

    return $.ajax({
        headers: {
            Authorization: 'Bearer ' + store.user.token
        },
        url: config.apiUrl + '/change-password',
        method: 'PATCH',
        data: formData
    })
}

const SignOut = function () {
    return $.ajax({
        headers: {
            Authorization: 'Bearer ' + store.user.token
        },
        url: config.apiUrl + '/sign-out',
        method: 'DELETE',
    })
}

const getStats = function () {
  return $.ajax({
    url: config.apiUrl + '/games',
    method: 'GET',
    headers: {
      Authorization: 'Bearer' + store.user.token
    }
  })
}

module.exports = {
    signUp,
    SignIn,
    ChangePassword,
    SignOut,
    getStats
}
