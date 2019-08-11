const socket = io()

const { room } = Qs.parse(location.search, { ignoreQueryPrefix: true })

socket.emit('join', room, (error) => {
    if(error){
        location.href = '/error.html'
    }
})
