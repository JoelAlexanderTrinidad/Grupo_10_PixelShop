console.log("carrito success");
let query = new URLSearchParams(location.search);

const getCarts = async () => {
  try {
    let response = await fetch("/api/cart/get-items");
    let result = await response.json();
    return result;
  } catch (error) {
    console.error;
  }
};

const addItem = async (id) => {
  try {
    let response = await fetch("/api/cart/add-item", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: id,
      }),
    });
    let result = await response.json();
    showCart(result.carts);
  } catch (error) {
    console.log(error);
  }
};
const removeItem = async (id) => {
    try {
      let response = await fetch("/api/cart/remove-item", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: id,
        }),
      });
      let result = await response.json();
      showCart(result.carts);
    } catch (error) {
      console.log(error);
    }
  };
  const removeItemAll = async (id) => {
    try {
      let response = await fetch("/api/cart/remove-itemAll", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: id,
        }),
      });
      let result = await response.json();
      showCart(result.carts);
    } catch (error) {
      console.log(error);
    }
  };

const showCart = (carts) => {
 if(carts.length >0){
        $('cart-box').hidden = false;
        $('btn-buy').hidden = false;
        $('msg-empty').hidden= true;
        $("cart-items").innerHTML = null;
        carts.forEach(({ id:idItem, product, quantity }) => {
          let { id, name, price, discount, img } = product;
          $("cart-items").innerHTML += `
              <tr>
              <td><img class="img-fluid" src="/images/${img}" alt=""></td>
              <td>${name}</td>
              <td><div class="d-flex">
              <button class="btn btn-sm btn-danger" onclick="removeItem(${id})"><i class="fa-solid fa-minus"></i></button>
                  <input type="text" style="border: none; width: 20px; text-align: center;" value="${quantity}">
                  <button class="btn btn-sm btn-success" onclick="addItem(${id})"><i class="fa-solid fa-plus"></i></button>
              </div></td>
              <td>${price - (price * discount) / 100}</td>
              <td>${(price - ((price * discount) / 100)) * quantity}</td>
              <td>
              <button class="btn btn-sm btn-danger" onclick="removeItemAll(${idItem})"><i class="fa-solid fa-trash"></i></button></td>
            </tr>`;
        });
    }else{
        $('cart-box').hidden = true;
        $('msg-empty').hidden= false;
        $('btn-buy').hidden = true;
    }
};
$("btn-cart") &&
  $("btn-cart").addEventListener("click", async () => {
    let { order, carts } = await getCarts();
    showCart(carts);
  });

$("btn-cart-add") &&
  $("btn-cart-add").addEventListener("click", async ({ target }) => {
    console.log("agregando producto al carrito", target.value);
    await addItem(target.value);
  });
$('btn-cart-removeAll') && $('btn-cart-removeAll').addEventListener('click', async({target})=>{
    try {
        let response = await fetch("/api/cart/remove-all", {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id: target.value,
          }),
        });
        let result = await response.json();
        showCart(result.carts);
      } catch (error) {
        console.log(error);
      }
})