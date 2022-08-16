console.log("listProduct.js success");

$("btn-delete").addEventListener("click", (e) => {
    if (!confirm("¿Esta seguro que desea eliminar el producto?")) {
        e.preventDefault()
    }
})