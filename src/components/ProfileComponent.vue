<template>


            <div v-if="useData.currentUser"
                class="box-profile   d-flex p-2 gap-2 align-items-center justify-content-center m-2 rounded">

                <div class="d-flex  gap-1 align-items-end dropstart">
                    <i v-if="useData.estado === 1" class="bi bi-circle-fill text-success" style="font-size: .7em;" ></i>
                    <i v-if="useData.estado === 2" class="bi bi-circle-fill text-danger" style="font-size: .7em;" ></i>
                <img
                    :src="useData.currentUser?.foto"
                    width="35"
                    height="35"
                    style="object-fit: cover; cursor: pointer;"
                    class="rounded-circle dropdown-toggle"
                    data-bs-toggle="dropdown" aria-expanded="false"
                    alt=""
                    @click="getDateNow()"
                />
                <ul class="dropdown-menu">
                    <li class="dropdown-item fw-bold">
                        {{useData.currentUser.name}}
                    </li>
                    <li class="dropdown-item text-muted">
                        {{useData.currentUser.email}}
                    </li>
                    <li class="dropdown-item fw-bold h5">
                       {{useData.fechaActual.nombredia}} <br>
                      <small style="font-size: .7em;" > {{useData.fechaActual.diamesnumero}} de {{useData.fechaActual.nombremes}}</small> <br>
                      <div  style="font-size: .7em;" >{{useData.fechaActual.year}} <i class="bi bi-calendar"></i> </div>
                    </li>
                    <li class="dropdown-item fw-bold text-muted text-center">
                        {{useData.fechaActual.hora}}
                        <i class="bi bi-watch"></i>
                    </li>
                    
                        <div v-if="useData.isLogin" class="w-100 m-auto">
                            <form v-on:submit.prevent="cerrar()" class="d-flex align-items-center justify-content-center" >
                                <button class="cerrarcerrar">
                                  <b class="h6" >SALIR</b> <i class="bi bi-box-arrow-in-right h2 closeclose text-danger"></i>
                                </button>
                            </form>
                        </div>
                  
                </ul>
               
                </div>

              

               
            </div>


</template>

<script setup>
import { ref } from "@vue/reactivity";
import { useAuth } from "../composables/AuthMethods";
import { useDataStore } from "../stores/data";
import Swal from "sweetalert2";
import { useFormat } from "../composables/FormatDay";

const useData = useDataStore();
const { editUser, userLogout } = useAuth();
const { getDateNow } = useFormat()


const cerrar = () => {
  Swal.fire({
    icon: 'question',
    title: "Cerrar sesion",
    showConfirmButton: false,
    showDenyButton: true,
    showCancelButton: true,
    denyButtonText: `Si`
  }).then((result) => {
    if (result.isDenied) {
        userLogout()
        Swal.fire({
            icon: 'error',
            title: 'Cerraste sesion!',
            showConfirmButton: false,
            timer: 1500
        });
    }

  })
}

</script>

<style scoped>
.box-profile {
  height: 50px;
}

.cerrarcerrar{
border: none;
background: transparent;
outline: none;
display: flex; align-items: center; justify-content: center;
}

.closeclose{
    transition: .6s ease all;
}
.closeclose:hover{
    color: purple;
}
</style>
