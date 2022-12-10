
<template>
    
            
            <i class="bi bi-send-plus send-icon" @click="(addMessage(message, useData.currentUser, useData.userForChat), clear())" ></i>
            <form  class="formulario" v-on:submit.prevent="(addMessage(message, useData.currentUser, useData.userForChat), clear())" >
                <input  v-model="message" maxlength="100" required type="text" 
                class="form-control ddd" placeholder="Escribe un mensaje">
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
    width: 80%; height: 50%;
    background-color: #e9eaf1;
    border-color: #e9eaf1;
    color: #454b5c;
}

.send-icon{
    transition: .6s ease all;
    margin-right: 10px;
    font-size: 35px;
    cursor: pointer;
    transition: .6s ease all;
}
.send-icon:hover {
    color: rgb(34, 93, 170);
    transform: scale(1.1);
}
.send-icon:active {
    color: rgb(34, 93, 170);
    transform: scale(1);
}

.ddd {
    height: 100%;
}

</style>