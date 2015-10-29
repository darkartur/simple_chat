function watchUpMessages(socket, callback) {
    socket.addEventListener(
        'message',
        (e) => callback(JSON.parse(e.data))
    );
}

function postMessage(socket, text) {
    socket.send(JSON.stringify({
        text: text
    }));
}

function initializeNewMessageForm(form, postMessage) {
    form.addEventListener('submit', (e) => {
        postMessage(form.text.value);
        e.preventDefault();
    });
}

document.addEventListener('DOMContentLoaded',() => {

    var socket = new WebSocket("ws://localhost:8081"),
        messages_list;

    messages_list = new MessagesList(
        document.getElementById('messages')
    );

    watchUpMessages(
        socket,
        (messages) =>  messages_list.appendMessages(messages)
    );

    initializeNewMessageForm(
        document.getElementById('new_message'),
        (text) => postMessage(socket, text)
    );

});
