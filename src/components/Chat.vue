

<template>
    


    
    <div class="chat-into-box">
        
       
        <div class="chat-user border d-flex align-items-center justify-content-between p-1"
        @click="ffff(useData.userForChat)"
        >

            <div class="d-flex align-items-center justify-content-center gap-2 m-1 flex-wrap" >
                <img :src="useData.userForChat?.foto" width="40" height="40" 
                style="object-fit: cover; border: 3px solid white;"
                 alt="foto" class="rounded-circle">
                <h4 class="text-dark" >{{useData.userForChat?.name}}</h4>
                <b v-if="useData.userForChat?.estado === 1" class="m-0 p-0 description text-success" ><i class="bi bi-circle-fill"></i></b>
                <b v-if="useData.userForChat?.estado === 2" class="m-0 p-0 description text-danger" ><i class="bi bi-circle-fill"></i></b>
                <b v-if="useData.userForChat?.estado === 3" class="m-0 p-0 description text-warning" ><i class="bi bi-circle-fill"></i></b>
            </div>

             <div v-for="sss of useData.anoterFav" :key="sss.id" 
           :class="(sss.id === useData.userForChat?.id ?'':'d-none')">
                
                <i  
                v-if="(sss.id === useData.userForChat?.id)"
                class="bi bi-star-fill text-warning  h3 m-4 fav">
                </i>
        
            </div>
            
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
import { ref } from "@vue/reactivity";
import { useAmdin } from "../composables/ChatMethods";
import { useDataStore } from "../stores/data";
import ChatForm from "./Chatelements/ChatForm.vue";
import ChatMessages from "./Chatelements/ChatMessages.vue";
import { collection, query, where, getDocs } from "firebase/firestore";
import { auth, db } from "../firebase";
import Swal from 'sweetalert2'

const useData = useDataStore()
const { addFav } = useAmdin()

const newFav = ref([])

const ffff = async (data) => {

    const citiesRef = collection(db, "fav")
    const q = query(citiesRef, where("from", "==", `${useData.currentUser?.id}`));
    const querySnapshot = await getDocs(q)
    let dd = {}
    let gg = []
    querySnapshot.forEach((doc) => {
        gg.push(doc.data())    
    })
    gg = gg.filter(field => field.id === data.id)
    
    if (gg[0]?.id === data.id) {
        Swal.fire({
            showConfirmButton: false,
            position: 'center',
            icon: 'info',
            title: 'Este usuario ya está entre tus favoritos.',
            timer: 1800
        })
    } else {
        Swal.fire({
            position: 'center',
            icon: 'question',
            title: 'Quieres agregar este usuario a tus favoritos?',
            showConfirmButton: true,
            showDenyButton: true
        }).then((result) => {
            if (result.isConfirmed) {
                addFav(data)
                Swal.fire('Agregado correctamente', '', 'success')
            } else if (result.isDenied) {
                Swal.fire('El usuario no fue agregado', '', 'info')
            }
            })
    }

}


</script>

<style scoped>

.chat-into-box {
    width: 100%;
    height: 100%;
}
.chat-user {
    height: 13%;
    transition: .5s ease all;
    cursor: pointer;
}

.chat-user:hover {
    background-color: #2c374d1a;
}
.chat-user:active {
    border-radius: 15px;
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

.fav {
    cursor: pointer;
    transition: .6s ease all;
}
.fav:active {
    transform: scale(1.2);
}


::-webkit-scrollbar-track
{
	border: 1px solid transparent;
	background-color: transparent;
}

::-webkit-scrollbar
{
	width: 13px;
	background-color: transparent;
}

::-webkit-scrollbar-thumb
{
	background-color: #74b9ff;
	border-radius: 10px;
}


</style>