

const socket = io("http://192.168.100.101:3000")

socket.on('update_messages', (messages) => {
    updateMessagesOnScreen(messages)
})

let user = null

function updateMessagesOnScreen(messages) {
    const div_messages = document.querySelector('#messages')

    let lista_messages = '<ul>'
    messages.forEach(message => {
        lista_messages += `<li>${message.user}:${message.msg}</li>`
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

        const message = document.forms["message_form_name"]["msg"].value
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