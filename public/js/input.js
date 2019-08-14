document.addEventListener('keydown', (event)=>{
    if(event.code === "ArrowDown" || event.code === 'KeyS'){
        socket.emit('keyPressed', { key: 's' })
    }
    if(event.code === "ArrowUp" || event.code === 'KeyW'){
        socket.emit('keyPressed', { key: 'w' })
    }
})
let lastY;
let lastUpdate = Date.now()
window.onmousemove = (event)=>{
    if(event.buttons === 1){
        if(lastY != event.y){
            socket.emit('keyPressed', { dir: lastY - event.y })
            lastY = event.y
        }
    }
}