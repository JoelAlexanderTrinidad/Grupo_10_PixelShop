const { application } = require("express");

console.log('carrito success ')

 $('btn-cart-add') && $('btn-cart-add').addEventListener('click', async ({target})=>{
    console.log('agregando producto al carrito', target.value);
    try {
        let response = await fetch('/api/cart/add-item',{
            method: 'POST',
            headers:{
                'Content-Type' :'application/json'
            }, 
            body: JSON.stringify({
                id: target.value
            })
        })
        let result = await response.json()
        console.log(result);

    } catch (error) {
        console.log(error)
    }
 })