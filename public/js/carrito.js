console.log('carrito success')
let query = new  URLSearchParams(location.search);

const getCarts = async ()=>{
    try { 
        let response = await fetch("/api/cart/get-items")
        let result = await response.json()
        return result;
    } catch (error) {
        console.error
    }
}

    $('btn-cart') && $('btn-cart').addEventListener('click', async ()=>{
        let {order, carts} = await getCarts();
        carts.forEach(({product, quantity}) => {
            let {name, price, discount, img} = product
            $('cart-items').innerHTML += `
            <tr>
            <td><img class="img-fluid" src="/images/${img}" alt=""></td>
            <td>${name}</td>
            <td><div class="d-flex">
                <button class="btn btn-sm btn-danger"><i class="fa-solid fa-minus"></i></button>
                <input type="text" style="border: none; width: 20px; text-align: center;" value="${quantity}">
                <button class="btn btn-sm btn-success"><i class="fa-solid fa-plus"></i></button>
            </div></td>
            <td>${price - ((price*discount/100))}</td>
            <td>${price - ((price*discount/100))* quantity}</td>
          </tr>` 
        
        });  

    });


 $('btn-cart-add') && $('btn-cart-add').addEventListener('click', async ({target})=>{
    console.log('agregando producto al carrito', target.value);
    try {
        let response = await fetch("/api/cart/add-item", { 
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