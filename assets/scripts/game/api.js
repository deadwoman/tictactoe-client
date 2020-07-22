const config = require('../config')
const store = require('../store')

const CreateGame = function (token) {
    return $.ajax({
        url: config.apiUrl + '/games',
        method: 'POST',
        headers: {
            Authorization: 'Bearer ' + store.user.token
        },
        contentType: 'application/json',
    })
}

module.exports = {
    CreateGame,
}
