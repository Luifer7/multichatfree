
<template>
    
            <form  class="formulario" v-on:submit.prevent="(addMessage(message, useData.currentUser, useData.userForChat), clear())" >
            <input  v-model="message" maxlength="100" required type="text" class="form-control" placeholder="Escribe un mensaje">
            </form>
            <i class="bi bi-send-plus send-icon" @click="(addMessage(message, useData.currentUser, useData.userForChat), clear())" ></i>
    

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
    width: 80%; height: 60%;
    background-color: #e9eaf1;
    border-color: #e9eaf1;
    color: #454b5c;
}

.send-icon{
    transition: .6s ease all;
    margin-left: 10px;
    font-size: 35px;
    cursor: pointer;

}

</style>