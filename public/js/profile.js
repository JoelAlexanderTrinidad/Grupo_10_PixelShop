console.log('profile.js susscess!!!');

window.onload = function(){

    $("borrar").addEventListener("submit", (e) => {
        e.preventDefault()
        if(e){
            Swal.fire({
                title: '¿Estás seguro/a?',
                text: "No podrás revertir esto!",
                icon: 'warning',
                cancelButtonText: 'Cancelar',
                showCancelButton: true,
                confirmButtonColor: '#d51818',
                cancelButtonColor: '#4ed34c',
                confirmButtonText: 'Borrar usuario'
              }).then((result) => {
                if (result.isConfirmed) {
                    Swal.fire(
                        'Borrado!',
                        'El usuario ha sido borrado',
                        'success'
                        )
                        console.log(Swal.fire);
                }
                
            })
              setTimeout(function(){
                  e.target.submit()
              }, 4000);
        }
        
    })
    
}
