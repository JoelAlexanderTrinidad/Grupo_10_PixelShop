console.log('explore success! c:');
let products = async () => {try {
    let response = await fetch(`/product/api/exploreProducts?l=${target.value}`)
    let result = await response.json();
    return result;
    
} catch (error) {
    console.error
}
}
    
let leters = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','Ñ','O','P','Q','R','S','T','U','V','W','X','Y','Z'];

    leters.forEach(letra=>{
        $('abc').innerHTML +=`<button class="ABC" id="busqueda_letra" name="l" value="${letra}">${letra}</button>`
    })
    $('busqueda_letra')&& $('busqueda_letra').addEventListener('click' ,async({target})=>{
       
        result.forEach(({id,img,discount,price})=>
        $('showGames').innerHTML += `
        <article>
        <a href="/product/detail/${id}"><img src="/images/${img}" alt=""></a>
        <div class="details">
            <p>$${price}</p>
            <span>${discount} OFF</span>
            <div>
                <i class="fas fa-cart-plus"></i>
                <i class="fa-regular fa-heart"></i>
            </div>
        </div>
    </article>`
        )
        
        })
