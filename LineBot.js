const Bot = require('./Bot')
const crypto = require('crypto')
const extend = require('xtend')
const request = require('request')

class BaseError extends Error {
    constructor(message) {
        super(message)
        this.name = this.constructor.name
        if (typeof Error.captureStackTrace === 'function') {
            Error.captureStackTrace(this, this.constructor)
        } else {
            this.stack = (new Error(message)).stack
        }
    }
}

class BotCongfigError extends BaseError { }

const SIGNATURE_HEADER = 'x-line-signature'
const validateSignature = (req, channelSecret) => {
    if (!req.headers[SIGNATURE_HEADER]) return false
    let { rawBody } = req
    let signature = crypto
        .createHmac('sha256', channelSecret)
        .update(rawBody).digest('base64')

    if (req.headers[SIGNATURE_HEADER] === signature) return true
    else {
        return false
    }
}

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

class LineBot extends Bot {
    constructor(config) {
        let { accessToken, channelSecret, ...botConfig } = config
        if (!accessToken || typeof accessToken !== 'string') {
            throw new BotCongfigError(`accessToken format error. Type: ${typeof accessToken}`)
        }
        if (!channelSecret || typeof channelSecret !== 'string') {
            throw new BotCongfigError(`channelSecret format error. Type: ${typeof channelSecret}`)
        }

        super(botConfig)
        this.accessToken = accessToken
        this.channelSecret = channelSecret

        this._fastify.addHook('onRequest', (req, res, next) => {
            let body = []
            req
                .on('data', chunk => body.push(chunk))
                .on('end', () => {
                    body = Buffer.concat(body).toString()
                    req.body = body
                })

            next()
        })

        this._fastify.addHook('preHandler', (request, reply, next) => {
            request.rawBody = request.raw.body
            if (!validateSignature(request, channelSecret)) {
                reply.code(403)
            }
            next()
        })

        this.on('message', context => {
            this.logger.info(context.body)
        })
    }

    setWebHook(url, context = {
        call: this.call,
        send: this.send,
        onEvent: this.onEvent,
    }) {
        let { channelSecret } = this
        this._fastify.post(url, async (req, reply) => {
            context = extend(context, { body: req.body })
            this.emit('message', context)
            return { success: true }
        })
    }

    static async replyMessage(accessToken, to, body) {
        body = body.map(item => ({ to, ...item }))
        let option = getOption('POST', 'message/reply', accessToken, body)
        return request(option)
    }

    static async pushMessage(accessToken, body) {
        let option = getOption('POST', 'message/push', accessToken, body)
        return await request(option)
    }

    static async multicast(accessToken, body) {
        let option = getOption('POST', 'message/multicast', accessToken, body)
        return await request(option)
    }

    static async getContent(accessToken, messageId) {
        let option = getOption('GET', `message/${messageId}/content`, accessToken)
        return await request(option)
    }

    static async getProfile(accessToken, userId) {
        let option = getOption('GET', `profile/${userId}`, accessToken)
        return await request(option)
    }

    static async getGroupMemberProfile(accessToken, groupId, userId) {
        let api = `group/${groupId}/member/${userId}`
        let option = getOption('GET', api, accessToken)
        return await request(option)
    }

    static async getGroupMemberIDs(accessToken, groupId) {
        let api = `group/${groupId}/member/ids`
        let option = getOption('GET', api, accessToken)
        return await request(option)
    }

    static async leaveGroup(accessToken, groupId) {
        let api = `group/${groupId}/leave`
        let option = getOption('POST', api, accessToken)
        return await request(option)
    }

    static async getRoomMemberProfile(accessToken, roomId, userId) {
        let api = `room/${roomId}/member/${userId}`
        let option = getOption('GET', api, accessToken)
        return await request(option)
    }

    static async getRoomMemberIDs(accessToken, roomId) {
        let api = `room/${roomId}/members/ids`
        let option = getOption('GET', api, accessToken)
        return await request(option)
    }

    static async leaveRoom(accessToken, roomId) {
        let api = `room/${roomId}/leave`
        let option = getOption('POST', api, accessToken)
        return await request(option)
    }

    static async getRichMenu(accessToken, richMenuId) {
        let api = `richmenu/${richMenuId}`
        let option = getOption('GET', api, accessToken)
        return await request(option)
    }

    static async createRichMenu(accessToken, body) {
        let option = getOption('POST', 'richmenu', accessToken, body)
        return await request(option)
    }

    static async deleteRichMenu(accessToken, richMenuId) {
        let api = `richmenu/${richMenuId}`
        let option = getOption('DELETE', api, accessToken)
        return await request(option)
    }

    static async getRichMenuID(accessToken, userId) {
        let api = `user/${userId}/richmenu`
        let option = getOption('GET', api, accessToken)
        return await request(option)
    }

    static async linkRichMenu(accessToken, userId, richMenuId) {
        let api = `user/${userId}/richmenu/${richMenuId}`
        let option = getOption('POST', api, accessToken)
        return await request(option)
    }

    static async unlinkRichMenu(accessToken, userId) {
        let api = `user/${userId}/richmenu`
        let option = getOption('DELETE', api, accessToken)
        return await request(option)
    }

    static async downloadRichMenuImg(accessToken, richMenuId) {
        let api = `richmenu/${richMenuId}/content`
        let option = getOption('GET', api, accessToken)
        return await request(option)
    }


    //TODO
    // static async uploadRichMenuImg(accessToken, richMenuId, imageFile, imageType) {
    //     if (!['image/jpeg', 'image/png'].includes(imageType)) {
    //         throw new TypeError(`imageType should should be "image/jpeg" or "image/png". imageType: ${imageType}`)
    //     }

    //     let option = {
    //         method: 'POST',
    //         headers: {
    //             'Authorization': `Bearer ${accessToken}`,
    //             'Content-Type': imageType,
    //             'Content-Length': imageFile.byteLength
    //         },
    //         uri: `${BASE_API}/richmenu/${richMenuId}/content`,
    //     }
    // }

    static async getRichMenuList(accessToken) {
        let api = `richmenu/list`
        let option = getOption('GET', api, accessToken)
        return await request(option)
    }

    static async issueLinkToken(accessToken, userId) {
        let api = `user/${userId}/linkToken`
        let option = getOption('POST', api, accessToken)
        return await request(option)
    }
}

module.exports = LineBot