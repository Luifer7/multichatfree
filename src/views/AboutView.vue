



<template>

      <div class="w-100" v-if="useData.currentUser?.name" >
       
          <h2 class="text-center mt-2 fw-bold text-uppercase" >
            {{useData.currentUser?.name}} <i class="bi bi-person-vcard"></i>
          </h2>

          <div class="card p-1" >
                      
              <div class="d-flex flex-wrap p-2" >
                
                <div class="bg-transparent rounded" style="height: 200px; width: 250px;" >
                  <img :src="useData.currentUser?.foto"
                      class="img-thumbnail m-2" 
                      style="width: 100%; height: 100%; object-fit: cover; object-position: center; " alt="">
                </div>

                <div class="p-2 m-2 texto-info" >

                  <strong>Email: 
                  <b class="text-primary" >{{useData.currentUser?.email}}</b>
                  </strong> <br>

                  <strong>Username: 
                  <b class="text-primary" >{{useData.currentUser?.name}}</b> <br>
                  </strong>

                    <div class="mt-2" >

                    <b> Cuenta creada el</b> <br>
                      <strong> 
                      <b class="text-primary" >{{useData?.alternativeData?.createdTime}}</b> <br>
                      <small class="text-primary" >({{useData.alternativeData.created}})</small> <br>
                      </strong> 
                      <br>
                      <b>Ultimo inicio de sesión</b> <br>
                      <strong> 
                      <b class="text-primary" >{{useData?.alternativeData?.lastLoginAt}}</b> <br>
                      </strong>


                    </div>

                </div>

              </div>

              <div class="d-flex p-2 flex-wrap gap-2 align-items-center justify-content-center">

                <button @click="ModalEditPhoto()" class="btn btn-sm btn-primary text-white fw-bold">
                  Editar imagen <i class="bi bi-image"></i>
                </button>

                <button @click="ModalEditUsername()" class="btn btn-sm btn-primary text-white fw-bold">
                  Editar Nombre <i class="bi bi-person-fill"></i>
                </button>

              </div>
      
          </div>

      </div>

</template>

<script setup >
import { useDataStore } from "../stores/data"
import { ref } from "@vue/runtime-core"
import { useAuth } from "../composables/AuthMethods"
import { useFormat } from "../composables/FormatDay"
import { useAmdin } from "../composables/ChatMethods"


const useData = useDataStore()
const { } = useAuth()
const {} = useAmdin()
const { ModalEditPhoto, ModalEditUsername } = useFormat()




</script>




<style scoped >

.texto-info{
  font-size: .9em;
}




/* CSS */
.button-10 {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 6px 14px;
  font-family: -apple-system, BlinkMacSystemFont, 'Roboto', sans-serif;
  border-radius: 6px;
  border: none;

  color: #fff;
  background: linear-gradient(180deg, #4B91F7 0%, #367AF6 100%);
   background-origin: border-box;
  box-shadow: 0px 0.5px 1.5px rgba(54, 122, 246, 0.25), inset 0px 0.8px 0px -0.25px rgba(255, 255, 255, 0.2);
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
}

.button-10:focus {
  box-shadow: inset 0px 0.8px 0px -0.25px rgba(255, 255, 255, 0.2), 0px 0.5px 1.5px rgba(54, 122, 246, 0.25), 0px 0px 0px 3.5px rgba(58, 108, 217, 0.5);
  outline: 0;
}

</style>
