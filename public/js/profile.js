console.log("profile.js success");

        $("deleteUser").addEventListener("submit", (e) => {
            e.preventDefault()
                Swal.fire({
                    title: '¿Estás seguro/a?',
                    text: "¡No podrás revertir esto!",
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Eliminar usuario',
                    cancelButtonText: 'Cancelar'
                }).then((result) => {
                            if (result.isConfirmed) {
                                if(e){
                                    Swal.fire(
                                        '¡Eliminado!',
                                        'El usuario ha sido eliminado.',
                                        'success'
                                        )
                                        e.target.submit()
                                }
                        }
                })
    })
