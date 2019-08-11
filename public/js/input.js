document.addEventListener('keydown', (event)=>{
    if(event.code === "ArrowDown" || event.code === 'KeyS'){
        socket.emit('keyPressed', 's')
    }
    if(event.code === "ArrowUp" || event.code === 'KeyW'){
        socket.emit('keyPressed', 'w')
    }
})

