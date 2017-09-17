const io = require('socket.io')(3000)

let mat = [
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0]
]

let players = []

let currentPlayer = 0
io.on('connection', (socket) => {
    socket.emit('ex event', {a: {b: 42}})
    console.log('client connected')

    socket.on('move', function (x, y) {
        console.log(x, y)
        if (players.length < 2) return
        if (players[currentPlayer] !== socket) return
        let cellValue = mat[x][y]
        if (cellValue != 0) return
        mat[x][y] = players.indexOf(socket) + 1
        currentPlayer = (currentPlayer + 1) % 2
        io.sockets.emit('move-made', mat)
    })

    if (players.length < 2) players.push(socket)
}