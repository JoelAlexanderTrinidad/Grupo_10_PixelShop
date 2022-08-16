/* console.log('explore success! c:');


const searchGames = async(L)=>{
    try {
        let response = await fetch('/product/api/explore',{
        method :'POST',
        body : JSON.stringify({
            L : L
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    })
        let result = await response.json();
        return result.data;

    } catch (error) {
        console.error
    }
}

let leters = qsa('.ABC')

leters.addEventListener('click' ,function(e){
    console.log(e);
}); */