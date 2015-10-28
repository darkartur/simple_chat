document.addEventListener('DOMContentLoaded',() => {

    function getMessages() {
        var xhr = new XMLHttpRequest();
        xhr.open('GET', '/messages', false);
        xhr.send();
        if (xhr.status != 200) {
            alert('Не вышло :(');
        } else {
            return JSON.parse(xhr.responseText);
        }
    }

    var messages = getMessages(),
        li_items = new DocumentFragment();

    messages.forEach((message) => {
        var li = document.createElement('li');
        li.innerText = message.text;
        li_items.appendChild(li);
    });

    document.getElementById('messages').appendChild(li_items);

});
