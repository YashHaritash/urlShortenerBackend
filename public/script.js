$(()=>{
    
    let shorten = $('#shorten');
    let copy = $('#copy');
    let inp = $('#inp');

    shorten.click((e)=>{
        e.preventDefault();
        if(inp.val()==0){
            return;
        }

        $.post('http://localhost:3131/new',{
            full : inp.val()
        },(data)=>{
            inp.val(`http://localhost:3131/${data.shortUrl}`)
        })
    })
    copy.click((e)=>{
        // console.log("Hello")
        e.preventDefault();
        window.navigator.clipboard.writeText(inp.val())
                    .then(() => {
                        console.log('Text copied to clipboard');
                    })
                    .catch(err => {
                        console.error('Failed to copy text: ', err);
                    });
    })

})