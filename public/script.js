$(() => {
    let shorten = $('#shorten');
    let copy = $('#copy');
    let inp = $('#inp');

    shorten.click((e) => {
        e.preventDefault();
        try {
            if (inp.val().length === 0) {
                return;
            }
    
            $.post('http://localhost:3131/new', {
                full: inp.val()
            }, (data) => {
                inp.val(`localhost:3131/${data.shortUrl}`);
            });
        } catch (error) {
            console.log(error);
        }
        
    });

    copy.click((e) => {
        e.preventDefault();
        window.navigator.clipboard.writeText(inp.val())
            .then(() => {
                console.log('Text copied to clipboard');
            })
            .catch(err => {
                console.error('Failed to copy text: ', err);
            });
    });
});
