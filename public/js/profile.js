console.log("profile.js success");

$("btn-delete").addEventListener("click", (e) => {
    if (!confirm("¿Esta seguro que desea borrar su registro?")) {
        e.preventDefault()
    }
})