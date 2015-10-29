function watchUpMessages(event_shim, socket) {

    socket.addEventListener('message', (server_event) => {
        var client_event = new Event('new_messages');
        client_event.messages = JSON.parse(server_event.data);
        event_shim.dispatchEvent(client_event);
    });
}

/**
 * @param {EventTarget} event_shim
 * @param {Element} ul
 */
function initializeMessagesList(event_shim, ul) {

    function appendMessages(messages) {
        var li_items = new DocumentFragment();

        messages.forEach((message) => {
            var li = document.createElement('li');
            li.innerText = message.text;
            li_items.appendChild(li);
        });

        ul.appendChild(li_items);
    }

    event_shim.addEventListener(
        'new_messages',
        (e) => appendMessages(e.messages)
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

    var socket = new WebSocket("ws://localhost:8081");

    watchUpMessages(document, socket);

    initializeMessagesList(
        document,
        document.getElementById('messages')
    );

    initializeNewMessageForm(
        document.getElementById('new_message'),
        (text) => postMessage(socket, text)
    );

});
