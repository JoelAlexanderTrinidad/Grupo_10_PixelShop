console.log("formEditValidator.js success!");

const $ = (element) => document.getElementById(element);

$("name").addEventListener("blur", function() {
    switch (true) {
        case !this.value:
            $("errorName").innerHTML = "Debes ingresar un nombre";
            this.classList.add("is-invalid")
            break;
        case this.value.length < 5:
            $("errorName").innerHTML = "Mínimo 5 caracteres";
            this.classList.add("is-invalid")
            break;
        default:
            this.classList.remove("is-invalid")
            this.classList.add("is-valid")
            $("errorName").innerHTML = null;
            break;
    }
})

$("description").addEventListener("blur", function() {
    switch (true) {
        case !this.value:
            $("errorDesc").innerHTML = "Debes ingresar una descripción";
            this.classList.add("is-invalid")
            break;
        case this.value.length < 20:
            $("errorDesc").innerHTML = "Mínimo 20 caracteres";
            this.classList.add("is-invalid")
            break;
        default:
            this.classList.remove("is-invalid")
            this.classList.add("is-valid")
            $("errorDesc").innerHTML = null;
            break;
    }
})

$("img").addEventListener("change", function() {
    let allowedExtensions = /(.jpg|.jpeg|.png|.gif)$/i;
    switch (true) {
        case !this.value:
            this.classList.add("is-valid")
            $("errorImg").innerHTML = null
            break;
        case !allowedExtensions.exec(this.value):
            this.classList.add("is-invalid")
            $("errorImg").innerHTML = "Formato de archivo no valido"
            break;
        default:
            this.classList.remove("is-invalid")
            this.classList.add("is-valid")
            $("errorImg").innerHTML = null;
            break;
    }
})

/* function fileValidation() {
    let fileInput = document.getElementById("img");
    let filePath = fileInput.value;
    let allowedExtensions = /(.jpg|.jpeg|.png|.gif)$/i;
    if (!allowedExtensions.exec(filePath)) {
        alert("Solo archivos con extension .jpg, jpeg, png y .gif")
        fileInput.value = "";
        return false
    } else {
        if (fileInput.files && fileInput.files[0]) {
            let reader = new FileReader();
            reader.onload = function(e) {
                document.getElementById("img").innerHTML = "<img src='"+e.target.result+"' width='200px' height='200px'/>";
            };
            reader.readAsDataURL(fileInput.files[0]);
        }
    }
} */

$("price").addEventListener("blur", function() {
    switch (true) {
        case !this.value:
            $("errorPrice").innerHTML = "Debes ingresar un precio";
            this.classList.add("is-invalid")
            break;
        case this.value < 0:
            $("errorPrice").innerHTML = "Precio no valido";
            this.classList.add("is-invalid")
            break;
        default:
            this.classList.remove("is-invalid")
            this.classList.add("is-valid")
            $("errorPrice").innerHTML = null;
            break;
    }
})

$("discount").addEventListener("blur", function() {
    switch (true) {
        case !this.value:
            $("errorDiscount").innerHTML = "Debes ingresar un descuento";
            this.classList.add("is-invalid")
            break;
        case this.value < 0 || this.value > 100:
            $("errorDiscount").innerHTML = "Descuento no valido";
            this.classList.add("is-invalid")
            break;
        default:
            this.classList.remove("is-invalid")
            this.classList.add("is-valid")
            $("errorDiscount").innerHTML = null;
            break;
    }
})

$("ranking").addEventListener("blur", function() {
    switch (true) {
        case !this.value:
            $("errorRanking").innerHTML = "Debes ingresar un ranking";
            this.classList.add("is-invalid")
            break;
        case this.value < 1 || this.value > 10:
            $("errorRanking").innerHTML = "Ranking no valido";
            this.classList.add("is-invalid")
            break;
        default:
            this.classList.remove("is-invalid")
            this.classList.add("is-valid")
            $("errorRanking").innerHTML = null;
            break;
    }
})