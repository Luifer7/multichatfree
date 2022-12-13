
<template>
    
   
        <div class="w-100 box-fav" >

          
            
            <h1 class="text-center mt-3 fw-bold text-uppercase">
               Mis Favoritos
            </h1>
           
                <div v-for="fav of useData.anoterFav" :key="fav.id" 
                  class="gap-2 m-2 d-flex align-items-center justify-content-between card d-flex flex-row p-2" > 
                   <div class="d-flex align-items-center jsutify-content-center gap-1" >
                    <img :src="fav.foto" width="50" height="50" class="rounded-circle img-fav"  alt="">
                    <strong class="m-0 p-0 h4 text-capitalize" >{{fav.name}} <i class="bi bi-star-fill text-warning"></i> </strong>
                   </div>

                   <div v-for="u of useData.users" :key="u.id" class="text-center"
                   :class="u.name != fav.name  && u.id === fav.id ?'':'d-none'
                   && u.foto != fav.foto && u.id === fav.id ?'':'d-none' " >
                       
                        <i class="refresh-fav" style="font-size: .9em;"  
                        @click="updateInfoFav(fav, u)" >Actualizacion disponible</i>
                   </div>
                       
                  
                    <i class="bi bi-trash m-3 delete-fav h4"
                    @click="deleteFav(fav)" ></i>  
                </div>
              

        </div>

</template>

<script setup >

import { useAmdin } from "../composables/ChatMethods";
import { useDataStore } from "../stores/data";
import Swal from 'sweetalert2'
import { useFormat } from "../composables/FormatDay";


const useData = useDataStore()
const { getFav, deleteFav } = useAmdin()
const { editFav } = useFormat()

    const updateInfoFav = (fav, u) => {
            Swal.fire({
            title: 'Parece que este usuario a modificado sus datos, quieres actualizar su informacion?',
            showDenyButton: true,
            showCancelButton: true,
            confirmButtonText: 'Actualizar',
            denyButtonText: `No, dejala asi.`,
            }).then((result) => {
            if (result.isConfirmed) {
                editFav(fav, u)
                Swal.fire({
                    showConfirmButton: false,
                    icon: 'success',
                    title: 'Datos actualizados!',
                    timer: 1500
                })
            } else if (result.isDenied) {
                Swal.fire({
                    showConfirmButton: false,
                    icon: 'info',
                    title: 'Los cambios no han sido actualizados!',
                    timer: 1500
                })
            }
            })
    }


</script>


<style scoped>

.delete-fav{
    transition: .6s ease all;
    cursor: pointer;
}
.delete-fav:hover{
    color: rgba(241, 11, 11, 0.89);
    transform: scale(1.1);
}
.refresh-fav{
    transition: .6s ease all;
    cursor: pointer;
}
.refresh-fav:hover{
    color: rgba(21, 143, 57, 0.89);
    transform: scale(1.3);
}
.refresh-fav:active {
    transform: scale(1);
}

.box-fav{
    overflow: auto;
    padding: 10px;
    background-color: #2c374d1a;
}

.img-fav{
    border: 3px solid rgb(236, 233, 9);
    object-fit: cover;
    object-position: center;
}

</style>