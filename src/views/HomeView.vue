


<template>

    <transition name="vistas" mode="out-in" >
      <div class="box-chat" v-if="useData.isLogin" >
        
        
        <div class="users">
          <transition name="vistas" mode="out-in" >
          <Users></Users>
          </transition>
        </div>
        
        <div class="chats">
          
          <chat></chat>

        </div>

        <div class="users-movil" >
          <UsersMovil></UsersMovil>
        </div>

      </div>
    </transition>

        <!-- LOGIN -->
   
          <div class="login" v-if="!useData.isLogin" >
            
              <form v-on:submit.prevent="userLogin(email, password)" class="p-2 form-login p-3" 
              style="height: 70%;">

                <h3 class="text-center mb-3" >Iniciar sesion</h3>
                <div class="mb-3">
                  <input v-model="email" required type="text" class="form-control form-control-sm" placeholder="email" >
                </div>
                <div class="mb-3">
                  <input v-model="password" required type="text" class="form-control form-control-sm" placeholder="password" >
                </div>
                <div class="mb-3" >
                  <button   type="submit" class="btn btn-success btn-sm w-100 fw-bold">
                    <span v-if="useData.spinner" class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                      Iniciar sesion
                  </button>
                </div>
              
              </form>

              <div class="text-center mt-1 card-footer" data-bs-toggle="modal" data-bs-target="#registerUser" >
                <div class="mt-1" >
                  No tienes cuenta?
                  <div class="w-100" >
                    <button class="btn btn-sm btn-primary w-100" >
                    Registrate
                  </button>
                  </div>
                </div>
                </div>

          </div>


  
      <!-- Modal -->
      <div class="modal fade" id="registerUser" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content">
                <div class="modal-header">
                    <h1 class="modal-title fs-5" id="staticBackdropLabel">Crea una cuenta de usuario.</h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <form v-on:submit.prevent="userRegister(emailRegister, passwordRegister, username)" >
                        <div class="mb-2">
                            <input  v-model="emailRegister" required placeholder="Email" type="text" class="form-control form-control-sm">
                        </div>
                        <div class="mb-2">
                            <input v-model="passwordRegister" required placeholder="Password" type="text" class="form-control form-control-sm">
                        </div>
                        <div class="mb-2">
                            <input v-model="username" required placeholder="Elige un nombre de usuario" type="text" class="form-control form-control-sm">
                        </div>
                        <div class="mb-1">
                            <button data-bs-dismiss="modal" aria-label="Close"  type="submit" class="btn fw-bold w-100 btn-sm btn-success">
                              <span v-if="useData.spinner" class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                              Crear usuario
                            </button>
                        </div>
                    </form>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                </div>
                </div>
            </div>

      </div>



</template>

<script setup>
import { ref } from '@vue/reactivity';
import Chat from '../components/Chat.vue';
import Users from '../components/Users.vue';
import { useAmdin } from '../composables/ChatMethods';
import { useAuth } from "../composables/AuthMethods";
import { useDataStore } from '../stores/data';
import UsersMovil from '../components/UsersMovil.vue';

const { userLogin, userLogout, userRegister } = useAuth()
const useData = useDataStore()

const email = ref('')
const password = ref('')

const emailRegister = ref('')
const passwordRegister = ref('')
const username = ref('')

</script>






<style scoped>
.box-chat{
  width: 100vw;
  display: flex;
}

.login{
  width: 100vw;
  display: flex; align-items: center; justify-content: center; flex-direction: column;
}
.form-login{
  height: 200px;
  width: 80%;
}
  

.users{
  width: 20%;
  background-color: #f6f7f9;
  border: 1px solid #efeff5;
}

.chats{
width: 80%;
background-color: #ffff;
border: 1px solid #efeff5;
}

.users-movil {
  height: 100%;
  width: 15%;
  display: none;
}

/*/// TTTT ////*/

.vistas-enter-from {
  opacity: 0;
  transform: translateX(100px);
}

.vistas-enter-active {
  transition: all 0.2s ease-out;
}

.vistas-leave-to {
  opacity: 0;
  transform: translateX(-100px);
}
.vistas-leave-active {
  transition: all 0.2s ease-in;
}




@media (max-width: 780px) {
  .users{
  display: none;
 }
 .chats {
  width: 85%;
 }
 .users-movil {
  display: block;
}
}



</style>