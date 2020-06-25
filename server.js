const express = require('express')
const app = module.exports = express()
const api = module.exports = express()
const path = require('path')
const fs = require('fs')
const package = require('./package.json')
const cors = require('cors')


// simulates the app server which serves SPA resources
app.get('/', function (req, res) {
    res.type('.html')
    const fileName = "server.html"
    let html = fs.readFileSync(path.join(__dirname, fileName)).toString()
    res.send(html.replace("{{ apiUrl }}", package.settings.apiUrl))
    console.log('APP: Sent:', fileName)
})
app.get('/jquery-2.0.3.js', function (req, res) {
    const options = {
        root: path.join(__dirname),
        dotfiles: 'deny',
        headers: {
            'x-timestamp': Date.now(),
            'x-sent': true
        }
    }
    const fileName = "jquery-2.0.3.js"
    res.sendFile(fileName, options, function (err) {
        if (err) {
            next(err)
        } else {
            console.log('APP: Sent:', fileName)
        }
    })
})
// gets rid of anoying 404 logs
app.get('/favicon.ico', function (req, res) {
    res.status(200)
    res.send("")
})


// simulates the API server which

api.use(cors({
    credentials: true,
}))
api.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", package.settings.allowedOrigin)
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
    next()
})
api.get('/enforce_origin', function (req, res) {

    if (req.headers['origin'] === undefined) {
        res.status("403")
        res.send("Missing Origin Header")
        console.error("API: 403 - Missing Origin Header")
    } else {
        // accept *any* origin
        res.send('Your origin is: ' + req.headers['origin'])
        console.log('API: 200 - Your origin is: ' + req.headers['origin'])
    }
})

app.listen(3000, "0.0.0.0")
api.listen(3001, "0.0.0.0")
console.log('APP: started on port 3000')
console.log('API: started on port 3001')
