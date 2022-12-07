<template>


            <div
                v-if="useData.currentUser"
                class="box-profile d-flex gap-2 align-items-center justify-content-center m-2 rounded">
                <div class="d-flex flex-column align-items-center">
                <img
                    :src="useData.currentUser?.foto"
                    width="35"
                    height="35"
                    style="object-fit: cover"
                    class="rounded-circle"
                    alt=""
                />
                <small style="font-size: 0.7em; font-weight: bold">{{
                    useData.currentUser?.name
                }}</small>
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
                <button
                    class="btn btn-sm fw-bold btn-warning text-white"
                    data-bs-toggle="modal"
                    data-bs-target="#completeProfile"
                >
                    Completar
                </button>
                </div>
            </div>

            <!-- Modal COMPLETAR PERFIL-->
            <div
                class="modal fade"
                id="completeProfile"
                data-bs-backdrop="static"
                data-bs-keyboard="false"
                tabindex="-1"
                aria-labelledby="staticBackdropLabel"
                aria-hidden="true"
            >
                <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content">
                    <div class="modal-header">
                    <h5 class="modal-title fs-4 fw-bold text-center" id="staticBackdropLabel">
                        Completa tu perfil
                    </h5>
                    <button
                        type="button"
                        class="btn-close"
                        data-bs-dismiss="modal"
                        aria-label="Close"
                    ></button>
                    </div>
                    <div class="modal-body">
                    <form
                        v-on:submit.prevent="editUser(name, foto, bg, useData.currentUser)"
                    >
                        <div class="mb-2">
                        <input
                            v-model="name"
                            required
                            placeholder="Escoge un nombre"
                            type="text"
                            class="form-control form-control-sm"
                        />
                        </div>
                        <div class="mb-2">
                        <input
                            v-model="foto"
                            required
                            placeholder="URL de foto de perfil"
                            type="text"
                            class="form-control form-control-sm"
                        />
                        </div>
                        <div class="mb-2">
                            <select  required  v-model="bg" class="form-select" aria-label="Default select example">
                            <option selected>Color de background</option>
                            <option value="1">Verde</option>
                            <option value="2">Rojo</option>
                            <option value="3">Amarillo</option>
                            <option value="4">Azul</option>
                            </select>
                        </div>

                        <div class="mb-2">
                       <div class="mb-2" >
                        <button
                            data-bs-dismiss="modal"
                            aria-label="Close"
                            type="submit"
                            class="btn btn-sm btn-success w-100"
                        >
                        <span v-if="useData.spinner" class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                            Guardar
                        </button>
                       </div>
                        </div>
                    </form>
                    </div>
                    <div class="modal-footer">
                    <button
                        type="button"
                        class="btn btn-secondary"
                        data-bs-dismiss="modal"
                    >
                        Close
                    </button>
                    </div>
                </div>
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

const name = ref("");
const foto = ref("");
const bg = ref("");

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
