function MessagesList(ul) {
    this._element = ul;
}

MessagesList.prototype.appendMessages = function(messages) {
    var li_items = new DocumentFragment();

    messages.forEach((message) => {
        var li = document.createElement('li');
        li.innerText = message.text;
        li_items.appendChild(li);
    });

    this._element.appendChild(li_items);
};
