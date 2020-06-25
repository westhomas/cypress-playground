const express = require('express')
const app = module.exports = express()
const path = require('path');

app.get('/', function (req, res) {
    const options = {
        root: path.join(__dirname),
        dotfiles: 'deny',
        headers: {
            'x-timestamp': Date.now(),
            'x-sent': true
        }
    }
    const fileName = "server.html"
    res.sendFile(fileName, options, function (err) {
        if (err) {
            next(err)
        } else {
            console.log('Sent:', fileName)
        }
    })
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
            console.log('Sent:', fileName)
        }
    })
})
app.get('/enforce_origin', function (req, res) {

    if (req.headers['origin'] === undefined) {
        res.status("403")
        res.send("Missing Origin Header")
        console.error("403 - Missing Origin Header")
    } else {
        // accept *any* origin
        res.send('Your origin is: ' + req.headers['origin'])
        console.log('200 - Your origin is: ' + req.headers['origin'])
    }
})

app.listen(3000)
console.log('Express started on port 3000')
