
<template>
    
            
            <i class="bi bi-send-plus send-icon" @click="(addMessage(message, useData.currentUser, useData.userForChat), clear())" ></i>
            <form  class="formulario" v-on:submit.prevent="(addMessage(message, useData.currentUser, useData.userForChat), clear())" >
                <input  v-model="message" maxlength="100" required type="text" 
                class="form-control input-formulario" placeholder="Escribe un mensaje">
            </form>

</template>

<script setup >
import { ref } from "@vue/reactivity";
import { useAmdin } from "../../composables/ChatMethods";
import { useDataStore } from "../../stores/data";

const useData = useDataStore()

const { addMessage } = useAmdin()
const message = ref('')

const clear = () => {
    message.value = ''
}


</script>

<style scoped>

.formulario {
    width: 90%; height: 50%;
    background-color: #e9eaf1;
    border-color: #e9eaf1;
    color: #454b5c;
}

.send-icon{
    transition: .6s ease all;
    margin-right: 10px;
    font-size: 30px;
    cursor: pointer;
    transition: .6s ease all;
    display: none;
}
.send-icon:hover {
    color: rgb(34, 93, 170);
    transform: scale(1.1);
}
.send-icon:active {
    color: rgb(34, 93, 170);
    transform: scale(1);
}

.input-formulario {
    height: 100%;
}

@media (max-width: 780px) {
    .formulario {
    width: 75%;
    }
    .send-icon {
        display: block;
    }

 }

</style>