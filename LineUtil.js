const logger = require('./logger')

class LineUtil {
    static getQuickReply(item) {
        return {
            quickReply: { item }
        }
    }

    static getText(text) {
        if (typeof text !== 'string') {
            throw new TypeError(`text should be typeof string. Type: ${typeof text} `)
        }
        return { type: 'text', text }
    }

    static getSticker(packageId, stickerId) {
        if (typeof packageId !== 'string') {
            throw new TypeError(`packageId should be typeof string. Type: ${typeof packageId}`)
        }
        if (typeof stickerId !== 'string') {
            throw new TypeError(`stickerId should be typeof string. Type: ${typeof stickerId}`)
        }
        return { type: 'sticker', packageId, stickerId }
    }

    static getImage(originalContentUrl, previewImageUrl) {
        if (typeof originalContentUrl !== 'string') {
            throw new TypeError(`originalContentUrl should be typeof string. Type: ${typeof originalContentUrl}`)
        }
        if (typeof previewImageUrl !== 'string') {
            throw new TypeError(`previewImageUrl should be typeof string. Type: ${typeof previewImageUrl}`)
        }
        return { type: 'image', originalContentUrl, previewImageUrl }
    }

    static getViedo(originalContentUrl, previewImageUrl) {
        if (typeof originalContentUrl !== 'string') {
            throw new TypeError(`originalContentUrl should be typeof string. Type: ${typeof originalContentUrl}`)
        }
        if (typeof previewImageUrl !== 'string') {
            throw new TypeError(`previewImageUrl should be typeof string. Type: ${typeof previewImageUrl}`)
        }
        return { type: 'video', originalContentUrl, previewImageUrl }
    }

    static getAudio(originalContentUrl, duration) {
        if (typeof originalContentUrl !== 'string') {
            throw new TypeError(`originalContentUrl should be typeof string. Type: ${typeof originalContentUrl}`)
        }
        if (typeof duration !== 'number') {
            throw new TypeError(`duration should be typeof number. Type: ${typeof duration}`)
        }
        return { type: 'audio', originalContentUrl, duration }
    }

    static getLocation({ title, address, latitude, longitude } = {}) {
        if (typeof title !== 'string') {
            throw new TypeError(`title should be typeof string. Type: ${typeof title}`)
        }
        if (typeof address !== 'string') {
            throw new TypeError(`address should be typeof string. Type: ${typeof address}`)
        }
        if (typeof latitude !== 'number') {
            throw new TypeError(`latitude should be typeof decimal. Type: ${typeof latitude}`)
        }
        if (typeof longitude !== 'number') {
            throw new TypeError(`longitude should be typeof decimal. Type: ${typeof longitude}`)
        }
        return { type: 'location', title, address, latitude, longitude }
    }

    static getImagemap({ baseUrl, altText, baseSize, actions } = {}) {
        if (typeof baseUrl !== 'string') {
            throw new TypeError(`baseUrl should be typeof string. Type: ${typeof baseUrl}`)
        }
        if (typeof altText !== 'string') {
            throw new TypeError(`altText should be typeof string. Type: ${typeof altText}`)
        }
        if (typeof baseSize !== 'object') {
            throw new TypeError(`baseSize shoudl be typeod object. Type: ${typeof baseSize}`)
        }
        if (typeof baseSize.width !== 'number') {
            throw new TypeError(`baseSize.width should be typeof number. Type: ${typeof baseSize.width}`)
        }
        if (typeof baseSize.height !== 'number') {
            throw new TypeError(`baseSize.height should be typeof number. Type: ${typeof baseSize.height}`)
        }
        if (!Array.isArray(actions)) {
            throw new TypeError(`actions should be typeof array.`)
        }
        let checkArr = actions
            .map(item => (typeof item === 'object'))
            .reduce((ans, curValue) => ans && curValue)

        if (!checkArr) {
            throw new TypeError(`All the actions should be typeof object.\n${actions}`)
        }
        return {
            type: 'imagemap',
            baseUrl, altText, baseSize, actions
        }
    }

    static getFlex(altText, contents) {
        if (typeof altText !== 'string') {
            throw new TypeError(`altText should be typeof string. Type: ${altText}`)
        }
        if (typeof contents !== 'object') {
            throw new TypeError(`contents should be typeof object. Type: ${contents}`)
        }
        return { type: 'flex', altText, contents }
    }

    static getRichMenu() {

    }
}


LineUtil.ImageMap = class ImageMap {

    static getBaseSize(width, height) {
        if (typeof width !== 'number') {
            throw new TypeError(`width should be typeof number. Type: ${typeof width}`)
        }
        if (typeof height !== 'number') {
            throw new TypeError(`height should be typeof number. Type: ${typeof height}`)
        }
        return { width, height }
    }

    static getUri(label, linkUri, area) {
        if (label && typeof label !== 'string') {
            throw new TypeError(`label should be typeof string. Type: ${typeof label}`)
        }
        if (typeof linkUri !== 'string') {
            throw new TypeError(`label should be typeof string. Type: ${typeof linkUri}`)
        }
        if (typeof area !== 'object') {
            throw new TypeError(`area should be typeof object. Type: ${typeof area}`)
        }
        if (typeof area.x !== 'number') {
            throw new TypeError(`area.x should be typeof number. Type: ${typeof area.x}`)
        }
        if (typeof area.y !== 'number') {
            throw new TypeError(`area.y should be typeof number. Type: ${typeof area.y}`)
        }
        if (typeof area.width !== 'number') {
            throw new TypeError(`area.width should be typeof number. Type: ${typeof area.width}`)
        }
        if (typeof area.height !== 'number') {
            throw new TypeError(`area.height should be typeof number. Type: ${typeof area.height}`)
        }

        return { type: 'uri', label, linkUri, area }
    }

    static getMessage(label, text, area) {
        if (label && typeof label !== 'string') {
            throw new TypeError(`label should be typeof string. Type: ${typeof label}`)
        }
        if (typeof text !== 'string') {
            throw new TypeError(`text should be typeof string. Type: ${typeof text}`)
        }
        if (typeof area !== 'object') {
            throw new TypeError(`area should be typeof object. Type: ${typeof area}`)
        }
        if (typeof area.x !== 'number') {
            throw new TypeError(`area.x should be typeof number. Type: ${typeof area.x}`)
        }
        if (typeof area.y !== 'number') {
            throw new TypeError(`area.y should be typeof number. Type: ${typeof area.y}`)
        }
        if (typeof area.width !== 'number') {
            throw new TypeError(`area.width should be typeof number. Type: ${typeof area.width}`)
        }
        if (typeof area.height !== 'number') {
            throw new TypeError(`area.height should be typeof number. Type: ${typeof area.height}`)
        }
        return { type: 'message', label, text, area }
    }

    static getArea(x, y, width, height) {
        if (typeof x !== 'number') {
            throw new TypeError(`x should be typeof number. Type: ${typeof x}`)
        }
        if (typeof y !== 'number') {
            throw new TypeError(`y should be typeof number. Type: ${typeof y}`)
        }
        if (typeof width !== 'number') {
            throw new TypeError(`width should be typeof number. Type: ${typeof width}`)
        }
        if (typeof height !== 'number') {
            throw new TypeError(`height should be typeof number. Type: ${typeof height}`)
        }
        return { x, y, width, height }
    }
}

LineUtil.QuickReply = class QuickReply {
    static getButton() {

    }
}

LineUtil.Template = class Template {
    static getButton() {

    }

    static getConfirm() {

    }

    static getCarousel() {

    }

    static getImageCarousel() {

    }
}

LineUtil.Template.Carousel = class Carousel {
    static getColumnObj() {

    }
}

LineUtil.Template.ImageCarousle = class ImageCarousle {
    static getColumnObj() {

    }
}

LineUtil.Flex = class Flex { }

LineUtil.Flex.Container = class Container {
    static getBubble() {

    }

    static getCarousel() {

    }
}

LineUtil.Flex.Container.Component = class Component {
    static getBox({ layout, contents, flex, spacing, margin, action } = {}) {
        if (typeof layout !== 'string') {
            throw new TypeError(`layout should be typeof string.Type: ${layout} `)
        }
        if (!['horizontal', 'vertical', 'baseline'].includes(layout)) {
            throw new TypeError(`layout should be "horizontal", "vertical" or "baseline".`)
        }
        if (!Array.isArray(contents)) {
            throw new TypeError(`contents should be array of objects.`)
        }
        let reducer = (item, value) => item | value
        let checkArr = contents.map(item => typeof item !== 'object')
        if (checkArr.reduce(reducer)) {
            throw new TypeError(`contents should be array of objects.`)
        }
        if (flex && typeof flex !== 'number') {
            throw new TypeError(`flex should be typeof number.Type: ${flex} `)
        }
        if (spacing && typeof spacing !== 'string') {
            throw new TypeError(`spacing should be typeof string.Type: ${spacing} `)
        }
        if (margin && typeof margin !== 'string') {
            throw new TypeError(`margin should be typeof string.Type: ${margin} `)
        }
        if (action && typeof action !== 'object') {
            throw new TypeError(`action should be typeof object.Type: ${action} `)
        }
        return {
            type: 'box',
            layout, contents, flex, spacing, margin, action
        }
    }

    static getButton({ action, flex, margin, height, style, color, gravity } = {}) {
        if (typeof action !== 'object') {
            throw new TypeError(`action should be typeof object.Type: ${action} `)
        }
        if (flex && typeof flex !== 'number') {
            throw new TypeError(`flex should be typeof number.Type: ${flex} `)
        }
        if (margin && typeof margin !== 'string') {
            throw new TypeError(`margin should be typeof string.Type: ${margin} `)
        }
        if (height && typeof height !== 'string') {
            throw new TypeError(`height should be typeof string.Type: ${height} `)
        }
        if (style && typeof style !== 'string') {
            throw new TypeError(`style should be typeof string.Type: ${style} `)
        }
        if (color && typeof color !== 'string') {
            throw new TypeError(`color should be typeof string.Type: ${color} `)
        }
        if (gravity && typeof gravity !== 'string') {
            throw new TypeError(`gravity should be typeof string.Type: ${gravity} `)
        }
        return {
            type: 'button',
            action, flex, margin, height, style, color, gravity
        }
    }

    static getFiller() {
        return { type: 'filler' }
    }

    static getIcon({ url, margin, size, aspectRatio } = {}) {
        if (typeof url !== 'string') {
            throw new TypeError(`url should be typeof string.Type: ${url} `)
        }
        if (margin && typeof margin !== 'string') {
            throw new TypeError(`margin should be typeof string.Type: ${margin} `)
        }
        if (size && typeof size !== 'string') {
            throw new TypeError(`size should be typeof string.Type: ${size} `)
        }
        if (aspectRatio && typeof aspectRatio !== 'string') {
            throw new TypeError(`aspectRatio should be typeof string.Type: ${aspectRatio} `)
        }
        return {
            type: 'icon',
            url, margin, size, aspectRatio
        }
    }

    static getImage({ url, flex, margin, align, gravity, size, aspectRatio, aspectMode, backgroundColor, action }) {
        if (typeof url !== 'string') {
            throw new TypeError(`url should be typeof string.Type: ${url} `)
        }
        if (flex && typeof flex !== 'number') {
            throw new TypeError(`flex should be typeof number.Type: ${flex} `)
        }
        if (margin && typeof margin !== 'string') {
            throw new TypeError(`margin should be typeof string.Type: ${margin} `)
        }
        if (align && typeof align !== 'string') {
            throw new TypeError(`align should be typeof string.Type: ${align} `)
        }
        if (gravity && typeof gravity !== 'string') {
            throw new TypeError(`gravity should be typeof string.Type: ${gravity} `)
        }
        if (size && typeof size !== 'string') {
            throw new TypeError(`size should be typeof string.Type: ${size} `)
        }
        if (aspectRatio && typeof aspectRatio !== 'string') {
            throw new TypeError(`aspectRatio should be typeof string.Type: ${aspectRatio} `)
        }
        if (aspectMode && typeof aspectMode !== 'string') {
            throw new TypeError(`aspectMode should be typeof string.Type: ${aspectMode} `)
        }
        if (action && typeof action !== 'object') {
            throw new TypeError(`action should be typeof string.Type: ${action} `)
        }
        return {
            type: 'image',
            url, flex, margin, align, gravity, size, aspectRatio, aspectMode, backgroundColor, action
        }
    }

    static getSepartor({ margin, color } = {}) {
        if (margin && typeof margin !== 'string') {
            throw new TypeError(`margin should be typeof string.Type: ${margin} `)
        }
        if (color && typeof color !== 'string') {
            throw new TypeError(`color should be typeof string.Type: ${color} `)
        }
        return { type: 'separtor', margin, color }
    }

    static getSpacer({ size } = {}) {
        return { type: 'spacer', size }
    }

    //TODO
    static getText({ text, flex, margin, size, align, gravity, wrap, maxLines, weight, color, action } = {}) {
        if (typeof text !== 'string') {
            throw new TypeError(`text should be typeof string.Type: ${text} `)
        }
        
    }
}

LineUtil.Action = class Action {

    static getPostback({ label, data, displayText, text } = {}) {
        if (label && typeof label !== 'string') {
            throw new TypeError(`label should be typeof string.Type: ${label} `)
        }
        if (typeof data !== 'string') {
            throw new TypeError(`data should be typeof string.Type: ${data} `)
        }
        if (displayText && typeof displayText !== 'string') {
            throw new TypeError(`displayText should be typeof string.Type: ${displayText} `)
        }
        if (text && typeof text !== 'stirng') {
            throw new TypeError(`text should be typeof string.Type: ${text} `)
        }

        return {
            type: 'postback',
            label, data, displayText, text
        }
    }

    static getMessage({ label, text } = {}) {
        if (label && typeof label !== 'string') {
            throw new TypeError(`label should be typeof string.Type: ${label} `)
        }
        if (typeof text !== 'stirng') {
            throw new TypeError(`text should be typeof string.Type: ${text} `)
        }
        return { type: 'message', label, text }
    }

    static getURI({ label, uri } = {}) {
        if (label && typeof label !== 'string') {
            throw new TypeError(`label should be typeof string.Type: ${label} `)
        }
        if (typeof uri !== 'stirng') {
            throw new TypeError(`uri should be typeof string.Type: ${uri} `)
        }
        return { type: 'uri', label, uri }
    }

    static getDatetimePicker({ label, data, mode, initial, max, min } = {}) {
        if (label && typeof label !== 'string') {
            throw new TypeError(`label should be typeof string.Type: ${label} `)
        }
        if (typeof data !== 'string') {
            throw new TypeError(`data should be typeof string.Type: ${data} `)
        }
        if (typeof mode !== 'string') {
            throw new TypeError(`mode should be typeof string.Type: ${mode} `)
        }
        if (initial && typeof initial !== 'string') {
            throw new TypeError(`initial should be typeof string.Type: ${initial} `)
        }
        if (max && typeof max !== 'string') {
            throw new TypeError(`max should be typeof string.Type: ${max} `)
        }
        if (min && typeof min !== 'string') {
            throw new TypeError(`min should be typeof string.Type: ${min} `)
        }

        return {
            type: 'datetimepicker',
            label, data, mode, initial, max, min
        }
    }

    static getCamera({ label } = {}) {
        if (label && typeof label !== 'string') {
            throw new TypeError(`label should be typeof string.Type: ${label} `)
        }
        if (label.length > 20) throw TypeError(`label max size: 20 characters.`)
        return { type: 'camera', label }
    }

    static getCameraRoll({ label } = {}) {
        if (label && typeof label !== 'string') {
            throw new TypeError(`label should be typeof string.Type: ${label} `)
        }
        if (label.length > 20) throw TypeError(`label max size: 20 characters.`)
        return { type: 'cameraRoll', label }
    }

    static getLocation({ label } = {}) {
        if (label && typeof label !== 'string') {
            throw new TypeError(`label should be typeof string.Type: ${label} `)
        }
        if (label.length > 20) throw TypeError(`label max size: 20 characters.`)
        return { type: 'location', label }
    }
}

module.exports = LineUtil