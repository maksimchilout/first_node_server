const qs = require('querystring')
const comments = require('./data')
const fs = require('fs')

function getHome(req, res) {
    fs.readFile('./files/comment-form.html', (err, data) => {
        if (err) {
            res.statusCode = 500
            res.setHeader('Content-type', 'text/plain')
            res.end('Server error while loading HTML file')
        } else {
            res.statusCode = 200
            res.setHeader('Content-type', 'text/html')
            res.end(data)
        }
    })
}

function getHtml(req, res) {
    res.statusCode = 200
    res.setHeader('Content-Type', 'text/html')
    res.write('<h1>hello from Node.js HTML</h1>')
    res.end()
}
function getText(req, res) {
    res.statusCode = 200
    res.setHeader('Content-Type', 'text/html')
    res.write('<h1>hello from Node.js HTML</h1>')
    res.end()
}
function getComments(req, res) {
    res.statusCode = 200
    res.setHeader('Content-Type', 'application/json')
    res.end(JSON.stringify(comments))
}
function postComment(req, res) {
    res.setHeader('Content-Type', 'text/plain')
    if (req.headers['content-type'] === 'application/x-www-form-urlencoded') {
        let body = ''
        req.on('data', (chunk) => {
            body += chunk.toString()
        })
        req.on('end', () => {
            try {
                const comment = qs.parse(body)
                comment.id = parseInt(comment.id)
                comments.push(comment)
                res.statusCode = 200
                res.setHeader('content-type', 'text/html')
                res.write('<h1>Comment data was received</h1>')
                res.write('<a href="/">Submit one more comment</a>')
                res.end()
            } catch (error) {
                res.statusCode = 400
                res.end('Invalid Form data')
            }
        })
    } else if (req.headers['content-type'] === 'application/json') {
        let commentJSON = ''
        req.on('data', (chunk) => {
            commentJSON += chunk
        })
        req.on('end', () => {
            try {
                comments.push(JSON.parse(commentJSON))
                res.statusCode = 200
                res.end('Comment data was received')
            } catch (error) {
                res.statusCode = 400
                res.end('Invalid JSON')
            }
        })
    } else {
        res.statusCode = 400
        res.end('Data must be in the JSON format')
    }
}
function handleNotFound(req, res) {
    res.statusCode = 404
    res.setHeader('Content-Type', 'text/html')
    res.write('<h1>NoT FoUnD! 404</h1>')
}
module.exports = {
    getHtml,
    getText,
    getComments,
    postComment,
    handleNotFound,
    getHome,
}
