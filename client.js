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

function showMessages(ul, messages) {
    var li_items = new DocumentFragment();

    messages.forEach((message) => {
        var li = document.createElement('li');
        li.innerText = message.text;
        li_items.appendChild(li);
    });

    ul.appendChild(li_items);
}

function postMessage(text) {
    var xhr = new XMLHttpRequest();
    xhr.open('POST', '/messages', false);
    xhr.setRequestHeader('Content-Type', 'application/json;charset=utf-8');
    xhr.send(JSON.stringify({
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

    showMessages(
        document.getElementById('messages'),
        loadMessages()
    );

    initializeNewMessageForm(
        document.getElementById('new_message'),
        (text) => {
            postMessage(text);
            location.reload();
        }
    );

});
