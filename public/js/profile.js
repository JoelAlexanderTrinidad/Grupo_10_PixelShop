console.log('profile.js susscess!!!');

const remove = async (idUser) => {
    try {
      let response = await fetch("/api/delete/user", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: idUser,
        }),
    });
    let result = await response.json();
    } catch (error) {
      console.log(error);
    }
};

window.onload = function(){
    $('deleteUser') && $('deleteUser').addEventListener('click', (e) => {
        
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
                }
            })
            /*   setTimeout(function(){
                  e.target.submit()
              }, 4000); */
        }

    })
    $("borrar").addEventListener("click", (e) => {
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
            // e.target.submit()
              setTimeout(function(){
                  e.target.submit()
              }, 4000);
        }
        
    })
    
}
