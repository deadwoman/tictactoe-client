const api = require('../auth/api')
const apiGame = require('../game/api')
const store = require('../store')
const getFormFields = require('../../../lib/get-form-fields')
const ui = require('./ui')

let counterSquare = 0
let playerChoice = 'X'
let gamesVictories = 0

const trackBoard = function (event) {
    const cellSelected = $(event.target)
    let indexCell = cellSelected.index()

    if (cellSelected.hasClass('X') || cellSelected.hasClass('O')) {
        return
    } else {
        if (playerChoice === 'X') {
            cellSelected.addClass('X')
            $('#player-turn').html('<b>Player "O" Turn </b> ')
            if (checkWinner('X')) {
                ++gamesVictories
                $('#winner-message').html('<div> Congratulations <br> YOU WON! :) </br> </div>')

                $('#winner-message').show()
                $('#number-wins').html('<b> Number of wins: ' + gamesVictories + '</b>')
                ui.createNewGame()
            }

            else {
                playerChoice = 'O'
            }
        }
        else {
            cellSelected.addClass('O')
            if (checkWinner('O')) {
                gamesVictories++
                $('#winner-message').html('<div> Congratulations <br> You won! </br> </div>')

                $('#winner-message').show()
                $('#number-wins').html('<b> Number of wins: ' + gamesVictories + '</b>')
                ui.createNewGame()

            } else {
                $('#player-turn').html('<b>Player "X" Turn </b> ')
                playerChoice = 'X'
            }
        }
        return $.ajax({
            headers: {
                Authorization: 'Bearer ' + store.user.token
            },
            url: 'https://tic-tac-toe-api-production.herokuapp.com/games/' + store.ID,
            method: 'PATCH',
            data: {
                "game": {
                    "cell": {
                        "index": indexCell,
                        "value": playerChoice
                    },
                    "over": false
                }
            }
        })
            .then(ui.updateGameSuccess)
            .catch(ui.updateGameFailure)
    }
}

function checkWinner(containClass) {
    if ($('.s1').hasClass(containClass) && $('.s2').hasClass(containClass) && $('.s3').hasClass(containClass)) {
        return true
    } else if ($('.s4').hasClass(containClass) && $('.s5').hasClass(containClass) && $('.s6').hasClass(containClass)) {
        return true
    } else if ($('.s7').hasClass(containClass) && $('.s8').hasClass(containClass) && $('.s9').hasClass(containClass)) {
        return true
    } else if ($('.s1').hasClass(containClass) && $('.s4').hasClass(containClass) && $('.s7').hasClass(containClass)) {
        return true
    } else if ($('.s2').hasClass(containClass) && $('.s5').hasClass(containClass) && $('.s8').hasClass(containClass)) {
        return true
    } else if ($('.s3').hasClass(containClass) && $('.s6').hasClass(containClass) && $('.s9').hasClass(containClass)) {
        return true
    } else if ($('.s1').hasClass(containClass) && $('.s5').hasClass(containClass) && $('.s9').hasClass(containClass)) {
        return true
    } else if ($('.s3').hasClass(containClass) && $('.s5').hasClass(containClass) && $('.s7').hasClass(containClass)) {
        return true
    } else {
        return false
    }
}

const isTiedGame = function (event) {
    $('.cell').on('click', function () {
        const tiedCount = ++counterSquare
        if (tiedCount === 9) {
            $('#winner-message').html('<div> Its a tie! <br> </div>').show()
            counterSquare = 0
        }
    })
}
isTiedGame()

const onCreateGame = function (event) {
    const token = store.user.token
    $('.square').removeClass('X').removeClass('O')
    $('.change-password-container').hide()
    $('#game-board').show()
    $('#winner-message').hide()
    counterSquare = 0

    ui.showBoard()
    apiGame.CreateGame(token)
        .then(ui.createGameSuccess)
        .catch(ui.createGameError)
}

const onResetGame = function (event) {
    $('.square').removeClass('X').removeClass('O')
    gamesVictories = 0
    $('#number-wins').html('<b> Number of wins: ' + gamesVictories + '</b>')
    $('#winner-message').hide()
}

module.exports = {
    trackBoard,
    checkWinner,
    onCreateGame,
    onResetGame,
    isTiedGame
}
