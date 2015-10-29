describe('MessagesList', () => {

    it('should append single message', () => {
        var ul = document.createElement('ul'),
            view = new MessagesList(ul),
            li;

        view.appendMessages([{
            text: 'Hello!'
        }]);

        li = ul.firstChild;

        expect(li.tagName).toBe('LI');
        expect(li.innerText).toBe('Hello!');
    });

});
