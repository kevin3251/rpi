const request = require('request-promise-native')

const BASE_API = 'https://api.line.me/v2/bot'
const getOption = (method, api, accessToken, body = {}) => ({
    method: `${method}`,
    headers: {
        Authorization: `Bearer ${accessToken}`
    },
    uri: `${BASE_API}/${api}`,
    body,
    json: true
})

class Client {
    constructor({ accessToken } = {}) {
        this.accessToken = accessToken
    }

    pushMessage(to, messages) {

    }
}