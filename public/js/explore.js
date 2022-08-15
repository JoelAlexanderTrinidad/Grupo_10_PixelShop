console.log('explore success! c:');


const searchGames = async(leter)=>{
    try {
        let response = await fetch('/product/api/explore',{
        method :'POST',
        body : JSON.stringify({
                email: email
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