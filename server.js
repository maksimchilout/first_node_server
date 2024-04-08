const http = require('http')
const {
    getHtml,
    getComments,
    getText,
    handleNotFound,
    postComment,
    getHome,
} = require('./handlers')

const server = http.createServer((req, res) => {
    if (req.method === 'GET' && req.url === '/') {
        return getHome(req, res)
    }
    if (req.method === 'GET' && req.url === '/html') {
        return getHtml(req, res)
    }
    if (req.method === 'GET' && req.url === '/text') {
        return getText(req, res)
    }
    if (req.method === 'GET' && req.url === '/comments') {
        return getComments(req, res)
    }
    if (req.method === 'POST' && req.url === '/comments') {
        return postComment(req, res)
    }
    handleNotFound(req, res)
})

server.listen(5000, () => {
    console.log('server was launched on port 5000')
})
