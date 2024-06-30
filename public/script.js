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
    
            $.post('https://urlshortenerbackend-viev.onrender.com/new', {
                full: inp.val()
            }, (data) => {
                inp.val(`https://urlshortenerbackend-viev.onrender.com/${data.shortUrl}`);
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
