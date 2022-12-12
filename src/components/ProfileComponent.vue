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
                    style="object-fit: cover"
                    class="rounded-circle dropdown-toggle"
                    data-bs-toggle="dropdown" aria-expanded="false"
                    alt=""
                />
                <ul class="dropdown-menu">
                    <li><a class="dropdown-item" href="#">Menu item</a></li>
                </ul>
               
                </div>

                <div v-if="useData.isLogin" class="container lognin">
                <form v-on:submit.prevent="cerrar()">
                    <button class="cerrarcerrar">
                        <i class="bi bi-box-arrow-in-right h1 closeclose text-danger"></i>
                    </button>
                </form>
                </div>

                <div
                v-if="useData.currentUser && !useData.currentUser?.name"
                class="d-flex align-items-center justify-content-center m-1"
                >
              
                </div>

            </div>


</template>

<script setup>
import { ref } from "@vue/reactivity";
import { useAuth } from "../composables/AuthMethods";
import { useDataStore } from "../stores/data";
import Swal from "sweetalert2";

const useData = useDataStore();
const { editUser, userLogout } = useAuth();


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
}

.closeclose{
    transition: .6s ease all;
}
.closeclose:hover{
    color: purple;
}
</style>
