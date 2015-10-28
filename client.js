document.addEventListener('DOMContentLoaded',() => {

    var xhr = new XMLHttpRequest();
    xhr.open('GET', '/messages', false);
    xhr.send();
    if (xhr.status != 200) {
        alert('Не вышло :(');
    } else {
        var messages = JSON.parse(xhr.responseText),
            li_items = new DocumentFragment();

        messages.forEach((message) => {
            var li = document.createElement('li');
            li.innerText = message.text;
            li_items.appendChild(li);
        });

        document.getElementById('messages').appendChild(li_items);
    }


});
