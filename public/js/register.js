console.log('register.js success')
const $ = (element)=>document.getElementById(element);
const regExLetter = /^[A-Z]+$/i;
const regExEmail =  /^(([^<>()\[\]\.,;:\s@\”]+(\.[^<>()\[\]\.,;:\s@\”]:+)*)|(\”.+\”))@(([^<>()[\]\.,;:\s@\”]+\.)+[^<>()[\]\.,;:\s@\”]{2,})$/;
const regExPass = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,12}$/;
const regTel =  /^\d{2,10}$/// 2 a 10 números , se podria mejorar que empieze con 11 (AVERIGUANDO).

const verifyEmail = async(email)=>{
    try {
        let response = await fetch('/users/api/check-email',{
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

$('nombre').addEventListener('blur', function(){
    switch (true) {
        case !this.value.trim():
            $('errorNombre').innerHTML 
            = "Debes ingresar tu nombre"; 
            this.classList.add('is-invalid')
            break;
        case !regExLetter.test(this.value.trim()):
                $('errorNombre').innerHTML = "Solo caracteres alfabéticos"; 
        break;
        case this.value.trim().length <2:
            $('errorNombre').innerHTML = "El nombre debe tener como mínimo 2 caracteres"; 
            this.classList.add('is-invalid')
        break;
        default:
            this.classList.remove('is-invalid')
            this.classList.add('is-valid')
            $('errorNombre').innerHTML = null;
            break;
    }
});

$('apellido').addEventListener('blur', function(){
    switch (true) {
        case !this.value.trim():
            $('errorApellido').innerHTML 
            = "Debes ingresar tu apellido"; 
            this.classList.add('is-invalid')
            break;
            case !regExLetter.test(this.value.trim()):
            $('errorApellido').innerHTML = "Solo caracteres alfabéticos"; 
        break;
        case this.value.trim().length <2:
            $('errorApellido').innerHTML = "El apellido debe tener como mínimo 2 caracteres"; 
            this.classList.add('is-invalid')
        break;
        default:
            this.classList.remove('is-invalid')
            this.classList.add('is-valid')
            $('errorApellido').innerHTML = null;
            break;
    }
});
$('tel').addEventListener('blur', function(){
    switch (true) {
        case !this.value.trim():
            $('errorTel').innerHTML 
            = "Debes ingresar tu número de telefono"; 
            this.classList.add('is-invalid')
            break;
            case this.value.trim().length >10:
            $('errorTel').innerHTML = "Puede tener como máximo 10 números"; 
            this.classList.add('is-invalid')
        break;
            case !regTel.test(this.value.trim()):
            $('errorTel').innerHTML = "Solo caracteres numericos"; 
        break;
        default:
            this.classList.remove('is-invalid')
            this.classList.add('is-valid')
            $('errorTel').innerHTML = null;
            break;
    }
});

$('email').addEventListener('blur', async function (){
    switch (true) {
        case !this.value.trim():
            $('errorEmail').innerHTML 
            = "Debes ingresar tu email"; 
            this.classList.add('is-invalid')
            break;
        case !regExEmail.test(this.value.trim()):
                $('errorEmail').innerHTML = "El email tiene formato invalido"; 
                this.classList.add('is-invalid')
        break;
        case await verifyEmail(this.value.trim()):
                $('errorEmail').innerHTML = "El email ya se encuentra registrado"; 
                this.classList.add('is-invalid')
        break;
        default:
            this.classList.remove('is-invalid')
            this.classList.add('is-valid')
            $('errorEmail').innerHTML = null;
            break;
    }
});
$('password').addEventListener('blur', async function (){
    switch (true) {
        case !this.value.trim():
            $('errorPass').innerHTML 
            = "Debes ingresar tu contraseña"; 
            this.classList.add('is-invalid')
            break;
        case !regExPass.test(this.value.trim()):
            $('errorPass').innerHTML = "La contraseña debe tener entre 6 y 12 caracteres, un número, una mayúscula y un caracter especial";
            this.classList.add('is-invalid') 
        break;
        default:
            this.classList.remove('is-invalid')
            this.classList.add('is-valid')
            $('errorPass').innerHTML = null;
            break;
    }
});
$('password2').addEventListener('blur', async function (){
    switch (true) {
        case !this.value.trim():
            $('errorPass2').innerHTML 
            = "Debes corroborar tu contraseña"; 
            this.classList.add('is-invalid')
            break;
            case this.value.trim() !== $('password').value.trim():
            $('errorPass2').innerHTML = "Las contraseñas no coinciden";
            this.classList.add('is-invalid') 
        break;
        default:
            this.classList.remove('is-invalid')
            this.classList.add('is-valid')
            $('errorPass2').innerHTML = null;
            break;
    }
});
$('terminos').addEventListener('click', function(){
    this.classList.toggle('is-invalid');
    this.classList.toggle('is-valid');
});

$('privacidad').addEventListener('click', function(){
    this.classList.toggle('is-invalid');
    this.classList.toggle('is-valid');
})


$('formulario').addEventListener('submit', function (e) {
    e.preventDefault();
    error = false
    let elements = this.elements;


    for (let i = 0; i < elements.length -3 ; i++) {
        if(!elements[i].value ){
            elements[i].classList.add('is-invalid');
            $('errorm').innerHTML = "Todos los campos son obligatorios";
            error= true
        }
        
    }
    for (let i = 0; i < elements.length -3 ; i++) {

        if(!elements[i].classList.contains('is-invalid') ){
           error=true
            
        }
        
    }
    if(!$('terminos').checked){
        $('terminos').classList.add('is-invalid')
        $('errorTerminos').innerHTML = "Debes aceptar terminos y condiciones de uso";
        error=true
    }
    if(!$('privacidad').checked){
        $('privacidad').classList.add('is-invalid')
        $('errorPriv').innerHTML = "Debes aceptar las politicas de privacidad ";
        error=true
    }
    if(!error){
        $('errorm').innerHTML = null
    }
})