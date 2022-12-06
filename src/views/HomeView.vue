


<template>

  <div class="box-chat" v-if="useData.isLogin" >
    
    <div class="users">
      <Users></Users>
    </div>
    
    <div class="chats">
      <chat></chat>
    </div>

    <div class="users-movil" >
      <UsersMovil></UsersMovil>
    </div>

  </div>

  <div class="login" v-if="!useData.isLogin" >
    
      <form v-on:submit.prevent="userLogin(email, password)" class="p-2 form-login" >
        <h5 class="" >Iniciar sesion</h5>
        <div class="mb-2">
          <input v-model="email" type="text" class="form-control form-control-sm" placeholder="email" >
        </div>
        <div class="mb-2">
          <input v-model="password" type="text" class="form-control form-control-sm" placeholder="password" >
        </div>
      <button  type="submit" class="btn btn-success btn-sm">Login</button>
    </form>

    <div class="text-center" data-bs-toggle="modal" data-bs-target="#registerUser" >
      No tienes cuenta?
      <button class="btn btn-sm btn-primary" >
        Registrate
      </button>
    </div>

  </div>

   <!-- Modal -->
   <div class="modal fade" id="registerUser" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
            <div class="modal-header">
                <h1 class="modal-title fs-5" id="staticBackdropLabel">Register user</h1>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <form v-on:submit.prevent="userRegister(emailRegister, passwordRegister)" >
                    <div class="mb-2">
                        <input v-model="emailRegister" required placeholder="Email" type="text" class="form-control form-control-sm">
                    </div>
                    <div class="mb-2">
                        <input v-model="passwordRegister" required placeholder="Password" type="text" class="form-control form-control-sm">
                    </div>
                    <div class="mb-1">
                        <button data-bs-dismiss="modal" aria-label="Close"  type="submit" class="btn btn-sm btn-success">Guardar</button>
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
  height: 280px;
  width: 80%;
  display: flex; flex-direction: column; justify-content: center; margin-top: 10px;
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