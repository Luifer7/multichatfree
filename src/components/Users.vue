

<template>

    <div class="users-into-box" >
        
        <div class="users-search  d-flex align-items-center justify-content-center" >
            <input type="text" v-model="query" placeholder="Buscar persona" class="form-control m-3 users-input" >
        </div>

        <div class="users-persons">

            <div v-for="user of searchPerson()" :key="user.id" @click="getUserToChat(user)"
            class="user m-2 p-2 rounded d-flex align-items-center justify-content-between"
            :class="(useData.userForChat?.id === user.id ?'seleccionado':'')"
            >

                <div class="d-flex align-items-center gap-1 img-box-responsive" >

                    <img width="30" height="30" style="object-fit: cover;" class="rounded-circle" 
                    :src="user.foto" alt="" >
                    <div class="user-name d-flex flex-column" >
                        <strong class="m-0 p-0 name nn">{{user.name}}</strong>
                        <small v-if="user.estado === 1" class="m-0 p-0 description text-success fw-bold" >ON</small>
                        <small v-if="user.estado === 2" class="m-0 p-0 description text-danger fw-bold" >OFF</small>
                    </div>

                </div>

              

            </div>
        
        </div>

    </div>
    

</template>

<script setup>
import { ref } from "vue";
import { useAmdin } from "../composables/ChatMethods";
import { useDataStore } from "../stores/data";

const useData = useDataStore()
const { getUserToChat } = useAmdin()

// Filter person
const query = ref('')
const searchPerson = () => {
    return useData.users.filter(field => field.name.includes(query.value.toUpperCase()))
}



</script>



<style scoped>

.users-into-box {
    width: 100%;
    height: 87vh;
    display: flex; flex-direction: column;
}

.users-search {
    height: 13%;
}
.users-input{
    background-color: #e9eaf1;
    border-color: #e9eaf1;
    color: #454b5c;
}


.users-persons {
    height: 87%;
    overflow: auto;
    display: flex; flex-direction: column;
}

.user{
    background-color: #fff;
    cursor: pointer;
    transition: .5s ease all;
    border: 1px solid #e9eaf1 ;
}
.user:hover {
   background-color: #e9eaf1;
}

.bi-three-dots{
    color: rgba(59, 59, 197, 0.884);
    transition: .6s ease all;
}
.bi-three-dots:hover{
    color: #121418;
    transform: scale(1.3);
}
.to-fav{
    color: rgba(59, 59, 197, 0.884);
    transition: .3s ease all;
    font-size: 14px;
}

.to-fav:hover{
    background-color: #f6f7f9;
    color: rgb(245, 204, 23);
}
.name{
    font-size: .7em;
    text-transform: capitalize;
}

.description {
    font-size: .6em;
}

.seleccionado {
    background-color: #2fac2fbd;
    color: white;
    transition: .6s ease all;
}
.seleccionado:hover {
    background-color: #2fac2fbd;  
    color: #fff;
}

 

</style>