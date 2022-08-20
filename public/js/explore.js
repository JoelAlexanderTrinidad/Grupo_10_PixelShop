console.log('explore success! c:');

const searchGames = async (L)=>{
    try {
        let response = await fetch('/product/api/exploreProducts',{
        method :'POST',
        body : JSON.stringify({
            letra : L
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


let leters = $('abc')

leters.addEventListener('submit' ,function(e){
    e.preventDefault()
    console.log();
});