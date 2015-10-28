function loadMessages() {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', '/messages', false);
    xhr.send();
    if (xhr.status != 200) {
        alert('Не вышло :(');
    } else {
        return JSON.parse(xhr.responseText);
    }
}

/**
 * @param {EventTarget} event_shim
 * @param {Element} ul
 * @param {{text: string}[]} messages
 */
function initializeMessagesList(event_shim, ul, messages) {

    function appendMessages(messages) {
        var li_items = new DocumentFragment();

        messages.forEach((message) => {
            var li = document.createElement('li');
            li.innerText = message.text;
            li_items.appendChild(li);
        });

        ul.appendChild(li_items);
    }

    appendMessages(messages);

    event_shim.addEventListener(
        'new_message',
        (e) => appendMessages([e.message])
    );
}

function postMessage(text) {
    var xhr = new XMLHttpRequest(),
        message = {
            text: text
        };
    xhr.open('POST', '/messages', false);
    xhr.setRequestHeader('Content-Type', 'application/json;charset=utf-8');
    xhr.send(JSON.stringify(message));
    return message;
}

function initializeNewMessageForm(form, postMessage) {
    form.addEventListener('submit', (e) => {
        postMessage(form.text.value);
        e.preventDefault();
    });
}

document.addEventListener('DOMContentLoaded',() => {

    initializeMessagesList(
        document,
        document.getElementById('messages'),
        loadMessages()
    );

    initializeNewMessageForm(
        document.getElementById('new_message'),
        (text) => {
            var e = new Event('new_message');
            e.message = postMessage(text);
            document.dispatchEvent(e);
        }
    );

});
