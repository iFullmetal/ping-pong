document.addEventListener('keydown', (event)=>{
    if(event.code === "ArrowDown" || event.code === 'KeyS'){
        socket.emit('keyPressed', { key: 's' })
    }
    if(event.code === "ArrowUp" || event.code === 'KeyW'){
        socket.emit('keyPressed', { key: 'w' })
    }
})
let lastY;
window.onmousemove = (event)=>{
    if(event.buttons === 1){
        if(lastY != event.y){
            socket.emit('keyPressed', { dir: lastY - event.y })
            lastY = event.y
        }
    }
}

window.ontouchmove = (event)=>{
    socket.emit('keyPressed', { dir: lastY - event.touches[0].clientY })
    lastY = event.touches[0].clientY
}