const express = require("express")
const app = express()
const path = require("path")
const socketIo = require("socket.io")

app.use('/', express.static(path.join(__dirname, 'public')))


const server = app.listen(3000,()=>{
    console.log("Running")
})


const messages = []

const io = socketIo(server)


io.on('connection', (socket)=>{ //Quando receber uma nova conexão, enviará
    console.log('New connection') // a mensagem para o back-end
    
    socket.emit("update_messages",messages) //Enviando as menssagens antigas para quem entrou agora
    
    socket.on("new_message",(data)=>{
        messages.push(data)
        io.emit("update_messages",messages)
    })
})