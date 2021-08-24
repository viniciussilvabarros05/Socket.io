

const socket = io("http://192.168.100.101:3000")

socket.on('update_messages', (messages) => { //Recebendo messages do front
    updateMessagesOnScreen(messages) //fazendo update das novas mensagens
})

let user = null

function updateMessagesOnScreen(messages) {
    const div_messages = document.querySelector('#messages') //Pegando elemento que receberá as mensagens

    let lista_messages = '<ul>'
    messages.forEach(message => { //Para cada elemento do array, retorne
        lista_messages += `<li>${message.user}:${message.msg}</li>` //Nome do usuário e mensagem
    })
    lista_messages += '</ul>'

    div_messages.innerHTML = lista_messages
}



document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('#message_form')
    form.addEventListener("submit", (e) => {
        e.preventDefault()


        if (!user) {
            alert("Defina um usuario")
            return
        }

        const message = document.forms["message_form_name"]["msg"].value //Pegando o nome do formulário e passando o campo com nome "msg"
        document.forms["message_form_name"]["msg"].value = ''
        socket.emit('new_message', { user: user, msg: message })
    })



    const userform = document.querySelector('#user_form')

    userform.addEventListener("submit", (e) => {
        e.preventDefault()
        user = document.forms["user_form_name"]["user"].value
        userform.parentNode.removeChild(userform)

    })
})