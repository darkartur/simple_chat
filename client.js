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

document.addEventListener('DOMContentLoaded',() => {

    showMessages(
        document.getElementById('messages'),
        loadMessages()
    );

});
