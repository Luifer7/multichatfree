

<template>
    


    
    <div class="chat-into-box">
        
        <!--  :style="{ 'background-image': 'url(' + useData.userForChat?.bg + ')' }" -->
        <div class="chat-user border d-flex align-items-center justify-content-between p-1">
            <div class="d-flex align-items-center justify-content-center gap-2 m-1 flex-wrap" >
                <img :src="useData.userForChat?.foto" width="35" height="35" style="object-fit: cover;"
                 alt="foto" class="rounded-circle">
                <h4 class="text-dark" >{{useData.userForChat?.name}}</h4>
                <b v-if="useData.userForChat?.estado === 1" class="m-0 p-0 description text-success" ><i class="bi bi-circle-fill"></i></b>
                <b v-if="useData.userForChat?.estado === 2" class="m-0 p-0 description text-danger" ><i class="bi bi-circle-fill"></i></b>
                <b v-if="useData.userForChat?.estado === 3" class="m-0 p-0 description text-warning" ><i class="bi bi-circle-fill"></i></b>
            </div>

            <i class="bi bi-search h4 m-4"></i>
           
        </div>

        <div class="chats-persons border" >
            <ChatMessages></ChatMessages>
        </div>

        <div class="chat-send-msg" >
            <ChatForm
            v-if="(useData.currentUser && useData.currentUser?.name)"
            ></ChatForm>
            <strong  v-if="(useData.currentUser && !useData.currentUser?.name)" 
            class="text-warning" >Completa tu perfil para comenzar a chatear!</strong>
        </div>
        
    </div>

    



</template>

<script setup >
import { useDataStore } from "../stores/data";
import ChatForm from "./Chatelements/ChatForm.vue";
import ChatMessages from "./Chatelements/ChatMessages.vue";

const useData = useDataStore()

</script>

<style scoped>

.chat-into-box {
    width: 100%;
    height: 100%;
}
.chat-user {
    height: 13%;
    background-size: cover;
}

.bi-circle-fill {
    font-size: 10px;
}

.chats-persons {
    height: 74%;
    overflow: auto;
    position: relative;
    background-color: #f6f7f9;
}

.chat-send-msg {
    height: 13%;
    display: flex; align-items: center; justify-content: center;
    background-color: #f6f7f9;
}



</style>