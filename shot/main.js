const {
    app,
    BrowserWindow,
    powerSaveBlocker,
    Notification
} = require('electron')

const mUtil = require('./lib/moteUtil')
const fs = require('fs-extra')
const path = require('path')
const logPath = path.join(process.env.HOME, '.smartscreen', 'log.out')
const shotPath = path.join(process.env.HOME, '.smartscreen', 'screenshot')
const id = powerSaveBlocker.start('prevent-display-sleep')
const notify = require('electron-main-notification')

app.commandLine.appendSwitch('enable-usermedia-screen-capturing', 'true')
app.commandLine.appendSwitch('ignore-gpu-blacklist', 'true')
app.commandLine.appendSwitch('enable-gpu-resterization', 'true')
app.commandLine.appendSwitch('enable-zero-copy', 'true')
app.commandLine.appendSwitch('disable-software-rasterizer', 'true')

let win = null
let shotInterval = null

const takeShot = () => {
    return new Promise(resolve => {
        win.webContents.capturePage(image => {
            let imagePath = path.join(shotPath, `${new Date().getTime()}.png`)
            let buf = image.toPNG()
            fs.outputFile(imagePath, buf).catch(err => {
                if (!err) fs.appendFile(logPath, err, err => console.log(err))
            })
            resolve(buf)
        })
    })
}

const createWindow = () => {
    let { width, height } = require('electron').screen.getPrimaryDisplay().workAreaSize

    if (win != null) return
    win = new BrowserWindow({
        backgroundColor: '#2e2c29',
        fullscreen: true,
        //frame: false,
        webPreferences: {
            nodeIntegration: false,
        }
    })

    win.loadURL('http://smartscreen.tv/')
    win.on('closed', () => win = null)

    // shotInterval = setInterval(() => {
    //     win.webContents.capturePage(image => {
    //         let imagePath = path.join(shotPath, `${new Date().getTime()}.png`)
    //         fs.outputFile(imagePath, image.toPNG()).catch(err => {
    //             fs.appendFile(logPath, err, err => console.log(err))
    //         })
    //     })
    // }, 10000)
    //}, 10 * 60000)

    let service = {
        async shot(head, body) {
            console.log('take a shot')
            let buf = await takeShot()
            return {
                fileName: `${new Date().getTime()}.png`
                //buffer: buf
            }
        }
    }

    mUtil.setup().then(() => {
        console.log(mUtil.getDDN())
        mUtil.loadService(service)
    }).then(() => {
        // let notify = new Notification({
        //     title: 'show DDN'
        // })

        setTimeout(() => {
            //   notify.show()  
            notify('This is a notification!', { body: 'See? Really easy to use!' }, () => {
                console.log('The notification got clicked on!')
            })
        }, 4000)

    })
    //console.log(global)
}

app.on('ready', createWindow)

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit()
    if (shotInterval != null) clearInterval(shotInterval)
})

app.on('activate', () => {
    if (win === null) createWindow()
})